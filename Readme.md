# 🦺 Work Health & Safety (WHS) Advisor – Southern Cross AI Demo

This demo showcases a Retrieval-Augmented Generation (RAG) interface designed to support Work Health & Safety (WHS) compliance, training, and information access. It simulates an intelligent assistant that helps users explore Australian WHS laws, regulations, codes of practice, and response protocols using natural language queries.

---

## 🧩 Purpose

The WHS Advisor helps users:
- Understand WHS laws and obligations (e.g. WHS Act & Regulations)
- Access official Codes of Practice
- Learn about incident response procedures
- Navigate workers’ compensation processes
- File or review complaints and reports
- Use plain language to query legal and procedural WHS documents

The demo is tailored for educational and public-sector stakeholders evaluating how LLMs can streamline compliance and workplace safety workflows.

---

## 🧱 Core Screens

| Screen Name                      | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| 🏠 **Overview**                  | Entry point with role-based summaries and visual navigation                |
| 📘 **WHS Act & Regulations**     | Summarized legislation and clauses for state and federal WHS laws          |
| 🛠️ **Codes of Practice**         | Interactive browser for official model codes across sectors                |
| 🚨 **Incident & Response Toolkit** | First-aid, emergency response, and risk control procedures                 |
| 🧾 **Workers' Compensation Guide** | Steps, forms, and timelines for injury compensation                        |
| 📣 **Complaints & Reporting**    | Guidance on how to report WHS concerns internally or to authorities        |

Each screen is powered by a combination of static summaries and (optionally) dynamic AI-generated responses via sidebar chat.

---

## ⚙️ Technologies Used

- **React** (with Create React App)
- **Tailwind CSS** for UI styling
- **Lucide Icons** for visuals
- **Modular screen components** for isolated development
- **(Optional)** LangChain + FastAPI backend for live chat with documents

---

## 🚀 Setup & Integration

Follow the full [Integration Guide](./Integration%20Guide.md) for detailed instructions.

### Basic Setup (Steps 1–3):
```bash
# Clone the project
git clone https://github.com/your-org/whs-advisor.git
cd whs-advisor

# Install dependencies
npm install

# Start development server
npm start

