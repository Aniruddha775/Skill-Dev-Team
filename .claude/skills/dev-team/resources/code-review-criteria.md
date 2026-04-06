# Predefined Code Quality Review Criteria (20 checks)

These 20 criteria are evaluated by BOTH Code Quality Reviewers during Phase 3e.5. Each reviewer also generates 20 additional task-specific criteria, totaling 40 per reviewer.

## Category 1: Correctness (1-4)

1. **Requirement Compliance** — Implementation matches the Architect's design and sprint deliverables
2. **Logic Correctness** — Algorithms and business logic produce correct results for all expected inputs
3. **Edge Case Handling** — Boundary conditions, empty inputs, nulls, and overflow are handled
4. **Data Integrity** — Data is never silently lost, corrupted, or incorrectly transformed

## Category 2: Code Quality (5-9)

5. **Readability** — Code is clear, well-structured, and self-documenting without excessive comments
6. **Naming Conventions** — Variables, functions, classes, and files follow consistent, descriptive naming
7. **No Dead Code** — No commented-out code, unused imports, unreachable branches, or leftover debug statements
8. **DRY Compliance** — No unnecessary duplication; shared logic is extracted appropriately
9. **Function Complexity** — Functions are focused, short, and do one thing well (no god functions)

## Category 3: Security (10-13)

10. **No Hardcoded Secrets** — No API keys, tokens, passwords, or connection strings in source code
11. **Input Validation** — All external inputs are validated and sanitized at system boundaries
12. **Injection Prevention** — Code prevents SQL injection, XSS, command injection, and path traversal
13. **Secure Defaults** — Security-sensitive settings default to the most restrictive option

## Category 4: Error Handling (14-16)

14. **Explicit Error Handling** — Errors are caught and handled at appropriate levels, not silently swallowed
15. **Error Messages** — Error messages are meaningful and help diagnose the issue without leaking internals
16. **Failure Propagation** — Errors propagate correctly up the call chain with appropriate context

## Category 5: Patterns & Consistency (17-18)

17. **Pattern Adherence** — Code follows the patterns established by the Architect and Senior Dev
18. **Style Consistency** — Coding style is consistent across all files in the sprint (indentation, formatting, conventions)

## Category 6: Integration & Performance (19-20)

19. **Component Integration** — All components connect correctly with matching interfaces, types, and data contracts
20. **No Obvious Inefficiencies** — No unnecessary loops, redundant API calls, missing pagination, or unbounded queries

---

## How to Use These Criteria

### For Code Quality Reviewers:
1. Score each of the 20 predefined criteria above as PASS or FAIL
2. Generate 20 additional criteria specific to the current task's language, framework, and domain
3. Score those 20 task-specific criteria as PASS or FAIL
4. Calculate total: [passed] / 40
5. **PASS threshold: ≥32/40 (80%)**

### Task-Specific Criteria Examples:
- For TypeScript: strict type usage, no `any` abuse, proper async/await, no unhandled promises
- For Python: type hints on public functions, proper context managers, no mutable default args
- For React: proper key usage, no state mutation, correct effect dependencies
- For API code: proper status codes, consistent error response format, input schema validation
- For database code: parameterized queries, proper connection handling, migration safety
