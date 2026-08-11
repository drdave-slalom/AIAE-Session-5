---
description: "Execute instructions from the current GitHub Issue step"
mode: agent
agent: tdd-developer
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

Execute the current GitHub Issue step for this workspace.

Issue number: ${input:issue-number:Issue number (optional; leave blank to auto-discover the exercise issue)}

Instructions:

1. If the issue number is blank, use GitHub CLI workflow utilities from [../copilot-instructions.md](../copilot-instructions.md) to find the main exercise issue.
2. Get the issue content with comments.
3. Parse the latest step instructions from the issue.
4. Execute each `:keyboard: Activity:` section systematically.
5. Follow the `tdd-developer` workflow strictly for implementation work.
6. Scope boundary: do not create or run Playwright UI tests in this prompt.
7. Handoff rule: use `/create-ui-tests` and `/run-ui-tests` for Playwright UI work.
8. Do not commit or push changes. That is the job of `/commit-and-push`.
9. Stop after completing the activities and provide the next commands in this order:
   - If the current step requires UI workflow: `/create-ui-tests` -> `/run-ui-tests` -> `/validate-step {step-number}`
   - If UI workflow is not required: `/validate-step {step-number}`
   - Never recommend `/validate-step` before required UI prompts.
10. Follow the testing scope constraints in [../copilot-instructions.md](../copilot-instructions.md).

Output expectations:

- Summarize the step being executed.
- Show which activities were completed.
- Note any blockers or missing context.
- End with the exact next slash command sequence that should be run.