# Copilot Instructions

## Project Context

- Full-stack TODO application with React frontend and Express backend
- Focus on iterative, feedback-driven development
- Current phase: Backend stabilization and frontend feature completion

## Documentation References

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and repository structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns, TDD expectations, and testing standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Iterative development workflow guidance

## Development Principles

- Test-Driven Development: Follow the Red-Green-Refactor cycle
- Incremental Changes: Prefer small, testable modifications over broad rewrites
- Systematic Debugging: Use failing tests, lint output, and runtime behavior to guide the next step
- Validation Before Commit: Ensure relevant tests pass and lint is clean before committing

## Testing Scope

This project uses unit tests, integration tests, and UI end-to-end tests to balance fast feedback with confidence in critical user journeys.

- Backend: Jest + Supertest for API testing
- Frontend: React Testing Library for component unit and integration tests
- UI testing: Playwright for critical user journey automation
- Manual browser testing for exploratory validation and visual checks
- Reason: Combine fast feedback from unit and integration tests with end-to-end quality confidence from UI testing

**Testing Approach by Context**

- Backend API changes: Write Jest tests first, then implement the API behavior to satisfy the failing test
- Frontend component features: Write React Testing Library tests first for component behavior, then implement the feature; follow with manual browser testing for complete UI flow validation
- This is true TDD: write the test first, then write the minimum code needed to make it pass

## Workflow Patterns

1. TDD Workflow: Write or fix tests, run them, confirm failure, implement the smallest change, rerun until passing, then refactor safely
2. Code Quality Workflow: Run lint, categorize issues, fix them systematically, and re-validate after each set of changes
3. Integration Workflow: Identify the issue, debug the affected path, add or run tests, apply a focused fix, and verify the full behavior end-to-end
4. UI Testing Workflow: Define critical journeys, create Playwright coverage, run tests, debug failures, and confirm the intended journeys are protected

## Agent Usage

- `tdd-developer`: Use for implementation work and unit or integration TDD cycles; do not create or run Playwright UI tests in this mode
- `code-reviewer`: Use for lint cleanup, code quality improvements, and systematic issue resolution after behavior is working
- `test-engineer`: Use for all Playwright UI test authoring, execution, failure triage, and isolation checks

## Memory System

- Persistent Memory: This file (.github/copilot-instructions.md) contains foundational principles and workflows
- Working Memory: .github/memory/ directory contains discoveries and patterns
- During active development, take notes in .github/memory/scratch/working-notes.md (not committed)
- At end of session, summarize key findings into .github/memory/session-notes.md (committed)
- Document recurring code patterns in .github/memory/patterns-discovered.md (committed)
- Reference these files when providing context-aware suggestions

## Workflow Utilities

Use GitHub CLI commands for workflow automation in any mode, especially when `/execute-step` or `/validate-step` prompts are invoked.

- List open issues: `gh issue list --state open`
- Get issue details: `gh issue view <issue-number>`
- Get issue with comments: `gh issue view <issue-number> --comments`
- The main exercise issue will have `Exercise:` in the title
- Steps are posted as comments on the main issue

## Git Workflow

- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, and similar prefixes
- Create feature branches with the format: `feature/<descriptive-name>`
- Stage all changes before committing: `git add .`
- Push to the correct branch: `git push origin <branch-name>`