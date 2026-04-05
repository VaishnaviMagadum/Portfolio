import { placementAiAuth } from '../../services/placementAiAuth';
import './placement-ai.css';

export const PlacementAiAuth = () => {
    const container = document.createElement('div');
    container.className = 'placement-ai-app min-h-screen relative overflow-hidden stars-bg';

    const render = () => {
        container.innerHTML = `
            <div class="stars-bg"></div>
            <div class="container relative z-10 animate-pa">
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center font-black text-2xl text-white shadow-xl mb-4">P</div>
                    <h2>PlacementAI</h2>
                    <p class="text-slate-500 font-medium">Smart Career Navigation & Preparation</p>
                </div>

                <div id="pa-login-view" class="card">
                    <h3 class="text-center">Welcome Back</h3>
                    <div class="space-y-4">
                        <div>
                            <label>Username</label>
                            <input type="text" id="pa-login-user" placeholder="Enter username">
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" id="pa-login-pass" placeholder="••••••••">
                        </div>
                        <div>
                            <label>Role</label>
                            <select id="pa-login-role">
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button id="pa-login-btn" class="btn-pa w-full mt-6">Login to Dashboard</button>
                    </div>
                    <p id="pa-login-error" class="text-rose-500 text-sm mt-4 text-center font-bold"></p>
                    <p class="text-center mt-6 text-slate-500 font-medium text-sm">
                        Don't have an account? <button id="pa-toggle-reg" class="text-indigo-600 font-bold hover:underline">Register here</button>
                    </p>
                </div>

                <div id="pa-register-view" class="card hidden">
                    <h3 class="text-center">Create Student Account</h3>
                    <div class="space-y-4">
                        <div>
                            <label>Username</label>
                            <input type="text" id="pa-reg-user" placeholder="Choose a username">
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" id="pa-reg-pass" placeholder="••••••••">
                        </div>
                        <button id="pa-reg-btn" class="btn-pa w-full mt-6">Create Account</button>
                    </div>
                    <p id="pa-reg-error" class="text-rose-500 text-sm mt-4 text-center font-bold"></p>
                    <p class="text-center mt-6 text-slate-500 font-medium text-sm">
                        Already have an account? <button id="pa-toggle-login" class="text-indigo-600 font-bold hover:underline">Login here</button>
                    </p>
                </div>
            </div>
        `;

        setupEvents();
    };

    const setupEvents = () => {
        const loginView = container.querySelector('#pa-login-view');
        const regView = container.querySelector('#pa-register-view');

        container.querySelector('#pa-toggle-reg').onclick = () => {
            loginView.classList.add('hidden');
            regView.classList.remove('hidden');
        };

        container.querySelector('#pa-toggle-login').onclick = () => {
            regView.classList.add('hidden');
            loginView.classList.remove('hidden');
        };

        container.querySelector('#pa-login-btn').onclick = () => {
            const user = container.querySelector('#pa-login-user').value.trim();
            const pass = container.querySelector('#pa-login-pass').value.trim();
            const role = container.querySelector('#pa-login-role').value;
            const errorEl = container.querySelector('#pa-login-error');

            const result = placementAiAuth.login(user, pass, role);
            if (result.error) {
                errorEl.textContent = result.error;
            } else {
                const profile = placementAiAuth.getProfile(user);
                let nextPath = '/placement-ai/dashboard';
                if (role === 'admin') nextPath = '/placement-ai/admin';
                else if (!profile.regSRN) nextPath = '/placement-ai/profile';

                window.history.pushState({}, '', nextPath);
                window.dispatchEvent(new PopStateEvent('popstate'));
            }
        };

        container.querySelector('#pa-reg-btn').onclick = () => {
            const user = container.querySelector('#pa-reg-user').value.trim();
            const pass = container.querySelector('#pa-reg-pass').value.trim();
            const errorEl = container.querySelector('#pa-reg-error');

            if (!user || !pass) {
                errorEl.textContent = "Please fill all fields.";
                return;
            }

            const users = placementAiAuth.getUsers();
            if (users[user]) {
                errorEl.textContent = "Username already exists.";
                return;
            }

            placementAiAuth.saveUser(user, 'student', pass);
            alert('Registration successful! Please login.');
            regView.classList.add('hidden');
            loginView.classList.remove('hidden');
        };
    };

    render();
    return container;
};
