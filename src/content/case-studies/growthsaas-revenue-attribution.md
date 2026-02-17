---
title: "Revenue Attribution AI for SaaS Growth"
client: "GrowthSaaS"
category: "Data Pipelines"
summary: "GrowthSaaS couldn't answer the most basic question: which marketing channels actually drove revenue? We built an AI-powered attribution model that finally gave their CMO reliable answers—and unlocked 3.2x ROAS."
result: "3.2x improvement in marketing ROAS within 90 days"
coverImage: "/images/case-study-growthsaas.jpg"
year: "2023"
tags: ["attribution", "data-pipeline", "marketing", "analytics", "SaaS"]
featured: false
---

## The Challenge

GrowthSaaS was spending $1.8M per month on marketing across 12 channels: paid search, paid social, content, influencer, email, events, and more. Their analytics stack (GA4 + Salesforce) could track clicks but couldn't connect marketing touches to actual closed revenue.

The result: their CMO was making million-dollar budget decisions based on last-click attribution—a model that systematically undervalued upper-funnel channels and overvalued bottom-funnel ones. They suspected it was costing them dearly but had no way to prove it.

## Our Approach

### Phase 1: Data Unification (Weeks 1-3)

GrowthSaaS had revenue data spread across five systems: Salesforce, Stripe, ChartMogul, HubSpot, and a custom billing system. We built a unified data pipeline that:

- Ingested data from all five sources every 15 minutes
- Resolved customer identities across systems (a person might be `john.doe@company.com` in Salesforce but `johndoe` in their billing system)
- Created a single source of truth for every customer's journey from first touch to revenue

### Phase 2: AI Attribution Model (Weeks 4-6)

Rather than using a traditional algorithmic attribution model (Shapley, time-decay, etc.), we built a machine learning model trained on GrowthSaaS's actual conversion data.

The model:
- Ingests the full sequence of touchpoints for every customer
- Assigns fractional credit to each touchpoint based on its predictive relationship to revenue
- Updates weekly as new conversion data comes in
- Provides confidence intervals so the team knows when to trust the numbers

### Phase 3: Decision Intelligence Layer (Weeks 7-8)

Raw attribution data isn't enough—you need to know what to do with it. We built an AI layer that:

- Generates weekly budget recommendations by channel
- Explains the reasoning in plain English
- Highlights anomalies and emerging trends
- Integrates directly with their media buying tools to automate budget shifts

## Results

The model revealed what the CMO had long suspected: content marketing and LinkedIn events were dramatically undervalued by last-click attribution, while branded search was getting credit for conversions it didn't drive.

| Metric | Before | After (90 days) |
|--------|--------|---------|
| Marketing ROAS | 2.1x | 6.7x |
| Cost per acquired customer | $4,200 | $1,320 |
| Revenue from top channels | +41% | — |
| Attribution confidence | ~30% | ~89% |
| Monthly budget waste eliminated | — | $620K |

By reallocating budget away from channels the model identified as low-attribution and toward high-attribution channels, GrowthSaaS improved their ROAS by 3.2x within 90 days.

## Technology Stack

Python · dbt · Snowflake · Apache Airflow · XGBoost · LightGBM · Tableau · Salesforce API · Stripe API
