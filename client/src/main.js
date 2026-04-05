import './style.css';
import { initRouter } from './utils/router';
import { initTheme } from './utils/theme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MainLayout } from './pages/MainLayout';
import { Starfield } from './utils/Background';
import { MedReminderAuth } from './pages/MedReminder/Auth';
import { MedReminderDashboard } from './pages/MedReminder/Dashboard';
import { PlacementAiAuth } from './pages/PlacementAI/Auth';
import { PlacementAiProfile } from './pages/PlacementAI/Profile';
import { PlacementAiDashboard } from './pages/PlacementAI/Dashboard';
import { PlacementAiMockTest } from './pages/PlacementAI/MockTest';
import { PlacementAiResumeChecker } from './pages/PlacementAI/ResumeChecker';
import { PlacementAiAdmin } from './pages/PlacementAI/Admin';
import { createIcons, icons } from 'lucide';

const iconCollection = icons;

// Define routes
const routes = {
  '/': MainLayout,
  '/index.html': MainLayout,
  '/about': MainLayout,
  '/projects': MainLayout,
  '/contact': MainLayout,
  '/med-reminder': MedReminderAuth,
  '/med-reminder/dashboard': MedReminderDashboard,
  '/placement-ai': PlacementAiAuth,
  '/placement-ai/profile': PlacementAiProfile,
  '/placement-ai/dashboard': PlacementAiDashboard,
  '/placement-ai/test': PlacementAiMockTest,
  '/placement-ai/resume': PlacementAiResumeChecker,
  '/placement-ai/admin': PlacementAiAdmin,
  '/404': () => '<div class="pt-32 text-center h-screen"><h1 class="text-4xl font-bold">404 - Page Not Found</h1></div>'
};

// Core Initialization function
const initApp = async () => {
  console.log('🚀 App starting initialization...');
  
  // 1. Theme & Background
  try { 
    initTheme(); 
    new Starfield('background-canvas');
  } catch (e) { console.error('initTheme or Starfield failed', e); }

  // 2. Global Components
  try {
    Navbar();
    Footer();
  } catch (error) {
    console.error('Core UI components failed:', error);
  }

  // 3. Router
  const app = document.getElementById('app');
  if (!app) {
    console.error('CRITICAL: #app element missing!');
    return;
  }

  try {
    console.log('Initializing router...');
    initRouter(app, routes);
  } catch (error) {
    console.error('Router initialization failed:', error);
    app.innerHTML = `
      <div class="p-20 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <div class="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-500 mb-6 text-3xl">⚠️</div>
        <h1 class="text-3xl font-bold mb-4 font-display">System Boot Failure</h1>
        <p class="text-slate-500 max-w-md mx-auto font-medium mb-10">${error.message}</p>
        <button onclick="location.reload()" class="px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold shadow-xl">Reboot System</button>
      </div>
    `;
  }
  
  // 4. Initial Icons
  try { createIcons({ icons: iconCollection }); } catch (e) { console.warn('Icons failed', e); }
};

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Pixel Perfect: Mouse-Following Spotlight Logic
window.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// Global Scroll Animation Logic
window.observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scroll-visible');
      window.observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Safety: Ensure visibility even if observer fails
const revealAll = () => {
  document.querySelectorAll('.animate-on-scroll, .animate-slide-up, .animate-fade-in').forEach(el => el.classList.add('scroll-visible'));
};
// Emergency reveal if page is still "blank" after 2s
setTimeout(revealAll, 2000);

window.addEventListener('route-changed', (e) => {
  console.log('Route changed to:', e.detail);
  
  // Attach scroll observer to all animate classes
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-up, .animate-fade-in');
  animatedElements.forEach(el => {
    el.classList.add('scroll-hidden');
    window.observer.observe(el);
  });
  
  try {
    createIcons({ icons: iconCollection });
  } catch (e) {
    console.warn('Post-route icons failed', e);
  }
});
