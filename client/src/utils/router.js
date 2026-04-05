export const initRouter = (appElement, routes) => {
  if (!appElement) {
    console.error('App element not found!');
    return;
  }

  const navigate = (path) => {
    if (window.location.pathname === path) return;
    window.history.pushState({}, '', path);
    handleRoute();
  };

  const handleRoute = async () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    // Map / (Home) correctly and handle 404
    const route = routes[path] || routes['/404'] || routes['/'];
    
    // Clear and prepare for new content
    appElement.innerHTML = ''; 
    
    try {
      if (typeof route !== 'function') {
        throw new Error(`Route at "${path}" is not a valid component function.`);
      }

      console.log('Rendering route:', path);
      const pageContent = await route(); // Handle both sync and async pages
      
      if (typeof pageContent === 'string') {
        appElement.innerHTML = pageContent;
      } else if (pageContent instanceof HTMLElement) {
        appElement.appendChild(pageContent);
      } else {
        throw new Error('Component did not return valid HTML content.');
      }
      
      // Trigger animations and cleanup
      window.dispatchEvent(new CustomEvent('route-changed', { detail: path }));
      
      if (hash) {
        // Allow a tiny bit of time for DOM to paint before scrolling
        setTimeout(() => {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Routing error:', error);
      appElement.innerHTML = `
        <div class="p-20 text-center flex flex-col items-center justify-center min-h-[50vh]">
          <div class="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-500 mb-6 text-3xl">⚠️</div>
          <h1 class="text-3xl font-bold mb-4 font-display">Something went wrong</h1>
          <p class="text-slate-500 max-w-md mx-auto font-medium mb-10">${error.message}</p>
          <a href="/" class="px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">Back to Home</a>
        </div>
      `;
    }
  };

  window.addEventListener('popstate', handleRoute);
  
  // Intercept all link clicks for client-side routing
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    const href = link?.getAttribute('href');
    
    if (link && href?.startsWith('/') && !link.hasAttribute('target')) {
      e.preventDefault();
      
      // If navigating to the exact same path but a different hash
      const [newPath, newHash] = href.split('#');
      const currentPath = window.location.pathname;
      
      if (currentPath === newPath && newHash) {
         window.history.pushState({}, '', href);
         const targetElement = document.getElementById(newHash);
         if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
         }
         return;
      }
      
      navigate(href);
    }
  });

  // Initial route
  handleRoute(); 
  
  return { navigate };
};
