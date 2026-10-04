# Chat coordinates: the Focus Kit demonstration

[Watch the 45-second video](../videos/chat-coordinates.mp4).

The conversation established a fictional product, audience, design direction, and useful interactions. Chat turned the discussion into a plan, orchestrated a local Claude Code implementation, reviewed the real files, and sent a focused refinement brief. Claude used Sonnet for both implementation passes; Chat held the coordination and review.

## Follow the workflow

1. **Discuss:** agree on a calm productivity page for independent developers and designers.
2. **Plan:** define the visual direction, theme switch, and working focus-session panel.
3. **Launch:** hand a bounded implementation brief to the local agent.
4. **Review:** inspect actual files and compare them with the brief.
5. **Refine:** send concrete feedback and preserve a final version separately.
6. **Deliver:** verify the interactions and return a working local preview.

Use the [Focus Kit prompts](../skills/chat-agent-orchestrator/references/prompts.md#focus-kit-discuss-prepare-launch-review) to try this pattern on your own computer. The broader workflow also supports preparation and suitable execution directly through Python or shell tools; those routes are described in the [workflow guide](workflow.md).

## Compare the actual result

Explore [`v1`](../examples/focus-kit/v1) and [`final`](../examples/focus-kit/final):

| Area | First pass | Final refinement |
| --- | --- | --- |
| Duration keyboard controls | Arrow-key selection | Home/End navigation and correct initial radio focus |
| Dialog | Initial modal behavior | Stronger focus containment and restored scroll state |
| Timer | Absolute deadline already present | Immediate refresh when the tab becomes visible |
| Theme control | Switch worked | Clearer dynamic accessible labels |
| Copy | Invented field-notes attribution | Straightforward product principle |

Browser checks exercised the theme switch, session panel, duration selection, countdown start, pause/resume, and close/focus return. Responsive styling was inspected in code.

The video condenses a completed run. Supporting [screenshots](../media/screenshots) show the discussion, delegation, review, and result. Waiting periods are shortened; this is a demonstration of the workflow rather than a continuous recording.
