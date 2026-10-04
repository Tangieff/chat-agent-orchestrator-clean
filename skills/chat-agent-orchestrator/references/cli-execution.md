# Launch local agents reliably

Use this reference when the remote connection works but the coding-agent invocation needs attention. Inspect the installed CLI's help; these examples are starting points, not a reason to replace working configuration.

## Keep the environment consistent

Record the device, operating system, working folder, executable, and session ID. Run the agent in the project folder. Native Windows executables need Windows paths; WSL commands need Linux paths. A new installation can require restarting the remote agent to refresh PATH.

## Prefer a bounded non-interactive run

Claude Code supports print mode. For a small readiness question:

```sh
claude -p "Reply with READY only."
```

For implementation, supply the brief as an argument and configure the allowed tools appropriate to the task using the installed CLI's supported flags. Do not assume print mode grants write or shell permissions. [Claude Code CLI reference](https://code.claude.com/docs/en/cli-reference).

Codex supports `exec` for non-interactive tasks:

```sh
codex exec "Inspect this project and summarize its entry points."
```

Use the configured sandbox and approval settings appropriate to the requested edits. Check `codex exec --help` before choosing options. [Official non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).

Passing a prompt as an argument avoids leaving an input pipe open. For long prompts, use the CLI's documented file/stdin interface and close input correctly. On PowerShell, quote literal prompt text carefully; do not build shell commands by interpolating untrusted content.

## Track the actual process

Use Remote Desktop Commander's returned session ID to read progress and completion. A browser preview, a terminal launch, and a running coding agent are different processes. Do not kill a process solely because it has not printed output recently.

If a run fails, distinguish authentication, allowance, unavailable model, shell quoting, permissions, and project errors. Make a targeted correction. Preserve useful output before retrying, and avoid overlapping implementations in the same folder.

## Review the artifact, not just the report

Inspect changed files. Verify the behavior that matters to the brief. In the Focus Kit example, the first version already had an absolute timer deadline and Arrow-key selection. The final version improved Home/End navigation, initial radio focus, modal focus containment, visibility refresh, and copy credibility. Those are refinements; do not describe the original features as missing.
