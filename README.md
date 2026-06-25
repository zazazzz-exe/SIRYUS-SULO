# SULO

### 👥 Team Siryus
* Zarrah Exekiel Valles
* Vincent Adolf Sablay Adversary
* Vehniah P. Samson
* Marc Justin Lee G. Granada

---

### 📋 Project Submission Details
* **Selected Project Case:** 2
* **Scope / Focus Area:** Employment & Labor (Minimum Viable Product Focus)
* **Tagline:** Understandable for every Filipino
* **Positioning:** Literacy, not advice. An AI that brings ordinary Filipinos out of the dark on the documents that decide their rights — without ever pretending to be a lawyer.

**Tech Stack:** Quantized LLM · OCR · ASR/TTS · Vite · React

SULO is an AI-powered legal-literacy and document-understanding platform. A Filipino points their phone at a contract, a notice, or a loan agreement — by upload, photo, or voice — and SULO explains, in plain language and in their own tongue, what the document is, what it obligates them to do, what deadlines it carries, and which clauses deserve a second look. It does not give legal advice; it gives legal understanding, and it routes people to real help when they need it so that safety lives in comprehension, not in dense legal jargon.

---

## 🚀 Scope of Development

### What We Have Developed (Current MVP Status)
* **Multimodal Capture & Extraction Pipeline:** Built a responsive PWA layout capable of taking structural physical uploads or image photos (processed via OCR conversion) along with mixed voice utterances/Taglish code-switching inputs (processed via ASR engines).
* **Hallucination-Proof RAG Engine:** Wired an embedding collection (Vector Store Semantic Index) grounded natively against a single date-stamped truth index containing true legal anchors like the Philippine Labor Code (Presidential Decree No. 442) and the FSL Act (RA 11106).
* **Quantized LLM Translation Interface:** Integrated a compressed inference layer that transforms dense legal legalese into highly localized plain-language text blocks alongside synchronous Text-to-Speech playback streams.

### What We Will Develop (Future Roadmap)
* **Fully On-Device Offline Optimization:** Porting the core quantized models directly onto local client device execution blocks to minimize remote server exposures and ensure zero-connectivity environments (like remote provinces) still gain total document clarity.
* **Barangay & Court Summons Domain Pack:** Expanding semantic mapping capabilities from labor contexts into localization suites for standard physical community mediation documents and formal lower-court orders.
* **Proactive PII Redaction Engine:** Local preprocessing scripts to structurally mask personal identifying identifiers (TIN, SSS, and banking details) before any cloud-bound custom pipeline executions.

---

## 🛑 The Problem

### 1. The Language Barrier in Law
In the Philippines, everyday documents that govern people's lives are written in technical English, dense legal jargon, or overly complex Filipino. Because of this, ordinary citizens are systematically locked out of understanding their own rights and obligations.
* **Critical Contexts:** It affects employment contracts, rental agreements, loan forms, government notices, and court summons.
* **The Reality:** *"A right you cannot read, in a language you weren't taught, explained by a lawyer you can't afford — is not really a right at all."*

### 2. Severe Real-World Consequences
Signing documents blindly leads directly to exploitation and financial devastation:
* **Labor Exploitation:** Violations like unpaid overtime, illegal deductions, missing 13th-month pay, and unremitted SSS/PhilHealth contributions run rampant. DOLE records explicitly cite a lack of awareness as the primary reason these abuses persist.
* **Predatory Lending:** Over 47.5 million Filipinos used loan apps in 2023. Countless borrowers locked themselves into impossible repayment terms and hidden fees they simply did not comprehend.
* **Navigational Fear:** Many victims never file complaints because the formal legal system feels too complicated and intimidating to navigate.

---

## 💡 The Solution: Project SULO (Torch)

SULO is an AI-powered legal-literacy platform designed to bring ordinary Filipinos out of the dark regarding the documents that govern their lives—without ever pretending to be a lawyer. SULO transforms dense legal walls of text into instant, conversational clarity.

### ✨ Key Capabilities
* **📸 Multi-Modal Input:** Users can easily point their phone camera at a physical document, upload a digital file, or speak directly into the app.
* **🗣️ Plain-Language & Native Translation:** SULO strips away complicated jargon and explains the document using clear language in the user's chosen tongue, fully supporting native code-switching (Taglish).
* **🔍 Automated Entity & Risk Recognition:**
  * **Identifies Key Elements:** Instantly extracts and highlights party names, exact monetary values, hidden fees, interest rates, and critical legal deadlines.
  * **Flags Red Flags:** Automatically isolates unusual or potentially illegal clauses (such as predatory terms or severe non-compete overreaches) so users know exactly what deserves a second look.
* **🤝 Guardrails & Actionable Guarding:** SULO strictly provides literacy, not advice. It builds a baseline of understanding and seamlessly routes vulnerable users to legitimate, institutional help (such as the Public Attorney's Office or DOLE) when an escalatable issue is identified.

---

## 🎬 Demo & Submission
Quick links for reviewers — everything the submission rubric asks for, in one place.

### Live Demo
* Deployed app: `(WIP)` — try an image upload or a voice interaction.
* Walkthrough video: `(WIP)` — full feature tour showing legal text-to-speech routing.

### Mobile Responsive
Captured on Android Chrome at 1080×2400 — hero layout, camera-capture flow, typography, and interactive risk highlights all reflow cleanly as a Progressive Web App (PWA) layout without horizontal scroll.

---

## 🛠️ CI/CD
Runs on every push to main and on every PR: `npm ci` -> `npm run build` against the frontend.  
Workflow lives at `(WIP)`.

---

## 📡 Core Backend & Model Pipelines
* **Quantized LLM Inference Host Location:** `(WIP)`
* **Vector Store Semantic Search Endpoint:** `(WIP)`
* **Sample Document Analysis / Processing Log ID:** `(WIP)`

---

## 🚀 Deployed Infrastructure
The legal routing, text extraction, and parsing service is live.
* **Service/Model ID:** `(WIP)`
* **Type:** Quantized LLM Pipeline / Custom NLP Classifier / RAG Engine
* **Network/Host:** `(WIP)`
* **Explorer/Logs:** `(WIP)`

---

## 📖 Concept Vocabulary

| Brand Word | Means |
| :--- | :--- |
| **SULO** | Filipino for torch — bringing clarity to hidden, dark legal clauses. |
| **Scan/Upload (OCR)** | Submitting an image of a document to be transformed into machine-readable text. |
| **Voice Query (ASR)** | Submitting audio or spoken code-switching language to ask questions about obligations. |
| **Plain Language (TTS)** | The spoken and written overview ("Ano ang ibig sabihin nito sa madaling salita?"). |
| **Red Flag** | A clause that is heavily skewed against the user or potentially illegal under current DOLE/Philippine regulations. |

---

## 🔄 How It Works

1. **Capture & Extract (OCR / ASR)** — Point a phone at a contract or speak directly into the app. SULO reads images or transcribes spoken Filipino/Taglish.
2. **Auto-Classification & Language Routing** — The system integrates Amazon Comprehend to detect the language profile and document type to pull up specific legal compliance frameworks.
3. **Semantic Grounding (RAG & Vector Store)** — The system queries a curated knowledge base of true legal provisions (Labor Code, current amendments) to prevent AI hallucinations.
4. **Local Comprehension Execution** — A compressed, Quantized LLM reads the context to highlight deadlines, monetary balances, and suspicious clauses.
5. **Clarity Flows (TTS)** — The user reads or listens to an interactive, side-by-side translation to safely understand their rights without entering legal advice boundaries.

---

## 📂 Project Structure
The processing repository is organized into a modular pipeline; its core public parameters match standard text interpretation rules for seamless compatibility.

---

## 💻 Local Development

1. **Shared Knowledge Base API:** `(WIP)`
2. **Frontend Setup:** `(WIP)`
3. **Model Weights Deployment:** `(WIP)`

### Deploying on Vercel
The Vite app lives at `frontend`, not the repository root.
1. Project -> Settings -> General -> Root Directory -> `frontend`.
2. Framework Preset: **Vite**.  
   Build Command: `npm run build`. Output Directory: `dist`.
3. Add the `VITE_*` variables from `frontend/.env.example`.
4. The included `vercel.json` adds a SPA rewrite so client routes load `index.html`.

---

## 🔒 Privacy & Custody
* **Non-custodial Data:** Sensitive Personal Identifiable Information (PII) like TIN, SSS, and bank accounts are flagged locally to warn you before data transmission occurs.
* **On-Device Optimization:** Our core quantized models aim to transition workflows into local execution blocks to minimize remote exposures of sensitive documents.

---

> 💡 **The Connecting Thread**
> Filipinos are signing documents and entering agreements they do not fully understand. By the time they realize what happened, it is already too late. The law exists. The rights exist. The gap is in comprehension. A right you cannot read, in a language you weren't taught, explained by a lawyer you can't afford—is not really a right at all.

***Built for the Hackathon. Powered by SULO Core Engineering. Made with care.***
