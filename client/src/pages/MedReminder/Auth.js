import { medReminderApi } from '../../services/medReminderApi';
import './med-reminder.css';

export const MedReminderAuth = () => {
  const container = document.createElement('div');
  container.className = 'med-reminder-app min-h-screen pt-20';
  
  const render = () => {
    container.innerHTML = `
      <div class="container auth-container fade-in-page">
        <div class="text-center mb-8">
            <div class="brand-logo mx-auto mb-4" style="width: 64px; height: 64px; background: linear-gradient(135deg, #818cf8, #10b981); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 2.25rem; color: white;">M</div>
            <h1 class="brand-title">MedReminder</h1>
            <p class="text-slate-500 font-semibold">Your daily health friend</p>
        </div>

        <div class="card" id="login-card">
            <h2 class="text-2xl font-extrabold mb-6">Log In</h2>
            <form id="med-login-form">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" id="med-login-username" required placeholder="Enter username" class="w-full">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="med-login-password" required placeholder="••••••••" class="w-full">
                </div>
                <button type="submit" class="w-full bg-indigo-500 text-white rounded-xl py-3 font-bold shadow-lg hover:translate-y-[-2px] transition-all">Enter Dashboard</button>
            </form>
            <button class="w-full mt-4 text-slate-500 font-bold hover:text-indigo-500 transition-colors" id="toggle-to-register">New here? Create Account</button>
        </div>

        <div class="card hidden" id="register-card">
            <h2 class="text-2xl font-extrabold mb-6">Sign Up</h2>
            <form id="med-register-form">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" id="med-reg-username" required placeholder="Choose a username" class="w-full">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="med-reg-password" required placeholder="••••••••" class="w-full">
                </div>
                <button type="submit" class="w-full bg-indigo-500 text-white rounded-xl py-3 font-bold shadow-lg hover:translate-y-[-2px] transition-all">Create Account</button>
            </form>
            <button class="w-full mt-4 text-slate-500 font-bold hover:text-indigo-500 transition-colors" id="toggle-to-login">Have an account? Log In</button>
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

    // Login logic
    container.querySelector('#med-login-form').onsubmit = async (e) => {
      e.preventDefault();
      const username = container.querySelector('#med-login-username').value;
      const password = container.querySelector('#med-login-password').value;
      
      try {
        const data = await medReminderApi.login(username, password);
        localStorage.setItem('med_token', data.access_token);
        localStorage.setItem('med_username', username);
        // Redirect to dashboard using the portfolio's router
        window.history.pushState({}, '', '/med-reminder/dashboard');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch (err) {
        alert(err.message);
      }
    };

    // Register logic
    container.querySelector('#med-register-form').onsubmit = async (e) => {
      e.preventDefault();
      const username = container.querySelector('#med-reg-username').value;
      const password = container.querySelector('#med-reg-password').value;
      
      try {
        await medReminderApi.register(username, password);
        alert('Registration successful! Please login.');
        registerCard.classList.add('hidden');
        loginCard.classList.remove('hidden');
      } catch (err) {
        alert(err.message);
      }
    };
  };

  render();
  return container;
};
