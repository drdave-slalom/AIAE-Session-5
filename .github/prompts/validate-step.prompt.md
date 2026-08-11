---
description: "Validate that all success criteria for the current step are met"
mode: agent
agent: code-reviewer
tools: ['search', 'read', 'execute', 'web', 'todo']
---

Validate whether a specific step is complete against its GitHub Issue success criteria.

Step number: ${input:step-number:Required step number, for example 5-0 or 5-1}

Instructions:

1. Treat the step number as required.
2. Use GitHub CLI workflow utilities from [../copilot-instructions.md](../copilot-instructions.md) to find the main exercise issue.
3. Get the issue with comments.
4. Search through the issue content to find `# Step {step-number}:`.
5. Extract the `Success Criteria` section for that step.
6. Check each criterion against the current workspace state.
7. Report completion status with specific guidance for any incomplete items.

Output expectations:

- List each success criterion individually.
- Mark each item as complete or incomplete.
- Cite the current workspace evidence used for the decision.
- End with concrete next actions for anything still missing.