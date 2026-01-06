const matchPreview = document.getElementById("match-preview");
const getStarted = document.getElementById("get-started");
const signupModal = document.getElementById("signup-modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");
const backStep = document.getElementById("back-step");
const nextStep = document.getElementById("next-step");
const progressBar = document.getElementById("progress-bar");

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

const signupSteps = [
  {
    id: "account-check",
    title: "Welcome back?",
    content: `
      <div class="question-card">
        <label>Have you created an account before?</label>
        <select id="account-status">
          <option value="">Select one</option>
          <option value="yes">Yes, I already have an account</option>
          <option value="no">No, I want to sign up</option>
        </select>
        <p class="helper-text">If yes, we will take you to login. If no, we'll help you sign up.</p>
      </div>
    `,
  },
  {
    id: "profile-basics",
    title: "Quick profile",
    content: `
      <div class="question-card">
        <label for="display-name">Name to display</label>
        <input id="display-name" type="text" placeholder="e.g. Ayesha" />
        <label for="location">City</label>
        <input id="location" type="text" placeholder="e.g. Colombo" />
      </div>
    `,
  },
];

const surveyQuestions = [
  "How do you like to spend your weekends?",
  "What values matter most in a partner?",
  "Which hobbies make you feel most alive?",
  "What kind of conversations do you enjoy?",
  "How important is family to you?",
  "What does a perfect first date look like?",
  "Which music or films feel most like you?",
  "How do you handle conflict?",
  "What are you hoping to build with a partner?",
  "How would friends describe your personality?",
  "What boundaries help you feel safe while dating?",
  "What kind of support do you appreciate most?",
];

const minimumQuestionsRequired = 10;
let currentStep = 0;
let currentQuestionIndex = 0;

const renderSurveyStep = () => {
  const question = surveyQuestions[currentQuestionIndex];
  const questionCount = Math.min(minimumQuestionsRequired, surveyQuestions.length);
  modalBody.innerHTML = `
    <div class="question-card">
      <label>${question}</label>
      <textarea rows="3" placeholder="Share a short answer..."></textarea>
      <p class="helper-text">Question ${currentQuestionIndex + 1} of ${questionCount}</p>
    </div>
  `;
};

const updateProgress = () => {
  const totalSteps = signupSteps.length + minimumQuestionsRequired;
  const completed = currentStep + currentQuestionIndex;
  progressBar.style.width = `${(completed / totalSteps) * 100}%`;
};

const renderStep = () => {
  if (currentStep < signupSteps.length) {
    const step = signupSteps[currentStep];
    modalBody.innerHTML = `<h3>${step.title}</h3>${step.content}`;
    backStep.disabled = currentStep === 0;
    nextStep.textContent = "Next";
  } else {
    renderSurveyStep();
    backStep.disabled = currentQuestionIndex === 0;
    nextStep.textContent =
      currentQuestionIndex + 1 >= minimumQuestionsRequired ? "Finish" : "Next";
  }
  updateProgress();
};

const openModal = () => {
  signupModal.classList.add("open");
  signupModal.setAttribute("aria-hidden", "false");
  currentStep = 0;
  currentQuestionIndex = 0;
  renderStep();
};

const closeSignupModal = () => {
  signupModal.classList.remove("open");
  signupModal.setAttribute("aria-hidden", "true");
};

getStarted.addEventListener("click", openModal);
closeModal.addEventListener("click", closeSignupModal);

nextStep.addEventListener("click", () => {
  if (currentStep < signupSteps.length) {
    currentStep += 1;
  } else if (currentQuestionIndex + 1 < minimumQuestionsRequired) {
    currentQuestionIndex += 1;
  } else {
    modalBody.innerHTML = `
      <div class="question-card">
        <h3>You're all set!</h3>
        <p>Thanks for sharing. We'll start matching you with compatible people soon.</p>
      </div>
    `;
    nextStep.textContent = "Done";
    backStep.disabled = true;
    progressBar.style.width = "100%";
    return;
  }
  renderStep();
});

backStep.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
  } else if (currentQuestionIndex > 0) {
    currentQuestionIndex -= 1;
  }
  renderStep();
});

fetchMatch();
