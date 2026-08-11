---
description: "Run UI tests and summarize failures"
mode: agent
agent: test-engineer
tools: ['read', 'execute', 'todo']
---

Run the workspace UI tests and summarize the results with clear failure classification.

Instructions:

1. Required first step before running UI tests: run `npm run test:ui:install --workspace=frontend`.
2. In Ubuntu or Linux environments, `test:ui:install` is mandatory and must perform `playwright install --with-deps chromium` before running tests.
3. `test:ui:install` includes automatic bounded Ubuntu repository remediation for the common Yarn key issue, plus one retry.
4. Do not perform ad hoc package hunting or broad OS troubleshooting beyond that automated remediation.
5. If install still fails, stop immediately and report an environment blocker with the failing command and key error lines.
6. Do not continue to Playwright execution after a failed dependency install.
7. Ensure both backend and frontend are running before executing UI tests. Start from the repo root with `npm start` if needed.
8. Run the UI tests using the project command.
9. Summarize pass and fail results clearly.
10. For failures, classify the likely root cause as application code, test code, or environment.

Output expectations:

- Show whether dependency installation succeeded.
- State how the app processes were started or verified.
- Summarize passing and failing tests separately.
- Provide likely root cause categories for each failure cluster.