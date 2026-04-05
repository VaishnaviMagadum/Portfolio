import { createIcons, icons } from 'lucide';

export const About = () => {
  const container = document.createElement('div');
  container.className = 'relative overflow-hidden w-full';
  
  container.innerHTML = `
    <div class="container mx-auto px-6 relative z-10 py-32">
      <!-- Section Header -->
      <div class="flex flex-col items-center text-center mb-32 space-y-4">
         <h2 class="text-6xl md:text-8xl font-mono font-black tracking-tighter leading-none text-white overflow-hidden">
            <span class="block text-hologram animate-slide-up">About Me</span>
         </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-40">
        <!-- Biometric / Profile Section -->
        <div class="relative animate-fade-in flex flex-col items-center group">
           <div class="relative w-full max-w-[400px] aspect-[3/4] glass-dashboard p-4 neon-border rounded-2xl group-hover:shadow-[0_0_50px_rgba(34,211,238,0.2)] transition-all duration-700">
              <!-- Scanline Animation Overlay -->
              <div class="absolute inset-0 rounded-2xl border-2 border-accent-cyan/10 overflow-hidden">
                 <div class="absolute top-0 left-0 w-full h-[2px] bg-accent-cyan shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-[scan-line_4s_linear_infinite]"></div>
              </div>
              
              <!-- Central Profile Image -->
              <div class="relative w-full h-full rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                 <img src="/profile.jpg" alt="Vaishnavi Magadum" class="w-full h-full object-cover">
                 <div class="absolute inset-0 bg-accent-cyan/5 mix-blend-overlay"></div>
              </div>
           </div>
           
           <div class="mt-8 grid grid-cols-2 gap-4 w-full max-w-md font-mono text-[9px] uppercase tracking-widest text-slate-500">
              <div class="p-4 glass-dashboard border-white/5">
                 <div class="text-accent-cyan mb-1">DEVELOPER_ID:</div>
                 <div class="text-white">VAISHNAVI_M</div>
              </div>
              <div class="p-4 glass-dashboard border-white/5">
                 <div class="text-accent-purple mb-1">STATUS:</div>
                 <div class="text-white font-bold text-accent-purple">OPEN_TO_WORK</div>
              </div>
              <div class="p-4 glass-dashboard border-white/5">
                 <div class="text-accent-cyan mb-1">LOCATION:</div>
                 <div class="text-white">BELGAUM, IN</div>
              </div>
              <div class="p-4 glass-dashboard border-white/5">
                 <div class="text-accent-purple mb-1">COORDINATES:</div>
                 <div class="text-white">16.27° N / 74.45° E</div>
              </div>
              <div class="p-4 glass-dashboard border-white/5 col-span-2">
                 <div class="text-accent-cyan mb-1">CORE_STACK:</div>
                 <div class="text-white uppercase">MERN / JAVA / PYTHON / SQL</div>
              </div>
           </div>
        </div>

        <div class="space-y-12 animate-slide-up self-center">
           <div class="space-y-6">
              <h3 class="text-xs font-mono font-bold text-accent-cyan uppercase tracking-[0.4em]">Summary</h3>
              <p class="text-xl md:text-2xl text-slate-300 leading-relaxed font-mono font-medium border-l-2 border-accent-cyan/30 pl-8">
                "Creating seamless digital experiences and robust backend architectures."
              </p>
           </div>
           
           <div class="space-y-6 text-sm md:text-base text-slate-500 leading-relaxed font-mono font-medium opacity-80">
              <p>
                I am a passionate Full Stack Developer skilled in HTML, CSS, JavaScript, React, Node.js, Express.js, and SQL, focused on building scalable and user-friendly web applications.
              </p>
              <p>
                Along with web technologies, I have a strong foundation in Java and Python, which enhances my problem-solving and system design skills. I enjoy developing efficient backend architectures and clean, responsive user interfaces.
              </p>
              <p>
                I am driven to create real-world solutions and continuously improve my skills to build applications that are reliable, secure, and capable of handling high user demand.
              </p>
           </div>
           
           <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div class="glass-dashboard p-6 neon-border">
                 <div class="flex items-center gap-3 mb-2">
                    <i data-lucide="graduation-cap" class="w-4 h-4 text-accent-cyan"></i>
                    <h4 class="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Education</h4>
                 </div>
                 <p class="text-[11px] font-mono text-slate-400">B.E. Computer Science (HIT)</p>
              </div>
              <div class="glass-dashboard p-6 border-white/5">
                 <div class="flex items-center gap-3 mb-2">
                    <i data-lucide="briefcase" class="w-4 h-4 text-accent-purple"></i>
                    <h4 class="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Experience</h4>
                 </div>
                 <p class="text-[11px] font-mono text-slate-400">Full Stack Developer Intern @ VRIF</p>
              </div>
           </div>
        </div>
      </div>

      <!-- Technical Skills [MINIMALIST GRID STYLE] -->
      <div class="flex flex-col items-center text-center mb-24 space-y-4">
         <h3 class="text-4xl font-mono font-bold text-white tracking-tight">Technical Skills</h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-40 max-w-7xl mx-auto">
         ${[
           { 
             title: 'Languages', 
             icon: 'https://skillicons.dev/icons?i=python,java,js', 
             skills: ['Python', 'Java', 'JavaScript (ES6+)'],
             color: 'cyan'
           },
           { 
             title: 'Frontend', 
             icon: 'https://skillicons.dev/icons?i=html,css,react,bootstrap', 
             skills: ['HTML5 / CSS3', 'React.js', 'Bootstrap', 'Responsive UX'],
             color: 'purple'
           },
           { 
             title: 'Backend', 
             icon: 'https://skillicons.dev/icons?i=nodejs,express', 
             skills: ['Node.js', 'Express.js', 'REST APIs'],
             color: 'cyan'
           },
           { 
             title: 'Databases', 
             icon: 'https://skillicons.dev/icons?i=mysql,mongodb,postgres', 
             skills: ['SQL', 'MySQL', 'MongoDB'],
             color: 'purple'
           }
         ].map(category => `
           <div class="glass-dashboard group p-10 hover:bg-white/[0.03] transition-all duration-700 border border-white/5 hover:border-accent-${category.color}/30 rounded-[3rem] relative overflow-hidden h-full flex flex-col items-center text-center">
              <!-- Glow Effect -->
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-accent-${category.color}/5 blur-[60px] group-hover:bg-accent-${category.color}/10 transition-all"></div>
              
              <div class="mb-10 w-full flex justify-center">
                 <img src="${category.icon}" alt="${category.title}" class="h-12 w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-110 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
              </div>
              
              <h3 class="text-xs font-mono font-black mb-8 text-white uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-all">${category.title}</h3>
              
              <div class="space-y-4 w-full">
                 ${category.skills.map(skill => `<div class="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors py-2 border-b border-white/[0.02] last:border-0">${skill}</div>`).join('')}
              </div>
           </div>
         `).join('')}
      </div>

      <!-- Experience Timeline Header -->
      <div class="border-t border-white/5 pt-32">
         <div class="flex flex-col items-center text-center mb-24 space-y-4">
            <div class="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-widest">History</div>
            <h3 class="text-4xl font-mono font-bold text-white">Educational Timeline</h3>
         </div>
         
         <div class="max-w-4xl mx-auto space-y-8 relative">
            <!-- Connector Line -->
            <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/50 via-accent-purple/50 to-transparent"></div>
            
            ${[
               { year: '2022 - 2026', title: 'Bachelor of Engineering in Computer Science', org: 'Hirasugar Institute of Technology, Nidoshi', desc: 'Gaining expertise in software engineering and modern tech stacks. Current CGPA: 8.15' },
               { year: '2020 - 2022', title: 'PUC (PCMB)', org: "SDVS Sangh's PU College, Sankeshwar", desc: 'Completed Pre-University course with a focus on Physics, Chemistry, Math, and Biology. Percentage: 87.33%' },
               { year: '2020', title: 'SSLC', org: 'SD High School, Sankeshwar', desc: 'Secondary School Leaving Certificate. Percentage: 83.68%' }
            ].map((item, index) => `
               <div class="relative glass-dashboard p-10 neon-border flex flex-col md:flex-row gap-8 items-start group hover:bg-white/5 transition-all">
                  <!-- Timeline Node -->
                  <div class="absolute -left-1.5 md:left-[calc(50%-6px)] top-12 w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10"></div>
                  
                  <div class="text-[10px] font-mono font-bold text-accent-cyan bg-accent-cyan/10 px-4 py-1.5 rounded-full border border-accent-cyan/30 tracking-widest uppercase">
                     ${item.year}
                  </div>
                  <div class="flex-1 space-y-3">
                     <h4 class="text-xl font-mono font-bold text-white group-hover:text-accent-cyan transition-colors tracking-tight">${item.title}</h4>
                     <p class="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest opacity-60">${item.org}</p>
                     <p class="text-[11px] font-mono font-medium text-slate-400 leading-relaxed">${item.desc}</p>
                  </div>
               </div>
            `).join('')}
         </div>
      </div>
    </div>
  `;
  
  setTimeout(() => createIcons({ icons }), 0);
  return container;
};
