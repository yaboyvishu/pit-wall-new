# Pit Wall Backend

Independent GitHub Actions scanning service.

Run it with `npm start`. It listens on `http://localhost:4000`.

Endpoint: `POST /api/scan`

```json
{"repo":"owner/repository","token":"optional-github-token"}
```

Optional environment variables: `PORT` (default `4000`), `GITHUB_TOKEN`, `FRONTEND_ORIGIN` (default `http://localhost:3000`, must match wherever `next dev` is actually running), and `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` (for the "Connect GitHub" OAuth button at `GET /auth/github`).

Requires **Node 18+** (uses the built-in `fetch`, no dependencies).

### `POST /api/analyze`

Sends a flaky job's failure log to Claude and gets back a root-cause
classification + a ready-to-file GitHub issue draft.

Request:
```json
{"repo":"owner/repository","jobId":123456,"jobName":"test (ubuntu-latest)","token":"optional-github-token"}
```
`jobId` comes from a flaky job's `flakes[].jobId` in the `/api/scan` response.

Response:
```json
{"analysis":{"category":"timing/race condition","explanation":"...","issueTitle":"...","issueBody":"...","suggestedDiff":"..."}}
```

Needs `GROQ_API_KEY` set in the environment (this endpoint calls Groq's
OpenAI-compatible API, not Anthropic's, despite the project's AI framing).
Without it, this endpoint returns a 500 with a clear error — `/api/scan`
still works fine on its own.

### `GET /auth/github` / `GET /auth/github/callback`

Minimal GitHub OAuth login. Requires `GITHUB_CLIENT_ID` and
`GITHUB_CLIENT_SECRET` (create an OAuth App in GitHub settings with
callback URL `http://localhost:4000/auth/github/callback`). On success,
redirects to `FRONTEND_ORIGIN/?github_auth=<payload>` which the frontend
decodes and stores in `localStorage`.
