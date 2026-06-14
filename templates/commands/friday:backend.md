---
description: Backend development patterns and best practices. Integrates the ECC backend-patterns skill.
kind: knowledge-guide
primary_agent: developer
skill_source: everything-claude-code
requires_skills: [backend-patterns]
recommended_next: [friday:api, friday:review]
---

# Backend

Backend development patterns for APIs, databases, and services.

## Input

$ARGUMENTS

## When to Use

- Building API endpoints
- Designing database schemas
- Implementing authentication
- Setting up caching
- Handling background jobs

## Process

This command integrates the **ECC backend-patterns** skill for comprehensive backend guidance.

1. **Load ECC Skill** — load `backend-patterns` from everything-claude-code
   - API design patterns
   - Database patterns
   - Caching strategies
   - Authentication/authorization
   - Background job processing

2. **Design Architecture** — plan backend structure
   - API endpoints
   - Database schema
   - Service layer
   - Cache layer

3. **Implement** — build backend components
   - Follow patterns
   - Add authentication
   - Implement caching
   - Handle errors

4. **Test** — verify backend
   - Unit tests
   - Integration tests
   - API tests

## Backend Patterns

### Service Layer Pattern
```typescript
// Service layer (business logic)
export class UserService {
  constructor(
    private db: Database,
    private cache: Cache
  ) {}

  async getUser(id: string): Promise<User> {
    // Check cache first
    const cached = await this.cache.get(`user:${id}`);
    if (cached) return cached;

    // Fetch from database
    const user = await this.db.users.findById(id);
    if (!user) throw new NotFoundError('User not found');

    // Cache for next time
    await this.cache.set(`user:${id}`, user, { ttl: 3600 });

    return user;
  }
}
```

### Repository Pattern
```typescript
// Repository (data access)
export class UserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User | null> {
    return this.db.users.findOne({ where: { id } });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.db.users.create(data);
  }
}
```

### Caching Strategy
```typescript
// Cache-aside pattern
export const getCachedUser = async (id: string) => {
  const cacheKey = `user:${id}`;

  // Try cache first
  let user = await cache.get(cacheKey);
  if (user) return user;

  // Fetch from database
  user = await db.users.findById(id);
  if (user) {
    await cache.set(cacheKey, user, { ttl: 3600 });
  }

  return user;
};
```

## Rules

- Separate business logic, data access, and transport concerns.
- Add authentication, error handling, and observability as first-class backend behavior.
- Prefer proven patterns already used in the codebase over framework-fashion abstractions.

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll add caching later" | Caching is easier to add from the start. |
| "Direct DB queries are fine" | Repository pattern separates concerns. Use it. |
| "I don't need error handling" | Errors happen. Handle them gracefully. |

## Verification

- [ ] API endpoints follow REST conventions
- [ ] Database schema is normalized
- [ ] Authentication implemented
- [ ] Caching configured
- [ ] Error handling in place

## Output

Backend components with proper patterns and architecture.

## After

- Run `/friday:api` to design API endpoints
- Run `/friday:review` to check code quality
