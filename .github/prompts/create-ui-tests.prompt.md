---
description: "Create UI tests for required critical user journeys"
mode: agent
agent: test-engineer
tools: ['search', 'read', 'edit', 'execute', 'todo']
---

Create or update Playwright UI tests for critical user journeys in this workspace.

Journeys: ${input:journeys:Optional journey list; leave blank to use the default set}

Instructions:

1. If journeys are blank, use this default set: create, edit, toggle, delete, and core error-state handling.
2. Create a maximum of 5 Playwright tests for this run, targeting 3 to 5 total.
3. Include at least 1 error-path test within that total.
4. If more than 5 candidate scenarios exist, select the highest-risk 5 and list deferred scenarios instead of creating more tests.
5. Generate or update UI tests using the project UI test framework.
6. Prefer stable selectors and state-based waits.
7. Apply Page Object Model best practices:
   - put reusable interactions and selectors in page objects or helpers
   - keep spec files focused on scenario intent and assertions
   - avoid duplicating selectors and interaction flows across tests
8. Before finishing, verify the total number of created or updated Playwright test cases declared with `test(...)` or `it(...)` and reduce to 5 or fewer if over the limit.
9. Do not claim the scope is small if the final authored test count is greater than 5.
10. Report the files changed and the scenarios covered.

Output expectations:

- State the journeys selected for this run.
- Report the final Playwright test count.
- List any deferred scenarios explicitly.
- Summarize the page objects or helpers added or updated.