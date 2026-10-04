# Use the skill

The project ships one reusable workflow under [`skills/chat-agent-orchestrator/`](../skills/chat-agent-orchestrator), plus a portable [`plugin.json`](../plugin.json). Connect Remote Desktop Commander first using the [full setup guide](../skills/chat-agent-orchestrator/references/remote-setup.md).

## Start in Chat immediately

Use the [prompt pack](../skills/chat-agent-orchestrator/references/prompts.md) directly in ordinary Chat. This is the simplest way to try the workflow before installing a reusable package.

To reuse its exact instructions in a Chat session, download [`SKILL.md`](../skills/chat-agent-orchestrator/SKILL.md) and the reference files from this repository, attach them, and say:

> Use the attached Chat Agent Orchestrator instructions for this project. Remote Desktop Commander is already connected. Discuss the brief with me, prepare the structure directly, choose direct Python/shell work or a local agent for each stage, coordinate execution, and verify the result.

This loads instructions for the conversation. It does not create an installed skill entry.

## Make it an installable Chat workflow

Chat uses plugin-bundled skills for installable distribution. Where Plugin Creator is available, open a new Chat, select **Plugin Creator** from the `@` menu, attach the skill folder's files, and use this brief:

```text
Create a reusable plugin named Chat Agent Orchestrator from these supplied instructions and references. Keep their workflow intact. It keeps project discussion, preparation, setup, launch control, and review in Chat through my existing Remote Desktop Commander connection. Use direct computer tools for suitable work and coding agents only for the stages that need them. Keep that connection separate; do not create a new server or automatic device access. Include the skill, make it available for installation in my supported client, and help me test it with a fresh bounded demo task.
```

Review the generated package, install it when offered, start a new Chat, and select it with `@`. Availability and sharing depend on your workspace. [Official Plugin Creator guide](https://learn.chatgpt.com/docs/build-plugins), [skills and distribution](https://learn.chatgpt.com/docs/build-skills).

For a team workspace, an administrator can import a repository marketplace according to [official plugin management](https://learn.chatgpt.com/docs/enterprise/plugin-management). This repository's root portable manifest is the package; a marketplace entry must point to it using the schema supported by that distribution route.

**GitHub source publication is separate from public plugin directory publication.** This project does not claim a public catalog install button. [Official packaging guide](https://developers.openai.com/plugins/build/plugins).

## Install as a local Codex skill

In Codex with Skill Installer available:

```text
Use $skill-installer to install the skill from https://github.com/Tangieff/chat-agent-orchestrator at path skills/chat-agent-orchestrator.
```

Alternatively, copy the complete `chat-agent-orchestrator` skill folder into a supported local skill directory, such as your repository's `.agents/skills/`. The folder must contain `SKILL.md`, `agents/`, and `references/`. Invoke it with `$chat-agent-orchestrator`. If it does not appear, restart the client. [Official local skill discovery](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills).

Installing it locally in Codex demonstrates portability; the demonstrated coordination workflow takes place in ordinary ChatGPT Chat.

## Verify your installation

Try a fresh small project and confirm the skill:

1. Keeps discussion and project preparation in Chat.
2. Creates the agreed structure directly on the connected computer.
3. Chooses direct tools or the requested agent appropriately for each stage.
4. Tracks actual runs, reviews real files, and reports checks accurately.
5. Returns a working artifact or explains a concrete unresolved blocker.
