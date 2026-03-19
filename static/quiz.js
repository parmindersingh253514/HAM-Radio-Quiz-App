let questions = [];
let currentIndex = 0;
let score = 0;

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const qCurrent = document.getElementById('q-current');
const qTotal = document.getElementById('q-total');
const qScore = document.getElementById('q-score');
const expBox = document.getElementById('explanation-box');

// Fetch questions from the Flask API we built
fetch('/api/questions')
    .then(response => response.json())
    .then(data => {
        questions = data;
        qTotal.textContent = questions.length;
        loadQuestion();
    });

function loadQuestion() {
    nextBtn.classList.add('d-none');
    expBox.classList.add('d-none');
    optionsContainer.innerHTML = '';
    
    const q = questions[currentIndex];
    questionText.textContent = q.text;
    qCurrent.textContent = currentIndex + 1;

    const options = [
        { key: 'A', text: q.A },
        { key: 'B', text: q.B },
        { key: 'C', text: q.C },
        { key: 'D', text: q.D }
    ];

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn option-btn fw-semibold text-dark';
        btn.textContent = `${opt.key}: ${opt.text}`;
        btn.onclick = () => selectAnswer(opt.key, btn, q);
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedKey, selectedBtn, q) {
    const isCorrect = (selectedKey === q.correct);
    
    // Disable all buttons
    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent.startsWith(q.correct)) {
            btn.classList.add('correct'); // Highlight actual correct answer
        }
    });

    if (isCorrect) {
        score++;
        qScore.textContent = score;
    } else {
        selectedBtn.classList.add('wrong');
    }

    // Show explanation
    expBox.textContent = q.explanation;
    expBox.classList.remove('d-none');
    nextBtn.classList.remove('d-none');
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        submitResults();
    }
});

function submitResults() {
    questionText.textContent = "Test Complete! Saving your score...";
    optionsContainer.innerHTML = '';
    expBox.classList.add('d-none');
    nextBtn.classList.add('d-none');

    // Send score to backend
    fetch('/api/submit_score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: score, total: questions.length })
    }).then(() => {
        window.location.href = '/dashboard'; // Redirect back to dashboard
    });
}