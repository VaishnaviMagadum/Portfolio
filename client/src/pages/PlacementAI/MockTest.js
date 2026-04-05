import { placementAiAuth } from '../../services/placementAiAuth';
import { placementAiApi } from '../../services/placementAiApi';
import './placement-ai.css';

export const PlacementAiMockTest = () => {
    const container = document.createElement('div');
    container.className = 'placement-ai-app min-h-screen relative overflow-hidden stars-bg';

    const currentUser = placementAiAuth.getCurrentUser();
    const section = sessionStorage.getItem('currentTestSection') || 'aptitude';
    if (!currentUser) {
        window.history.pushState({}, '', '/placement-ai');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return container;
    }

    const state = {
        profile: placementAiAuth.getProfile(currentUser),
        questionsText: '',
        questions: [],
        correctAnswers: {},
        currentHR: 0,
        hrQuestions: [],
        hrEvaluation: null,
        hrSuggestions: [],
        timeLeft: 0,
        timerInterval: null,
        loading: true,
        testSubmitted: false,
        score: 0,
        total: 0
    };

    const render = () => {
        container.innerHTML = `
            <div class="stars-bg"></div>
            <div id="pa-timer" class="${state.loading || state.testSubmitted ? 'hidden' : ''}">Time Left: --:--</div>
            <div class="container relative z-10 animate-pa">
                <header class="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                    <h2 class="text-left m-0 uppercase tracking-tighter">${section} Mock Test</h2>
                    <button id="pa-exit-test" class="text-slate-400 font-bold hover:text-rose-500 transition-colors">Exit Test</button>
                </header>

                <div id="pa-test-content" class="min-h-[400px]">
                    ${state.loading ? `
                        <div class="flex flex-col items-center justify-center p-20 animate-pulse">
                            <span class="text-4xl mb-4">🧠</span>
                            <p class="text-slate-500 font-bold">AI is generating your questions for ${state.profile.selectedCompany || 'General'} round...</p>
                        </div>
                    ` : ''}

                    <div id="pa-question-list" class="${state.loading || section === 'hr' || state.testSubmitted ? 'hidden' : ''} space-y-8"></div>

                    <div id="pa-hr-view" class="${state.loading || section !== 'hr' || state.testSubmitted ? 'hidden' : ''} space-y-8">
                        <div class="card p-10 text-center border-2 border-indigo-50">
                            <h3 id="pa-hr-question-num" class="text-sm font-black uppercase tracking-[0.3em] text-indigo-400 mb-4">Question 1/10</h3>
                            <p id="pa-hr-question-text" class="text-2xl font-extrabold text-slate-800 leading-tight mb-8"></p>
                            <textarea id="pa-hr-answer" class="w-full h-48 p-6 rounded-2xl border-2 border-slate-100 focus:border-indigo-400 transition-all text-lg font-medium" placeholder="Type your professional response here..."></textarea>
                            <div class="flex gap-4 mt-8">
                                <button id="pa-hr-submit" class="btn-pa flex-1">Submit Answer</button>
                                <button id="pa-hr-next" class="btn-pa flex-1 !bg-indigo-50 !text-indigo-600 border-2 border-indigo-600 hidden">Next Question</button>
                            </div>
                            <div id="pa-hr-evaluation" class="mt-10 pt-10 border-t border-slate-50 hidden text-left">
                                <p class="font-black uppercase tracking-widest text-xs text-indigo-400 mb-3">Interviewer Evaluation</p>
                                <p id="pa-hr-eval-text" class="text-slate-700 font-bold italic mb-6"></p>
                                <ul id="pa-hr-suggestions" class="space-y-2 list-disc list-inside text-sm text-slate-500"></ul>
                            </div>
                        </div>
                    </div>

                    <div id="pa-result-view" class="${state.testSubmitted ? '' : 'hidden'} animate-pa">
                        <div class="card p-12 text-center">
                            <h3 class="text-indigo-500 font-black uppercase tracking-widest mb-2">Test Result</h3>
                            <div class="text-7xl font-black mb-4 text-slate-800">${state.score}/${state.total}</div>
                            <p class="text-slate-400 font-medium mb-10">Target Company: ${state.profile.selectedCompany || 'General'}</p>
                            <div class="flex gap-4 max-w-sm mx-auto">
                                <button id="pa-improve-btn" class="btn-pa flex-1">Get AI Suggestions</button>
                                <button id="pa-finish-test" class="flex-1 bg-slate-100 text-slate-500 font-bold rounded-xl hover:bg-slate-200 transition-all">Back to Dashboard</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="pa-test-actions" class="${state.loading || section === 'hr' || state.testSubmitted ? 'hidden' : ''} mt-12 pt-8 border-t border-slate-50">
                    <button id="pa-submit-mcq" class="btn-pa w-full max-w-sm mx-auto block">Submit Final Answers</button>
                </div>
            </div>
        `;

        setupEvents();
        if (state.loading) generateQuestions();
    };

    const setupEvents = () => {
        container.querySelector('#pa-exit-test').onclick = () => {
            if (confirm("Are you sure you want to exit the test? Progress will be lost.")) {
                clearInterval(state.timerInterval);
                history.back();
            }
        };

        container.querySelector('#pa-finish-test').onclick = () => history.back();

        const submitMcqBtn = container.querySelector('#pa-submit-mcq');
        if (submitMcqBtn) submitMcqBtn.onclick = submitMCQ;

        const hrSubmitBtn = container.querySelector('#pa-hr-submit');
        if (hrSubmitBtn) hrSubmitBtn.onclick = submitHR;
        
        const hrNextBtn = container.querySelector('#pa-hr-next');
        if (hrNextBtn) hrNextBtn.onclick = nextHR;

        const improveBtn = container.querySelector('#pa-improve-btn');
        if (improveBtn) {
            improveBtn.onclick = async () => {
                improveBtn.textContent = 'Generating...';
                improveBtn.disabled = true;
                try {
                    const prompt = `Coach prompt: Mock test ${section} score ${state.score}/${state.total}. JSON: {"suggestions": ["..."]}`;
                    const text = await placementAiApi.askOpenAI(prompt);
                    const result = JSON.parse(text.match(/\{[\s\S]*\}/)[0]);
                    alert("AI Suggestions:\n" + result.suggestions.join('\n'));
                } catch (e) {
                    alert("Failed to get suggestions.");
                } finally {
                    improveBtn.textContent = 'Get AI Suggestions';
                    improveBtn.disabled = false;
                }
            };
        }
    };

    const generateQuestions = async () => {
        try {
            const text = await placementAiApi.generateMockTest(section, state.profile, state.profile.selectedCompany);
            state.questionsText = text;
            state.loading = false;
            
            if (section === 'hr') {
                state.hrQuestions = text.split(/\n(?=\d+\.)/).map(q => q.replace(/^\d+\.\s*/, "").trim());
                startTimer(120);
                render();
                updateHRQuestion();
            } else {
                parseMCQs(text);
                startTimer(section === 'coding' ? 600 : 300);
                render();
                renderMCQs();
            }
        } catch (err) {
            alert("AI failed to generate questions. Please try again.");
            history.back();
        }
    };

    const parseMCQs = (text) => {
        const blocks = text.split(/\n(?=\d+\.)/);
        blocks.forEach((block, i) => {
            const lines = block.trim().split("\n").map(l => l.trim()).filter(l => l !== "");
            const questionLine = lines.find(l => /^\d+\./.test(l));
            if (!questionLine) return;

            const questionText = questionLine.replace(/^\d+\.\s*/, "");
            const options = lines.filter(l => /^[A-D]\./.test(l)).map(opt => ({
                letter: opt.charAt(0).toUpperCase(),
                text: opt.replace(/^[A-D]\.\s*/, "")
            }));
            const answerLine = lines.find(l => /^Answer:/i.test(l));
            const correct = answerLine ? answerLine.split(":")[1].trim().toUpperCase() : null;

            state.questions.push({ id: i, text: questionText, options, correct });
            if (correct) state.correctAnswers[`q${i}`] = correct;
        });
        state.total = state.questions.length;
    };

    const renderMCQs = () => {
        const listEl = container.querySelector('#pa-question-list');
        listEl.innerHTML = state.questions.map((q, i) => `
            <div data-q="${i}" class="card relative overflow-visible border-l-4 border-indigo-400">
                <p class="font-bold text-slate-800 text-lg mb-4">${i + 1}. ${q.text}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${q.options.map(opt => `
                        <label class="flex items-center gap-3 p-3 rounded-xl border-1.5 border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                            <input type="radio" name="q${i}" value="${opt.letter}" class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300">
                            <span class="text-slate-600 group-hover:text-slate-900">${opt.letter}. ${opt.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
    };

    const startTimer = (duration) => {
        state.timeLeft = duration;
        const updateTimer = () => {
            const min = Math.floor(state.timeLeft / 60);
            const sec = state.timeLeft % 60;
            const timerEl = container.querySelector('#pa-timer');
            if (timerEl) {
                timerEl.textContent = `Time Left: ${min}:${sec.toString().padStart(2, '0')}`;
                if (state.timeLeft < 60) timerEl.classList.add('text-rose-600');
            }
            if (state.timeLeft <= 0) {
                clearInterval(state.timerInterval);
                if (section === 'hr') nextHR(); else submitMCQ();
            }
            state.timeLeft--;
        };
        state.timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    };

    const submitMCQ = () => {
        clearInterval(state.timerInterval);
        state.score = 0;
        state.questions.forEach((q, i) => {
            const selected = container.querySelector(`input[name="q${i}"]:checked`);
            if (selected && selected.value === q.correct) state.score++;
        });
        state.testSubmitted = true;
        render();
    };

    const updateHRQuestion = () => {
        const qText = state.hrQuestions[state.currentHR];
        container.querySelector('#pa-hr-question-num').textContent = `Question ${state.currentHR + 1}/10`;
        container.querySelector('#pa-hr-question-text').textContent = qText;
        speak(qText);
    };

    const submitHR = async () => {
        const answer = container.querySelector('#pa-hr-answer').value.trim();
        if (!answer) return alert("Please type your answer.");
        
        clearInterval(state.timerInterval);
        const btn = container.querySelector('#pa-hr-submit');
        btn.textContent = 'Evaluating...';
        btn.disabled = true;

        try {
            const result = await placementAiApi.evaluateHrAnswer(state.hrQuestions[state.currentHR], answer);
            state.hrEvaluation = result.evaluation;
            state.hrSuggestions = result.suggestions;
            
            const evalView = container.querySelector('#pa-hr-evaluation');
            evalView.classList.remove('hidden');
            container.querySelector('#pa-hr-eval-text').textContent = result.evaluation;
            container.querySelector('#pa-hr-suggestions').innerHTML = result.suggestions.map(s => `<li>${s}</li>`).join('');
            
            speak(result.evaluation);
            
            btn.classList.add('hidden');
            container.querySelector('#pa-hr-next').classList.remove('hidden');
        } catch (e) {
            alert("Evaluation failed.");
            btn.textContent = 'Submit Answer';
            btn.disabled = false;
        }
    };

    const nextHR = () => {
        speechSynthesis.cancel();
        state.currentHR++;
        if (state.currentHR >= state.hrQuestions.length) {
            alert("HR Interview Completed!");
            state.score = 10;
            state.total = 10;
            state.testSubmitted = true;
            render();
            return;
        }
        
        const evalView = container.querySelector('#pa-hr-evaluation');
        evalView.classList.add('hidden');
        container.querySelector('#pa-hr-submit').classList.remove('hidden');
        container.querySelector('#pa-hr-submit').disabled = false;
        container.querySelector('#pa-hr-submit').textContent = 'Submit Answer';
        container.querySelector('#pa-hr-next').classList.add('hidden');
        container.querySelector('#pa-hr-answer').value = '';
        
        updateHRQuestion();
        startTimer(120);
    };

    const speak = (text) => {
        speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.9;
        speechSynthesis.speak(utter);
    };

    render();
    return container;
};
