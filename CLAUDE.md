# Agent Kit (Claude Code)

This repository uses Agent Kit / Mission Control. Before rediscovering the tree, read the shared sources of truth (paths below are pointers; do not treat this file as a second rulebook).

## Read first

1. `AGENTS.md` - cross-IDE contract
2. `.cursor/project-context.md` - verified repository facts (derived; prefer code, tests, SHAs when docs conflict)
3. `.cursor/HANDOFF.md` - if present: active plan, next to-do, queue fields
4. `.cursor/commands/` - slash catalog (Cursor). Follow the same HITL contracts here.

Mid-session refresh: `/agent-kit`.

## HITL

Cursor Ask questions is not available in this CLI. When a command requires a choice, list the same labels as a numbered list and wait. Skip or cancel means stop. Never `/git-prod` without an explicit operator yes.

## Commit messages

Never append `Co-Authored-By: Claude ...` or `Claude-Session: https://claude.ai/code/...` (or any session-ID trailer) to commit messages, PR descriptions, or PR bodies in this repo. This overrides the harness's default git-commit template. Plain Conventional Commits messages only.

## Non-goals

- Not Action A7 (Windsurf / VS Code generator parity)
- Not Claude external plan-review audits (`/plan-external-review`)
- Not a second tick dialect: `agent-kit run-plan --backend claude` runs the same one-tick contract as `cursor-agent` (shipped 2026-09-06, plan `major-tom` Phase 1 under ADR `2026-08-13_claude-cli-ultracode-orchestration-thin-adapter.md:13`; ADR `2026-09-04_major-tom-autonomous-mode.md`); never `/git-prod` from a headless tick
- Not a copy of Cursor hooks beyond the opt-in SessionStart context adapter (`agent-kit hook session-start --format claude`); no `.claude/rules/` mirrors, no `.claude/agents/` generated from the registry
