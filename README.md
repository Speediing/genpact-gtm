# Genpact x SpaceXAI

Passworded Grok Bot leave-behind for Genpact sales.

## What it is

The page shows three example sales jobs:

- Keep the open deck current during a client meeting.
- Answer buyer questions from approved material.
- Research a target account and prepare draft outreach.

Each job includes an interactive Grok Bot walkthrough and a matching product
clip. The page also includes an agent-team view, product comparison, public
Grok Bot testimonials, and the Cursor contact for Genpact.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Default password is `land2expand` (override with `SITE_PASSWORD`).

## Krista clips

Download into `private/media/krista-clips/` from the GitHub release (served only through the passworded `/api/media/...` route):

```bash
gh release download krista-gtm-clips-720p-2026-08-26 \
  --repo Speediing/grok-bot-quotes \
  --dir private/media/krista-clips
```

## Deploy

Set `SITE_PASSWORD` in the deployment environment. Keep the deployment private
until the account owner approves a public URL.
