import { createIcons, icons } from 'lucide';

export const GalleryModal = (images = [], closeCallback) => {
  let currentIndex = 0;
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center opacity-0 transition-opacity duration-300';
  
  const updateImage = () => {
    const imgEl = overlay.querySelector('#gallery-image');
    const indexEl = overlay.querySelector('#gallery-index');
    if (images.length > 0) {
      imgEl.src = images[currentIndex];
      indexEl.textContent = `${currentIndex + 1} / ${images.length}`;
    }
  };

  overlay.innerHTML = `
    <button id="close-gallery" class="absolute top-6 right-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
       <i data-lucide="x" class="w-8 h-8"></i>
    </button>
    
    <div class="relative w-full max-w-6xl mx-auto px-12 flex items-center justify-between">
       <button id="prev-gallery" class="p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all disabled:opacity-20 flex-shrink-0">
          <i data-lucide="chevron-left" class="w-8 h-8"></i>
       </button>
       
       <div class="w-full max-w-4xl mx-8 relative flex flex-col items-center">
          <div class="aspect-video w-full rounded-2xl overflow-hidden bg-black/50 shadow-2xl border border-white/10 flex items-center justify-center relative">
             ${images.length === 0 
                ? `<div class="text-white/50 flex flex-col items-center gap-4"><i data-lucide="image" class="w-16 h-16"></i><p>No screenshots available yet.</p></div>` 
                : `<img id="gallery-image" src="${images[currentIndex]}" class="w-full h-full object-cover transition-all duration-300" />`
             }
          </div>
          <div id="gallery-index" class="mt-6 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold tracking-widest uppercase">
             ${images.length > 0 ? `1 / ${images.length}` : '0 / 0'}
          </div>
       </div>

       <button id="next-gallery" class="p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all disabled:opacity-20 flex-shrink-0">
          <i data-lucide="chevron-right" class="w-8 h-8"></i>
       </button>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.remove('opacity-0');
    createIcons({ icons });

    const btnClose = overlay.querySelector('#close-gallery');
    const btnPrev = overlay.querySelector('#prev-gallery');
    const btnNext = overlay.querySelector('#next-gallery');

    if (btnClose) {
      btnClose.onclick = () => {
        overlay.classList.add('opacity-0');
        setTimeout(() => {
          overlay.remove();
          if (closeCallback) closeCallback();
        }, 300);
      };
    }

    if (btnPrev) btnPrev.onclick = () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
      updateImage();
    };

    if (btnNext) btnNext.onclick = () => {
      currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
      updateImage();
    };
  }, 10);
};
