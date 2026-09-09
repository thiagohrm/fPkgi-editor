# fPKGi List Editor

## Runtime

- The app is a single Express process (`server/index.js`) plus a single-file vanilla frontend (`public/index.html`); there is no root manifest, build, lint, or test configuration.
- `express.static('public')` is resolved from the process working directory. For local development, install the server dependency then start Node from the repository root: `npm install --prefix server` followed by `node server/index.js`. Do not run `npm start` after changing into `server/` if the UI must be served.
- Docker is based on Node 18 and starts the server from `/app`; `docker-compose up --build -d` exposes port 3000 and bind-mounts `./GAMES.json` into the container. `GAMES.json` must exist before the image can build because the Dockerfile copies it.

## Data And API

- `GAMES.json` is runtime data at the repository root and is intentionally untracked. It must be valid JSON shaped as `{ "DATA": { "<PKG URL>": { ... } } }`; the PKG URL is the record key and cannot be changed by `PUT`.
- The UI and mutations expect game fields `name`, `title_id`, `region`, `version`, `size`, `min_fw`, `cover_url`, and `release`. The add form sets `release` to the current date and `size` using `parseInt`.
- `GET /GAMES.json` sends the raw file, while `GET /games` returns its contents for the UI. `POST /games` accepts `{ "<url>": details }`; `PUT /games` accepts `{ "url": "<existing key>", "updatedData": { ... } }` and merges fields; `DELETE /games` accepts `{ "url": "<existing key>" }`.
- The server has no validation or JSON parse error handling on mutations. Verify edits against a valid local `GAMES.json` by running the server and exercising the affected HTTP endpoint.

## Frontend Constraint

- The table injects game values and PKG URLs into HTML and inline `onclick` handlers. Preserve or deliberately replace that rendering approach when modifying displayed fields; quotes in a URL currently break those handlers.
