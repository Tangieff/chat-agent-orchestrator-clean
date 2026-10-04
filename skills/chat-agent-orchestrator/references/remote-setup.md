# Connect Chat to your computer

**Goal:** discuss, prepare, and run a project on your computer from ordinary ChatGPT Chat. Keep orchestration in Chat and use direct tools or local agents for the stages that need them.

First connect your computer and ChatGPT. You can then prepare folders, run suitable Python or shell work, and launch installed tools from the conversation. Add a coding agent when your project needs one. The prompts also work without installing the reusable skill.

## 1. Get the prerequisites

| Component | What it does | Where to get it |
| --- | --- | --- |
| Node.js | Runs the Remote Desktop Commander device agent | [Official download](https://nodejs.org/en/download) — choose a supported LTS release |
| Remote Desktop Commander account | Links your assistant to your devices | [Official dashboard](https://mcp.desktopcommander.app) |
| ChatGPT with the connector available | Coordinates your task in Chat | [Plugin installation documentation](https://learn.chatgpt.com/docs/plugins) |
| Python or another local runtime | Handles suitable tasks directly from Chat | Use the tools already installed on your computer |
| Claude Code or Codex CLI (optional) | Handles implementation stages that benefit from a coding agent | Installation commands below |

On Windows, open **Start → Terminal → PowerShell**. On macOS, open **Terminal**. On Linux, open your terminal app. After installing Node.js, open a new terminal and run:

```sh
node --version
npm --version
```

Both should print version numbers. The remote agent requires Node.js 18 or newer; a current supported LTS release is the simpler starting point. [Node.js download](https://nodejs.org/en/download), [Remote Desktop Commander requirements](https://github.com/desktop-commander/remote-desktop-commander#requirements).

## 2. Pair your computer

Run this **on the computer the agents will use**:

```sh
npx @wonderwhy-er/desktop-commander@latest remote
```

1. Let `npx` install the named package if prompted.
2. A device verification page opens. Sign in with Google or email.
3. Compare its code with the code in your terminal. They must match.
4. Select **Verify Device**.
5. Confirm the terminal reports a ready device and the dashboard lists it under **Your Devices**.

Leave that terminal open. Closing it stops the connection. [Official pairing walkthrough](https://github.com/desktop-commander/remote-desktop-commander/blob/main/docs/SETUP.md).

## 3. Connect Remote Desktop Commander in ChatGPT

### Plugin directory route

Open **Plugins** in your supported ChatGPT client, search **Remote Desktop Commander**, open its details, and install it. Connect the service when prompted, using the same account as the paired device. Start a **new Chat** conversation after installation. [Official plugin installation flow](https://learn.chatgpt.com/docs/plugins).

### Custom connector route

If the plugin is unavailable, use the [Remote Desktop Commander client instructions](https://github.com/desktop-commander/remote-desktop-commander#quick-start). On a supported account, open **Settings → Security and login → Developer mode**, then open **Plugins → plus button** and create a remote MCP connection. Give it a recognizable name, such as Remote Desktop Commander, and enter:

```text
https://mcp.desktopcommander.app/mcp
```

Complete OAuth with the same Remote Desktop Commander account. Its dashboard's **Connect an AI assistant** page has client-specific instructions. Developer mode and connector availability depend on the client and account; use the displayed settings rather than assuming every account has them. The current OpenAI setup route is documented under [plugin packaging and MCP connection](https://developers.openai.com/plugins/build/plugins#create-and-test-a-plugin-locally-with-an-mcp-server).

## 4. Confirm Chat can reach the device

Paste into the new Chat conversation:

```text
Use Remote Desktop Commander to list my paired devices and identify the online computer. On that device, check the operating system and relevant tools, including Python and any available Claude Code or Codex CLI installation. Report only the relevant versions and readiness information. Do not print credentials, pairing codes, environment variables, or unrelated files. Reply in English.
```

You should get a device result and actual version checks. A text-only explanation of what the tool could do is not a connection test. If more than one computer is online, name the one you want to use in subsequent prompts.

## 5. Add a coding agent when needed

For direct filesystem, Python, or shell tasks, use the installed tools and continue to the project prompts. For an agent-based implementation, choose either agent below and install it in the environment that runs the remote device agent.

### Claude Code

**Windows PowerShell:**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**macOS / Linux / WSL:**

```sh
curl -fsSL https://claude.ai/install.sh | bash
```

Open a new terminal, check the version, and start Claude Code:

```sh
claude --version
claude
```

Complete its sign-in flow. Use an account with Claude Code access. Then ask a small question such as “Reply with READY only.” A successful answer confirms more than installation alone. [Official Claude Code quickstart](https://code.claude.com/docs/en/quickstart), [advanced setup](https://code.claude.com/docs/en/setup).

### Codex CLI

**Windows PowerShell:**

```powershell
irm https://chatgpt.com/codex/install.ps1 | iex
```

**macOS / Linux:**

```sh
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Open a new terminal:

```sh
codex --version
codex
```

Complete the available sign-in flow, choose a model available to your account, and try a small request. [Official Codex CLI guide](https://learn.chatgpt.com/docs/codex/cli), [official installer locations](https://learn.chatgpt.com/docs/config-file/environment-variables#installer-variables).

**Windows tip:** after installing a CLI, restart the remote device agent so it inherits the updated PATH. Native Windows and WSL are separate environments; tell Chat which one contains the CLI and project.

## 6. Run the Focus Kit project from Chat

Paste this after verifying the connection:

```text
I want a launch page for Focus Kit, a fictional productivity tool for indie developers and designers. Let's discuss the audience, visual direction, main promise, and useful interactions first. Then use Remote Desktop Commander to prepare a fresh project folder, brief.md, tasks.md, v1/, and final/ directly. Keep discussion, preparation, setup, and orchestration here in Chat. Use my available local coding agent for the implementation stage. Include an Editorial/Calm theme switch and a working focus-session panel. Inspect the first version, send focused refinement feedback, verify the result, and return a localhost preview. Use English. Keep changes inside the demo folder and do not publish anything.
```

Open the preview and try the theme switch, session panel, duration selection, Start, Pause, and close behavior. Describe any issue in the same Chat conversation so Chat can direct the next pass.

For separate prompts for each stage, use [the Focus Kit sequence](prompts.md#focus-kit-discuss-prepare-launch-review). To try a task without a coding agent, use [the Python report example](prompts.md#a-result-through-python-without-a-coding-agent).

## 7. Add the reusable skill

The connection is now usable. Follow [skill installation](https://github.com/Tangieff/chat-agent-orchestrator/blob/main/docs/install-skill.md) to package the workflow for repeat use. A skill is a set of instructions; Remote Desktop Commander remains the tool that reaches the computer.

## Troubleshooting

| What you see | What to do |
| --- | --- |
| `node` or `npx` is not recognized | Finish Node.js installation, open a new terminal, and recheck the versions. |
| `npx.ps1` is blocked in PowerShell | Try the existing command wrapper: `npx.cmd @wonderwhy-er/desktop-commander@latest remote`. |
| Device is offline | Re-run the remote agent and keep its terminal open. |
| Pairing codes differ | Cancel pairing and start it again; verify only matching codes. |
| Chat cannot see the connected device | Check both connections use the same account and start a fresh Chat after plugin installation. |
| CLI works in your terminal but not through the device | Restart the remote agent; confirm user account, PATH, and Windows/WSL environment. |
| Agent reports a usage limit | Wait for that account's reset or use an available executor you choose. Reinstalling does not reset allowance. |
| Agent waits without producing a result | Check whether it needs sign-in, an approval, or terminal input. Use its supported non-interactive mode for delegated runs. See [CLI execution](cli-execution.md). |
| Generated preview does not open | Ask Chat to check the server's output, entry point, port, and localhost binding. A localhost URL opens on the device hosting it. |

Pairing and connection troubleshooting: [upstream setup guide](https://github.com/desktop-commander/remote-desktop-commander/blob/main/docs/SETUP.md#troubleshooting). CLI behavior depends on the installed release; use `--help` before choosing flags.

## Stop or revoke the connection

Press **Ctrl+C** in the remote agent terminal when finished. For persistent revocation, open the dashboard and revoke that device. Remote Desktop Commander runs tools with your local account's permissions; directory restrictions are guardrails rather than a full sandbox. [Official security model](https://github.com/desktop-commander/remote-desktop-commander/blob/main/SECURITY.md).

Keep project discussion, structure preparation, routine setup, and launch control in Chat. Direct computer tools can handle these stages without turning each one into a coding-agent request.

Last checked: **October 3, 2026**.
