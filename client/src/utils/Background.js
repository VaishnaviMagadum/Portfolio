/**
 * 3D Neural Network Particle System
 * High-performance, interactive dashboard background.
 * Nodes connect via fading lines to create a futuristic matrix.
 */
export class Starfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.isMobile = window.innerWidth < 768;
    this.count = this.isMobile ? 40 : 120; // Lower node count for mobile
    this.connectionDist = this.isMobile ? 100 : 150; // Shorter lines on mobile
    this.mouseX = 0;
    this.mouseY = 0;
    this.hue = 210;
    
    this.init();
    this.animate();
    this.addEventListeners();
  }

  init() {
    this.resize();
    this.nodes = [];
    for (let i = 0; i < this.count; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1
      });
    }
    this.updateThemeColors();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateThemeColors() {
    const theme = localStorage.getItem('portfolio-theme') || 'theme-blue';
    if (theme === 'theme-blue') this.hue = 210;
    else if (theme === 'theme-purple') this.hue = 270;
    else if (theme === 'theme-aurora') this.hue = 190;
  }

  addEventListeners() {
    window.addEventListener('resize', () => this.init());
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    window.addEventListener('theme-changed', () => this.updateThemeColors());
  }

  animate() {
    const theme = localStorage.getItem('portfolio-theme') || 'theme-blue';
    const isLight = theme === 'theme-aurora';

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw nodes
    this.nodes.forEach((node, i) => {
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off walls
      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

      // Mouse interaction (repel)
      const dx = this.mouseX - node.x;
      const dy = this.mouseY - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        node.x -= dx * 0.01;
        node.y -= dy * 0.01;
      }

      // Draw node
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      this.ctx.fillStyle = isLight 
        ? `hsla(${this.hue}, 80%, 30%, 0.5)` 
        : `hsla(${this.hue}, 100%, 70%, 0.8)`;
      this.ctx.fill();

      // Connections
      for (let j = i + 1; j < this.nodes.length; j++) {
        const other = this.nodes[j];
        const distance = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2));

        if (distance < this.connectionDist) {
          this.ctx.beginPath();
          this.ctx.lineWidth = 0.5;
          const opacity = 1 - (distance / this.connectionDist);
          this.ctx.strokeStyle = isLight
            ? `hsla(${this.hue}, 80%, 20%, ${opacity * 0.3})`
            : `hsla(${this.hue}, 100%, 50%, ${opacity * 0.4})`;
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.stroke();
        }
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}
