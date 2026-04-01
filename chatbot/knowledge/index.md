# Orkait Knowledge Base

## What Orkait Builds

Orkait builds practical software systems with an engineering-first bias. The strongest public work falls into three buckets: secure execution and infrastructure, agent memory and tooling, and developer products that turn complex workflows into usable systems.

This public knowledge base is intentionally curated. It includes only public, non-archived projects that have enough substance to describe with confidence, plus a small coming-soon section for products that are not publicly open yet.

## Active Public Products And Infrastructure

### Rustbox

- Repo: https://github.com/orkait/rustbox
- Summary: kernel-enforced sandbox for executing untrusted code
- What it does: runs untrusted workloads inside Linux namespaces, cgroups, seccomp, and strict resource limits with two profiles: judge mode for competitive programming and executor mode for agent workloads
- Why it matters: it is infrastructure for safe code execution without relying on a Docker daemon as the isolation boundary
- Current maturity: advanced public infrastructure project with detailed security, testing, and performance documentation

### graphstore

- Repo: https://github.com/orkait/graphstore
- Summary: agentic brain database for memory, recall, belief tracking, and document ingestion
- What it does: combines graph traversal, vector search, lexical search, document ingestion, markdown vault support, and a human-readable DSL for AI agent memory systems
- Why it matters: it is a serious memory substrate for long-running agents rather than a thin wrapper around embeddings
- Current maturity: active public flagship infrastructure project with broad feature coverage and detailed public docs

### unified-mcp

- Repo: https://github.com/orkait/unified-mcp
- Summary: one MCP server that provides namespaced tooling for multiple frontend libraries
- What it does: exposes curated references, patterns, examples, and generation helpers for libraries like React Flow and Motion through a single plugin-based MCP server
- Why it matters: it reduces tool sprawl and gives assistants a cleaner way to work with frontend ecosystems
- Current maturity: active public developer tooling project with clear docs, plugin architecture, and install paths

### Gatekeeper

- Repo: https://github.com/orkait/gatekeeper
- Summary: auth and authorization control plane for Orkait systems
- What it does: centralizes identity, API keys, quotas, billing logic, crypto, mail, analytics, and shared storage-facing contracts in a package-first TypeScript workspace
- Why it matters: it owns the hard shared platform concerns that multiple products depend on
- Current maturity: active public control-plane project with clear package boundaries and CI/testing guidance

### Event Calendar

- Repo: https://github.com/orkait/event-calendar
- Summary: scheduling and availability API built on Cloudflare Workers
- What it does: uses bitset-based storage for fast availability tracking, conflict detection, booking flows, and multi-user scheduling across a global edge deployment
- Why it matters: it shows Orkait’s approach to tight, performance-oriented SaaS infrastructure
- Current maturity: active public API project with production-oriented architecture and deployment guidance

## Selected Supporting Projects

### exai

- Repo: https://github.com/orkait/exai
- Summary: CLI that turns plain English into architecture diagrams
- What it does: uses LLMs and D2 to generate diagrams, export SVG/PNG/PDF, and support both AI-driven and deterministic JSON-based workflows
- Why it matters: it is a strong developer product with a clear workflow and a public distribution path through npm
- Current maturity: active public CLI product with provider support, caching, and export features

### keypooler

- Repo: https://github.com/orkait/keypooler
- Summary: local tool for juggling multiple API keys across providers and tiers
- What it does: manages key pools, rate-aware execution, retries, dead-letter handling, and script execution through a local control plane
- Why it matters: it solves a real developer pain point around API rate limits and multi-key workloads
- Current maturity: active public local infrastructure tool with concrete architecture and API design

### graphstore-base

- Repo: https://github.com/orkait/graphstore-base
- Summary: earlier public graphstore line focused on in-memory agent memory
- What it does: provides the core graph/memory concepts such as associative recall, belief management, TTL-backed working memory, and a readable DSL
- Why it matters: it shows the conceptual foundation behind the broader graphstore direction
- Current maturity: useful supporting public project, but graphstore is the more complete current flagship

## Coming Soon

### BooleanStack

- Status: coming soon
- What it is: a learning and practice product focused on data structures, algorithms, system design, and software engineering skill development
- Public positioning: mention only as an upcoming product line, not as a fully public current offering

### Zen

- Status: coming soon
- What it is: an AI-powered mockup and wireframe generation platform focused on turning prompts into interactive UI concepts
- Public positioning: mention only as an upcoming product line, not as a fully public current offering

## What We Do Not Claim

- We do not present archived repos as active products.
- We do not describe thin, empty, or low-signal public repositories as flagship work.
- We do not claim features, timelines, or roadmap details that are not written in this knowledge base.
- We do not treat private repositories as public products, except for small curated sneak peeks in the Coming Soon section.
