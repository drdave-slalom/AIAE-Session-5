---
description: "Analyze changes, generate commit message, and push to feature branch"
mode: agent
tools: ['read', 'execute', 'todo']
---

Analyze the current workspace changes, commit them safely, and push only to the specified feature branch.

Branch name: ${input:branch-name:Required feature branch name, for example feature/my-change}

Instructions:

1. Treat the branch name as required. If it is missing, stop and ask for it.
2. If the current step includes required UI workflow, also run `npm run test:ui` or confirm that `/run-ui-tests` succeeded in the current chat before committing.
3. Analyze changes using `git diff` and related Git state as needed.
4. Generate a descriptive conventional commit message using the Git Workflow guidance in [../copilot-instructions.md](../copilot-instructions.md).
5. Create the specified branch if it does not exist with `git checkout -b <branch-name>`.
6. If the branch already exists, switch to it with `git checkout <branch-name>`.
7. Stage all changes with `git add .`.
8. Commit with the generated message.
9. Push to the specified branch with `git push origin <branch-name>`.
10. Do not commit to `main` or any branch other than the user-provided branch name.

Output expectations:

- Show the generated commit message before committing.
- State which branch is being created or used.
- Confirm the push target explicitly.
- Stop immediately if the branch name is missing or resolves to `main`.