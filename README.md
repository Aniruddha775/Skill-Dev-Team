# skill-dev-team

A Claude Code skill that simulates a **full software development team** with 11 specialist roles. Give it a task, and a structured team of Manager, Planner, Researchers, Architect, Reviewers, Senior Dev, Junior Devs, Tester, and Debugger handles it end-to-end — with quality gates, checkpoints, and user approval at every stage.

## What's New in v2.1

### Token Architecture Overhaul
- **Lazy role loading** — only `protocols.md` and `safety-guard.md` load upfront. All 10 role files and review criteria load on-demand per execution step. Upfront token usage dropped from ~25,600 to ~9,600 (~62% reduction).
- **Compressed protocols** — merged redundant quality gate and checkpoint formats. 257 → 168 lines.
- **Merged architecture reviewers** — `system-architect-reviewer.md` and `system-design-reviewer.md` combined into a single `architecture-reviewer.md` with Structural/Design lens parameter.

### Quality & Discipline Improvements
- **Anti-rationalization defenses** — hardened instructions in 5 roles prevent skipping steps ("the design is simple", "tests obviously work", "the fix is obvious").
- **Anti-sycophancy in reviewers** — strict scoring discipline: lead with the worst issue, never soften criticism, prefer FAIL when in doubt.
- **Two-stage code review** — Stage A: Senior Dev spec compliance self-check (catches spec misses before burning reviewer tokens). Stage B: dual code quality gate (unchanged scoring).
- **Anti-drift guards** — 1 guard per role prevents scope creep (max 8 components, max 200 lines per JD, max 6 deliverables per sprint, no out-of-scope fixes, max 30 research sources).

### New Pipeline Options
- **SECURITY** — FULL pipeline + Tester adds expanded security checks (threat modeling, auth bypass, input fuzzing).
- **INVESTIGATION** — Research-only pipeline. Phase 1 + Phase 2 only, no implementation.

### Smarter Execution
- **Dynamic JD scaling** — 0-6 Junior Devs based on actual work: 0 for single-file changes, 1-2 for small modules, 5-6 for large features. Never spawns a JD for <20 lines.
- **Rollback protocol** — when quality gates exhaust max retries, 4 structured options: Override (accept with documented weaknesses), Redesign, Descope, or Pause.
- **Specialized review lenses** — Code Reviewer 1 focuses on correctness/security, Reviewer 2 on quality/patterns.
- **Context packages for Junior Devs** — explicit files, decisions, and tech constraints per assignment instead of vague dependency lists.

### Conditional Enhancements
- **Accessibility criteria** — 4 additional predefined criteria (Semantic HTML, ARIA, Keyboard Nav, Color Contrast) automatically added when frontend framework detected. Threshold adjusts to ≥36/44.
- **Confidence scoring** — Web Researcher reports findings with 0-1 numeric confidence instead of separate fact/inference sections.
- **Structured lessons** — tag-based taxonomy (QG/BUG/FW/TEST/ARCH/RES) with filtered loading. Manager loads only tag-matching lessons at Phase 1.
- **Self-testing protocol** — development-time doc for pressure-testing role definitions. Zero runtime cost.

---

## What It Does

You provide a handover document describing what you want built. The skill runs a **4-phase pipeline**:

1. **Manager Intake** — Reads your requirements, assesses complexity, flags production risk, loads lessons from previous sessions, and presents a plan for your approval.
2. **Planning & Research** — Planner breaks work into sprints. Web Researcher finds best practices (15-30 sources, confidence-scored). Codebase Researcher maps your existing code with relevance scoring. Planner produces the Ultimate Plan with cold-start capable sprints.
3. **Sprint Execution** — Per sprint:
   - Architect designs the system
   - Dual reviewers score the architecture (80-point quality gate, must pass 80%)
   - Senior Dev implements core functionality
   - 0-6 Junior Devs implement dependent tasks in parallel (scaled to actual work)
   - Senior Dev reviews and fixes all code
   - Senior Dev self-checks spec compliance (Stage A)
   - Dual code reviewers score implementation (40-point quality gate, must pass 80%) (Stage B)
   - Tester runs 6-step verification loop (Build → Type Check → Lint → Tests → Security Scan → Diff Review) with TDD enforcement
   - Live app testing validates the running application
   - Debugger fixes failures (max 3 cycles)
   - You approve each sprint before the next begins
4. **Final Delivery** — Manager reviews all work, verifies requirements are met, extracts structured lessons for future sessions.

Every phase pauses at **checkpoints** for your approval. Nothing proceeds without your say.

## Team Roster

| Role | Name | What They Do |
|---|---|---|
| Manager | Alex Rivera | Orchestrates the pipeline, handles checkpoints and escalations |
| Planner | Dana Park | Breaks tasks into cold-start capable sprints with context briefs |
| Web Researcher | Robin Torres | Deep research: 15-30 sources, confidence scoring (0-1), cited findings |
| Codebase Researcher | Sam Nguyen | Iterative retrieval with relevance scoring (0-1), tech stack detection |
| Architect | Sofia Chen | System design with component diagrams and interface definitions |
| Architecture Reviewer (Structural) | Raj Mehta | Scores architecture against 80 criteria — structural lens (spawned with Opus) |
| Architecture Reviewer (Design) | Li Wei | Scores architecture against 80 criteria — design lens (spawned with Opus) |
| Senior Dev | Marcus Johnson | Implements core code, reviews Junior Dev work, gatekeeps configs and secrets |
| Junior Devs | JD-1 to JD-6 | Implement dependent tasks in parallel (spawned with Haiku, 0-6 per scaling rules) |
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
    ├── protocols.md                  # Formatting conventions, checkpoint formats (always loaded)
    ├── safety-guard.md               # Destructive command blocking, production risk (always loaded)
    ├── review-criteria.md            # 40 predefined architecture review criteria (loaded at 3b)
    ├── code-review-criteria.md       # 18 predefined code quality criteria (loaded at 3e.5)
    ├── state-template.md             # Template for session state persistence (loaded at Phase 1)
    ├── self-testing-protocol.md      # Dev-time role testing — NOT loaded at runtime
    └── roles/                        # 10 role files — loaded on-demand per execution step
        ├── manager.md                # Alex Rivera — orchestration and checkpoints
        ├── planner.md                # Dana Park — sprint planning, cold-start design
        ├── web-researcher.md         # Robin Torres — deep research, confidence scoring
        ├── codebase-researcher.md    # Sam Nguyen — iterative retrieval, tech stack detection
        ├── architect.md              # Sofia Chen — system design
        ├── architecture-reviewer.md  # Raj Mehta + Li Wei — dual lens (structural/design)
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
└── lessons-learned.md     # Tag-based lessons taxonomy, never deleted on restart
```

## Key Features

### Lazy Role Loading
Only protocols and safety guard load upfront (~9,600 tokens). Role definitions, review criteria, and state template load on-demand at each execution step, freeing context for actual work.

### Dual Quality Gates
- **Architecture Gate** (Phase 3b): Two Opus reviewers score against 80 criteria each with specialized lenses (structural vs design). Must pass 80% (64/80). Max 3 attempts with rollback options.
- **Code Quality Gate** (Phase 3e.5): Two-stage — Senior Dev self-checks spec compliance (Stage A), then two reviewers score against 40 criteria each with specialized lenses (correctness/security vs quality/patterns). Must pass 80% (32/40). Max 3 attempts with rollback options.

### 6-Step Verification Loop
The Tester runs Build → Type Check → Lint → Tests → Security Scan → Diff Review on every sprint. Each step produces PASS/FAIL/SKIPPED with severity classification. SECURITY pipeline adds expanded threat modeling.

### TDD Enforcement
Unit and integration tests are RED-verified — the Tester confirms each test CAN fail before trusting it passes. Invalid tests are rewritten.

### Live App Testing
After tests pass, the Tester starts the built application and tests it from a user's perspective. Supports frontend apps, fullstack apps, APIs, CLIs, and AI agents. Skipped for libraries and refactors.

### Safety Guard
Blocks destructive commands (rm -rf, force push, DROP TABLE, etc.) across all roles. Protects linter/formatter configs from Junior Dev edits. Detects hardcoded secrets. Production risk is assessed and displayed at Checkpoint 1.

### Session Learning
After delivery, the Manager extracts lessons using a tag-based taxonomy (QG/BUG/FW/TEST/ARCH/RES). Tags enable filtered loading — the next session only reads lessons matching the detected tech stack and task type.

### Context Management
Strategic compaction points between phases and sprints prevent context exhaustion on large tasks. Cold-start sprint design ensures each sprint is self-contained and executable after compaction.

### Session Resumption
If a session is interrupted, the skill detects the existing state file on startup and offers to resume from where it left off. All progress, retry counters, and checkpoint approvals are preserved.

## Pipeline Options

| Pipeline | When | What Changes |
|---|---|---|
| **FULL** | New features, refactors, complex changes | All phases, all gates |
| **LIGHT** | Bug fixes, simple tasks | Skip architecture design (3a) and architecture quality gate (3b) |
| **SECURITY** | Auth, crypto, data handling | FULL + expanded security checks in verification loop |
| **INVESTIGATION** | Spikes, research only | Phase 1 + Phase 2 only, no implementation |

The Manager selects the pipeline at Checkpoint 1. You approve it.

## License

MIT
