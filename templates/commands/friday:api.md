---
description: API design patterns and best practices. Integrates the ECC api-design skill.
kind: knowledge-guide
primary_agent: architect
skill_source: everything-claude-code
requires_skills: [api-design]
recommended_next: [friday:review, friday:gen]
---

# API Design

Design consistent, developer-friendly REST APIs.

## Input

$ARGUMENTS

## When to Use

- Designing new API endpoints
- Reviewing existing API contracts
- Adding pagination, filtering, or sorting
- Implementing error handling for APIs
- Planning API versioning strategy
- Building public or partner-facing APIs

## Process

This command integrates the **ECC api-design** skill for comprehensive API design guidance.

1. **Load ECC Skill** — load `api-design` from everything-claude-code
   - Resource naming conventions
   - Status code usage
   - Pagination patterns
   - Error response formats
   - Versioning strategies
   - Rate limiting

2. **Design Resources** — define API resources
   - URL structure
   - HTTP methods
   - Request/response formats

3. **Implement Patterns** — apply best practices
   - Pagination (cursor-based or offset)
   - Filtering and sorting
   - Error handling
   - Rate limiting

4. **Document** — create API documentation
   - OpenAPI/Swagger specs
   - Example requests/responses

## API Design Rules

### URL Structure
```
# Resources are nouns, plural, lowercase, kebab-case
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PUT    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

### Status Codes
- `200` OK — successful GET, PUT, PATCH
- `201` Created — successful POST
- `204` No Content — successful DELETE
- `400` Bad Request — invalid input
- `401` Unauthorized — authentication required
- `403` Forbidden — insufficient permissions
- `404` Not Found — resource doesn't exist
- `422` Unprocessable Entity — validation errors
- `429` Too Many Requests — rate limit exceeded

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## Rules

- Start from resource boundaries before endpoint details.
- Keep contracts explicit — versioning, errors, and pagination should not be implied.
- Reuse established API patterns unless the spec requires a justified exception.

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "We'll version later" | Start with versioning from day one. |
| "Errors don't need structure" | Consistent errors save debugging time. |
| "Pagination is optional" | Always paginate. Unbounded queries break APIs. |

## Verification

- [ ] URLs follow naming conventions
- [ ] Status codes are appropriate
- [ ] Errors have consistent format
- [ ] Pagination implemented
- [ ] Rate limiting configured

## Output

API design with proper patterns and documentation.

## After

- Run `/friday:review` to check API design
- Run `/friday:gen` to implement the API
