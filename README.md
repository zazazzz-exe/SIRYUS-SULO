# SULO

An AI that brings ordinary Filipinos out of the dark on the documents that decide their rights — without ever pretending to be a lawyer. Amazon Comprehend · Quantized LLM · OCR · ASR/TTS · Vite · React.

SULO is an AI-powered legal-literacy and document-understanding platform. A Filipino points their phone at a contract, a notice, or a loan agreement — by upload, photo, or voice — and SULO explains, in plain language and in their own tongue, what the document is, what it obligates them to do, what deadlines it carries, and which clauses deserve a second look. It does not give legal advice. It gives legal understanding, and it routes people to real help when they need it so that safety lives in comprehension, not in dense legal jargon.

---

## Problem & Solution

### The Problem: A Crisis of Legal Comprehension
Legally navigating daily life in the Philippines is structurally broken, leaving millions of vulnerable citizens exposed to exploitation due to three main barriers:
* **The Legal Access Gap:** According to the World Justice Project Survey, **80% of Filipinos have zero access to legal assistance**. Of the minor 20% who manage to get guidance, 72% depend purely on unverified advice from friends and family—leaving a mere **15% who ever consult an actual attorney**. 
* **The Language & Jargon Barrier:** For nearly a century, legal drafting and law instruction in the Philippines have been executed entirely in complex English legalese. With 8 major regional languages and over 85 distinct dialects, standard legal agreements are fundamentally built for lawyers, not ordinary signees.
* **The Comprehension Deficit:** The PSA FLEMMS reports that **only 70.8% of Filipinos aged 10–64 are functionally literate** under modern analytical standards. This translates to **24.8 million citizens struggling to comprehend what they read**, including 21% of senior high school graduates who drop below baseline expectations. 

Consequently, predatory online loan apps manipulate contracts with hidden interest rates for over **47.5 million users**, and workplace violations remain so rampant that DOLE inspections required **3.28 million workers to recover stolen or lost wages**. As DOLE explicitly records: *a lack of basic awareness among workers is the primary reason abuses persist.*

### The Solution: Literacy, Not Advice
SULO solves this crisis by shifting the paradigm from inaccessible legal defense to localized, upfront document comprehension. 
* **Accessibility Over Jurisprudence:** SULO acts as an immediate, non-custodial, and easy-to-use bridge. It strips away high-barrier legal constraints by accepting multimodal inputs—photos of physical text, document uploads, or voice recordings in native code-switching configurations (like Taglish).
* **AI-Powered Demystification:** Using an integrated pipeline of Amazon Comprehend for document entity categorization, OCR for scanning physical pages, and localized ASR/TTS engines, the platform identifies precisely *who* is bound, *what* monetary obligations or hidden fees are present, and *when* deadlines fall.
* **Grounding via RAG & Quantization:** Instead of hallucinating answers, SULO matches text metrics directly against a single source of truth—a verified, date-stamped knowledge base containing true Philippine legal frameworks (such as the Labor Code and RA 11106). The resulting plain-language summaries are spoken back or displayed side-by-side via a compressed, mobile-responsive Quantized LLM, protecting user safety through understanding before a pen ever hits paper.

---

## Demo & submission

Quick links for reviewers — everything the submission rubric asks for, in one place.

### Live demo

* **Deployed app:** `(input this here)` — try an image upload or a voice interaction.
* **Walkthrough video:** `(input this here)` — full feature tour showing legal text-to-speech routing.

### Mobile responsive

Captured on Android Chrome at 1080×2400 — hero layout, camera-capture flow, typography, and interactive risk highlights all reflow cleanly as a Progressive Web App (PWA) layout without horizontal scroll.

### CI/CD

Runs on every push to main and on every PR: `npm ci` → `npm run build` against the frontend. Workflow lives at `(input this here)`.

## Core Backend & Model Pipelines

* **Amazon Comprehend NLP Routing Service:** `(input this here)`
* **Quantized LLM Inference Host Location:** `(input this here)`
* **Vector Store Semantic Search Endpoint:** `(input this here)`
* **Sample Document Analysis / Processing Log ID:** `(input this here)`

## Deployed Infrastructure

The legal routing, text extraction, and parsing service is live.

* **Service/Model ID:** `(input this here)`
* **Type:** Quantized LLM Pipeline / Custom NLP Classifier / RAG Engine
* **Network/Host:** `(input this here)`
* **Explorer/Logs:** `(input this here)`

---

## Concept vocabulary

| Brand Word | Means |
| :--- | :--- |
| **SULO** | Filipino for *torch*—bringing clarity to hidden, dark legal clauses. |
| **Scan/Upload (OCR)** | Submitting an image of a document to be transformed into machine-readable text. |
| **Voice Query (ASR)** | Submitting audio or spoken code-switching language to ask questions about obligations. |
| **Plain Language (TTS)** | The spoken and written overview ("Ano ang ibig sabihin nito sa madaling salita?"). |
| **Red Flag** | A clause that is heavily skewed against the user or potentially illegal under current DOLE/Philippine regulations. |

---

## How it works

1. **Capture & Extract (OCR / ASR)** — Point a phone at a contract or speak directly into the app. SULO reads images or transcribes spoken Filipino/Taglish.
2. **Auto-Classification & Language Routing** — The system integrates Amazon Comprehend to detect the language profile and document type to pull up specific legal compliance frameworks.
3. **Semantic Grounding (RAG & Vector Store)** — The system queries a curated knowledge base of true legal provisions (Labor Code, current amendments) to prevent AI hallucinations.
4. **Local Comprehension Execution** — A compressed, Quantized LLM reads the context to highlight deadlines, monetary balances, and suspicious clauses.
5. **Clarity Flows (TTS)** — The user reads or listens to an interactive, side-by-side translation to safely understand their rights without entering legal advice boundaries.

---

## Project structure

The processing repository is organized into a modular pipeline; its core public parameters match standard text interpretation rules for seamless compatibility.

## Architecture

| Layer | Stack |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind, Progressive Web App (PWA) |
| **AI Engine** | Custom Amazon Comprehend NLP Pipeline, Quantized Mobile-Optimized LLM, RAG |
| **Data Engine** | Vector Store (Semantic Embeddings Retrieval Index) |
| **Perception** | OCR (Text Extraction) & ASR / TTS (Speech Components) |

---

## Environment variables (frontend)

Copy `frontend/.env.example` to `frontend/.env` and set:

* `VITE_COMPREHEND_API_URL` — Backend processing pipeline URL.
* `VITE_LOCAL_LLM_GATEWAY_URL` — Quantized LLM endpoint interface for real-time contract Q&A.
* `VITE_VECTOR_STORE_URL` — RAG knowledge base search interface.
* `VITE_APP_ENV` — Development or production indicator.
* `(input any extra environment variables here)`

The example variables in `.env.example` are for development purposes only.

## Local development

1. **Shared Knowledge Base API:** `(input this here)`
2. **Frontend Setup:** `(input commands like npm run dev here)`
3. **Model Weights Deployment:** `(input instructions for loading quantized LLM here)`

## Deploying on Vercel

The Vite app lives at `frontend`, not the repository root.

1. Project → Settings → General → Root Directory → `frontend`.
2. Framework Preset: Vite. Build Command: `npm run build`. Output Directory: `dist`.
3. Add the `VITE_*` variables from `frontend/.env.example`.
4. The included `vercel.json` adds a SPA rewrite so client routes load `index.html`.

---

## Privacy & custody

* **Non-custodial Data** — Sensitive Personal Identifiable Information (PII) like TIN, SSS, and bank accounts are flagged locally to warn you before data transmission occurs.
* **On-Device Optimization** — Our core quantized models aim to transition workflows into local execution blocks to minimize remote exposures of sensitive documents.

---

### 💡 The Connecting Thread
> Filipinos are signing documents and entering agreements they do not fully understand. By the time they realize what happened, it is already too late. The law exists. The rights exist. The gap is in comprehension. 
> 
> **A right you cannot read, in a language you weren't taught, explained by a lawyer you can't afford—is not really a right at all.**

---

Built for the Hackathon. Powered by SULO Core Engineering. Made with care.
