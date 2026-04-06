# Team Protocols — Shared Formatting & Conventions

## Role Header Format
When switching to a role, print exactly:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ROLE_TAG] Persona Name — Brief Focus Area
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Example:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ARCHITECT] Sofia Chen — System Design
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Handoff Format
End each role's section with:

```
>> HANDOFF to [Next Role] ([Persona Name]): <one sentence describing what they
   should focus on and what context from this deliverable matters most>
```

## Manager Plan Format (Checkpoint 1)
The Manager's initial assessment after reading the handover document:

```
**Handover Understanding**: [summary of what the user wants]
**Task Type**: [new feature | bug fix | refactor | investigation | design]
**Complexity**: [low | medium | high | critical]
**Production Risk**: [NONE | LOW | MEDIUM | HIGH] — [reasoning]
**Previous Session Lessons**: [none — first run | key lessons from prior sessions]
**Team Assembled**:
- [Role] — [why this role is needed for this task]
- [Role] — [why this role is needed for this task]
...
**Estimated Sprints**: [number] (if not defined by user)
```

## Planner Sprint Format (Checkpoint 2)
The Planner's sprint breakdown:

```
**Sprint [N]: [Sprint Name]**
- Objective: [what this sprint delivers]
- Context Brief:
  - Prior sprint outputs needed: [none / file paths]
  - Key architectural decisions: [none / relevant decisions]
  - Tech stack: [detected stack]
  - Relevant research: [findings for this sprint]
- Deliverables:
  1. [deliverable]
  2. [deliverable]
- Dependencies: [what must exist before this sprint]
- Roles Involved: [list]
- Verification Criteria:
  1. [specific, testable condition]
  2. [specific, testable condition]
- Exit Criteria: [what must be true for sprint completion]
- Runnable Artifact: [YES — type + start command | NO]
```

## Architecture Quality Gate Format
Each reviewer scores using this format:

```
**REVIEW: [Reviewer Name]**
**Category Scores:**
| # | Criteria | Pass/Fail | Notes |
|---|---------|-----------|-------|
| 1 | [criteria name] | PASS/FAIL | [brief note] |
...

**Summary:**
- Passed: [X]/80
- Failed: [Y]/80
- Pass Rate: [Z]%
- **VERDICT**: PASS (≥80%) / FAIL (<80%)

**Feedback for Architect** (if FAIL):
- [specific issue 1 and suggested fix]
- [specific issue 2 and suggested fix]
```

## Code Quality Gate Format
Each code reviewer scores using this format:

```
**CODE REVIEW: [Reviewer 1 or 2]**
**Category Scores:**
| # | Criteria | Pass/Fail | Notes |
|---|---------|-----------|-------|
| 1 | [criteria name] | PASS/FAIL | [brief note] |
...

**Summary:**
- Passed: [X]/40
- Failed: [Y]/40
- Pass Rate: [Z]%
- **VERDICT**: PASS (≥80%) / FAIL (<80%)

**Feedback for Senior Dev** (if FAIL):
- [file:line]: [specific issue and suggested fix]
- [file:line]: [specific issue and suggested fix]
```

## Testing Report Format
The Tester uses this format for reporting:

```
**TEST REPORT — Sprint [N]**
**Verification Loop:**
| Step | Status | Details |
|------|--------|---------|
| 1. Build | PASS/FAIL/SKIPPED | [brief] |
| 2. Type Check | PASS/FAIL/SKIPPED | [brief] |
| 3. Lint | PASS/FAIL/SKIPPED | [brief] |
| 4. Tests | PASS/FAIL | [X passed, Y failed] |
| 5. Security Scan | PASS/FAIL | [brief] |
| 6. Diff Review | PASS/FAIL | [brief] |

**All Failures:**
| # | Source | Name | Severity | Details |
|---|--------|------|----------|---------|
| 1 | [step] | [name] | CRITICAL/NON-CRITICAL | [brief] |

**Overall:** Verification [X]/6 passed, Tests [X] passed [Y] failed ([Z]%)
**Critical Failures:** [count]
**Non-Critical Failures:** [count]
```

## Sprint Completion Format (Checkpoint 3)
Manager presents at each sprint boundary:

```
**SPRINT [N] COMPLETE — Review**
**Deliverables:**
- [x] [deliverable 1] — completed
- [x] [deliverable 2] — completed
**Tests:** [X] passed, [Y] failed, [Z]% pass rate
**Issues Resolved:** [count] (via Debugger)
**Quality Gates:** Architecture review [X]%, Code review [X]%
**Next Sprint:** Sprint [N+1] — [brief description]

→ Awaiting your approval to proceed.
  Options: approve | redo this sprint | stop | approve all remaining sprints
```

## User Checkpoint Format — Checkpoints 1 & 2
When pausing for user approval at Phase 1 or Phase 2:

```
╔══════════════════════════════════════════════════╗
║  🔒 CHECKPOINT [N]: AWAITING YOUR APPROVAL      ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  [checkpoint-specific content]                   ║
║                                                  ║
║  → Please respond with:                          ║
║    • "approve" — continue to next phase          ║
║    • "modify" — provide changes you want         ║
║    • "reject" — start over with feedback         ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

## User Checkpoint Format — Checkpoint 3 (Sprint)
When pausing after a sprint completes:

```
╔══════════════════════════════════════════════════╗
║  🔒 CHECKPOINT 3: SPRINT [N] REVIEW             ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  [sprint completion content]                     ║
║                                                  ║
║  → Please respond with:                          ║
║    • "approve" — proceed to next sprint          ║
║    • "redo" — re-execute this sprint w/ feedback ║
║    • "stop" — deliver what's completed so far    ║
║    • "approve all remaining" — skip future CP3s  ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

## Severity Classification Guide (for Tester)
- **CRITICAL**: Affects core functionality, data integrity, security, or blocks other features
- **NON-CRITICAL**: UI issues, minor edge cases, performance improvements, code style

## Retry/Escalation Rules
- **Architecture Quality Gate**: Max 3 retries, then escalate to Manager
- **Code Quality Gate**: Max 3 retries, then escalate to Manager
- **Tester↔Debugger Loop**: Max 3 cycles, then escalate to Manager
- **Escalation Format**:
```
⚠️ ESCALATION TO MANAGER
Reason: [quality gate / debug loop] exceeded max retries ([N]/[max])
Summary of attempts:
- Attempt 1: [brief outcome]
- Attempt 2: [brief outcome]
- Attempt 3: [brief outcome]
Recommendation: [reassess approach / break into smaller tasks / seek user input]
```

## Resume Prompt Format
When a previous session state file (`.dev-team/session-state.md`) is detected on startup:

```
╔══════════════════════════════════════════════════╗
║  📋 PREVIOUS SESSION DETECTED                    ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  Task: [task summary from state]                 ║
║  Last Position: Phase [N], Sub-phase [X]         ║
║  Sprint: [current]/[total]                       ║
║  Completed: [list of completed sprints]          ║
║  Last Updated: [timestamp]                       ║
║                                                  ║
║  → Options:                                      ║
║    • "resume" — pick up where we left off        ║
║    • "restart" — start fresh (deletes state)     ║
║    • "status" — show detailed progress           ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

## State Update Protocol
After each **State:** marker in the execution protocol:
1. Read `.dev-team/session-state.md`
2. Update the relevant status fields and `Current Position` block
3. Update the `Last Updated` timestamp
4. Write the complete file back

Keep updates surgical — only change fields relevant to the completed step.

## Diagram Convention (Mermaid)
When a role's output format calls for diagrams, use fenced Mermaid blocks:

```mermaid
[diagram content]
```

Supported diagram types:
- `graph TD` / `graph LR` — component relationships and dependencies
- `flowchart LR` / `flowchart TD` — data and control flow
- `sequenceDiagram` — multi-step interactions between components

Guidelines:
- Label edges with what moves between nodes (data type, action, event name)
- Use `subgraph` to denote logical boundaries (e.g., "API Layer", "Data Layer")
- Node shapes: `["text"]` for processes, `[("text")]` for data stores, `{"text"}` for decisions
- Keep diagrams focused — one concern per diagram, max ~15 nodes before splitting
- Do not use Mermaid themes or custom styling — keep diagrams portable across renderers
