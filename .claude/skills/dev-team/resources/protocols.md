# Team Protocols — Shared Formatting & Conventions

## Role Header Format
When switching to a role, print exactly:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ROLE_TAG] Persona Name — Brief Focus Area
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Handoff Format
End each role's section with:
```
>> HANDOFF to [Next Role] ([Persona Name]): <one sentence describing what they
   should focus on and what context from this deliverable matters most>
```

## Manager Plan Format (Checkpoint 1)
```
**Handover Understanding**: [summary of what the user wants]
**Task Type**: [new feature | bug fix | refactor | investigation | design]
**Complexity**: [low | medium | high | critical]
**Production Risk**: [NONE | LOW | MEDIUM | HIGH] — [reasoning]
**Previous Session Lessons**: [none — first run | key lessons from prior sessions]
**Team Assembled**:
- [Role] — [why needed]
**Estimated Sprints**: [number] (if not defined by user)
```

## Planner Sprint Format (Checkpoint 2)
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
- Dependencies: [what must exist before this sprint]
- Roles Involved: [list]
- Verification Criteria:
  1. [specific, testable condition]
- Exit Criteria: [what must be true for sprint completion]
- Runnable Artifact: [YES — type + start command | NO]
```

## Quality Gate Format
Used for BOTH architecture reviews (80 criteria, ≥64 to pass) and code reviews (40 criteria, ≥32 to pass). Adjust header, total, and threshold per gate type.
```
**[REVIEW TYPE]: [Reviewer Name or Number]**
**Category Scores:**
| # | Criteria | Pass/Fail | Notes |
|---|---------|-----------|-------|
| 1 | [criteria name] | PASS/FAIL | [brief note] |
...

**Summary:**
- Passed: [X]/[total]
- Failed: [Y]/[total]
- Pass Rate: [Z]%
- **VERDICT**: PASS (≥80%) / FAIL (<80%)

**Feedback for [Architect / Senior Dev]** (if FAIL):
- [specific issue and suggested fix]
```

## Testing Report Format
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
**Critical Failures:** [count] | **Non-Critical Failures:** [count]
```

## Sprint Completion Format (Checkpoint 3)
```
**SPRINT [N] COMPLETE — Review**
**Deliverables:**
- [x] [deliverable 1] — completed
**Tests:** [X] passed, [Y] failed, [Z]% pass rate
**Issues Resolved:** [count] (via Debugger)
**Quality Gates:** Architecture review [X]%, Code review [X]%
**Next Sprint:** Sprint [N+1] — [brief description]

→ Awaiting your approval to proceed.
  Options: approve | redo this sprint | stop | approve all remaining sprints
```

## User Checkpoint Format
For Checkpoints 1, 2, and 3 (sprint). Adjust content and options per checkpoint type.
```
╔══════════════════════════════════════════════════╗
║  🔒 CHECKPOINT [N]: [TITLE]                      ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  [checkpoint-specific content]                   ║
║                                                  ║
║  → Options:                                      ║
║    CP1/CP2: approve | modify | reject            ║
║    CP3: approve | redo | stop | approve all      ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

## Severity Classification
- **CRITICAL**: Affects core functionality, data integrity, security, or blocks other features
- **NON-CRITICAL**: UI issues, minor edge cases, performance improvements, code style

## Retry/Escalation Rules
- Architecture Quality Gate: Max 3 retries → escalate to Manager
- Code Quality Gate: Max 3 retries → escalate to Manager
- Tester↔Debugger Loop: Max 3 cycles → escalate to Manager

**Escalation Format:**
```
⚠️ ESCALATION TO MANAGER
Reason: [quality gate / debug loop] exceeded max retries ([N]/[max])
Attempts: 1: [outcome] | 2: [outcome] | 3: [outcome]
Recommendation: [reassess approach / break into smaller tasks / seek user input]
```

## Resume Prompt Format
When `.dev-team/session-state.md` is detected on startup:
```
╔══════════════════════════════════════════════════╗
║  📋 PREVIOUS SESSION DETECTED                    ║
╠══════════════════════════════════════════════════╣
║  Task: [task summary]                            ║
║  Last Position: Phase [N], Sub-phase [X]         ║
║  Sprint: [current]/[total]                       ║
║  Last Updated: [timestamp]                       ║
║                                                  ║
║  → Options: resume | restart | status            ║
╚══════════════════════════════════════════════════╝
```

## State Update Protocol
After each **State:** marker in the execution protocol:
1. Read `.dev-team/session-state.md`
2. Update the relevant status fields and `Current Position` block
3. Update the `Last Updated` timestamp
4. Write the complete file back — only change fields relevant to the completed step

## Diagram Convention (Mermaid)
Use fenced Mermaid blocks for diagrams. Supported types: `graph TD/LR`, `flowchart LR/TD`, `sequenceDiagram`.

Guidelines:
- Label edges with what moves between nodes (data type, action, event name)
- Use `subgraph` for logical boundaries (e.g., "API Layer", "Data Layer")
- Node shapes: `["text"]` processes, `[("text")]` data stores, `{"text"}` decisions
- Max ~15 nodes per diagram before splitting into multiple diagrams
- No custom themes or styling — keep diagrams portable
