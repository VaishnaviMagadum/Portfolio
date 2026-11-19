import { createIcons, icons } from 'lucide';
import axios from 'axios';

const staticProjects = [
  { 
    title: 'MEDICINE REMINDER SYSTEM', 
    desc: 'Full-stack healthcare application for medication management, scheduling, reminder notifications, inventory tracking, and interactive wellness monitoring.', 
    tech: ['REACT_JS', 'NODE_JS', 'EXPRESS_JS', 'JWT_AUTH', 'TAILWIND_CSS'], 
    icon: 'clock',
    image: './projects/med_reminder.png',
    link: 'https://medicine-reminder-zc9o.onrender.com/login',
    hideCode: true,
    status: 'OPERATIONAL'
  },
  { 
    title: 'AI BASED PLACEMENT PREP', 
    desc: 'AI-powered placement platform featuring 4+ modules including mock tests, AI resume evaluation, company recommendations, and interactive HR simulations.', 
    tech: ['JS_CORE', 'OPENAI_API', 'BOOTSTRAP', 'WEB_SPEECH', 'GIT'], 
    icon: 'brain',
    image: './projects/ai_prep.png',
    link: 'https://vaishnavimagadum.github.io/Placement-AI/',
    status: 'OPERATIONAL'
  },
  { 
    title: 'PARK TICKETING SYSTEM', 
    desc: 'Robust ticketing management system capable of handling 100+ visitor bookings with automated payment, ride pricing, and visitor tracking features.', 
    tech: ['PHP', 'MYSQL', 'JQUERY', 'AJAX', 'BOOTSTRAP'], 
    icon: 'ticket',
    image: './projects/park_ticket.jpg',
    link: 'https://theme-park-ticketing-system.onrender.com',
    status: 'STABLE'
  }
];

const defaultRepos = [
  {
    name: 'Portfolio',
    description: 'High-end developer portfolio designed as an interactive futuristic AI Dashboard with Glassmorphism and Vite.',
    html_url: 'https://github.com/VaishnaviMagadum/Portfolio',
    stargazers_count: 5
  },
  {
    name: 'Placement-AI',
    description: 'AI-Powered Placement Preparation platform featuring mock tests, resume evaluation, and HR interview simulations.',
    html_url: 'https://github.com/VaishnaviMagadum/Placement-AI',
    stargazers_count: 3
  },
  {
    name: 'theme-park-ticketing-system',
    description: 'Amusement park booking system capable of handling automated ticket generation, ride pricing, and visitor tracking.',
    html_url: 'https://github.com/VaishnaviMagadum/theme-park-ticketing-system',
    stargazers_count: 2
  },
  {
    name: 'medicine-reminder',
    description: 'Full-stack medication scheduling application with daily dose alerts, health analytics, and regimen tracking.',
    html_url: 'https://github.com/VaishnaviMagadum/medicine-reminder',
    stargazers_count: 2
  },
  {
    name: 'store-rating-system',
    description: 'Store rating and feedback management system with interactive customer reviews and analytics.',
    html_url: 'https://github.com/VaishnaviMagadum/store-rating-system',
    stargazers_count: 1
  },
  {
    name: 'Park_ticketing_system',
    description: 'Ticketing and ride pricing system for theme park management and visitor registration.',
    html_url: 'https://github.com/VaishnaviMagadum/Park_ticketing_system',
    stargazers_count: 2
  }
];

export const Projects = () => {
  const container = document.createElement('div');
  container.className = 'relative overflow-hidden w-full opacity-100 visible z-50';
  container.id = 'projects';

  const updateContent = (repos = defaultRepos) => {
    const displayRepos = (repos && repos.length > 0) ? repos : defaultRepos;

    container.innerHTML = `
      <div class="container mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-32">
        <div class="flex flex-col items-center text-center mb-16 sm:mb-32 space-y-4">
           <h2 class="text-4xl sm:text-6xl md:text-8xl font-mono font-black tracking-tighter leading-none text-white overflow-hidden">
              <span class="block text-hologram whitespace-nowrap">Latest Projects</span>
           </h2>
        </div>

        <!-- Featured Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
           ${staticProjects.map(project => `
               <div class="group glass-dashboard neon-border p-1 hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between">
                 <div class="p-4 sm:p-6 space-y-4 sm:space-y-5 relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div class="flex justify-between items-start mb-4">
                         <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan group-hover:text-slate-950 transition-all duration-500">
                            <i data-lucide="${project.icon || 'layers'}" class="w-5 h-5 sm:w-6 sm:h-6"></i>
                         </div>
                         <div class="text-[8px] sm:text-[9px] font-mono font-bold text-slate-500 flex items-center gap-2">
                            STATUS: <span class="${project.status === 'OPERATIONAL' ? 'text-accent-cyan' : 'text-accent-purple'}">${project.status}</span>
                         </div>
                      </div>

                      <div class="space-y-2 mb-3">
                         <h3 class="text-base sm:text-lg font-mono font-bold text-white group-hover:text-accent-cyan transition-colors line-clamp-1">${project.title}</h3>
                         <p class="text-[10px] sm:text-[11px] font-mono font-medium text-slate-400 leading-relaxed h-12 overflow-hidden opacity-80">
                           ${project.desc}
                         </p>
                      </div>

                      <div class="flex flex-wrap gap-1.5 py-2">
                         ${project.tech.map(t => `<span class="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded text-[7px] sm:text-[8px] font-mono font-bold text-slate-500 group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-all">${t}</span>`).join('')}
                      </div>

                      <div class="relative aspect-video rounded-xl overflow-hidden border border-white/5 group-hover:border-accent-cyan/30 transition-all duration-500 mt-2">
                         <img src="${project.image}" 
                              alt="${project.title}" 
                              onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';"
                              class="w-full h-full object-cover">
                         <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                      </div>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                       <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-accent-cyan hover:tracking-widest transition-all">
                          View Project <i data-lucide="external-link" class="w-3 h-3"></i>
                       </a>
                    </div>
                 </div>
               </div>
           `).join('')}
        </div>

        <!-- GitHub Module -->
        <div id="github-module" class="mt-20 sm:mt-32 pt-10 sm:pt-16 border-t border-white/5 w-full">
            <div class="flex flex-col items-center text-center mb-12 sm:mb-16 space-y-2 sm:space-y-3">
               <div class="text-[9px] sm:text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-widest flex items-center gap-2">
                 <span class="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
                 Open Source Repositories
               </div>
               <h3 class="text-2xl sm:text-4xl font-mono font-bold text-white">GitHub Showcase</h3>
               <p class="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto">Explore active source code, project architectures, and repositories.</p>
            </div>
            
            <div id="repo-grid" class="max-w-6xl mx-auto px-2">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    ${displayRepos.map(repo => {
                        const stars = repo.stargazers_count ?? repo.stars ?? 1;
                        return `
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="glass-dashboard p-5 sm:p-6 hover:bg-white/5 hover:border-accent-cyan/40 transition-all duration-300 group neon-border flex flex-col justify-between rounded-2xl">
                            <div>
                                <div class="flex items-center justify-between mb-3">
                                   <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-accent-cyan transition-colors">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                         <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                         <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                      </svg>
                                   </div>
                                   <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-mono font-bold text-slate-400">
                                      <span class="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
                                      REPOSITORY
                                   </span>
                                </div>
                                <h4 class="text-xs sm:text-sm font-mono font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors truncate">${repo.name}</h4>
                                <p class="text-[10px] sm:text-[11px] font-mono text-slate-400 leading-relaxed mb-4 line-clamp-2">${repo.description || 'Public GitHub repository showcasing full-stack development and engineering code.'}</p>
                            </div>
                            <div class="flex items-center justify-between pt-3 border-t border-white/5 text-[9px] font-mono text-slate-500">
                                <span class="flex items-center gap-1 text-slate-400">★ ${stars}</span>
                                <span class="text-accent-cyan group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">Code →</span>
                            </div>
                        </a>
                        `;
                    }).join('')}
                </div>

                <!-- GitHub Profile Banner -->
                <div class="mt-8 sm:mt-12 text-center">
                    <a href="https://github.com/VaishnaviMagadum" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-dashboard border border-white/10 hover:border-accent-cyan/40 text-slate-300 hover:text-accent-cyan font-mono text-xs font-bold transition-all hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                           <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                           <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                        <span>View All Repositories @VaishnaviMagadum on GitHub →</span>
                    </a>
                </div>
            </div>
        </div>
      </div>
    `;
    
    setTimeout(() => createIcons({ icons }), 0);
  };

  const loadRepos = async () => {
    try {
      const response = await axios.get('https://api.github.com/users/VaishnaviMagadum/repos?sort=updated&per_page=6', { timeout: 4000 });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        updateContent(response.data);
      }
    } catch (error) {
      console.info('GitHub API rate limited or offline. Displaying curated showcase repositories.');
      // defaultRepos are already rendered, so user is never stuck on an empty/loading state
    }
  };
  
  // Render immediately with curated showcase repos
  updateContent(defaultRepos); 
  // Attempt background live update if GitHub rate limit permits
  setTimeout(loadRepos, 300); 
  
  return container;
};
