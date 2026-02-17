---
title: "AI Customer Service Handling 10K Tickets/Day"
client: "RetailBrand"
category: "LLM Integration"
summary: "RetailBrand's support team was drowning in 10,000+ daily customer tickets during peak season. We built an AI-first support system that resolves 78% of tickets without human intervention."
result: "78% auto-resolution rate, CSAT improved from 71% to 89%"
coverImage: "/images/case-study-retailbrand.jpg"
year: "2024"
tags: ["customer-service", "LLM", "RAG", "support", "retail"]
featured: true
---

## The Challenge

RetailBrand sells across 8 countries and 4 languages. During their peak season (November-January), their support team received up to 15,000 tickets per day—order tracking, returns, product questions, complaints, and sizing queries.

Their existing chatbot (a rules-based system built in 2019) could only handle 18% of tickets automatically. The rest went to human agents, causing 4-6 day response times and angry customers. CSAT had fallen to 71%.

They had six weeks before the next peak season. We had to move fast.

## Our Approach

### Week 1-2: Data Architecture

We ingested 3 years of historical support tickets, product catalog data, order management system exports, and return policy documents. This became the foundation for our RAG system.

We chose Qdrant as the vector database for its excellent hybrid search capabilities and fast retrieval times. Every support ticket, product FAQ, and policy document was chunked, embedded using text-embedding-3-large, and indexed.

### Week 3-4: Agent Development

We built a multi-stage resolution system:

1. **Classification** — Incoming tickets are classified by intent (tracking, return, product, complaint, other) and urgency
2. **Context Retrieval** — Relevant order history, product info, and policy docs are retrieved from both the vector store and operational databases
3. **Resolution Generation** — GPT-4o generates a personalized response in the customer's language, grounded in retrieved context
4. **Confidence Scoring** — Each response gets a confidence score; low-confidence responses are escalated to humans with full context pre-loaded

### Week 5-6: Integration & Testing

We integrated with RetailBrand's Zendesk instance via API, built an operator dashboard for monitoring, and ran parallel testing with 500 tickets per day alongside human agents.

## Results

The system went live three days before peak season. It handled the load without breaking a sweat.

| Metric | Before | After |
|--------|--------|-------|
| Auto-resolution rate | 18% | 78% |
| Average response time | 4.6 days | 2.3 minutes |
| CSAT score | 71% | 89% |
| Cost per ticket | $12.40 | $1.80 |
| Human agents needed | 120 | 28 |

The 92 agents freed up were redeployed to complex complaints and VIP customer management—work that genuinely benefits from human judgment.

## Technology Stack

GPT-4o · Qdrant · Python · FastAPI · Zendesk API · Redis · PostgreSQL · Next.js dashboard
