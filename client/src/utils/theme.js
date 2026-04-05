export const themes = ['theme-blue', 'theme-purple', 'theme-aurora'];

export const initTheme = () => {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'theme-blue';
  setTheme(savedTheme);
  return savedTheme;
};

export const setTheme = (themeName) => {
  const root = document.documentElement;
  
  // Remove all theme classes
  themes.forEach(t => root.classList.remove(t));
  
  // Add new theme class
  root.classList.add(themeName);
  localStorage.setItem('portfolio-theme', themeName);
  
  // Update blob colors if needed
  root.style.setProperty('--primary-color', `hsl(var(--primary))`);
  
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: themeName }));
};

export const toggleTheme = () => {
  const currentTheme = localStorage.getItem('portfolio-theme') || 'theme-blue';
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];
  setTheme(nextTheme);
  return nextTheme;
};
