# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the **dev-team** Claude Code skill — a development team simulation framework that orchestrates 11 specialist roles to analyze, plan, research, design, implement, review, test, debug, and deliver software tasks. It is not a traditional software project; there is no build system, package manager, or compiled output.

## Structure

- `.claude/skills/dev-team/SKILL.md` — Master skill definition and execution protocol (4 phases)
- `.claude/skills/dev-team/resources/protocols.md` — Formatting conventions, checkpoint formats, handoff syntax, severity classification
- `.claude/skills/dev-team/resources/review-criteria.md` — 40 predefined architecture/design review criteria (7 categories) plus task-specific criteria generation framework
- `.claude/skills/dev-team/resources/roles/` — 11 role definition files, each with persona, responsibilities, tool access, and output format
- `.claude/skills/dev-team/resources/state-template.md` — Template for session state persistence file

## Execution Pipeline

The skill runs a strict 4-phase pipeline triggered by a user's handover document:

1. **Manager Intake** — Task assessment, team assembly, CHECKPOINT 1 (requires user approval)
2. **Planning & Research** — Planner creates sprints; Web Researcher and Codebase Researcher run in parallel; Planner revises into ULTIMATE PLAN; CHECKPOINT 2 (requires user approval)
3. **Sprint Execution Loop** (per sprint) — Architect designs → dual Reviewers score (80-point quality gate, ≥64 to pass, max 3 attempts) → Senior Dev implements core → 1-6 Junior Devs implement in parallel (scaled to task needs) → Senior Dev reviews/fixes → Tester runs tests → Debugger loop if needed (max 3 cycles) → CHECKPOINT 3 (requires user approval)
4. **Final Delivery** — Manager compiles summary of all work

## Key Constraints When Editing

- Roles must not bleed into each other; each speaks only within their section using the header format from `protocols.md`
- Checkpoints are mandatory pause points — never remove or make them skippable
- Quality gate threshold is 80% (64/80 combined reviewer score) — this is non-negotiable
- Severity routing: CRITICAL fixes go through Senior Dev before Tester; NON-CRITICAL go directly to Tester
- Junior Devs must run in parallel, not sequentially
- Researchers must use real tools (WebSearch, Grep, Glob, Read, Bash), never simulated output
- Session state file (`.dev-team/session-state.md`) must be updated at every **State:** marker in the execution protocol
- The `.dev-team/` directory is a runtime artifact (created in the user's project root), not part of the skill definition

## Permissions

`.claude/settings.local.json` allows `WebFetch` from `raw.githubusercontent.com` only.
