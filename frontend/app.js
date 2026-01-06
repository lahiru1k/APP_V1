const matchPreview = document.getElementById("match-preview");
const getStarted = document.getElementById("get-started");

const renderMatch = (match) => {
  matchPreview.innerHTML = `
    <strong>Match ID:</strong> ${match.match_id}<br />
    <strong>Compatibility:</strong> ${(match.compatibility_score * 100).toFixed(0)}%<br />
    <strong>Summary:</strong> ${match.summary}
  `;
};

const fetchMatch = async () => {
  try {
    const response = await fetch("http://localhost:8000/matches/sample");
    if (!response.ok) {
      throw new Error("Unable to fetch sample match");
    }
    const match = await response.json();
    renderMatch(match);
  } catch (error) {
    matchPreview.textContent = "Run the backend server to see a sample match.";
  }
};

getStarted.addEventListener("click", () => {
  alert("Next step: build the onboarding flow and survey questions!");
});

fetchMatch();
