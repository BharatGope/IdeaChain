# 💡 IdeaChain – Blockchain + AI Powered Idea Registry  
*A lightweight prototype for secure idea timestamping, plagiarism detection, and proof-of-ownership.*

IdeaChain is a decentralized-inspired platform that allows innovators, students, and creators to **securely register ideas**, generate **tamper-proof SHA-256 hashes**, verify originality using **AI similarity detection**, and maintain an immutable **simulated blockchain ledger** — all in a simple, fast, browser-based interface.

This prototype was built for the **Trikaya Hack-to-Hire Hackathon 2025**.

---

## 🚀 Features

### 🔐 1. SHA-256 Hash Generation  
Every idea (title + description) is hashed using the browser’s Web Crypto API for instant integrity proof.

### ⛓️ 2. Simulated Blockchain Ledger  
Each idea becomes a **block**, linked with the previous block’s hash (GENESIS → Block 1 → Block 2 …).

### 🤖 3. AI Plagiarism Detection (Cosine Similarity)  
A lightweight NLP engine compares text similarity between ideas:
- Detects copied or reworded submissions  
- Displays similarity percentage  
- Helps identify duplicates or plagiarism attempts  

### 📜 4. Proof-of-Ownership Certificate  
The latest idea can be downloaded as a **signed certificate** containing:
- Title  
- Description  
- Hash  
- Timestamp  
- Verification note

### 📁 5. Excel Export  
Export the full registry (all ideas + hashes + timestamps) to Excel for record-keeping.

### 🗂️ 6. LocalStorage-based Registry  
Fast, offline-friendly, persistent storage for the hackathon demo.

---

## 🛠️ Tech Stack

| Component        | Technology Used             |
|------------------|-----------------------------|
| Frontend         | HTML, CSS, JavaScript       |
| Hashing          | Web Crypto API (SHA-256)    |
| AI Similarity    | Custom NLP (Cosine Similarity) |
| Data Storage     | LocalStorage (mock DB)      |
| Export           | SheetJS (xlsx.js)           |
| Blockchain Layer | Simulated chain (no backend) |

---

## 📂 Project Structure
```
📁 IdeaChain/
├── index.html # UI + layout
├── style.css # UI styling
├── script.js # Core logic (AI + hashing + blockchain)
└── README.md # Documentation
```
---

## 📸 Screenshots (optional to add later)
You can add:
- Home page  
- Register idea  
- AI verification output  
- Blockchain ledger view  

---

## 🧪 How It Works

### 1️⃣ Register an Idea
User enters:
- Title  
- Description  

System:
- Generates SHA-256 hash  
- Stores the idea  
- Adds a simulated blockchain block  

### 2️⃣ Verify an Idea
User pastes any text.  
AI engine:
- Converts both texts into vectors  
- Calculates cosine similarity  
- Shows match %  

### 3️⃣ Blockchain Ledger
Shows:
- Block number  
- Hash  
- Previous hash  
- Timestamp  

### 4️⃣ Download Certificate
Generates a digital certificate (`.txt`) proving:
- Ownership  
- Timestamp  
- Hash integrity  

---

## 🌐 Deployment

This project requires **no backend**.  
You can deploy instantly on **Netlify**, **Vercel**, or **GitHub Pages**.

### 👉 Netlify (Recommended)
1. Visit:[ https://app.netlify.com/drop](https://ideachain.netlify.app/)  
2. Drag & drop these files:
   - index.html  
   - style.css  
   - script.js  
3. Done — your live link is ready.

---

## 🧑‍💻 Developer: Bharat Kumar Gope  
B.Tech CSE • Blockchain + AI enthusiast  
Built for Trikaya Hack-to-Hire Hackathon 2025

---

## 🎯 Notes

This is a **hackathon prototype**, showcasing feasibility and core concept of the larger IdeaChain platform (Blockchain + AI + DID).

The final production version may include:
- Real blockchain smart contracts  
- IPFS storage  
- Decentralized Identity (DID) integration  
- Advanced ML plagiarism engine  
- JWT-based authentication  

For now — this version fulfills the MVP requirement for demonstrating innovation, functionality, and technical approach.

---

## ⭐ If you like this project, consider starring the repository!

