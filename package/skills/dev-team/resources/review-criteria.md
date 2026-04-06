# Predefined Architecture & Design Review Criteria (40 checks)

These 40 criteria are evaluated by BOTH the System Architect Reviewer and the System Design Reviewer. Each reviewer also generates 40 additional task-specific criteria, totaling 80 per reviewer.

## Category 1: Structural Integrity (1-8)

1. **Single Responsibility** — Each component/module has one clear, well-defined responsibility
2. **Separation of Concerns** — Business logic, data access, and presentation are properly separated
3. **Dependency Direction** — Dependencies flow inward (high-level modules do not depend on low-level details)
4. **Circular Dependencies** — No circular dependencies exist between modules or components
5. **Module Cohesion** — Related functionality is grouped together within modules
6. **Loose Coupling** — Components interact through well-defined interfaces, not internal details
7. **Layer Boundaries** — Architectural layers are respected with no layer-skipping calls
8. **Component Granularity** — Components are neither too large (monolithic) nor too small (over-fragmented)

## Category 2: Scalability & Performance (9-16)

9. **Horizontal Scalability** — The design supports adding more instances to handle increased load
10. **Statelessness** — Services are stateless where possible, enabling easy scaling
11. **Caching Strategy** — Appropriate caching is designed for frequently accessed data
12. **Database Scalability** — Data layer supports growth (indexing strategy, partitioning, read replicas)
13. **Async Processing** — Long-running operations are handled asynchronously where appropriate
14. **Resource Efficiency** — No unnecessary resource consumption (memory leaks, connection pooling)
15. **Bottleneck Identification** — Potential performance bottlenecks are identified and addressed
16. **Load Handling** — The design gracefully handles traffic spikes and degraded conditions

## Category 3: Security (17-22)

17. **Authentication Design** — Proper authentication mechanism is designed for all entry points
18. **Authorization Model** — Role-based or attribute-based access control is clearly defined
19. **Input Validation** — All external inputs are validated at system boundaries
20. **Data Protection** — Sensitive data is encrypted at rest and in transit
21. **Injection Prevention** — Design prevents SQL injection, XSS, command injection, and similar attacks
22. **Secrets Management** — API keys, credentials, and secrets are never hardcoded; secure storage is specified

## Category 4: Reliability & Error Handling (23-28)

23. **Failure Isolation** — A failure in one component does not cascade to others
24. **Error Propagation** — Errors are handled at appropriate levels with meaningful messages
25. **Retry & Circuit Breaker** — Transient failure handling is designed for external dependencies
26. **Data Consistency** — Transactions and consistency boundaries are clearly defined
27. **Graceful Degradation** — The system can operate with reduced functionality when dependencies fail
28. **Idempotency** — Operations that may be retried are designed to be idempotent

## Category 5: Maintainability & Extensibility (29-34)

29. **Naming Conventions** — Consistent, descriptive naming for components, interfaces, and data
30. **Interface Stability** — Public interfaces are designed to be stable and backward-compatible
31. **Extension Points** — The design allows adding new features without modifying existing code
32. **Configuration Externalization** — Environment-specific values are externalized, not hardcoded
33. **Code Organization** — File and folder structure is logical and follows project conventions
34. **Technical Debt** — No known shortcuts that will require immediate rework

## Category 6: Observability & Operations (35-38)

35. **Logging Strategy** — Structured logging is designed with appropriate log levels
36. **Monitoring Points** — Key metrics and health checks are identified
37. **Traceability** — Request tracing across components is supported (correlation IDs)
38. **Deployment Strategy** — The design supports the project's deployment model (CI/CD compatibility)

## Category 7: Data & Integration (39-40)

39. **Data Model Integrity** — Data models are normalized appropriately with clear relationships
40. **API Contract Design** — External and internal APIs have clear contracts (request/response schemas, versioning)

---

## How to Use These Criteria

### For Reviewers:
1. Score each of the 40 predefined criteria above as PASS or FAIL
2. Generate 40 additional criteria specific to the current task's domain and requirements
3. Score those 40 task-specific criteria as PASS or FAIL
4. Calculate total: [passed] / 80
5. **PASS threshold: ≥64/80 (80%)**

### Task-Specific Criteria Examples:
- For a REST API: rate limiting, pagination design, HATEOAS compliance, OpenAPI spec
- For a real-time system: WebSocket design, event ordering, reconnection handling
- For a data pipeline: backpressure handling, exactly-once processing, schema evolution
- For a UI feature: accessibility, responsive design, state management, optimistic updates
