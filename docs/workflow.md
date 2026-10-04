# Discuss, prepare, and run the project from Chat

The project is a workflow for ordinary ChatGPT Chat with a connected computer. Keep project discussion, preparation, setup, launch control, and review in Chat. Save coding-agent calls for the implementation stages that benefit from them.

## 1. Discuss the outcome

Describe the project naturally. Agree on the audience, the desired result, constraints, and observable success criteria. Chat holds the conversation and turns your answers into a short brief.

## 2. Prepare the plan and structure

Chat divides the work into meaningful stages and decides what each one should produce. It plans folders, input files, output files, dependencies, and the handoff between stages. Keep this preparation in the same Chat conversation.

## 3. Create the structure and set up the environment

Through Remote Desktop Commander, Chat can create the agreed folder layout, write the brief and task files, inspect relevant tool versions, and run setup commands. Simple preparation can use direct file tools, Python, or shell commands without asking a coding agent to do it.

For an existing repository, Chat first reads its instructions and checks current changes. For a fresh project, it uses a new folder.

## 4. Choose how each stage runs

| Work | A suitable route |
| --- | --- |
| Create folders, briefs, task files, and simple scaffolding | Direct filesystem tools or shell commands |
| Transform a CSV, summarize local data, generate a chart, or prepare a report | Python or another installed runtime |
| Check versions, start a preview, run a known check, or launch a local application | Terminal/process tools |
| Build or refine a substantial code implementation | A local coding agent with a focused brief |
| Operate controls inside an application | Available computer/browser control tools |

Chat chooses the simplest suitable route while respecting the tools and authorization available in the conversation. Opening an application process and operating its interface are different capabilities; it should verify the required control tool before promising interface actions.

## 5. Coordinate the work

Chat launches the selected executor, follows its actual process, reads the resulting files, and decides what should happen next. It keeps the project context and your feedback in one conversation. When something needs improvement, it sends a precise refinement brief rather than restarting the whole discussion.

## 6. Deliver a checked result

Chat checks the behavior that matters to the agreed brief and returns the finished artifact or local preview. Its report identifies the real execution route, the meaningful checks, and any unresolved issue.

## Where the limit saving comes from

Discussion, planning, folder preparation, routine setup, launch control, and review do not have to become separate coding-agent requests. Chat can handle these stages through its connected tools, then hand a bounded implementation task to a coding agent when needed. Suitable projects can also be completed with direct Python or shell work.

This is the central idea: **keep orchestration in Chat; use the right executor for each stage.**

Try the [Focus Kit brief](../skills/chat-agent-orchestrator/references/prompts.md#focus-kit-discuss-prepare-launch-review) or the [Python-only example](../skills/chat-agent-orchestrator/references/prompts.md#a-result-through-python-without-a-coding-agent).
