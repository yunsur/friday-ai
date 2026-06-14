---
description: Frontend development patterns and best practices. Integrates the ECC frontend-patterns skill.
kind: knowledge-guide
primary_agent: developer
skill_source: everything-claude-code
requires_skills: [frontend-patterns]
recommended_next: [friday:review, friday:tdd]
---

# Frontend

Frontend development patterns for React, Next.js, and modern web apps.

## Input

$ARGUMENTS

## When to Use

- Building React/Next.js components
- Implementing state management
- Optimizing performance
- Handling responsive design
- Implementing accessibility

## Process

This command integrates the **ECC frontend-patterns** skill for comprehensive frontend guidance.

1. **Load ECC Skill** — load `frontend-patterns` from everything-claude-code
   - Component architecture
   - State management patterns
   - Performance optimization
   - Responsive design
   - Accessibility (WCAG 2.1 AA)

2. **Design Components** — plan component structure
   - Component hierarchy
   - Props interface
   - State location
   - Side effects

3. **Implement** — build components
   - Follow patterns
   - Add accessibility
   - Optimize performance
   - Handle error states

4. **Test** — verify components
   - Unit tests
   - Integration tests
   - Visual regression tests

## Component Patterns

### Container/Presentational Pattern
```typescript
// Container (logic)
export const UserListContainer = () => {
  const { users, loading, error } = useUsers();
  return <UserList users={users} loading={loading} error={error} />;
};

// Presentational (UI)
export const UserList = ({ users, loading, error }) => {
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <ul>
      {users.map(user => <UserItem key={user.id} user={user} />)}
    </ul>
  );
};
```

### Custom Hooks Pattern
```typescript
// Custom hook for data fetching
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
};
```

## Rules

- Accessibility, performance, and error states are part of the initial design, not cleanup work.
- Keep component responsibilities narrow and testable.
- Prefer established UI patterns from the codebase before introducing new abstractions.

## Anti-Patterns

| Rationalization | Rebuttal |
|----------------|----------|
| "I'll add accessibility later" | Accessibility is easier to add from the start. |
| "This component is too small to test" | Small components are easy to test. Test them. |
| "I'll optimize performance later" | Performance issues are harder to fix later. Optimize early. |

## Verification

- [ ] Components are reusable
- [ ] Accessibility implemented (WCAG 2.1 AA)
- [ ] Performance optimized
- [ ] Tests written
- [ ] Error states handled

## Output

Frontend components with proper patterns and accessibility.

## After

- Run `/friday:review` to check code quality
- Run `/friday:tdd` to add tests
