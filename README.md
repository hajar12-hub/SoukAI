# SoukAI — Your AI Procurement Team

SoukAI is an AI procurement team for SMEs. It discovers qualified suppliers, negotiates with several of them in parallel, turns verified terms into competitive leverage, and recommends the offer that best fits the buyer's actual mandate.

> AI negotiates. Human decides.

## Problem

SME procurement is fragmented across inboxes, spreadsheets, and informal supplier relationships. Buyers lose time, negotiating leverage, and visibility—and a low headline price can hide delivery, warranty, and reliability risks.

## Solution

SoukAI gives each procurement mission a clear mandate: budget, delivery constraints, required terms, and weighted priorities. It then coordinates sourcing, negotiation, comparison, and recommendation while preserving human control.

## How SoukAI Works

1. Define a procurement mandate and decision priorities.
2. Discover and qualify relevant suppliers.
3. Run deterministic, multi-round negotiations in parallel.
4. Verify received terms and share useful benchmarks across negotiations.
5. Score final offers against business constraints—not price alone.
6. Present a recommendation for explicit human approval.

## Cross-Negotiation Intelligence

SoukAI's core innovation is a shared intelligence layer across supplier negotiations. A verified price from one supplier can become anonymous pricing leverage with another; a verified delivery commitment can be used to request a faster schedule elsewhere. Supplier identities remain protected.

## Verified Intelligence

Competitive leverage is created only from received mock offers in the deterministic scenario. The UI visually traces information from supplier quote to verified benchmark, leverage action, and improved term. SoukAI never invents a competing offer.

## Decision Engine

The frontend uses weighted procurement criteria and hard mandate checks. In the demo, Mobilia Pro is cheapest at 41,900 MAD, but its 25-day delivery violates the 10-day maximum. CasaPro Business is recommended at 94/100 because it combines a competitive price with 8-day delivery, a 3-year warranty, and strong reliability.

## Human-in-the-Loop Safety

SoukAI cannot sign a contract, place an order, or initiate payment. Approval selects a supplier only for the next internal procurement step. Every negotiation action has a concise, product-level audit explanation.

## Business Model

You only pay when SoukAI saves you money. The demo shows 5,500 MAD in verified savings, a 15% success fee of 825 MAD, and 4,675 MAD in net customer savings.

## Demo Scenario

- Request: 500 ergonomic office chairs
- Budget: 50,000 MAD
- Required delivery: 10 days maximum
- Minimum warranty: 3 years
- Suppliers: Atlas Workspace, CasaPro Business, Mobilia Pro
- Three deterministic negotiation rounds with manual, auto, pause, next-step, and reset controls

## Technology

- React + Vite
- JavaScript
- Tailwind CSS
- Lucide React
- Recharts
- Browser localStorage for durable demo state

## How to Run

```bash
npm install
npm run dev
```

Build the production version:

```bash
npm run build
npm run preview
```

## Future Integrations

Gmail, WhatsApp Business, ERP, CRM, and supplier marketplaces are explicitly presented as product-roadmap capabilities. The local prototype has no external API, backend, authentication, or autonomous purchasing dependency.
