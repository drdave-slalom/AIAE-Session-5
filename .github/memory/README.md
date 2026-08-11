# Development Memory System

## Purpose

This directory provides a structured memory system for tracking development patterns, decisions, and lessons learned while working on this TODO application.

Use it to capture:

- recurring implementation patterns
- debugging discoveries
- decisions made during TDD cycles
- lessons from linting and integration work
- session outcomes worth preserving for future contributors or AI-assisted sessions

## Two Types of Memory

### Persistent Memory

Persistent memory lives in [../copilot-instructions.md](../copilot-instructions.md).

It captures foundational guidance that should stay stable across sessions, such as:

- project context
- testing strategy
- workflow rules
- agent usage boundaries

Use persistent memory for rules and principles that should shape almost every future interaction.

### Working Memory

Working memory lives in this directory, [.github/memory](./).

It captures discoveries made while actively developing, such as:

- what a failing test revealed
- why a bug happened
- patterns that emerged in implementation
- session-specific conclusions that should be preserved

Use working memory for evidence, patterns, and historical notes that evolve over time.

## Directory Structure

- [session-notes.md](./session-notes.md): Historical summaries of completed sessions that should be committed to git
- [patterns-discovered.md](./patterns-discovered.md): Accumulated code and workflow patterns that should be committed to git
- [scratch/working-notes.md](./scratch/working-notes.md): Active session notes for in-progress work
- [scratch/.gitignore](./scratch/.gitignore): Keeps scratch files out of normal version control workflows

## What Each File Is For

### session-notes.md

Use this file after a session is complete.

Record:

- what work was finished
- important findings that affected the implementation
- decisions that changed future work
- concrete outcomes and remaining follow-ups

This file is a committed historical record. It should describe completed work, not stream-of-consciousness investigation.

### patterns-discovered.md

Use this file whenever a pattern becomes reusable or worth remembering.

Examples:

- a reliable service initialization rule
- a preferred API validation pattern
- a testing pattern that prevents regressions
- a debugging heuristic that consistently helps in this codebase

This file should accumulate durable learnings over time.

### scratch/working-notes.md

Use this file during active work.

Capture:

- the current task
- working hypotheses
- findings from failing tests or runtime errors
- temporary decisions and blockers
- next steps before context is lost

At the end of the session, summarize the durable parts into [session-notes.md](./session-notes.md) and, if applicable, [patterns-discovered.md](./patterns-discovered.md).

This file is for active work and should stay ephemeral.

## When To Use These Files In Common Workflows

### During TDD

- Start in [scratch/working-notes.md](./scratch/working-notes.md) with the failing test, current hypothesis, and the smallest next change
- If the session produces a reusable testing or implementation pattern, promote it into [patterns-discovered.md](./patterns-discovered.md)
- When the cycle is complete, summarize the outcome in [session-notes.md](./session-notes.md)

### During Linting

- Track categories of lint failures and fix strategy in [scratch/working-notes.md](./scratch/working-notes.md)
- If a repeatable cleanup pattern emerges, document it in [patterns-discovered.md](./patterns-discovered.md)
- Record completed cleanup sessions and their impact in [session-notes.md](./session-notes.md)

### During Debugging

- Capture symptoms, hypotheses, checks, and results in [scratch/working-notes.md](./scratch/working-notes.md)
- If the debugging process exposes a stable architectural lesson, add it to [patterns-discovered.md](./patterns-discovered.md)
- Preserve the final diagnosis and resolution in [session-notes.md](./session-notes.md)

## How AI Uses This Memory System

When these files are maintained, AI can use them to produce more context-aware suggestions.

- [../copilot-instructions.md](../copilot-instructions.md) provides baseline rules and workflow expectations
- [session-notes.md](./session-notes.md) provides historical context about what was already tried and what succeeded
- [patterns-discovered.md](./patterns-discovered.md) provides reusable implementation and debugging guidance
- [scratch/working-notes.md](./scratch/working-notes.md) preserves current-session context so work can resume without re-deriving everything

The practical effect is less repeated investigation, better continuity across sessions, and more suggestions that match how this repository actually evolves.

## Commit Boundary

- [session-notes.md](./session-notes.md) is for completed session summaries and should be committed
- [patterns-discovered.md](./patterns-discovered.md) is for durable patterns and should be committed
- [scratch/working-notes.md](./scratch/working-notes.md) is for active work and should not be treated as durable history

Use the scratch area to think. Use the committed files to preserve what future work should remember.