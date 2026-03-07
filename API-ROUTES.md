# CodeArena API Routes

## Labs

### `GET /api/labs`

Lists all labs with member, assignment, and resource counts.

- Query: `?instituteId=<id>` — filter by institute
- Returns: `{ data: LabsData[] }`

### `POST /api/labs`

Creates a new lab.

- Body: `{ title, slug, description?, instituteId?, createdById }`
- Role: ADMIN/SUPER_ADMIN or institute INSTRUCTOR
- Returns: `{ data: Lab }`

### `GET /api/labs/[labId]`

Full lab detail with institute, creator, members (with user), assignments (with problems + resources), and lab-level resources.

- Returns: `{ data: LabWithDetails }`

### `PUT /api/labs/[labId]`

Updates a lab.

- Body: `{ userId, title?, description? }`
- Role: lab creator, lab INSTRUCTOR, or ADMIN
- Returns: `{ data: Lab }`

### `DELETE /api/labs/[labId]`

Deletes a lab.

- Body: `{ userId }`
- Role: lab creator, lab INSTRUCTOR, or ADMIN
- Returns: `{ data: { deleted: true } }`

---

## Assignments

### `GET /api/labs/[labId]/assignments`

All assignments for a lab, each with problems and resources.

- Returns: `{ data: Assignment[] }`

### `POST /api/labs/[labId]/assignments`

Creates an assignment in a lab.

- Body: `{ title, startTime, endTime, userId, description?, isRecurring?, recurringType?, problemIds? }`
- Role: lab INSTRUCTOR or ADMIN
- Returns: `{ data: Assignment }`

### `GET /api/labs/assignments/[assignmentId]`

Full assignment detail with lab (+ institute), problems, resources, parent/children.

- Returns: `{ data: AssignmentFull }`

### `PUT /api/labs/assignments/[assignmentId]`

Updates an assignment.

- Body: `{ userId, title?, description?, startTime?, endTime? }`
- Role: lab INSTRUCTOR or ADMIN
- Returns: `{ data: Assignment }`

### `DELETE /api/labs/assignments/[assignmentId]`

Deletes an assignment.

- Body: `{ userId }`
- Role: lab INSTRUCTOR or ADMIN
- Returns: `{ data: { deleted: true } }`

---

## Resources

### `GET /api/labs/[labId]/resources`

Lab-level resources (not tied to any assignment).

- Returns: `{ data: Resource[] }`

### `POST /api/labs/[labId]/resources`

Creates a lab-level resource.

- Body: `{ title, type, uploadedById, description?, url?, fileUrl?, content?, order?, isPublic? }`
- Type values: `VIDEO | DOCUMENT | LINK | NOTE | CODE_SNIPPET`
- Role: lab INSTRUCTOR or ADMIN
- Returns: `{ data: Resource }`

### `GET /api/labs/assignments/[assignmentId]/resources`

Resources for a specific assignment.

- Returns: `{ data: Resource[] }`

### `POST /api/labs/assignments/[assignmentId]/resources`

Creates a resource for an assignment.

- Body: `{ title, type, uploadedById, description?, url?, fileUrl?, content?, order?, isPublic? }`
- Role: lab INSTRUCTOR or ADMIN
- Returns: `{ data: Resource }`

---

## Institutes

### `GET /api/institutes`

Lists all institutes with member, lab, and contest counts.

- Returns: `{ data: InstituteListItem[] }`

### `POST /api/institutes`

Creates a new institute.

- Body: `{ name, slug, userId, description? }`
- Role: SUPER_ADMIN or ADMIN only
- Returns: `{ data: Institute }`

### `GET /api/institutes/[instituteId]`

Full institute detail with members (with user), labs (with counts), and contests.

- Returns: `{ data: InstituteFull }`

### `PUT /api/institutes/[instituteId]`

Updates an institute.

- Body: `{ userId, name?, description? }`
- Role: ADMIN/SUPER_ADMIN or institute ADMIN/INSTRUCTOR
- Returns: `{ data: Institute }`

### `DELETE /api/institutes/[instituteId]`

Deletes an institute.

- Body: `{ userId }`
- Role: SUPER_ADMIN or ADMIN only
- Returns: `{ data: { deleted: true } }`

---

## Role-Check Summary

| Action                          | Required Role                          |
| ------------------------------- | -------------------------------------- |
| Create lab (institute)          | ADMIN or institute INSTRUCTOR          |
| Create lab (platform)           | ADMIN / SUPER_ADMIN                    |
| Update/Delete lab               | Lab creator, lab INSTRUCTOR, or ADMIN  |
| Create/Update/Delete assignment | Lab INSTRUCTOR or ADMIN                |
| Create resource                 | Lab INSTRUCTOR or ADMIN                |
| Create institute                | SUPER_ADMIN / ADMIN                    |
| Update institute                | ADMIN or institute ADMIN/INSTRUCTOR    |
| Delete institute                | SUPER_ADMIN / ADMIN                    |
| Update/Delete problem           | SUPER_ADMIN / ADMIN                    |
| Create contest                  | SUPER_ADMIN / ADMIN                    |
| Update/Delete contest           | SUPER_ADMIN / ADMIN or contest creator |
| All GET routes                  | Open (no auth required)                |

---

## Problems

### `GET /api/problems`

Lists all problems (summary format).

- Returns: `{ data: ProblemListItem[] }` — id, title, slug, difficulty, tag, contestId

### `GET /api/problems/[problemId]`

Full coding question detail with constraints, samples, test cases, and starter code.

- Returns: `{ data: CodingQuestionData }`

### `PUT /api/problems/[problemId]`

Updates a problem.

- Body: `{ userId, title?, slug?, description?, difficulty?, tag?, inputFormat?, outputFormat?, constraints?, sampleInput?, sampleOutput?, testCases?, timeLimit?, memoryLimit?, contestId?, assignmentId?, visibility?, instituteId?, order? }`
- Role: SUPER_ADMIN / ADMIN only
- Returns: `{ data: Problem }`

### `DELETE /api/problems/[problemId]`

Deletes a problem.

- Body: `{ userId }`
- Role: SUPER_ADMIN / ADMIN only
- Returns: `{ data: { deleted: true } }`

---

## Contests

### `GET /api/contests`

Lists all contests with their problems.

- Returns: `{ data: ContestListItem[] }` — id, title, startTime, endTime, duration, status, isPublic, description, problems[]

### `POST /api/contests`

Creates a new contest.

- Body: `{ userId, title, slug, startTime, endTime, duration, description?, status?, isPublic?, hostedBy?, instituteId? }`
- Role: SUPER_ADMIN / ADMIN only
- Returns: `{ data: Contest }`

### `GET /api/contests/[contestId]`

Full contest detail with problems.

- Returns: `{ data: ContestDetail }` — includes problems with id, title, slug, difficulty, order, tag

### `PUT /api/contests/[contestId]`

Updates a contest.

- Body: `{ userId, title?, slug?, description?, startTime?, endTime?, duration?, status?, isPublic?, hostedBy?, instituteId? }`
- Role: SUPER_ADMIN / ADMIN or contest creator
- Returns: `{ data: Contest }`

### `DELETE /api/contests/[contestId]`

Deletes a contest.

- Body: `{ userId }`
- Role: SUPER_ADMIN / ADMIN or contest creator
- Returns: `{ data: { deleted: true } }`

---

## Auth

### `POST /api/auth/login`

Logs in a user. Sets `codearena_session` httpOnly cookie.

- Body: `{ email, password }`
- Returns: `{ ok: true, user: { id, name, email } }`

### `POST /api/auth/logout`

Logs out the current user. Deletes `codearena_session` cookie.

- Returns: `{ ok: true }`

### `POST /api/auth/signup`

Registers a new user.

- Body: `{ username, email, password }`
- Returns: `{ ok: true }`

### `GET|POST /api/auth/[...nextauth]`

NextAuth catch-all handler (Google, GitHub, etc.).

---

## Code Runner

### `POST /api/coderunner/[problemId]`

Runs or submits code against a problem's test cases via Piston.

- Body: `{ code, language, action }` — action: `run` | `submit`
- Returns: `{ data: { verdict, results[] } }`

### `POST /api/runcode`

Runs arbitrary code via Piston (no problem context).

- Body: `{ code, language, input? }`
- Returns: `{ output, error? }`

---

## Error Format

All errors return: `{ error: "message" }` with appropriate HTTP status (400, 403, 404, 500).
