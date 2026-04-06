# skill-dev-team

A Claude Code skill that simulates a **full software development team** with 11 specialist roles. Give it a task, and a structured team of Manager, Planner, Researchers, Architect, Reviewers, Senior Dev, Junior Devs, Tester, and Debugger handles it end-to-end — with quality gates, checkpoints, and user approval at every stage.

## What It Does

You provide a handover document describing what you want built. The skill runs a **4-phase pipeline**:

1. **Manager Intake** — Reads your requirements, assesses complexity, flags production risk, loads lessons from previous sessions, and presents a plan for your approval.
2. **Planning & Research** — Planner breaks work into sprints. Web Researcher finds best practices (15-30 sources, cited). Codebase Researcher maps your existing code with relevance scoring. Planner produces the Ultimate Plan with cold-start capable sprints.
3. **Sprint Execution** — Per sprint:
   - Architect designs the system
   - Dual reviewers score the architecture (80-point quality gate, must pass 80%)
   - Senior Dev implements core functionality
   - 1-6 Junior Devs implement dependent tasks in parallel
   - Senior Dev reviews and fixes all code
   - Dual code reviewers score implementation (40-point quality gate, must pass 80%)
   - Tester runs 6-step verification loop (Build → Type Check → Lint → Tests → Security Scan → Diff Review) with TDD enforcement
   - Live app testing validates the running application
   - Debugger fixes failures (max 3 cycles)
   - You approve each sprint before the next begins
4. **Final Delivery** — Manager reviews all work, verifies requirements are met, extracts lessons learned for future sessions.

Every phase pauses at **checkpoints** for your approval. Nothing proceeds without your say.

## Team Roster

| Role | Name | What They Do |
|---|---|---|
| Manager | Alex Rivera | Orchestrates the pipeline, handles checkpoints and escalations |
| Planner | Dana Park | Breaks tasks into cold-start capable sprints with context briefs |
| Web Researcher | Robin Torres | Deep research methodology: 15-30 sources, citations, fact/inference separation |
| Codebase Researcher | Sam Nguyen | Iterative retrieval with relevance scoring (0-1), tech stack detection |
| Architect | Sofia Chen | System design with component diagrams and interface definitions |
| Architect Reviewer | Raj Mehta | Scores architecture against 80 criteria (spawned with Opus) |
| Design Reviewer | Li Wei | Scores design against 80 criteria (spawned with Opus) |
| Senior Dev | Marcus Johnson | Implements core code, reviews Junior Dev work, gatekeeps configs and secrets |
| Junior Devs | JD-1 to JD-6 | Implement dependent tasks in parallel (spawned with Haiku) |
| Tester | Jordan Kim | 6-step verification loop, TDD enforcement, live app testing |
| Debugger | Casey Morgan | Root cause analysis, minimal fixes, severity-based routing |

## Installation

### Option A: npx (recommended)

```bash
npx skill-dev-team install
```

This copies the skill into your project's `.claude/skills/dev-team/` and sets up permissions.

To remove:
```bash
npx skill-dev-team uninstall
```

### Option B: Manual

1. Clone this repo
2. Copy `.claude/skills/dev-team/` into your project's `.claude/skills/` directory
3. Add to your project's `.claude/settings.local.json`:
```json
{
  "permissions": {
    "allow": [
      "WebFetch(domain:raw.githubusercontent.com)"
    ]
  }
}
```

## Usage

1. Open Claude Code in your project
2. Type `/dev-team`
3. Provide a handover document describing what you want built
4. Follow the checkpoints — approve, modify, or reject at each stage

### Handover Document Tips

The handover document is your requirements spec. It can be:
- A detailed spec with sprints already defined (the team will validate them)
- A rough outline with milestones (the team will expand them)
- Just a description of what you want (the team will plan everything)

### Model Recommendations

Run your Claude Code session on **Sonnet or higher**. The Senior Dev, Tester, and other main-thread roles inherit your session model. Architecture reviewers automatically use Opus, and Junior Devs use Haiku for cost efficiency.

## Folder Structure

```
.claude/skills/dev-team/
├── SKILL.md                          # Master skill definition and execution protocol
└── resources/
    ├── protocols.md                  # Formatting conventions, checkpoint formats
    ├── review-criteria.md            # 40 predefined architecture review criteria
    ├── code-review-criteria.md       # 20 predefined code quality review criteria
    ├── safety-guard.md               # Destructive command blocking, production risk levels
    ├── state-template.md             # Template for session state persistence
    └── roles/
        ├── manager.md                # Alex Rivera — orchestration and checkpoints
        ├── planner.md                # Dana Park — sprint planning, cold-start design
        ├── web-researcher.md         # Robin Torres — deep research methodology
        ├── codebase-researcher.md    # Sam Nguyen — iterative retrieval, tech stack detection
        ├── architect.md              # Sofia Chen — system design
        ├── system-architect-reviewer.md  # Raj Mehta — architecture scoring
        ├── system-design-reviewer.md     # Li Wei — design scoring
        ├── senior-developer.md       # Marcus Johnson — core implementation, code review
        ├── junior-developer.md       # JD-1 to JD-6 — parallel implementation
        ├── tester.md                 # Jordan Kim — verification loop, TDD, live app testing
        └── debugger.md              # Casey Morgan — diagnosis and fixes
```

### Runtime Artifacts

When the skill runs, it creates a `.dev-team/` directory in your project root:

```
.dev-team/
├── session-state.md       # Tracks progress, enables resume across sessions
└── lessons-learned.md     # Accumulates insights across sessions (never deleted)
```

## Key Features

### Dual Quality Gates
- **Architecture Gate** (Phase 3b): Two Opus reviewers score against 80 criteria each. Must pass 80% (64/80). Max 3 attempts.
- **Code Quality Gate** (Phase 3e.5): Two reviewers score against 40 criteria each. Must pass 80% (32/40). Max 3 attempts.

### 6-Step Verification Loop
The Tester runs Build → Type Check → Lint → Tests → Security Scan → Diff Review on every sprint. Each step produces PASS/FAIL/SKIPPED with severity classification.

### TDD Enforcement
Unit and integration tests are RED-verified — the Tester confirms each test CAN fail before trusting it passes. Invalid tests are rewritten.

### Live App Testing
After tests pass, the Tester starts the built application and tests it from a user's perspective. Supports frontend apps, fullstack apps, APIs, CLIs, and AI agents. Skipped for libraries and refactors.

### Safety Guard
Blocks destructive commands (rm -rf, force push, DROP TABLE, etc.) across all roles. Protects linter/formatter configs from Junior Dev edits. Detects hardcoded secrets. Production risk is assessed and displayed at Checkpoint 1.

### Session Learning
After delivery, the Manager extracts lessons learned (quality gate patterns, project conventions, debug patterns, what worked/didn't). These persist across sessions — the next run loads them automatically.

### Context Management
Strategic compaction points between phases and sprints prevent context exhaustion on large tasks. Cold-start sprint design ensures each sprint is self-contained and executable after compaction.

### Session Resumption
If a session is interrupted, the skill detects the existing state file on startup and offers to resume from where it left off. All progress, retry counters, and checkpoint approvals are preserved.

## Pipeline Options

| Pipeline | When | What's Skipped |
|---|---|---|
| **FULL** | New features, refactors, complex changes | Nothing |
| **LIGHT** | Bug fixes, simple tasks | Architecture design (3a) and Architecture Quality Gate (3b) |

The Manager selects the pipeline at Checkpoint 1. You approve it.

## License

MIT
