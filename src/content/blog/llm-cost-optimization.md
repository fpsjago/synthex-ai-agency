---
title: "LLM Cost Optimization: How We Cut a Client's AI Bill by 73%"
description: "Running LLMs at scale is expensive—until you optimize. Here's the exact playbook we used to reduce a client's monthly LLM spend from $180K to $49K without degrading output quality."
publishDate: "2025-02-03"
author: "Marcus Thompson"
category: "Engineering"
coverImage: "/images/blog-cost-optimization.jpg"
tags: ["cost", "LLM", "optimization", "engineering", "production"]
featured: false
readTime: 10
---

## The Problem Nobody Talks About

Everyone talks about what LLMs can do. Almost nobody talks about what they cost at scale.

When our client came to us in Q3 2024, they were running 4.2 million LLM requests per day across 12 different use cases. Their monthly bill was $180,000—and growing 25% month-over-month. At that trajectory, they'd be spending $2.4M per year on LLM calls within 12 months.

We reduced that bill to $49,000 per month within 8 weeks. Here's exactly how.

## The Audit

Before optimizing anything, we instrumented every LLM call with cost tracking, latency measurement, and output quality scoring. Most teams skip this step. Don't.

After two weeks of data collection, the breakdown was revealing:

- 38% of costs came from 3 use cases with straightforward, templated outputs
- 24% came from a summarization pipeline processing the same documents repeatedly
- 19% came from unnecessarily large context windows
- 12% came from using GPT-4 for tasks a smaller model could handle
- 7% came from inefficient prompt structures adding 500+ tokens to every call

## Optimization 1: Model Routing (Saved ~$52K/month)

The biggest win was the most obvious: using the right model for each task.

We benchmarked every use case against a range of models:

- **GPT-4o mini / Claude Haiku** for classification, routing, extraction from structured data
- **GPT-4o / Claude Sonnet** for reasoning, generation, complex extraction
- **o1 / Claude Opus** for nothing in production (reserved for offline processing)

The rule of thumb: if a task doesn't require multi-step reasoning over complex inputs, it should not be going to your most expensive model.

We built a routing layer that selects the model based on task type, input complexity (measured by entropy of the input text), and latency requirements. Tasks that previously defaulted to GPT-4 now use GPT-4o mini 71% of the time—at 15x lower cost.

Quality impact: negligible. We measured output quality before and after on a blinded eval set. The cheaper model performed within 2% on average, and on some tasks (simple extraction, classification) it actually outperformed.

## Optimization 2: Caching (Saved ~$34K/month)

The summarization pipeline was processing 80,000 documents per day—but many of those documents were being processed multiple times. Legal contracts were being summarized for every downstream use case separately. Product descriptions were being formatted differently for each of six endpoints.

We implemented a two-tier caching system:

**Semantic caching**: When a new query comes in, we check if it's semantically similar to a cached query (using a fast embedding model + vector similarity). If similarity > 0.95, we return the cached response. This is particularly effective for customer-facing applications where many users ask the same questions.

**Deterministic caching**: For pipelines that process the same documents repeatedly, we cache by document hash. If the document hasn't changed, we return the cached result instantly.

Cache hit rate after implementation: 34% across all use cases. That's 34% of calls eliminated entirely.

## Optimization 3: Context Window Optimization (Saved ~$22K/month)

Tokens cost money. Every token you send that isn't necessary is waste.

We ran a token audit on the top 20 highest-volume prompts. The findings were embarrassing (and typical):

- System prompts that were 1,200 words when 200 words conveyed the same information
- Retrieved documents being sent in full when only specific sections were relevant
- Conversation history being included in full when only the last 3-5 turns were needed
- Whitespace, repetition, and verbose instructions throughout

After prompt surgery on the top 20 prompts, average context window size dropped from 4,100 tokens to 1,800 tokens—a 56% reduction.

**Prompt optimization tip**: Write your system prompt as if you're paying $0.01 per word. Every sentence should earn its place. If a sentence doesn't change model behavior, delete it.

## Optimization 4: Batching (Saved ~$13K/month)

Many of our client's use cases were processing items one at a time that could have been batched. LLM APIs support batch processing at significant discounts (typically 50% off).

For offline use cases (nightly enrichment pipelines, batch document processing, weekly reporting), we switched to async batch processing. The latency tradeoff (hours instead of seconds) was acceptable for these workflows.

## Optimization 5: Output Length Control (Saved ~$9K/month)

LLM output tokens cost money too—usually more than input tokens.

For structured output use cases, we added explicit length constraints to our prompts and switched to JSON mode where applicable. This eliminated verbose preambles, reduced unnecessary explanations, and produced cleaner outputs that downstream systems could parse more reliably.

For generation use cases, we analyzed the distribution of output lengths and found that 30% of outputs were longer than users ever read. Adding explicit length guidance ("Respond in 3-4 sentences maximum") reduced output tokens by 40% on affected use cases.

## The Results

After 8 weeks:

| Category | Monthly Spend Before | Monthly Spend After |
|----------|---------------------|---------------------|
| Model costs | $180,000 | $49,000 |
| Infra (caching layer) | $0 | $2,400 |
| **Total** | **$180,000** | **$51,400** |

Total savings: $128,600/month ($1.54M annualized). The caching infrastructure paid for itself in under 3 days.

Output quality, measured by our continuous eval system: within 1.8% of pre-optimization baseline.

## What To Do First

If you're spending more than $10K/month on LLMs and haven't done a systematic cost audit, start there. The answer is almost always:

1. Instrument everything (you can't optimize what you can't measure)
2. Route to smaller models for simpler tasks
3. Implement semantic and deterministic caching
4. Audit your context windows ruthlessly

The savings are usually sitting in plain sight.
