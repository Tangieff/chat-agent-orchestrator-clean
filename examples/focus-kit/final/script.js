(function () {
  "use strict";

  /* ---------- Theme switch ---------- */

  var html = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var themeBtnText = document.getElementById("theme-btn-text");

  function setTheme(theme) {
    var isCalm = theme === "calm";
    html.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", isCalm ? "true" : "false");
    themeBtnText.textContent = isCalm ? "Calm" : "Editorial";
    themeToggle.setAttribute(
      "aria-label",
      "Theme: " + (isCalm ? "Calm" : "Editorial") +
        ". Activate to switch to " + (isCalm ? "Editorial" : "Calm") + " theme."
    );
  }

  themeToggle.addEventListener("click", function () {
    var current = html.getAttribute("data-theme") === "calm" ? "editorial" : "calm";
    setTheme(current);
  });

  /* ---------- Focus session panel ---------- */

  var overlay = document.getElementById("panel-overlay");
  var panel = document.getElementById("session-panel");
  var openBtn = document.getElementById("open-session");
  var closeBtn = document.getElementById("panel-close");

  var setupView = document.getElementById("panel-setup");
  var activeView = document.getElementById("panel-active");
  var doneView = document.getElementById("panel-done");

  var intentInput = document.getElementById("session-intent");
  var lengthBtns = Array.prototype.slice.call(document.querySelectorAll(".length-btn"));
  var startBtn = document.getElementById("start-session");

  var activeIntent = document.getElementById("active-intent");
  var timerTime = document.getElementById("timer-time");
  var timerStatus = document.getElementById("timer-status");
  var pauseBtn = document.getElementById("timer-pause");
  var resetBtn = document.getElementById("timer-reset");

  var doneSub = document.getElementById("done-sub");
  var doneRestartBtn = document.getElementById("done-restart");

  var selectedMinutes = 25;
  var lastFocusedEl = null;
  var bodyOverflowBefore = "";

  var timerEndAt = null;
  var remainingMs = 0;
  var timerHandle = null;
  var isPaused = false;
  var isRunning = false;

  function formatTime(ms) {
    var totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(totalSeconds / 60);
    var s = totalSeconds % 60;
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  }

  function showView(view) {
    setupView.hidden = view !== "setup";
    activeView.hidden = view !== "active";
    doneView.hidden = view !== "done";
  }

  /* ---------- Session length radiogroup (roving tabindex) ---------- */

  function selectLength(btn, focusIt) {
    lengthBtns.forEach(function (b) {
      var isSelected = b === btn;
      b.classList.toggle("is-selected", isSelected);
      b.setAttribute("aria-checked", isSelected ? "true" : "false");
      b.tabIndex = isSelected ? 0 : -1;
    });
    selectedMinutes = parseInt(btn.getAttribute("data-minutes"), 10);
    if (focusIt !== false) {
      btn.focus();
    }
  }

  lengthBtns.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      selectLength(btn);
    });

    btn.addEventListener("keydown", function (e) {
      var targetIndex = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        targetIndex = (index + 1) % lengthBtns.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        targetIndex = (index - 1 + lengthBtns.length) % lengthBtns.length;
      } else if (e.key === "Home") {
        targetIndex = 0;
      } else if (e.key === "End") {
        targetIndex = lengthBtns.length - 1;
      }
      if (targetIndex !== null) {
        e.preventDefault();
        selectLength(lengthBtns[targetIndex]);
      }
    });
  });

  /* ---------- Dialog open/close + focus containment ---------- */

  function getFocusable() {
    return Array.prototype.slice
      .call(panel.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])'))
      .filter(function (el) {
        return el.offsetParent !== null && !el.disabled;
      });
  }

  function openPanel() {
    lastFocusedEl = document.activeElement;
    overlay.hidden = false;
    bodyOverflowBefore = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    resetToSetup();
    panel.focus();
    document.addEventListener("keydown", onPanelKeydown, true);
    document.addEventListener("focusin", onDocumentFocusIn, true);
  }

  function closePanel() {
    stopTimer();
    overlay.hidden = true;
    document.body.style.overflow = bodyOverflowBefore;
    document.removeEventListener("keydown", onPanelKeydown, true);
    document.removeEventListener("focusin", onDocumentFocusIn, true);
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  function onPanelKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closePanel();
      return;
    }
    if (e.key === "Tab") {
      var focusable = getFocusable();
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Safety net: if focus ever lands outside the open dialog (e.g. a
  // programmatic focus() call elsewhere), pull it back in immediately.
  function onDocumentFocusIn(e) {
    if (overlay.hidden) return;
    if (panel.contains(e.target)) return;
    var focusable = getFocusable();
    (focusable[0] || panel).focus();
  }

  function resetToSetup() {
    stopTimer();
    showView("setup");
    intentInput.value = "";
    selectLength(document.querySelector('.length-btn[data-minutes="25"]'), false);
    intentInput.focus();
  }

  openBtn.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);

  overlay.addEventListener("mousedown", function (e) {
    if (e.target === overlay) {
      closePanel();
    }
  });

  startBtn.addEventListener("click", function () {
    var intent = intentInput.value.trim();
    activeIntent.textContent = intent ? "Working on: " + intent : "This session has no stated intent.";
    showView("active");
    beginTimer(selectedMinutes * 60 * 1000);
    pauseBtn.focus();
  });

  /* ---------- Timer (absolute end-time based, throttle-resilient) ---------- */

  function beginTimer(durationMs) {
    remainingMs = durationMs;
    isPaused = false;
    pauseBtn.textContent = "Pause";
    timerStatus.textContent = "Running.";
    timerTime.textContent = formatTime(remainingMs);
    runFrom(Date.now());
  }

  function runFrom(now) {
    timerEndAt = now + remainingMs;
    isRunning = true;
    clearInterval(timerHandle);
    timerHandle = setInterval(tick, 250);
  }

  function tick() {
    var left = timerEndAt - Date.now();
    if (left <= 0) {
      finishTimer();
      return;
    }
    remainingMs = left;
    timerTime.textContent = formatTime(left);
  }

  function finishTimer() {
    clearInterval(timerHandle);
    timerHandle = null;
    isRunning = false;
    remainingMs = 0;
    timerTime.textContent = "00:00";
    var intentText = activeIntent.textContent;
    doneSub.textContent =
      selectedMinutes + " focused minutes. " +
      (intentText && intentText.indexOf("no stated") === -1
        ? intentText.replace("Working on: ", "") + " — a little closer to done."
        : "Nicely held.");
    showView("done");
    doneRestartBtn.focus();
  }

  function stopTimer() {
    clearInterval(timerHandle);
    timerHandle = null;
    isRunning = false;
  }

  // A throttled background tab can delay the 250ms tick, which only
  // affects when we redraw — timerEndAt keeps the actual deadline exact.
  // Recompute immediately as soon as the tab is visible again so the
  // display never lags behind reality.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && isRunning && !isPaused) {
      tick();
    }
  });

  pauseBtn.addEventListener("click", function () {
    if (isPaused) {
      isPaused = false;
      pauseBtn.textContent = "Pause";
      timerStatus.textContent = "Running.";
      runFrom(Date.now());
    } else {
      isPaused = true;
      clearInterval(timerHandle);
      timerHandle = null;
      remainingMs = timerEndAt - Date.now();
      pauseBtn.textContent = "Resume";
      timerStatus.textContent = "Paused.";
    }
  });

  resetBtn.addEventListener("click", function () {
    resetToSetup();
  });

  doneRestartBtn.addEventListener("click", function () {
    resetToSetup();
  });
})();
