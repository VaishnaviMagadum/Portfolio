import { createIcons, icons } from 'lucide';

export const Footer = () => {
  const footerContainer = document.getElementById('footer');
  const year = new Date().getFullYear();
  
  footerContainer.innerHTML = `
    <footer class="bg-slate-950/20 border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <!-- Main Branding Column -->
          <div class="col-span-1 md:col-span-2 space-y-8">
            <a href="/" class="text-2xl font-mono font-bold tracking-tighter text-white group block">
              Vaishnavi Magadum
            </a>
            
            <!-- Social Link Boxes (Embedded SVGs for fail-proof rendering) -->
            <div class="flex gap-4">
              <a href="https://github.com/VaishnaviMagadum" target="_blank" class="w-10 h-10 rounded-xl glass-dashboard flex items-center justify-center hover:bg-accent-cyan/10 transition-all duration-300 border border-white/5 hover:border-accent-cyan/30 text-slate-400 hover:text-accent-cyan">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/vaishnavi-magadum-60a08633a" target="_blank" class="w-10 h-10 rounded-xl glass-dashboard flex items-center justify-center hover:bg-accent-cyan/10 transition-all duration-300 border border-white/5 hover:border-accent-cyan/30 text-slate-400 hover:text-accent-cyan">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://instagram.com/vaish_magadum" target="_blank" class="w-10 h-10 rounded-xl glass-dashboard flex items-center justify-center hover:bg-accent-cyan/10 transition-all duration-300 border border-white/5 hover:border-accent-cyan/30 text-slate-400 hover:text-accent-cyan">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
            </div>
            
            <div class="flex items-center gap-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
               <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span> Full Stack Developer Intern</div>
            </div>
          </div>

          <div>
            <h3 class="font-mono font-bold text-xs uppercase tracking-[0.3em] text-accent-cyan mb-8">Navigation_Data</h3>
            <ul class="space-y-4">
              ${['Home', 'About', 'Projects', 'Contact'].map(link => `
                <li>
                  <a href="${link === 'Home' ? '/#home' : '/#' + link.toLowerCase()}" class="text-slate-500 hover:text-accent-cyan transition-all flex items-center gap-2 group text-[10px] font-mono font-bold uppercase tracking-widest">
                    <span class="opacity-0 group-hover:opacity-100 transition-all text-accent-cyan">>></span>
                    ${link}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
          
          <div>
            <h3 class="font-mono font-bold text-xs uppercase tracking-[0.3em] text-accent-cyan mb-8">Terminal_Comm</h3>
            <ul class="space-y-6 text-slate-500">
               <li class="flex items-center gap-4 group">
                  <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-accent-cyan transition-colors">
                    <i data-lucide="mail" class="w-4 h-4"></i>
                  </div>
                  <span class="text-[10px] font-mono font-bold">vaishnavimagadum04@gmail.com</span>
               </li>
               <li class="flex items-center gap-4 group">
                  <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-accent-cyan transition-colors">
                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                  </div>
                  <span class="text-[10px] font-mono font-bold">Karnataka, India</span>
               </li>
            </ul>
          </div>
        </div>

        <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-slate-600">
          <p>© ${year} Vaishnavi Magadum</p>
        </div>
      </div>
    </footer>
  `;
  
  setTimeout(() => createIcons({ icons }), 0);
};
