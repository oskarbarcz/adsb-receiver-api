# adsb-receiver-api

The ADS-B over HTTP receiver: accepts position reports from the Transponder and serves each callsign's track from memory.

Last reviewed: 2026-10-20

This repo is part of MyPreflight. Product decisions, standards and architecture live in the knowledge base. Read it by URL before working here:

- Start: https://raw.githubusercontent.com/mypreflight/product/main/CLAUDE.md
- Standards: https://raw.githubusercontent.com/mypreflight/product/main/technology/backend/standards.md
- Architecture: https://raw.githubusercontent.com/mypreflight/product/main/technology/backend/architecture.md

## Repo-specific notes

Keep this short. Anything shared between repos belongs in the knowledge base.

- Run locally: `cp .env.dist .env`, then `docker compose up -d --build`. Never run `npm` on the host; use `docker compose exec app …`.
- Test: `docker compose exec app npm run test` (Jest, beside the code) and `docker compose exec app npm run test:functional` (cucumber-js, `features/`).
- Deploy: bump `package.json` `version` in every PR. Merging to `main` tags the version and pushes the production image to GitHub Container Registry.
- No database by design: positions live in a cache store keyed by callsign, and the receiver restarts empty. Don't add persistence without a decision in the knowledge base.
- The position payload is what the Transponder in the field sends. Don't make breaking changes to it.

When your change alters product behaviour, also open a PR to the knowledge base updating the matching file.
