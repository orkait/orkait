# Orkait Knowledge Base And Chatbot Design

**Date:** 2026-03-30

## Goal

Create a single curated public knowledge base at `/knowledge` and a grounded chatbot under `/chatbot` that answers only from that knowledge base using OpenRouter with token-efficient context selection.

## Current Evidence

The current implementation is not suitable to ship as a real knowledge bot:

- [src/components/layout/chat-widget.tsx](/mnt/storage/codespace/code/orkait/orkait/src/components/layout/chat-widget.tsx) renders a polished chat shell, but suggestion chips, input, and send behavior are not wired.
- [src/hooks/useChatScript.ts](/mnt/storage/codespace/code/orkait/orkait/src/hooks/useChatScript.ts) replays a mock conversation rather than using live knowledge.
- [/mnt/storage/codespace/code/orkait/orka-chatbot/src/index.ts](/mnt/storage/codespace/code/orkait/orka-chatbot/src/index.ts) already has the correct backend transport shape for a Worker-based OpenRouter integration, but its knowledge is a static prompt blob and not a curated source of truth.

This design replaces the fake/scripted behavior with a real KB-backed system.

## Product Decision

### Source of truth

Use one manually curated markdown file as the only knowledge source.

- Human-readable
- Public-facing
- Manually maintained
- No generation scripts
- No duplicated JSON/TS knowledge dataset

### Delivery model

- `/knowledge` will expose the curated markdown content as a public route in this repo
- `/chatbot` will contain the Cloudflare Worker app moved from `/mnt/storage/codespace/code/orkait/orka-chatbot`
- The Worker will load the markdown KB and answer only from it

### Private projects

Private projects are not treated as active public products.

- `booleanstack` and `zen` may appear only inside a small curated `Coming Soon` section
- No private implementation details, roadmap promises, or speculative claims

## `/knowledge` Structure

The knowledge base will be one unified markdown document with fixed sections:

1. `# Orkait Knowledge Base`
2. `## What Orkait Builds`
3. `## Active Public Products And Infrastructure`
4. `## Selected Supporting Projects`
5. `## Coming Soon`
6. `## What We Do Not Claim`

### Entry format for included projects

Each included project entry must contain:

- project name
- one-line summary
- what it actually does
- why it matters
- current maturity
- public repository URL

### Inclusion rules

Include only repos that are:

- public
- non-archived
- substantial enough to explain with confidence
- useful for a public-facing Orkait knowledge surface

Exclude repos that are:

- archived
- empty, thin, or low-signal
- experiments with weak public context
- misleading to present as active Orkait products

### Initial curation direction

During implementation, the public repo review will prioritize strong, well-described repos such as:

- `rustbox`
- `graphstore`
- `unified-mcp`
- `gatekeeper`
- `event-calendar`
- `exai`
- `keypooler`

Supporting/public-infra repos may also be included if their public documentation is strong enough, for example selected entries from the agent-runtime family (`forge`, `superclaw`, `power`, `whitebox`, `regate`, `pulse`, `temporal`, `cloak`) and other clearly documented public utilities.

Archived repos such as `legacy-booleanstack` are explicitly out of scope for active-product answers.

## `/chatbot` Architecture

### Deployment target

Keep the existing Cloudflare Worker architecture.

Reason:

- already matches the desired OpenRouter deployment model
- already contains rate limiting and session handling
- cheap to deploy
- easy to isolate under `/chatbot`

### Structure

The repo will contain:

- `/knowledge`
  - the public KB route and source markdown
- `/chatbot`
  - Worker app
  - Worker config
  - Worker tests

### Worker behavior

The Worker must:

- read the KB markdown file
- split it into named sections by markdown headings
- select only the most relevant sections for each request
- call OpenRouter with:
  - short system rules
  - selected KB excerpts only
  - a short recent conversation window

The Worker must not:

- send the full KB on every request
- answer from generic company filler
- mention projects not present in the KB
- infer roadmap details not written in the KB

## Token Optimization Strategy

Token efficiency is a first-class requirement.

### Prompt composition

Each chat request should include:

1. short system instruction block
2. a small set of relevant KB excerpts
3. recent conversation history only
4. the current user message

### Local relevance filtering

Before calling OpenRouter, the Worker will perform lightweight local relevance selection:

- exact project-name match
- heading-title match
- keyword overlap
- explicit repo-name detection in the user message

This local step is intentionally simple and cheap. It exists to avoid sending the whole KB.

### Memory limits

- keep only the last 4-6 turns
- aggressively trim old exchanges
- avoid replaying the full conversation history

### Response limits

- concise by default
- short answer first
- expand only when the user asks for detail
- if not covered, answer with a KB-boundary message instead of guessing

## Chatbot Response Policy

The chatbot must follow these rules:

- answer only from the current public KB
- if something is not in the KB, say it is not covered in the current public knowledge base
- do not present archived repos as current active work
- do not claim features, timelines, or capabilities not written in the KB
- use exact curated project names from the KB
- prefer specific project-backed answers over generic agency language

## Frontend Behavior

The site chat UI must stop being fake.

### Before backend integration

If the KB-backed backend is not connected yet, the current fake interaction should not remain as-is.

Preferred behavior:

- either hide the current scripted chat
- or replace it with a clearly labeled non-interactive shell that says the knowledge assistant is coming soon

### After backend integration

The site chat should:

- open and close normally
- send real messages to the Worker
- show real loading state
- wire starter suggestions to real questions grounded in the KB
- show a plain fallback message on backend failure

## Error Handling

### Worker failures

If OpenRouter fails or the service is unavailable:

- return a short, non-leaky error
- instruct the frontend to show a simple availability message

### KB misses

If the KB does not contain enough information:

- return a direct KB-boundary answer
- do not fabricate

Example behavior:

`That is not covered in the current public knowledge base yet.`

## Security And Scope Controls

- OpenRouter API key stays in Worker secrets/env, not in the KB
- KB contains only public-facing information
- private repo details are excluded except curated sneak peeks explicitly approved for public mention
- the frontend must never ship the entire KB as client-side prompt context by default

## Implementation Outline

1. Move the Worker project into `/chatbot`
2. Replace the static prompt blob with markdown KB loading
3. Add local section parsing and relevance selection
4. Create the unified manual KB markdown file
5. Build the `/knowledge` route around that markdown
6. Curate the included public repos by hand
7. Connect the site chat widget to the Worker
8. Remove the fake scripted chat behavior

## Testing Requirements

### Knowledge tests

- KB file exists
- required sections exist
- all included public repo links are valid GitHub URLs

### Worker tests

- refuses to answer outside KB scope
- loads KB successfully
- selects only relevant sections
- trims session history
- handles OpenRouter failures cleanly

### Frontend tests

- chat open/close works
- send path is real
- loading state is visible
- fallback state is visible on request failure

## Risks And Trade-offs

### Manual curation trade-off

Pros:

- higher quality
- stronger public positioning
- better truthfulness

Cons:

- requires manual maintenance
- KB freshness depends on editorial updates

This trade-off is acceptable because quality is more important than automation for this surface.

### Markdown-only source trade-off

Pros:

- easy to edit
- one source of truth
- public and machine-usable

Cons:

- requires lightweight parsing in the Worker

This is acceptable because the parsing is simple and much cheaper than maintaining duplicate sources.
