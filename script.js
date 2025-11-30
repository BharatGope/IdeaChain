// -----------------------------------------------------
// SHA-256 HASH GENERATOR
// -----------------------------------------------------
async function generateHash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// -----------------------------------------------------
// LOAD IDEAS
// -----------------------------------------------------
function loadIdeas() {
  const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  const listDiv = document.getElementById("ideaList");
  listDiv.innerHTML = "";

  ideas.forEach((idea, index) => {
    listDiv.innerHTML += `
      <div class="idea-item">
        <b>${index + 1}. ${idea.title}</b><br>
        <small>${idea.description}</small><br>
        <small>🧾 Hash: ${idea.hash}</small><br>
        <small>🕒 ${idea.timestamp}</small>
      </div>
    `;
  });

  loadBlockchain();
}

// -----------------------------------------------------
// SIMULATED BLOCKCHAIN LEDGER
// -----------------------------------------------------
function loadBlockchain() {
  const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  const chainDiv = document.getElementById("blockchainList");
  chainDiv.innerHTML = "";

  ideas.forEach((idea, index) => {
    chainDiv.innerHTML += `
      <div class="idea-item">
        <b>Block #${index + 1}</b><br>
        ⛓️ Hash: <small>${idea.hash}</small><br>
        🔗 Previous Hash: <small>${index === 0 ? "GENESIS" : ideas[index - 1].hash}</small><br>
        🕒 Timestamp: ${idea.timestamp}
      </div>
    `;
  });
}

// -----------------------------------------------------
// AI COSINE SIMILARITY ENGINE
// -----------------------------------------------------
function textToVector(text) {
  const words = text.toLowerCase().split(/\W+/);
  const freq = {};
  words.forEach(w => { if (w) freq[w] = (freq[w] || 0) + 1; });
  return freq;
}

function cosineSimilarity(vec1, vec2) {
  let dot = 0, mag1 = 0, mag2 = 0;
  const words = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);

  words.forEach(word => {
    const a = vec1[word] || 0;
    const b = vec2[word] || 0;
    dot += a * b;
    mag1 += a * a;
    mag2 += b * b;
  });

  if (mag1 === 0 || mag2 === 0) return 0;
  return dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

// -----------------------------------------------------
// REGISTER IDEA
// -----------------------------------------------------
document.getElementById("ideaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  const combined = title + " " + description;
  const hash = await generateHash(combined);
  const timestamp = new Date().toLocaleString();

  let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

  const exists = ideas.find(i => i.hash === hash);

  if (exists) {
    document.getElementById("result").innerHTML = `
      ⚠️ Idea already registered!<br>🧾 Hash: ${exists.hash}
    `;
  } else {
    const newIdea = { title, description, hash, timestamp };
    ideas.push(newIdea);
    localStorage.setItem("ideas", JSON.stringify(ideas));

    document.getElementById("result").innerHTML = `
      ✅ Idea Registered Successfully!<br>🧾 Hash: ${hash}
    `;
    loadIdeas();
  }

  e.target.reset();
});

// -----------------------------------------------------
// AI VERIFY IDEA
// -----------------------------------------------------
document.getElementById("verifyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const verifyText = document.getElementById("verifyText").value.trim().toLowerCase();
  const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  
  let bestMatch = null;
  let bestScore = 0;

  ideas.forEach(idea => {
    const vec1 = textToVector(verifyText);
    const vec2 = textToVector(idea.title + " " + idea.description);
    const score = cosineSimilarity(vec1, vec2);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = idea;
    }
  });

  const result = document.getElementById("verifyResult");

  if (bestScore > 0.25) {
    result.innerHTML = `
      ✅ Similar Idea Found!<br>
      <b>Title:</b> ${bestMatch.title}<br>
      🔍 Similarity Score: ${(bestScore * 100).toFixed(2)}%<br>
      🧾 Hash: ${bestMatch.hash}<br>
      🕒 ${bestMatch.timestamp}
    `;
  } else {
    result.innerText = "❌ No significant similarity detected.";
  }

  e.target.reset();
});

// -----------------------------------------------------
// EXPORT EXCEL
// -----------------------------------------------------
document.getElementById("exportBtn").addEventListener("click", () => {
  const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  if (ideas.length === 0) return alert("No ideas to export!");

  const worksheet = XLSX.utils.json_to_sheet(ideas);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Ideas");
  XLSX.writeFile(workbook, "IdeaChain_Registry.xlsx");
});

// -----------------------------------------------------
// CLEAR ALL
// -----------------------------------------------------
document.getElementById("clearBtn").addEventListener("click", () => {
  if (confirm("Are you sure? All on-chain records will be erased!")) {
    localStorage.removeItem("ideas");
    loadIdeas();
  }
});

// -----------------------------------------------------
// CERTIFICATE DOWNLOAD
// -----------------------------------------------------
document.getElementById("certBtn").addEventListener("click", () => {
  const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  if (ideas.length === 0) return alert("No ideas found!");

  const idea = ideas[ideas.length - 1]; // latest

  const cert = `
    IDEA OWNERSHIP CERTIFICATE
    ---------------------------
    Title: ${idea.title}

    Description:
    ${idea.description}

    Hash: ${idea.hash}
    Timestamp: ${idea.timestamp}

    Verified By:
    IdeaChain (Simulated Blockchain)
  `;

  const blob = new Blob([cert], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "IdeaChain_Certificate.txt";
  link.click();
});

// -----------------------------------------------------
loadIdeas();
