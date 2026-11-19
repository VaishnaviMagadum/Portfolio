import { medReminderApi } from '../../services/medReminderApi';
import './med-reminder.css';

export const MedReminderAuth = () => {
  const container = document.createElement('div');
  container.className = 'med-reminder-app min-h-screen pt-16 sm:pt-20 pb-12';
  
  const render = () => {
    container.innerHTML = `
      <div class="container auth-container fade-in-page max-w-md mx-auto px-4">
        <div class="text-center mb-8">
            <div class="brand-logo mx-auto mb-4" style="width: 64px; height: 64px; background: linear-gradient(135deg, #6366f1, #10b981); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 2.25rem; color: white; box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);">M</div>
            <h1 class="brand-title text-3xl font-extrabold text-slate-800">MedReminder</h1>
            <p class="text-slate-500 font-medium text-sm">Smart prescription & daily dose management</p>
        </div>

        <div class="card bg-white p-8 rounded-3xl border border-slate-100 shadow-xl" id="login-card">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-extrabold text-slate-800">Welcome Back</h2>
                <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold">SPA Version</span>
            </div>

            <!-- Instant Recruiter Access Button -->
            <button type="button" id="med-instant-demo-btn" class="w-full mb-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-2xl py-3.5 px-4 font-bold text-sm shadow-lg shadow-indigo-500/25 hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2">
                <span>⚡ Instant Recruiter / Demo Access</span>
            </button>

            <div class="relative flex py-2 items-center mb-4">
                <div class="flex-grow border-t border-slate-200"></div>
                <span class="flex-shrink mx-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">or sign in</span>
                <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <form id="med-login-form" class="space-y-4">
                <div class="form-group">
                    <label class="text-xs font-bold text-slate-600">Username</label>
                    <input type="text" id="med-login-username" required placeholder="recruiter / guest" value="recruiter" class="w-full">
                </div>
                <div class="form-group">
                    <label class="text-xs font-bold text-slate-600">Password</label>
                    <input type="password" id="med-login-password" required placeholder="••••••••" value="demo123" class="w-full">
                </div>
                <button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 font-bold text-sm transition-all shadow-md">Enter Dashboard</button>
            </form>

            <button class="w-full mt-4 text-slate-500 text-xs font-bold hover:text-indigo-600 transition-colors" id="toggle-to-register">New here? Create Account</button>
            <div class="mt-6 pt-4 border-t border-slate-100 text-center">
                <a href="/#projects" class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">← Back to Portfolio</a>
            </div>
        </div>

        <div class="card bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hidden" id="register-card">
            <h2 class="text-2xl font-extrabold mb-6 text-slate-800">Create Account</h2>
            <form id="med-register-form" class="space-y-4">
                <div class="form-group">
                    <label class="text-xs font-bold text-slate-600">Username</label>
                    <input type="text" id="med-reg-username" required placeholder="Choose a username" class="w-full">
                </div>
                <div class="form-group">
                    <label class="text-xs font-bold text-slate-600">Password</label>
                    <input type="password" id="med-reg-password" required placeholder="••••••••" class="w-full">
                </div>
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-bold text-sm shadow-md transition-all">Create Account</button>
            </form>
            <button class="w-full mt-4 text-slate-500 text-xs font-bold hover:text-indigo-600 transition-colors" id="toggle-to-login">Have an account? Log In</button>
        </div>
      </div>
    `;

    // Toggle logic
    const loginCard = container.querySelector('#login-card');
    const registerCard = container.querySelector('#register-card');
    
    container.querySelector('#toggle-to-register').onclick = () => {
      loginCard.classList.add('hidden');
      registerCard.classList.remove('hidden');
    };
    
    container.querySelector('#toggle-to-login').onclick = () => {
      registerCard.classList.add('hidden');
      loginCard.classList.remove('hidden');
    };

    const goToDashboard = (username = 'Recruiter Guest') => {
      localStorage.setItem('med_token', 'demo-token-' + Date.now());
      localStorage.setItem('med_username', username);
      medReminderApi.getDefaultMedicines(); // initialize medicines
      window.history.pushState({}, '', '/med-reminder/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
    };

    container.querySelector('#med-instant-demo-btn').onclick = () => {
      goToDashboard('Recruiter Guest');
    };

    // Login logic
    container.querySelector('#med-login-form').onsubmit = async (e) => {
      e.preventDefault();
      const username = container.querySelector('#med-login-username').value;
      const password = container.querySelector('#med-login-password').value;
      
      try {
        const data = await medReminderApi.login(username, password);
        goToDashboard(username || data.user?.username || 'Recruiter');
      } catch (err) {
        goToDashboard(username || 'Recruiter Guest');
      }
    };

    // Register logic
    container.querySelector('#med-register-form').onsubmit = async (e) => {
      e.preventDefault();
      const username = container.querySelector('#med-reg-username').value;
      const password = container.querySelector('#med-reg-password').value;
      
      try {
        await medReminderApi.register(username, password);
        goToDashboard(username);
      } catch (err) {
        goToDashboard(username);
      }
    };
  };

  render();
  return container;
};
