# Predefined Code Quality Review Criteria (18 checks)

These 18 criteria are evaluated by BOTH Code Quality Reviewers during Phase 3e.5 Stage B. Each reviewer also generates 22 additional task-specific criteria, totaling 40 per reviewer.

**Reviewer focus:** Reviewer 1 weighs correctness/security criteria; Reviewer 2 weighs quality/patterns criteria. Both evaluate all 40 criteria but lead with their focus area in the report.

**Scoring discipline:** Score strictly. Lead with the worst issue. Never open with praise or soften criticism. When in doubt between PASS and FAIL, choose FAIL — a retry that catches a real issue is cheaper than a miss that reaches production.

## Category 1: Correctness (1-3)

1. **Logic Correctness** — Algorithms and business logic produce correct results for all expected inputs
2. **Edge Case Handling** — Boundary conditions, empty inputs, nulls, and overflow are handled
3. **Data Integrity** — Data is never silently lost, corrupted, or incorrectly transformed

## Category 2: Code Quality (4-8)

4. **Readability** — Code is clear, well-structured, and self-documenting without excessive comments
5. **Naming Conventions** — Variables, functions, classes, and files follow consistent, descriptive naming
6. **No Dead Code** — No commented-out code, unused imports, unreachable branches, or leftover debug statements
7. **DRY Compliance** — No unnecessary duplication; shared logic is extracted appropriately
8. **Function Complexity** — Functions are focused, short, and do one thing well (no god functions)

## Category 3: Security (9-12)

9. **No Hardcoded Secrets** — No API keys, tokens, passwords, or connection strings in source code
10. **Input Validation** — All external inputs are validated and sanitized at system boundaries
11. **Injection Prevention** — Code prevents SQL injection, XSS, command injection, and path traversal
12. **Secure Defaults** — Security-sensitive settings default to the most restrictive option

## Category 4: Error Handling (13-15)

13. **Explicit Error Handling** — Errors are caught and handled at appropriate levels, not silently swallowed
14. **Error Messages** — Error messages are meaningful and help diagnose the issue without leaking internals
15. **Failure Propagation** — Errors propagate correctly up the call chain with appropriate context

## Category 5: Patterns & Consistency (16-17)

16. **Pattern Adherence** — Code follows the patterns established by the Architect and Senior Dev
17. **Style Consistency** — Coding style is consistent across all files in the sprint (indentation, formatting, conventions)

## Category 6: Performance (18)

18. **No Obvious Inefficiencies** — No unnecessary loops, redundant API calls, missing pagination, or unbounded queries

---

## How to Use These Criteria

### For Code Quality Reviewers:
1. Score each of the 18 predefined criteria above as PASS or FAIL
2. Generate 22 additional criteria specific to the current task's language, framework, and domain
3. Score those 22 task-specific criteria as PASS or FAIL
4. Calculate total: [passed] / 40
5. **PASS threshold: ≥32/40 (80%)**

### Frontend Accessibility (Conditional)
When frontend framework detected (React/Vue/Angular/Svelte/HTML), add these 4 predefined criteria (19-22), making the total 22 predefined + 22 task-specific = 44. Adjust threshold: **≥36/44 (80%)**.
19. **Semantic HTML** — Correct use of semantic elements over generic divs/spans
20. **ARIA Labels** — Interactive elements have accessible names and roles
21. **Keyboard Navigation** — All functionality reachable via keyboard alone
22. **Color Contrast** — Text meets WCAG AA contrast ratio (4.5:1 normal, 3:1 large)

### Task-Specific Criteria Examples:
- For TypeScript: strict type usage, no `any` abuse, proper async/await, no unhandled promises
- For Python: type hints on public functions, proper context managers, no mutable default args
- For React: proper key usage, no state mutation, correct effect dependencies
- For API code: proper status codes, consistent error response format, input schema validation
- For database code: parameterized queries, proper connection handling, migration safety
