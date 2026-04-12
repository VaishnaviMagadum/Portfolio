import { createIcons } from 'lucide';

export const Home = () => {
  const container = document.createElement('div');
  container.className = 'relative isolate flex-1';
  
  container.innerHTML = `
    <!-- AI Dashboard Hero -->
    <section class="min-h-screen flex items-center justify-center relative overflow-hidden pt-12 sm:pt-20">
      <div class="absolute inset-0 pointer-events-none opacity-20">
        <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent-cyan/20 to-transparent"></div>
        <div class="absolute inset-0 animate-scanline bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 relative z-10">
        <div class="flex flex-col items-center text-center space-y-8 sm:space-y-12">
          
          <!-- System Status Badge -->
            <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-fade-in w-full" style="animation-delay: 0.2s">
               <div class="inline-flex items-center justify-center gap-4 px-4 sm:px-6 py-2 rounded-xl bg-slate-950/80 border border-accent-cyan/30 text-accent-cyan font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em] shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                 <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-cyan animate-pulse"></span>
                 FULL STACK DEVELOPER INTERN
               </div>
              <div class="inline-flex items-center justify-center gap-4 px-4 sm:px-6 py-2 rounded-xl bg-accent-purple/10 border border-accent-purple/30 text-accent-purple font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em] shadow-[0_0_20_rgba(168,85,247,0.1)]">
                <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-purple animate-pulse"></span>
                STATUS: OPEN_TO_WORK
              </div>
            </div>
          
          <div class="space-y-4 sm:space-y-6">
            <h1 class="text-4xl sm:text-7xl md:text-9xl font-mono font-black tracking-tighter leading-none text-white overflow-hidden">
               <span class="block text-[0.3em] text-accent-cyan/60 animate-slide-up opacity-0 uppercase tracking-[0.3em] sm:tracking-[0.5em]" style="animation-delay: 0.1s">Hello, I'm</span>
               <span class="block animate-slide-up opacity-0" style="animation-delay: 0.2s">VAISHNAVI</span>
               <span class="text-hologram block animate-slide-up opacity-0" style="animation-delay: 0.4s">MAGADUM</span>
            </h1>
          </div>
          
          <div class="flex items-center gap-2 sm:gap-4 text-lg sm:text-2xl md:text-3xl font-mono font-bold text-slate-400">
             <span class="opacity-50 text-accent-cyan">[</span>
             <span class="typewriter-text text-white">Full Stack Developer</span>
             <span class="animate-pulse">_</span>
             <span class="opacity-50 text-accent-cyan">]</span>
          </div>
          
          <p class="text-xs sm:text-sm md:text-base text-slate-500 max-w-sm sm:max-w-xl leading-relaxed font-mono font-medium animate-fade-in opacity-0" style="animation-delay: 0.6s">
             I am a CSE Engineering student at HIT and a Full Stack Developer Intern at VRIF. I am dedicated to creating seamless digital experiences and robust backend architectures.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4 sm:pt-8 animate-fade-in opacity-0 w-full px-6" style="animation-delay: 0.8s">
             <a href="/#projects" class="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-accent-cyan/20 transition-all neon-border text-center">
               View My Work
               <span class="absolute -top-1 -right-1 w-2 h-2 bg-accent-cyan rounded-full animate-ping"></span>
             </a>
             
             <a href="/VaishnaviMagadum.pdf" target="_blank" class="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl border border-white/5 bg-white/5 text-slate-400 font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all text-center">
               Download CV
             </a>
          </div>
        </div>
      </div>
    </section>

    <style>
      .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animate-fade-in { animation: fade-in 1s ease-out forwards; }
      @keyframes slide-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    </style>
  `;
  
  setTimeout(() => {
    // Typewriter effect
    const textElement = container.querySelector('.typewriter-text');
    const words = ["Full Stack Developer", "Web Developer", "Front End Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };
    
    type();
  }, 0);
  return container;
};
