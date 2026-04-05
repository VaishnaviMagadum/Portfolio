import { createIcons, icons } from 'lucide';
import axios from 'axios';

const staticProjects = [
  { 
    title: 'PARK TICKETING SYSTEM', 
    desc: 'Robust management platform for amusement parks featuring automated ticket generation, ride-list pricing, and secure admin reporting.', 
    tech: ['PHP_8', 'MYSQL_DB', 'ADMIN_UX', 'SYSTEM_LOGIC'], 
    icon: 'ticket',
    image: '/projects/park_ticket.jpg',
    link: '/projects/park_ticket.jpg', // Placeholder for now, as local PHP won't work on Vercel
    status: 'STABLE'
  },
  { 
    title: 'AI BASED PLACEMENT PREP', 
    desc: 'Intelligent mock-interview platform utilizing OpenAI GPT-4o-mini and Web Speech synthesis for interactive HR simulations.', 
    tech: ['JS_CORE', 'OPENAI_API', 'WEB_SPEECH', 'TAILWIND_UX'], 
    icon: 'brain',
    image: '/projects/ai_prep.png',
    link: 'https://exquisite-scone-7532ba.netlify.app/',
    status: 'OPERATIONAL'
  },
  { 
    title: 'MEDICINE REMINDER_SYSTEM', 
    desc: 'Robust health tracking SPA with Node.js/Express backend, JWT authentication, and real-time medication CRUD operations.', 
    tech: ['REST_API', 'JWT_AUTH', 'NODE_JS', 'MONGODB'], 
    icon: 'clock',
    image: '/projects/med_reminder.png',
    link: '/med-reminder',
    hideCode: true,
    status: 'STABLE'
  }
];

export const Projects = () => {
  const container = document.createElement('div');
  container.className = 'relative overflow-hidden w-full opacity-100 visible z-50';
  container.id = 'projects';

  const updateContent = (repos = []) => {
    container.innerHTML = `
      <div class="container mx-auto px-6 relative z-10 py-32">
        <div class="flex flex-col items-center text-center mb-32 space-y-4">
           <h2 class="text-6xl md:text-8xl font-mono font-black tracking-tighter leading-none text-white overflow-hidden">
              <span class="block text-hologram">Latest Projects</span>
           </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
           ${staticProjects.map(project => `
               <div class="group glass-dashboard neon-border p-1 hover:scale-[1.02] transition-all duration-500">
                 <div class="p-8 space-y-6 relative z-10">
                    <div class="flex justify-between items-start">
                       <div class="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan group-hover:text-slate-950 transition-all duration-500">
                          <i data-lucide="${project.icon || 'layers'}" class="w-6 h-6"></i>
                       </div>
                       <div class="text-[9px] font-mono font-bold text-slate-500 flex items-center gap-2">
                          STATUS: <span class="${project.status === 'OPERATIONAL' ? 'text-accent-cyan' : 'text-accent-purple'}">${project.status}</span>
                       </div>
                    </div>

                    <div class="space-y-3">
                       <h3 class="text-2xl font-mono font-bold text-white group-hover:text-accent-cyan transition-colors">${project.title}</h3>
                       <p class="text-[11px] font-mono font-medium text-slate-400 leading-relaxed h-12 overflow-hidden opacity-80">
                         ${project.desc}
                       </p>
                    </div>

                    <div class="flex flex-wrap gap-2 py-4">
                       ${project.tech.map(t => `<span class="px-2 py-1 bg-white/5 border border-white/5 rounded text-[8px] font-mono font-bold text-slate-500 group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-all">${t}</span>`).join('')}
                    </div>

                    <div class="relative aspect-video rounded-2xl overflow-hidden border border-white/5 group-hover:border-accent-cyan/30 transition-all duration-500">
                       <img src="${project.image}" 
                            alt="${project.title}" 
                            onerror="this.src= '${project.title.includes('PARK') ? 'https://images.unsplash.com/photo-1513889959010-683a37c4ed44?auto=format&fit=crop&q=80&w=800' : '/projects/placeholder.png'}'; this.onerror=null;"
                            class="w-full h-full object-cover">
                       <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                    </div>

                    <div class="flex items-center justify-between pt-4">
                       <a href="${project.link}" target="_blank" class="flex items-center gap-2 text-[10px] font-mono font-bold text-accent-cyan hover:tracking-widest transition-all">
                          View Project <i data-lucide="external-link" class="w-3 h-3"></i>
                       </a>
                    </div>
                 </div>
               </div>
           `).join('')}
        </div>

        <div id="github-module" class="mt-40 pt-20 border-t border-white/5 w-full">
            <div class="flex flex-col items-center text-center mb-24 space-y-4">
               <div class="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-widest">Open Source</div>
               <h3 class="text-4xl font-mono font-bold text-white">GitHub Contributions</h3>
            </div>
            
            <div id="repo-grid" class="max-w-5xl mx-auto">
               ${repos.length > 0 ? `
               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   ${repos.map(repo => `
                       <a href="${repo.html_url}" target="_blank" class="glass-dashboard p-6 hover:bg-white/5 transition-all duration-300 group neon-border">
                           <div class="flex items-center justify-between mb-4">
                              <i data-lucide="github" class="w-5 h-5 text-slate-500 group-hover:text-accent-cyan transition-colors"></i>
                              <span class="text-[8px] font-mono font-bold text-slate-600">${repo.language?.toUpperCase() || 'DATA'}</span>
                           </div>
                           <h4 class="text-sm font-mono font-bold text-white mb-2 truncate">${repo.name.toUpperCase()}</h4>
                       </a>
                   `).join('')}
               </div>
               ` : '<div class="text-center text-slate-500 font-mono text-xs">Synchronizing with GitHub Database...</div>'}
            </div>
        </div>
      </div>
    `;
    
    setTimeout(() => createIcons({ icons }), 0);
  };

  const loadRepos = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/VaishnaviMagadum/repos?sort=updated&per_page=6`);
      updateContent(response.data);
    } catch (error) {
      console.warn('GitHub sync failed, showing featured projects only.');
    }
  };
  
  updateContent([]); 
  setTimeout(loadRepos, 500); 
  
  return container;
};
