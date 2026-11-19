import { createIcons, icons } from 'lucide';

export const About = () => {
  const container = document.createElement('div');
  container.className = 'relative overflow-hidden w-full';
  
  container.innerHTML = `
    <div class="container mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-32">
      <!-- Section Header -->
      <div class="flex flex-col items-center text-center mb-16 sm:mb-32 space-y-4">
         <h2 class="text-4xl sm:text-6xl md:text-8xl font-mono font-black tracking-tighter leading-none text-white overflow-hidden">
            <span class="block text-hologram animate-slide-up whitespace-nowrap">About Me</span>
         </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-24 sm:mb-40">
        <!-- Biometric / Profile Section -->
        <div class="relative animate-fade-in flex flex-col items-center group w-full">
           <div class="relative w-full max-w-[320px] sm:max-w-[400px] aspect-[3/4] glass-dashboard p-3 sm:p-4 neon-border rounded-2xl group-hover:shadow-[0_0_50px_rgba(34,211,238,0.2)] transition-all duration-700 mx-auto">
              <!-- Scanline Animation Overlay -->
              <div class="absolute inset-0 rounded-2xl border-2 border-accent-cyan/10 overflow-hidden">
                 <div class="absolute top-0 left-0 w-full h-[2px] bg-accent-cyan shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-[scan-line_4s_linear_infinite]"></div>
              </div>
              
              <!-- Central Profile Image -->
              <div class="relative w-full h-full rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                 <img src="./profile.jpg" alt="Vaishnavi Magadum" onerror="this.onerror=null; this.src='./profile.png';" class="w-full h-full object-cover">
                 <div class="absolute inset-0 bg-accent-cyan/5 mix-blend-overlay"></div>
              </div>
           </div>
           
           <div class="mt-8 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500">
              <div class="p-3 sm:p-4 glass-dashboard border-white/5">
                 <div class="text-accent-cyan mb-1">DEVELOPER_ID:</div>
                 <div class="text-white">VAISHNAVI_M</div>
              </div>
              <div class="p-3 sm:p-4 glass-dashboard border-white/5">
                 <div class="text-accent-purple mb-1">ROLE:</div>
                 <div class="text-white font-bold">FULL STACK DEV</div>
              </div>
              <div class="p-3 sm:p-4 glass-dashboard border-white/5">
                 <div class="text-accent-cyan mb-1">FOCUS:</div>
                 <div class="text-white font-bold text-accent-cyan">WEB & CLOUD</div>
              </div>
              <div class="p-3 sm:p-4 glass-dashboard border-white/5">
                 <div class="text-accent-purple mb-1">STATUS:</div>
                 <div class="text-white font-bold text-accent-purple">OPEN_TO_WORK</div>
              </div>
           </div>
        </div>

        <div class="space-y-8 sm:space-y-12 animate-slide-up self-center text-center lg:text-left">
           <div class="space-y-4 sm:space-y-6">
              <h3 class="text-[10px] sm:text-xs font-mono font-bold text-accent-cyan uppercase tracking-[0.3em] sm:tracking-[0.4em]">Summary</h3>
              <p class="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed font-mono font-medium border-l-0 lg:border-l-2 border-accent-cyan/30 pl-0 lg:pl-8">
                "Computer Science Engineering graduate skilled in Full Stack Web Development, passionate about building responsive applications and scalable backend architectures."
              </p>
           </div>
           
           <div class="space-y-4 sm:space-y-6 text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed font-mono font-medium opacity-90">
              <p>
                Proficient in HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, SQL, and REST APIs. Skilled in designing intuitive frontend user interfaces and robust CRUD data management systems.
              </p>
              <p>
                Strong foundation in Java, Python, Spring Boot, Hibernate, DBMS, and Generative AI (OpenAI API, LLMs), backed by industry internship experience at VRIF working in an Agile development environment.
              </p>
           </div>
           
           <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
              <div class="glass-dashboard p-5 sm:p-6 neon-border">
                 <div class="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                    <i data-lucide="graduation-cap" class="w-4 h-4 text-accent-cyan"></i>
                    <h4 class="text-[9px] sm:text-[10px] font-mono font-bold text-white uppercase tracking-widest text-center sm:text-left">Education</h4>
                 </div>
                 <p class="text-[10px] sm:text-[11px] font-mono text-slate-300 text-center sm:text-left font-bold">B.E. CSE @ HIT (2022–2026)</p>
                 <p class="text-[9px] sm:text-[10px] font-mono text-accent-cyan text-center sm:text-left font-bold">CGPA: 8.3 / 10</p>
              </div>
              <div class="glass-dashboard p-5 sm:p-6 border-white/5">
                 <div class="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                    <i data-lucide="briefcase" class="w-4 h-4 text-accent-purple"></i>
                    <h4 class="text-[9px] sm:text-[10px] font-mono font-bold text-white uppercase tracking-widest text-center sm:text-left">Experience</h4>
                 </div>
                 <p class="text-[10px] sm:text-[11px] font-mono text-slate-300 text-center sm:text-left font-bold">Full Stack Developer @ VRIF</p>
                 <p class="text-[9px] sm:text-[10px] font-mono text-accent-purple text-center sm:text-left font-bold">Feb 2026 – May 2026</p>
              </div>
           </div>
        </div>
      </div>

      <!-- Technical Skills [MINIMALIST GRID STYLE] -->
      <div class="flex flex-col items-center text-center mb-12 sm:mb-24 space-y-2 sm:space-y-4">
         <h3 class="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">Technical Skills</h3>
      </div>

      <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24 sm:mb-32 max-w-7xl mx-auto">
         ${[
           { 
             title: 'Languages', 
             icon: 'https://skillicons.dev/icons?i=java,python,js', 
             skills: ['Java', 'Python', 'JavaScript (ES6+)', 'SQL'],
             color: 'cyan'
           },
           { 
             title: 'Frontend & UI', 
             icon: 'https://skillicons.dev/icons?i=react,html,css,bootstrap,tailwind', 
             skills: ['React.js', 'HTML5 / CSS3', 'Tailwind CSS', 'Bootstrap'],
             color: 'purple'
           },
           { 
             title: 'Frameworks & Backend', 
             icon: 'https://skillicons.dev/icons?i=spring,nodejs,express', 
             skills: ['Spring Boot', 'Hibernate', 'Node.js / Express.js', 'REST APIs & CRUD'],
             color: 'cyan'
           },
           { 
             title: 'Databases & Tools', 
             icon: 'https://skillicons.dev/icons?i=mysql,mongodb,git,vscode', 
             skills: ['MySQL & MongoDB', 'DBMS (Architecture)', 'Git, GitHub, Vite, Jira', 'OpenAI API & GenAI (LLMs)'],
             color: 'purple'
           }
         ].map(category => `
           <div class="glass-dashboard group p-6 sm:p-8 hover:bg-white/[0.03] transition-all duration-700 border border-white/5 hover:border-accent-${category.color}/30 rounded-[2rem] relative overflow-hidden h-full flex flex-col items-center text-center">
              <div class="mb-6 w-full flex justify-center">
                 <img src="${category.icon}" alt="${category.title}" class="h-8 sm:h-10 w-auto grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
              </div>
              
              <h3 class="text-[10px] sm:text-xs font-mono font-black mb-5 text-white uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-all">${category.title}</h3>
              
              <div class="space-y-2.5 w-full">
                 ${category.skills.map(skill => `<div class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors py-1.5 border-b border-white/[0.03] last:border-0">${skill}</div>`).join('')}
              </div>
           </div>
         `).join('')}
      </div>

      <!-- Certifications Grid -->
      <div class="mb-24 sm:mb-32">
         <div class="flex flex-col items-center text-center mb-10 space-y-2">
            <div class="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-widest">Credentials</div>
            <h3 class="text-2xl sm:text-3xl font-mono font-bold text-white">Certifications</h3>
         </div>

         <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            ${[
               { title: 'Full Stack Web Development', org: 'Udemy', icon: 'award' },
               { title: 'Database Management Systems', org: 'Infosys Springboard', icon: 'database' },
               { title: 'Full Stack Development Internship', org: 'VRIF', icon: 'briefcase' },
               { title: 'Python Bootcamp', org: 'Udemy', icon: 'code' }
            ].map(cert => `
               <div class="glass-dashboard p-6 rounded-2xl border border-white/5 hover:border-accent-cyan/30 transition-all duration-300 group text-center flex flex-col items-center justify-center">
                  <div class="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-3 group-hover:scale-110 transition-transform">
                     <i data-lucide="${cert.icon}" class="w-5 h-5"></i>
                  </div>
                  <h4 class="text-xs sm:text-sm font-mono font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors">${cert.title}</h4>
                  <p class="text-[9px] font-mono font-semibold text-slate-500 uppercase tracking-widest">${cert.org}</p>
               </div>
            `).join('')}
         </div>
      </div>

      <!-- Experience & Educational Timeline -->
      <div class="border-t border-white/5 pt-16 sm:pt-24">
         <div class="flex flex-col items-center text-center mb-12 sm:mb-20 space-y-2 sm:space-y-3">
            <div class="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-widest">History</div>
            <h3 class="text-2xl sm:text-4xl font-mono font-bold text-white">Career & Education Timeline</h3>
         </div>
         
         <div class="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative">
            <!-- Connector Line -->
            <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/50 via-accent-purple/50 to-transparent"></div>
            
            ${[
               { 
                  year: 'Feb 2026 – May 2026', 
                  title: 'Full Stack Developer', 
                  org: 'VRIF', 
                  desc: 'Developed responsive web applications using React.js, Node.js, Express.js, and MySQL. Implemented REST APIs, CRUD operations, and version control with Git in an Agile environment.' 
               },
               { 
                  year: '2022 – 2026', 
                  title: 'Bachelor of Engineering in Computer Science', 
                  org: 'Hirasugar Institute of Technology', 
                  desc: 'Comprehensive study of computer science engineering, data structures, and web technologies. CGPA: 8.3 / 10' 
               },
               { 
                  year: '2020 – 2022', 
                  title: 'Pre-University Course (PCMB)', 
                  org: "SDVS Sangh's PU College", 
                  desc: 'Focused on Physics, Chemistry, Mathematics, and Biology. Percentage: 87.33%' 
               },
               { 
                  year: '2020', 
                  title: 'Secondary Education (SSLC)', 
                  org: 'SD High School', 
                  desc: 'Completed secondary education with distinction. Percentage: 83.68%' 
               }
            ].map(item => `
               <div class="relative glass-dashboard p-6 sm:p-8 neon-border flex flex-col md:flex-row gap-6 sm:gap-8 items-start group hover:bg-white/5 transition-all ml-8 md:ml-0">
                  <div class="text-[9px] sm:text-[10px] font-mono font-bold text-accent-cyan bg-accent-cyan/10 px-3 sm:px-4 py-1.5 rounded-full border border-accent-cyan/30 tracking-widest uppercase mb-2 md:mb-0 whitespace-nowrap">
                     ${item.year}
                  </div>
                  <div class="flex-1 space-y-1.5 sm:space-y-2">
                     <h4 class="text-base sm:text-lg font-mono font-bold text-white group-hover:text-accent-cyan transition-colors tracking-tight">${item.title}</h4>
                     <p class="text-[9px] sm:text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest opacity-80">${item.org}</p>
                     <p class="text-[10px] sm:text-[11px] font-mono font-medium text-slate-400 leading-relaxed">${item.desc}</p>
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
