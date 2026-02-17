---
title: "RAG in Production: The Architecture Guide Nobody Else Will Give You"
description: "Most RAG tutorials show you how to build a demo. This guide shows you how to build a production system that doesn't hallucinate, handles edge cases, and scales to millions of queries."
publishDate: "2025-01-28"
author: "Sarah Kim"
category: "Technical"
coverImage: "/images/blog-rag-architecture.jpg"
tags: ["RAG", "LLM", "architecture", "vector-db", "production"]
featured: false
readTime: 12
---

## The Gap Between Demo and Production

Building a RAG prototype is easy. You chunk some documents, embed them, stick them in a vector database, and write a prompt that includes retrieved context. It works beautifully in your Jupyter notebook.

Then you try to deploy it. And everything falls apart.

Retrieval is inconsistent. Answers conflict with each other. The system doesn't know what it doesn't know. Costs spiral as queries get more complex. Response times creep up.

This guide covers what the tutorials don't: the architectural decisions that separate prototype RAG from production RAG.

## Architecture Decision 1: Chunking Strategy

The single most impactful factor in RAG quality is how you chunk your documents. Most tutorials tell you to split by token count. This is wrong.

**Semantic chunking** outperforms fixed-size chunking by 20-40% on most benchmarks. Instead of splitting every 512 tokens, you split at natural semantic boundaries—paragraph breaks, section headers, list items.

But semantic chunking alone isn't enough. You need **chunk overlap** (include the last 100 tokens of the previous chunk to preserve context) and **parent document retrieval** (retrieve the chunk, but return the full parent document or section as context).

For structured documents (legal contracts, financial reports), we've had success with **hierarchical chunking**: section → paragraph → sentence, with metadata linking each level. This lets you retrieve at the right granularity for each query.

## Architecture Decision 2: Embedding Model Selection

Not all embedding models are created equal, and the best general-purpose model isn't always the best for your domain.

For general enterprise content (documentation, emails, support tickets), **text-embedding-3-large** from OpenAI delivers excellent performance. For technical content (code, scientific papers), **Voyage AI**'s code and science models significantly outperform general models.

But here's the decision most people miss: **fine-tuned embeddings**. If you have domain-specific data and can generate training pairs (query → relevant document), fine-tuning your embedding model can improve retrieval accuracy by 30-50% on domain-specific queries. We do this for most production clients with sufficient data volume.

## Architecture Decision 3: Hybrid Search

Pure semantic search misses exact matches. Pure keyword search misses semantic similarity. The answer is hybrid search—and it's not optional for production systems.

The standard approach is **Reciprocal Rank Fusion (RRF)**: run both semantic and keyword search independently, then combine the ranked lists using the RRF formula. This simple approach consistently outperforms either search method alone.

Most modern vector databases support hybrid search natively: Qdrant (sparse + dense), Weaviate (BM25 + vectors), Elasticsearch (kNN + BM25). Use it.

## Architecture Decision 4: Re-ranking

Even with good retrieval, the top-k results might not be in the right order. A **cross-encoder re-ranker** (like Cohere Rerank or a fine-tuned BERT model) reads the query and each retrieved document together and produces a relevance score that's far more accurate than vector similarity alone.

The tradeoff: re-ranking adds 200-400ms of latency. For most enterprise applications, this is acceptable. For real-time chat interfaces, you might need to parallelize or skip re-ranking for simpler queries.

## Architecture Decision 5: Query Transformation

Users don't always ask questions in a way that matches how information is stored. **Query transformation** addresses this.

We use three techniques in production:

1. **HyDE (Hypothetical Document Embeddings)** — Generate a hypothetical answer to the query, then use that as the search query. Counterintuitive but highly effective.

2. **Query expansion** — Generate 3-5 alternative phrasings of the query and retrieve for each. Union the results before re-ranking.

3. **Query decomposition** — For complex multi-part questions, break them into sub-questions and answer each independently before synthesizing.

## Architecture Decision 6: Knowing What You Don't Know

Production RAG systems must handle out-of-scope queries gracefully. Nothing destroys user trust faster than confident hallucination.

We build a **confidence evaluation** step into every RAG pipeline:

1. After retrieval, score the relevance of the top-k documents to the query
2. If no documents exceed a relevance threshold (typically 0.7), flag the query as out-of-scope
3. Return an honest "I don't have information about that" rather than a hallucinated answer

You can also use a separate classifier to detect out-of-scope queries before retrieval—cheaper and faster, but less accurate.

## Architecture Decision 7: Evaluation Infrastructure

You cannot improve what you don't measure. Production RAG requires continuous evaluation.

We run three evaluation types:

- **Retrieval evaluation** — Are the right documents being retrieved? Use RAGAS or a custom framework with labeled query-document pairs.
- **Answer quality evaluation** — Is the generated answer accurate and complete? Requires human annotation or an LLM-as-judge approach.
- **End-to-end pipeline tests** — Regression tests against a fixed set of queries to catch regressions when you update any component.

Don't wait until you're in production to build evaluation infrastructure. Build it during development so you can iterate with confidence.

## The Production Architecture

Putting it all together, a production RAG system looks like:

```
User Query → Query Classification → Query Transformation →
Parallel Retrieval (Semantic + Keyword) → Re-ranking →
Context Assembly → LLM Generation → Confidence Evaluation →
Response (or Graceful Fallback)
```

Each component is independently deployable, scalable, and measurable. The whole pipeline runs in 800ms-2s for most queries—fast enough for conversational applications.

## Common Mistakes to Avoid

1. **Using one vector store for everything** — Separate your operational store (frequently updated) from your archival store (rarely updated). Different update patterns need different architectures.

2. **Ignoring metadata filters** — Vector similarity alone often retrieves irrelevant documents from different time periods, departments, or product lines. Always design your metadata schema before you start ingesting.

3. **Skipping the eval step** — "It seems to work" is not a production standard. Build your eval harness before you deploy.

4. **Chunking PDFs naively** — PDFs are not plain text. Tables, footnotes, headers, and multi-column layouts all cause chunking failures. Use a proper PDF extraction library (LlamaParse, Unstructured, AWS Textract) for production workloads.

RAG is powerful. Production RAG requires engineering discipline. The gap is real, but it's closeable.
