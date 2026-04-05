import { setTheme, toggleTheme } from '../utils/theme';
import { createIcons, icons } from 'lucide';

export const Navbar = () => {
  const navContainer = document.getElementById('navbar');
  let isMobileMenuOpen = false;

  const render = () => {
    const isScrolled = window.scrollY > 30;
    const currentTheme = localStorage.getItem('portfolio-theme') || 'theme-blue';
    const themeIconMap = {
      'theme-blue': 'sun',
      'theme-purple': 'moon',
      'theme-aurora': 'palette'
    };
    const themeIcon = themeIconMap[currentTheme] || 'sun';
    
    navContainer.innerHTML = `
      <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl transition-all duration-500">
        <div class="glass-dashboard h-16 px-6 sm:px-10 flex justify-between items-center group">
          <a href="/" class="flex items-center gap-3 group/logo">
            <span class="text-xl sm:text-2xl font-mono font-bold tracking-tighter text-white">
              Vaishnavi Magadum
            </span>
          </a>

          <div class="hidden md:flex items-center gap-1 lg:gap-4">
              <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 mr-4">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-purple"></span>
                </span>
                <span class="text-[10px] font-mono font-bold text-accent-purple uppercase tracking-tighter">Status: Open_To_Work</span>
              </div>
            
            ${['Home', 'About', 'Projects', 'Contact'].map(item => `
              <a href="${item === 'Home' ? '/#home' : '/#' + item.toLowerCase()}" class="px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all hover:text-accent-cyan hover:bg-white/5 relative group/link text-slate-400">
                ${item.toUpperCase()}
              </a>
            `).join('')}
            
            <div class="w-px h-6 bg-white/10 mx-2"></div>
            
            <button id="theme-switcher" class="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-400 group">
               <i data-lucide="${themeIcon}" class="w-4 h-4 group-hover:text-accent-cyan transition-colors"></i>
            </button>
            
            <a href="/#contact" class="flex items-center gap-2 px-5 py-2 rounded-xl bg-accent-cyan/10 text-accent-cyan font-mono font-bold text-[10px] uppercase tracking-widest hover:bg-accent-cyan/20 transition-all border border-accent-cyan/30 neon-border">
              Contact
            </a>
          </div>

            <button id="mobile-toggle" class="md:hidden p-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 shadow-xl">
              <i data-lucide="${isMobileMenuOpen ? 'x' : 'menu'}" class="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <div id="mobile-menu" class="fixed inset-0 z-[-1] glass sm:mt-24 md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}">
          <div class="container mx-auto px-6 pt-32 pb-12 flex flex-col gap-6">
            ${['Home', 'About', 'Projects', 'Contact'].map(item => `
              <a href="${item === 'Home' ? '/#home' : '/#' + item.toLowerCase()}" class="mobile-nav-link text-3xl font-display font-bold flex items-center justify-between p-4 rounded-3xl hover:bg-white/5 group border border-transparent hover:border-white/5">
                ${item}
                <i data-lucide="chevron-right" class="w-8 h-8 text-primary-500 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"></i>
              </a>
            `).join('')}
            
            <div class="h-px bg-white/10 my-4"></div>
            
            <a href="/#contact" class="w-full flex items-center justify-center gap-3 p-6 rounded-3xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-xl active:scale-95 shadow-[0_10px_30px_-10px_rgba(var(--primary),0.5)] border border-primary-400/20">
              <i data-lucide="briefcase" class="w-6 h-6"></i>
              Hire Me
            </a>

            <button id="mobile-theme-switcher" class="w-full flex items-center justify-between p-6 rounded-3xl bg-primary-500/10 border border-primary-500/20 text-primary-400 group mt-4">
              <span class="text-xl font-bold">Switch Theme</span>
              <i data-lucide="${themeIcon}" class="w-8 h-8"></i>
            </button>
          </div>
        </div>
      </nav>
    `;

    setTimeout(() => createIcons({ icons }), 0);
    addListeners();
  };

  const addListeners = () => {
    ['theme-switcher', 'mobile-theme-switcher'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = (e) => {
          e.stopPropagation();
          toggleTheme();
          render();
        };
      }
    });

    const toggle = document.getElementById('mobile-toggle');
    if (toggle) {
      toggle.onclick = () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        render();
      };
    }

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.onclick = () => {
        isMobileMenuOpen = false;
        render();
      };
    });

    window.onscroll = () => {
      const isScrolled = window.scrollY > 30;
      const nav = document.querySelector('nav');
      if (nav) {
        if (isScrolled) nav.classList.add('py-4'); else nav.classList.remove('py-4');
        if (isScrolled) nav.classList.remove('py-8'); else nav.classList.add('py-8');
      }
    };
  };

  render();
};
