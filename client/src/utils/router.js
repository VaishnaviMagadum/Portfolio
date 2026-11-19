export const initRouter = (appElement, routes) => {
  if (!appElement) {
    console.error('App element not found!');
    return;
  }

  const getCleanPath = (rawPath) => {
    let p = rawPath || window.location.pathname;
    
    // Normalize: remove repository prefix if hosted on GitHub Pages (e.g. /Portfolio, /Portfolio/)
    p = p.replace(/^\/portfolio\/?/i, '/') || '/';
    
    // Strip trailing slash if longer than 1 char (e.g. /about/ -> /about)
    if (p.length > 1 && p.endsWith('/')) {
      p = p.slice(0, -1);
    }
    
    // Normalize empty or index.html to root '/'
    if (!p || p === '/index.html' || p === '') {
      p = '/';
    }
    
    return p;
  };

  const navigate = (path) => {
    const isGhPages = window.location.pathname.toLowerCase().startsWith('/portfolio');
    const targetUrl = isGhPages && path.startsWith('/') && !path.toLowerCase().startsWith('/portfolio')
      ? `/Portfolio${path}`
      : path;

    if (window.location.pathname === targetUrl) return;
    window.history.pushState({}, '', targetUrl);
    handleRoute();
  };

  const handleRoute = async () => {
    const rawPath = window.location.pathname;
    const cleanPath = getCleanPath(rawPath);
    const hash = window.location.hash;

    // Map cleanPath first, then rawPath, then fallback to root or 404
    let route = routes[cleanPath] || routes[rawPath];
    if (!route) {
      if (cleanPath === '/' || cleanPath === '' || cleanPath === '/index.html') {
        route = routes['/'];
      } else {
        route = routes['/404'] || routes['/'];
      }
    }
    
    // Clear and prepare for new content
    appElement.innerHTML = ''; 
    
    try {
      if (typeof route !== 'function') {
        throw new Error(`Route at "${cleanPath}" is not a valid component function.`);
      }

      console.log('Rendering route:', cleanPath);
      const pageContent = await route(); // Handle both sync and async pages
      
      if (typeof pageContent === 'string') {
        appElement.innerHTML = pageContent;
      } else if (pageContent instanceof HTMLElement) {
        appElement.appendChild(pageContent);
      } else {
        throw new Error('Component did not return valid HTML content.');
      }
      
      // Trigger animations and cleanup
      window.dispatchEvent(new CustomEvent('route-changed', { detail: cleanPath }));
      
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
          <a href="#home" class="px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">Back to Home</a>
        </div>
      `;
    }
  };

  window.addEventListener('popstate', handleRoute);
  
  // Intercept all link clicks for client-side routing
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    const href = link?.getAttribute('href');
    
    if (link && href && !link.hasAttribute('target')) {
      // Handle in-page hash links smoothly
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.slice(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // Handle root slash-hash links like /#projects, /#about
      if (href.startsWith('/#')) {
        e.preventDefault();
        const targetId = href.slice(2);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', '#' + targetId);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (href.startsWith('/')) {
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
    }
  });

  // Initial route
  handleRoute(); 
  
  return { navigate };
};
