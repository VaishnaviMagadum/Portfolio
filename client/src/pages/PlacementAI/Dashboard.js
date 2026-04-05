import { placementAiAuth } from '../../services/placementAiAuth';
import { placementAiApi } from '../../services/placementAiApi';
import './placement-ai.css';

export const PlacementAiDashboard = () => {
    const container = document.createElement('div');
    container.className = 'placement-ai-app min-h-screen relative overflow-hidden stars-bg';

    const currentUser = placementAiAuth.getCurrentUser();
    if (!currentUser) {
        window.history.pushState({}, '', '/placement-ai');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return container;
    }

    const state = {
        profile: placementAiAuth.getProfile(currentUser),
        companies: [],
        loadingCompanies: false
    };

    const render = () => {
        container.innerHTML = `
            <div class="stars-bg"></div>
            <div class="container relative z-10 animate-pa">
                <header class="flex justify-between items-center mb-10">
                    <div>
                        <h2 class="text-left mb-1">Student Dashboard</h2>
                        <p class="text-slate-500 font-medium">Welcome back, ${currentUser}</p>
                    </div>
                    <div class="flex gap-4">
                        <button id="pa-edit-profile" class="text-indigo-600 font-bold hover:underline">Edit Profile</button>
                        <button id="pa-logout-dash" class="bg-slate-100 px-6 py-2 rounded-xl font-bold hover:bg-slate-200 transition-all">Logout</button>
                    </div>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <!-- Company Suggestions Section -->
                    <div class="card p-8">
                        <h3 class="flex items-center gap-3 mb-6">
                            <span class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">🏢</span>
                            Suggested Companies
                        </h3>
                        <p class="text-slate-500 mb-6 text-sm">AI-powered suggestions based on your Skills and CGPA.</p>
                        <div id="pa-company-list" class="space-y-3 min-h-[100px] flex flex-col justify-center">
                            ${state.loadingCompanies ? '<p class="text-center text-indigo-600 animate-pulse font-bold">🔍 Analyzing market...</p>' : '<button id="pa-find-companies" class="btn-pa">Generate Suggestions</button>'}
                        </div>
                    </div>

                    <!-- Mock Tests Section -->
                    <div class="card p-8">
                        <h3 class="flex items-center gap-3 mb-6">
                            <span class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">📝</span>
                            Mock Test Sections
                        </h3>
                        <div class="grid grid-cols-2 gap-4">
                            <button class="pa-test-type-btn p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border-2 border-transparent hover:border-indigo-200 transition-all text-left group" data-section="aptitude">
                                <p class="font-bold text-slate-800 group-hover:text-indigo-600">Aptitude</p>
                                <p class="text-[10px] text-slate-400">10 Questions</p>
                            </button>
                            <button class="pa-test-type-btn p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border-2 border-transparent hover:border-indigo-200 transition-all text-left group" data-section="coding">
                                <p class="font-bold text-slate-800 group-hover:text-indigo-600">Coding</p>
                                <p class="text-[10px] text-slate-400">10 Questions</p>
                            </button>
                            <button class="pa-test-type-btn p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border-2 border-transparent hover:border-indigo-200 transition-all text-left group" data-section="communication">
                                <p class="font-bold text-slate-800 group-hover:text-indigo-600">Soft Skills</p>
                                <p class="text-[10px] text-slate-400">10 Questions</p>
                            </button>
                            <button class="pa-test-type-btn p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border-2 border-transparent hover:border-indigo-200 transition-all text-left group" data-section="hr">
                                <p class="font-bold text-slate-800 group-hover:text-indigo-600">HR Interview</p>
                                <p class="text-[10px] text-slate-400 flex items-center gap-1">🗣️ Voice Round</p>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Resume Checker Quick Access -->
                <div class="card p-8 flex items-center justify-between border-2 border-indigo-100 bg-indigo-50/20">
                    <div class="flex items-center gap-6">
                        <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-indigo-50">📄</div>
                        <div>
                            <h3 class="mb-1">AI Resume Score Checker</h3>
                            <p class="text-slate-500 text-sm">Upload your resume to get instant feedback and a readiness score.</p>
                        </div>
                    </div>
                    <button id="pa-go-resume" class="btn-pa h-full !bg-white !text-indigo-600 border-2 border-indigo-600 hover:!bg-indigo-600 hover:!text-white">Launch Checker</button>
                </div>
            </div>
        `;

        setupEvents();
    };

    const setupEvents = () => {
        const findBtn = container.querySelector('#pa-find-companies');
        if (findBtn) {
            findBtn.onclick = async () => {
                state.loadingCompanies = true;
                render();
                try {
                    const suggestions = await placementAiApi.getCompanySuggestions(state.profile);
                    state.companies = suggestions;
                    state.loadingCompanies = false;
                    renderCompanyList();
                } catch (err) {
                    alert("Failed to fetch suggestions.");
                    state.loadingCompanies = false;
                    render();
                }
            };
        }

        container.querySelector('#pa-edit-profile').onclick = () => {
            window.history.pushState({}, '', '/placement-ai/profile');
            window.dispatchEvent(new PopStateEvent('popstate'));
        };

        container.querySelector('#pa-logout-dash').onclick = () => {
            placementAiAuth.logout();
            window.history.pushState({}, '', '/placement-ai');
            window.dispatchEvent(new PopStateEvent('popstate'));
        };

        container.querySelector('#pa-go-resume').onclick = () => {
            window.history.pushState({}, '', '/placement-ai/resume');
            window.dispatchEvent(new PopStateEvent('popstate'));
        };

        container.querySelectorAll('.pa-test-type-btn').forEach(btn => {
            btn.onclick = () => {
                const section = btn.getAttribute('data-section');
                sessionStorage.setItem('currentTestSection', section);
                window.history.pushState({}, '', '/placement-ai/test');
                window.dispatchEvent(new PopStateEvent('popstate'));
            };
        });
    };

    const renderCompanyList = () => {
        const listEl = container.querySelector('#pa-company-list');
        if (!listEl) return;

        listEl.innerHTML = state.companies.map(c => `
            <div class="company-item animate-pa">
                <span class="font-bold text-slate-700">${c}</span>
                <button class="pa-select-company text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800" data-name="${c}">Select</button>
            </div>
        `).join('');

        listEl.querySelectorAll('.pa-select-company').forEach(btn => {
            btn.onclick = () => {
                const name = btn.getAttribute('data-name');
                const profile = placementAiAuth.getProfile(currentUser);
                profile.selectedCompany = name;
                placementAiAuth.saveProfile(currentUser, profile);
                alert(`${name} selected as your target company! Mock tests will now be tailored for ${name}.`);
            };
        });
    };

    render();
    return container;
};
