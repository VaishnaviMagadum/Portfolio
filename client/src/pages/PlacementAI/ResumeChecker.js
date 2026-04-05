import { placementAiAuth } from '../../services/placementAiAuth';
import { placementAiApi } from '../../services/placementAiApi';
import './placement-ai.css';

export const PlacementAiResumeChecker = () => {
    const container = document.createElement('div');
    container.className = 'placement-ai-app min-h-screen relative overflow-hidden stars-bg';

    const currentUser = placementAiAuth.getCurrentUser();
    if (!currentUser) {
        window.history.pushState({}, '', '/placement-ai');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return container;
    }

    const state = {
        resumeContent: '',
        loading: false,
        result: null
    };

    const render = () => {
        container.innerHTML = `
            <div class="stars-bg"></div>
            <div class="container relative z-10 animate-pa">
                <header class="flex justify-between items-center mb-8">
                    <h2 class="text-left m-0">Resume Score Checker</h2>
                    <button onclick="history.back()" class="text-slate-400 font-bold hover:text-indigo-600 transition-colors">Back</button>
                </header>

                <div class="card p-10">
                    <div class="mb-8 p-12 border-2 border-dashed border-indigo-100 rounded-[2rem] bg-indigo-50/10 flex flex-col items-center justify-center text-center">
                        <span class="text-5xl mb-4">📄</span>
                        <h3 class="mb-2">Upload Your Resume</h3>
                        <p class="text-slate-400 mb-6 text-sm">Supports .txt files for instant analysis. PDF coming soon!</p>
                        <input type="file" id="pa-resume-file" accept=".txt" class="hidden">
                        <button onclick="document.getElementById('pa-resume-file').click()" class="btn-pa !bg-indigo-600">Select File</button>
                        <p id="pa-file-name" class="mt-4 text-emerald-500 font-bold text-sm hidden"></p>
                    </div>

                    <button id="pa-check-resume" class="btn-pa w-full ${state.resumeContent ? '' : 'opacity-50 pointer-events-none'}">
                        ${state.loading ? '🔍 Analyzing with AI...' : 'Check Resume Score'}
                    </button>
                </div>

                <div id="pa-resume-result" class="${state.result ? '' : 'hidden'} card p-12 animate-pa">
                    <div class="flex flex-col md:flex-row gap-12 items-center">
                        <div class="w-48 h-48 rounded-full border-[10px] border-emerald-500 flex flex-col items-center justify-center text-center">
                            <span class="text-4xl font-black text-slate-800">${state.result?.score || 0}/10</span>
                            <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Match Score</span>
                        </div>
                        <div class="flex-1">
                            <h3 class="mb-4">Improvement Suggestions</h3>
                            <ul class="space-y-3">
                                ${state.result?.suggestions.map(s => `
                                    <li class="flex items-start gap-4">
                                        <span class="w-6 h-6 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-xs mt-0.5">✓</span>
                                        <p class="text-slate-600 text-sm leading-relaxed">${s}</p>
                                    </li>
                                `).join('') || ''}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        setupEvents();
    };

    const setupEvents = () => {
        container.querySelector('#pa-resume-file').onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            state.resumeContent = await file.text();
            const nameEl = container.querySelector('#pa-file-name');
            nameEl.textContent = `✓ ${file.name} loaded`;
            nameEl.classList.remove('hidden');
            container.querySelector('#pa-check-resume').classList.remove('opacity-50', 'pointer-events-none');
        };

        container.querySelector('#pa-check-resume').onclick = async () => {
            state.loading = true;
            render();

            try {
                const profile = placementAiAuth.getProfile(currentUser);
                const result = await placementAiApi.checkResume(state.resumeContent, profile);
                state.result = result;
                state.loading = false;
                render();
            } catch (err) {
                alert("Failed to analyze resume.");
                state.loading = false;
                render();
            }
        };
    };

    render();
    return container;
};
