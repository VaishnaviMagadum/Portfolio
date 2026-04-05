import { createIcons, icons } from 'lucide';
import axios from 'axios';
import { API_BASE_URL } from '../utils/apiConfig';

export const Contact = () => {
  const container = document.createElement('div');
  container.className = 'relative overflow-hidden w-full';
  
  container.innerHTML = `
    <div class="container mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        <div class="lg:col-span-12 space-y-24">
           <div class="text-center animate-slide-up">
              <div class="text-xs font-black uppercase tracking-[0.4em] text-accent-blue mb-6 px-2 border-l-2 border-accent-blue inline-block">Contact</div>
              <h2 class="text-6xl md:text-8xl font-display font-extrabold mb-10 tracking-tighter leading-none text-text-primary">Connect <br /> With <span class="text-gradient">Me</span>.</h2>
              <p class="text-xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed opacity-60">Feel free to reach out for collaborations, job opportunities, or just to say hi!</p>
           </div>

           <div class="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              <div class="lg:col-span-5 space-y-16 animate-slide-up">
                  <div class="space-y-8">
                     <h3 class="text-sm font-black uppercase tracking-[0.3em] text-text-secondary/40">Digital Footprint</h3>
                     <div class="grid grid-cols-2 gap-6">
                        ${[
                          { logo: 'https://skillicons.dev/icons?i=linkedin', label: 'LinkedIn', value: 'Vaishnavi M.', url: 'https://www.linkedin.com/in/vaishnavi-magadum-60a08633a' },
                          { logo: 'https://skillicons.dev/icons?i=github', label: 'GitHub', value: 'VaishnaviMagadum', url: 'https://github.com/VaishnaviMagadum' },
                          { logo: 'https://skillicons.dev/icons?i=instagram', label: 'Instagram', value: 'vaish_magadum', url: 'https://instagram.com/vaish_magadum' },
                          { logo: 'https://skillicons.dev/icons?i=gmail', label: 'Email', value: 'vaishnavimagadum04@gmail.com', url: 'mailto:vaishnavimagadum04@gmail.com' }
                        ].map(social => `
                           <a href="${social.url}" target="_blank" class="glass-card p-10 rounded-[3.5rem] flex flex-col items-center justify-center gap-6 group hover:-translate-y-2 hover:bg-white/[0.02] transition-all duration-300">
                              <div class="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                                 <img src="${social.logo}" alt="${social.label}" class="w-8 h-8 object-contain drop-shadow-md" />
                              </div>
                              <div class="text-center">
                                 <span class="block text-[10px] font-black uppercase tracking-widest text-text-secondary/30 mb-2">${social.label}</span>
                                 <span class="text-xs font-bold text-text-primary transition-colors truncate max-w-[140px] block opacity-80 group-hover:opacity-100">${social.value}</span>
                              </div>
                           </a>
                        `).join('')}
                     </div>
                  </div>
              </div>

              <div id="contact-form-container" class="lg:col-span-7 glass-card p-12 sm:p-20 rounded-[4.5rem] border-white/5 animate-fade-in relative group overflow-hidden">
                 <div class="absolute inset-0 bg-grid opacity-10"></div>
                 <form id="contact-form" class="space-y-8 relative z-10">
                   <div class="space-y-3">
                      <label class="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/40 ml-6">Full Identity</label>
                      <input required type="text" name="name" placeholder="Johnathan Doe" class="w-full glass bg-slate-900/50 border-white/10 rounded-[2.5rem] px-10 py-6 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 transition-all font-bold placeholder:text-text-secondary/20 text-xl text-text-primary" />
                   </div>
                   <div class="space-y-3">
                      <label class="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/40 ml-6">Return Address</label>
                      <input required type="email" name="email" placeholder="john@domain.com" class="w-full glass bg-slate-900/50 border-white/10 rounded-[2.5rem] px-10 py-6 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 transition-all font-bold placeholder:text-text-secondary/20 text-xl text-text-primary" />
                   </div>
                   <div class="space-y-3">
                      <label class="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/40 ml-6">The Requirement</label>
                      <textarea required name="message" rows="6" placeholder="Describe your digital engineering goals..." class="w-full glass bg-slate-900/50 border-white/10 rounded-[3.5rem] px-10 py-8 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 transition-all font-bold placeholder:text-text-secondary/20 text-xl text-text-primary resize-none"></textarea>
                   </div>
                   <button type="submit" id="submit-btn" class="w-full py-8 bg-accent-blue hover:bg-blue-600 text-white rounded-[2.5rem] font-black text-2xl uppercase tracking-widest flex items-center justify-center gap-5 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.4)]">
                     Establish Connection <i data-lucide="send" class="w-8 h-8"></i>
                   </button>
                 </form>
              </div>
           </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    createIcons({ icons });
    const form = container.querySelector('#contact-form');
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = container.querySelector('#submit-btn');
        btn.disabled = true;
        btn.innerHTML = 'Establishing... <i data-lucide="loader-2" class="w-8 h-8 animate-spin"></i>';
        createIcons({ icons });

        const data = {
          name: form.name.value,
          email: form.email.value,
          subject: "Portfolio Inquiry",
          message: form.message.value
        };

        try {
          await axios.post(`${API_BASE_URL}/api/contact`, data);
          container.querySelector('#contact-form-container').innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-center py-24 animate-fade-in space-y-10">
               <div class="relative">
                  <div class="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full"></div>
                  <div class="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white relative z-10 shadow-2xl border-8 border-white/10">
                     <i data-lucide="send" class="w-16 h-16"></i>
                  </div>
               </div>
               <div class="space-y-4">
                  <h3 class="text-5xl font-display font-extrabold tracking-tighter">Connection Ready!</h3>
                  <p class="text-foreground/40 max-w-sm mx-auto text-xl font-medium leading-relaxed">
                     Your proposal has been successfully encrypted and sent. Anticipate a response within 24 standard cycles.
                  </p>
               </div>
               <button onclick="window.location.reload()" class="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Send Another Signal</button>
            </div>
          `;
          createIcons({ icons });
        } catch (error) {
          btn.disabled = false;
          btn.innerHTML = 'Resend Signal <i data-lucide="send" class="w-8 h-8"></i>';
          createIcons({ icons });
        }
      };
    }
  }, 0);

  return container;
};
