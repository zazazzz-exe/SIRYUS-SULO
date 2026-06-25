# SULO

### 👥 Team Siryus
* [cite_start]Zarrah Exekiel Valles [cite: 134]
* [cite_start]Vincent Adolf Sablay Adversary [cite: 134]
* [cite_start]Vehniah P. Samson [cite: 134]
* [cite_start]Marc Justin Lee G. Granada [cite: 134]

---

### 📋 Project Submission Details
* [cite_start]**Selected Project Case:** 2 [cite: 134]
* [cite_start]**Scope / Focus Area:** Employment & Labor (Minimum Viable Product Focus) [cite: 134]
* [cite_start]**Tagline:** Understandable for every Filipino [cite: 134]
* **Positioning:** Literacy, not advice. [cite_start]An AI that brings ordinary Filipinos out of the dark on the documents that decide their rights — without ever pretending to be a lawyer. [cite: 134]

[cite_start]**Tech Stack:** Amazon Comprehend · Quantized LLM · OCR · ASR/TTS · Vite · React [cite: 135]

SULO is an AI-powered legal-literacy and document-understanding platform. [cite_start]A Filipino points their phone at a contract, a notice, or a loan agreement — by upload, photo, or voice — and SULO explains, in plain language and in their own tongue, what the document is, what it obligates them to do, what deadlines it carries, and which clauses deserve a second look[cite: 136]. [cite_start]It does not give legal advice; it gives legal understanding, and it routes people to real help when they need it so that safety lives in comprehension, not in dense legal jargon[cite: 137].

---

## 🚀 Scope of Development

### What We Have Developed (Current MVP Status)
* [cite_start]**Multimodal Capture & Extraction Pipeline:** Built a responsive PWA layout capable of taking structural physical uploads or image photos (processed via OCR conversion) along with mixed voice utterances/Taglish code-switching inputs (processed via ASR engines)[cite: 141].
* [cite_start]**Amazon Comprehend NLP Routing Service:** Programmed custom entities to auto-classify incoming documents, instantly extracting bound party structures, fiscal rules, hidden penalty configurations, and time milestones[cite: 142].
* [cite_start]**Hallucination-Proof RAG Engine:** Wired an embedding collection (Vector Store Semantic Index) grounded natively against a single date-stamped truth index containing true legal anchors like the Philippine Labor Code (Presidential Decree No. 442) and the FSL Act (RA 11106)[cite: 143].
* [cite_start]**Quantized LLM Translation Interface:** Integrated a compressed inference layer that transforms dense legal legalese into highly localized plain-language text blocks alongside synchronous Text-to-Speech playback streams[cite: 144].

### What We Will Develop (Future Roadmap)
* [cite_start]**Fully On-Device Offline Optimization:** Porting the core quantized models directly onto local client device execution blocks to minimize remote server exposures and ensure zero-connectivity environments (like remote provinces) still gain total document clarity[cite: 138].
* [cite_start]**Barangay & Court Summons Domain Pack:** Expanding semantic mapping capabilities from labor contexts into localization suites for standard physical community mediation documents and formal lower-court orders[cite: 139].
* [cite_start]**Proactive PII Redaction Engine:** Local preprocessing scripts to structurally mask personal identifying identifiers (TIN, SSS, and banking details) before any cloud-bound custom pipeline executions[cite: 140].

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
[cite_start]Quick links for reviewers — everything the submission rubric asks for, in one place[cite: 159].

### Live Demo
* [cite_start]Deployed app: `(input this here)` — try an image upload or a voice interaction[cite: 160].
* [cite_start]Walkthrough video: `(input this here)` — full feature tour showing legal text-to-speech routing[cite: 161].

### Mobile Responsive
[cite_start]Captured on Android Chrome at 1080×2400 — hero layout, camera-capture flow, typography, and interactive risk highlights all reflow cleanly as a Progressive Web App (PWA) layout without horizontal scroll[cite: 162].

---

## 🛠️ CI/CD
[cite_start]Runs on every push to main and on every PR: `npm ci` $\rightarrow$ `npm run build` against the frontend[cite: 163].  
[cite_start]Workflow lives at `(input this here)`[cite: 164].

---

## 📡 Core Backend & Model Pipelines
* **Amazon Comprehend NLP Routing Service:** `(input this here)`
* **Quantized LLM Inference Host Location:** `(input this here)`
* **Vector Store Semantic Search Endpoint:** `(input this here)`
* **Sample Document Analysis / Processing Log ID:** `(input this here)`

---

## 🚀 Deployed Infrastructure
[cite_start]The legal routing, text extraction, and parsing service is live[cite: 164].
* [cite_start]**Service/Model ID:** `(input this here)` [cite: 165]
* [cite_start]**Type:** Quantized LLM Pipeline / Custom NLP Classifier / RAG Engine [cite: 165]
* [cite_start]**Network/Host:** `(input this here)` [cite: 165]
* [cite_start]**Explorer/Logs:** `(input this here)` [cite: 165]

---

## 📖 Concept Vocabulary

| Brand Word | Means |
| :--- | :--- |
| **SULO** | [cite_start]Filipino for torch — bringing clarity to hidden, dark legal clauses[cite: 166, 167]. |
| **Scan/Upload (OCR)** | [cite_start]Submitting an image of a document to be transformed into machine-readable text[cite: 167, 168]. |
| **Voice Query (ASR)** | [cite_start]Submitting audio or spoken code-switching language to ask questions about obligations[cite: 168, 169]. |
| **Plain Language (TTS)** | [cite_start]The spoken and written overview ("Ano ang ibig sabihin nito sa madaling salita?")[cite: 169, 170]. |
| **Red Flag** | [cite_start]A clause that is heavily skewed against the user or potentially illegal under current DOLE/Philippine regulations[cite: 170, 171]. |

---

## 🔄 How It Works

1. **Capture & Extract (OCR / ASR)** — Point a phone at a contract or speak directly into the app. [cite_start]SULO reads images or transcribes spoken Filipino/Taglish[cite: 172, 173].
2. [cite_start]**Auto-Classification & Language Routing** — The system integrates Amazon Comprehend to detect the language profile and document type to pull up specific legal compliance frameworks[cite: 174].
3. [cite_start]**Semantic Grounding (RAG & Vector Store)** — The system queries a curated knowledge base of true legal provisions (Labor Code, current amendments) to prevent AI hallucinations[cite: 175].
4. [cite_start]**Local Comprehension Execution** — A compressed, Quantized LLM reads the context to highlight deadlines, monetary balances, and suspicious clauses[cite: 176].
5. [cite_start]**Clarity Flows (TTS)** — The user reads or listens to an interactive, side-by-side translation to safely understand their rights without entering legal advice boundaries[cite: 177].

---

## 📂 Project Structure
[cite_start]The processing repository is organized into a modular pipeline; its core public parameters match standard text interpretation rules for seamless compatibility[cite: 178, 179].

---

## 💻 Local Development

1. [cite_start]**Shared Knowledge Base API:** `(input this here)` [cite: 180]
2. [cite_start]**Frontend Setup:** `(input commands like npm run dev here)` [cite: 180]
3. [cite_start]**Model Weights Deployment:** `(input instructions for loading quantized LLM here)` [cite: 180]

### Deploying on Vercel
[cite_start]The Vite app lives at `frontend`, not the repository root[cite: 180, 182].
1. [cite_start]Project $\rightarrow$ Settings $\rightarrow$ General $\rightarrow$ Root Directory $\rightarrow$ `frontend`[cite: 181].
2. [cite_start]Framework Preset: **Vite**[cite: 181].  
   Build Command: `npm run build`. [cite_start]Output Directory: `dist`[cite: 182].
3. [cite_start]Add the `VITE_*` variables from `frontend/.env.example`[cite: 182].
4. [cite_start]The included `vercel.json` adds a SPA rewrite so client routes load `index.html`[cite: 183].

---

## 🔒 Privacy & Custody
* [cite_start]**Non-custodial Data:** Sensitive Personal Identifiable Information (PII) like TIN, SSS, and bank accounts are flagged locally to warn you before data transmission occurs[cite: 184].
* [cite_start]**On-Device Optimization:** Our core quantized models aim to transition workflows into local execution blocks to minimize remote exposures of sensitive documents[cite: 185].

---

> [cite_start]💡 **The Connecting Thread** > Filipinos are signing documents and entering agreements they do not fully understand[cite: 186]. [cite_start]By the time they realize what happened, it is already too late[cite: 187]. The law exists. The rights exist. [cite_start]The gap is in comprehension[cite: 187, 188]. [cite_start]A right you cannot read, in a language you weren't taught, explained by a lawyer you can't afford—is not really a right at all[cite: 188].

***Built for the Hackathon. Powered by SULO Core Engineering. Made with care.*** [cite: 189]# SULO

### 👥 Team Siryus
* [cite_start]Zarrah Exekiel Valles [cite: 134]
* [cite_start]Vincent Adolf Sablay Adversary [cite: 134]
* [cite_start]Vehniah P. Samson [cite: 134]
* [cite_start]Marc Justin Lee G. Granada [cite: 134]

---

### 📋 Project Submission Details
* [cite_start]**Selected Project Case:** 2 [cite: 134]
* [cite_start]**Scope / Focus Area:** Employment & Labor (Minimum Viable Product Focus) [cite: 134]
* [cite_start]**Tagline:** Understandable for every Filipino [cite: 134]
* **Positioning:** Literacy, not advice. [cite_start]An AI that brings ordinary Filipinos out of the dark on the documents that decide their rights — without ever pretending to be a lawyer. [cite: 134]

[cite_start]**Tech Stack:** Amazon Comprehend · Quantized LLM · OCR · ASR/TTS · Vite · React [cite: 135]

SULO is an AI-powered legal-literacy and document-understanding platform. [cite_start]A Filipino points their phone at a contract, a notice, or a loan agreement — by upload, photo, or voice — and SULO explains, in plain language and in their own tongue, what the document is, what it obligates them to do, what deadlines it carries, and which clauses deserve a second look[cite: 136]. [cite_start]It does not give legal advice; it gives legal understanding, and it routes people to real help when they need it so that safety lives in comprehension, not in dense legal jargon[cite: 137].

---

## 🚀 Scope of Development

### What We Have Developed (Current MVP Status)
* [cite_start]**Multimodal Capture & Extraction Pipeline:** Built a responsive PWA layout capable of taking structural physical uploads or image photos (processed via OCR conversion) along with mixed voice utterances/Taglish code-switching inputs (processed via ASR engines)[cite: 141].
* [cite_start]**Amazon Comprehend NLP Routing Service:** Programmed custom entities to auto-classify incoming documents, instantly extracting bound party structures, fiscal rules, hidden penalty configurations, and time milestones[cite: 142].
* [cite_start]**Hallucination-Proof RAG Engine:** Wired an embedding collection (Vector Store Semantic Index) grounded natively against a single date-stamped truth index containing true legal anchors like the Philippine Labor Code (Presidential Decree No. 442) and the FSL Act (RA 11106)[cite: 143].
* [cite_start]**Quantized LLM Translation Interface:** Integrated a compressed inference layer that transforms dense legal legalese into highly localized plain-language text blocks alongside synchronous Text-to-Speech playback streams[cite: 144].

### What We Will Develop (Future Roadmap)
* [cite_start]**Fully On-Device Offline Optimization:** Porting the core quantized models directly onto local client device execution blocks to minimize remote server exposures and ensure zero-connectivity environments (like remote provinces) still gain total document clarity[cite: 138].
* [cite_start]**Barangay & Court Summons Domain Pack:** Expanding semantic mapping capabilities from labor contexts into localization suites for standard physical community mediation documents and formal lower-court orders[cite: 139].
* [cite_start]**Proactive PII Redaction Engine:** Local preprocessing scripts to structurally mask personal identifying identifiers (TIN, SSS, and banking details) before any cloud-bound custom pipeline executions[cite: 140].

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
[cite_start]Quick links for reviewers — everything the submission rubric asks for, in one place[cite: 159].

### Live Demo
* [cite_start]Deployed app: `(input this here)` — try an image upload or a voice interaction[cite: 160].
* [cite_start]Walkthrough video: `(input this here)` — full feature tour showing legal text-to-speech routing[cite: 161].

### Mobile Responsive
[cite_start]Captured on Android Chrome at 1080×2400 — hero layout, camera-capture flow, typography, and interactive risk highlights all reflow cleanly as a Progressive Web App (PWA) layout without horizontal scroll[cite: 162].

---

## 🛠️ CI/CD
[cite_start]Runs on every push to main and on every PR: `npm ci` $\rightarrow$ `npm run build` against the frontend[cite: 163].  
[cite_start]Workflow lives at `(input this here)`[cite: 164].

---

## 📡 Core Backend & Model Pipelines
* **Amazon Comprehend NLP Routing Service:** `(input this here)`
* **Quantized LLM Inference Host Location:** `(input this here)`
* **Vector Store Semantic Search Endpoint:** `(input this here)`
* **Sample Document Analysis / Processing Log ID:** `(input this here)`

---

## 🚀 Deployed Infrastructure
[cite_start]The legal routing, text extraction, and parsing service is live[cite: 164].
* [cite_start]**Service/Model ID:** `(input this here)` [cite: 165]
* [cite_start]**Type:** Quantized LLM Pipeline / Custom NLP Classifier / RAG Engine [cite: 165]
* [cite_start]**Network/Host:** `(input this here)` [cite: 165]
* [cite_start]**Explorer/Logs:** `(input this here)` [cite: 165]

---

## 📖 Concept Vocabulary

| Brand Word | Means |
| :--- | :--- |
| **SULO** | [cite_start]Filipino for torch — bringing clarity to hidden, dark legal clauses[cite: 166, 167]. |
| **Scan/Upload (OCR)** | [cite_start]Submitting an image of a document to be transformed into machine-readable text[cite: 167, 168]. |
| **Voice Query (ASR)** | [cite_start]Submitting audio or spoken code-switching language to ask questions about obligations[cite: 168, 169]. |
| **Plain Language (TTS)** | [cite_start]The spoken and written overview ("Ano ang ibig sabihin nito sa madaling salita?")[cite: 169, 170]. |
| **Red Flag** | [cite_start]A clause that is heavily skewed against the user or potentially illegal under current DOLE/Philippine regulations[cite: 170, 171]. |

---

## 🔄 How It Works

1. **Capture & Extract (OCR / ASR)** — Point a phone at a contract or speak directly into the app. [cite_start]SULO reads images or transcribes spoken Filipino/Taglish[cite: 172, 173].
2. [cite_start]**Auto-Classification & Language Routing** — The system integrates Amazon Comprehend to detect the language profile and document type to pull up specific legal compliance frameworks[cite: 174].
3. [cite_start]**Semantic Grounding (RAG & Vector Store)** — The system queries a curated knowledge base of true legal provisions (Labor Code, current amendments) to prevent AI hallucinations[cite: 175].
4. [cite_start]**Local Comprehension Execution** — A compressed, Quantized LLM reads the context to highlight deadlines, monetary balances, and suspicious clauses[cite: 176].
5. [cite_start]**Clarity Flows (TTS)** — The user reads or listens to an interactive, side-by-side translation to safely understand their rights without entering legal advice boundaries[cite: 177].

---

## 📂 Project Structure
[cite_start]The processing repository is organized into a modular pipeline; its core public parameters match standard text interpretation rules for seamless compatibility[cite: 178, 179].

---

## 💻 Local Development

1. [cite_start]**Shared Knowledge Base API:** `(input this here)` [cite: 180]
2. [cite_start]**Frontend Setup:** `(input commands like npm run dev here)` [cite: 180]
3. [cite_start]**Model Weights Deployment:** `(input instructions for loading quantized LLM here)` [cite: 180]

### Deploying on Vercel
[cite_start]The Vite app lives at `frontend`, not the repository root[cite: 180, 182].
1. [cite_start]Project $\rightarrow$ Settings $\rightarrow$ General $\rightarrow$ Root Directory $\rightarrow$ `frontend`[cite: 181].
2. [cite_start]Framework Preset: **Vite**[cite: 181].  
   Build Command: `npm run build`. [cite_start]Output Directory: `dist`[cite: 182].
3. [cite_start]Add the `VITE_*` variables from `frontend/.env.example`[cite: 182].
4. [cite_start]The included `vercel.json` adds a SPA rewrite so client routes load `index.html`[cite: 183].

---

## 🔒 Privacy & Custody
* [cite_start]**Non-custodial Data:** Sensitive Personal Identifiable Information (PII) like TIN, SSS, and bank accounts are flagged locally to warn you before data transmission occurs[cite: 184].
* [cite_start]**On-Device Optimization:** Our core quantized models aim to transition workflows into local execution blocks to minimize remote exposures of sensitive documents[cite: 185].

---

> [cite_start]💡 **The Connecting Thread** > Filipinos are signing documents and entering agreements they do not fully understand[cite: 186]. [cite_start]By the time they realize what happened, it is already too late[cite: 187]. The law exists. The rights exist. [cite_start]The gap is in comprehension[cite: 187, 188]. [cite_start]A right you cannot read, in a language you weren't taught, explained by a lawyer you can't afford—is not really a right at all[cite: 188].

***Built for the Hackathon. Powered by SULO Core Engineering. Made with care.*** [cite: 189]# SULO

### 👥 Team Siryus
* [cite_start]Zarrah Exekiel Valles [cite: 134]
* [cite_start]Vincent Adolf Sablay Adversary [cite: 134]
* [cite_start]Vehniah P. Samson [cite: 134]
* [cite_start]Marc Justin Lee G. Granada [cite: 134]

---

### 📋 Project Submission Details
* [cite_start]**Selected Project Case:** 2 [cite: 134]
* [cite_start]**Scope / Focus Area:** Employment & Labor (Minimum Viable Product Focus) [cite: 134]
* [cite_start]**Tagline:** Understandable for every Filipino [cite: 134]
* **Positioning:** Literacy, not advice. [cite_start]An AI that brings ordinary Filipinos out of the dark on the documents that decide their rights — without ever pretending to be a lawyer. [cite: 134]

[cite_start]**Tech Stack:** Amazon Comprehend · Quantized LLM · OCR · ASR/TTS · Vite · React [cite: 135]

SULO is an AI-powered legal-literacy and document-understanding platform. [cite_start]A Filipino points their phone at a contract, a notice, or a loan agreement — by upload, photo, or voice — and SULO explains, in plain language and in their own tongue, what the document is, what it obligates them to do, what deadlines it carries, and which clauses deserve a second look[cite: 136]. [cite_start]It does not give legal advice; it gives legal understanding, and it routes people to real help when they need it so that safety lives in comprehension, not in dense legal jargon[cite: 137].

---

## 🚀 Scope of Development

### What We Have Developed (Current MVP Status)
* [cite_start]**Multimodal Capture & Extraction Pipeline:** Built a responsive PWA layout capable of taking structural physical uploads or image photos (processed via OCR conversion) along with mixed voice utterances/Taglish code-switching inputs (processed via ASR engines)[cite: 141].
* [cite_start]**Amazon Comprehend NLP Routing Service:** Programmed custom entities to auto-classify incoming documents, instantly extracting bound party structures, fiscal rules, hidden penalty configurations, and time milestones[cite: 142].
* [cite_start]**Hallucination-Proof RAG Engine:** Wired an embedding collection (Vector Store Semantic Index) grounded natively against a single date-stamped truth index containing true legal anchors like the Philippine Labor Code (Presidential Decree No. 442) and the FSL Act (RA 11106)[cite: 143].
* [cite_start]**Quantized LLM Translation Interface:** Integrated a compressed inference layer that transforms dense legal legalese into highly localized plain-language text blocks alongside synchronous Text-to-Speech playback streams[cite: 144].

### What We Will Develop (Future Roadmap)
* [cite_start]**Fully On-Device Offline Optimization:** Porting the core quantized models directly onto local client device execution blocks to minimize remote server exposures and ensure zero-connectivity environments (like remote provinces) still gain total document clarity[cite: 138].
* [cite_start]**Barangay & Court Summons Domain Pack:** Expanding semantic mapping capabilities from labor contexts into localization suites for standard physical community mediation documents and formal lower-court orders[cite: 139].
* [cite_start]**Proactive PII Redaction Engine:** Local preprocessing scripts to structurally mask personal identifying identifiers (TIN, SSS, and banking details) before any cloud-bound custom pipeline executions[cite: 140].

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
[cite_start]Quick links for reviewers — everything the submission rubric asks for, in one place[cite: 159].

### Live Demo
* [cite_start]Deployed app: `(input this here)` — try an image upload or a voice interaction[cite: 160].
* [cite_start]Walkthrough video: `(input this here)` — full feature tour showing legal text-to-speech routing[cite: 161].

### Mobile Responsive
[cite_start]Captured on Android Chrome at 1080×2400 — hero layout, camera-capture flow, typography, and interactive risk highlights all reflow cleanly as a Progressive Web App (PWA) layout without horizontal scroll[cite: 162].

---

## 🛠️ CI/CD
[cite_start]Runs on every push to main and on every PR: `npm ci` $\rightarrow$ `npm run build` against the frontend[cite: 163].  
[cite_start]Workflow lives at `(input this here)`[cite: 164].

---

## 📡 Core Backend & Model Pipelines
* **Amazon Comprehend NLP Routing Service:** `(input this here)`
* **Quantized LLM Inference Host Location:** `(input this here)`
* **Vector Store Semantic Search Endpoint:** `(input this here)`
* **Sample Document Analysis / Processing Log ID:** `(input this here)`

---

## 🚀 Deployed Infrastructure
[cite_start]The legal routing, text extraction, and parsing service is live[cite: 164].
* [cite_start]**Service/Model ID:** `(input this here)` [cite: 165]
* [cite_start]**Type:** Quantized LLM Pipeline / Custom NLP Classifier / RAG Engine [cite: 165]
* [cite_start]**Network/Host:** `(input this here)` [cite: 165]
* [cite_start]**Explorer/Logs:** `(input this here)` [cite: 165]

---

## 📖 Concept Vocabulary

| Brand Word | Means |
| :--- | :--- |
| **SULO** | [cite_start]Filipino for torch — bringing clarity to hidden, dark legal clauses[cite: 166, 167]. |
| **Scan/Upload (OCR)** | [cite_start]Submitting an image of a document to be transformed into machine-readable text[cite: 167, 168]. |
| **Voice Query (ASR)** | [cite_start]Submitting audio or spoken code-switching language to ask questions about obligations[cite: 168, 169]. |
| **Plain Language (TTS)** | [cite_start]The spoken and written overview ("Ano ang ibig sabihin nito sa madaling salita?")[cite: 169, 170]. |
| **Red Flag** | [cite_start]A clause that is heavily skewed against the user or potentially illegal under current DOLE/Philippine regulations[cite: 170, 171]. |

---

## 🔄 How It Works

1. **Capture & Extract (OCR / ASR)** — Point a phone at a contract or speak directly into the app. [cite_start]SULO reads images or transcribes spoken Filipino/Taglish[cite: 172, 173].
2. [cite_start]**Auto-Classification & Language Routing** — The system integrates Amazon Comprehend to detect the language profile and document type to pull up specific legal compliance frameworks[cite: 174].
3. [cite_start]**Semantic Grounding (RAG & Vector Store)** — The system queries a curated knowledge base of true legal provisions (Labor Code, current amendments) to prevent AI hallucinations[cite: 175].
4. [cite_start]**Local Comprehension Execution** — A compressed, Quantized LLM reads the context to highlight deadlines, monetary balances, and suspicious clauses[cite: 176].
5. [cite_start]**Clarity Flows (TTS)** — The user reads or listens to an interactive, side-by-side translation to safely understand their rights without entering legal advice boundaries[cite: 177].

---

## 📂 Project Structure
[cite_start]The processing repository is organized into a modular pipeline; its core public parameters match standard text interpretation rules for seamless compatibility[cite: 178, 179].

---

## 💻 Local Development

1. [cite_start]**Shared Knowledge Base API:** `(input this here)` [cite: 180]
2. [cite_start]**Frontend Setup:** `(input commands like npm run dev here)` [cite: 180]
3. [cite_start]**Model Weights Deployment:** `(input instructions for loading quantized LLM here)` [cite: 180]

### Deploying on Vercel
[cite_start]The Vite app lives at `frontend`, not the repository root[cite: 180, 182].
1. [cite_start]Project $\rightarrow$ Settings $\rightarrow$ General $\rightarrow$ Root Directory $\rightarrow$ `frontend`[cite: 181].
2. [cite_start]Framework Preset: **Vite**[cite: 181].  
   Build Command: `npm run build`. [cite_start]Output Directory: `dist`[cite: 182].
3. [cite_start]Add the `VITE_*` variables from `frontend/.env.example`[cite: 182].
4. [cite_start]The included `vercel.json` adds a SPA rewrite so client routes load `index.html`[cite: 183].

---

## 🔒 Privacy & Custody
* [cite_start]**Non-custodial Data:** Sensitive Personal Identifiable Information (PII) like TIN, SSS, and bank accounts are flagged locally to warn you before data transmission occurs[cite: 184].
* [cite_start]**On-Device Optimization:** Our core quantized models aim to transition workflows into local execution blocks to minimize remote exposures of sensitive documents[cite: 185].

---

> [cite_start]💡 **The Connecting Thread** > Filipinos are signing documents and entering agreements they do not fully understand[cite: 186]. [cite_start]By the time they realize what happened, it is already too late[cite: 187]. The law exists. The rights exist. [cite_start]The gap is in comprehension[cite: 187, 188]. [cite_start]A right you cannot read, in a language you weren't taught, explained by a lawyer you can't afford—is not really a right at all[cite: 188].

***Built for the Hackathon. Powered by SULO Core Engineering. Made with care.*** [cite: 189]
