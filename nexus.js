// NEXUS Academy — Shared utilities: theme toggle, progress tracking, active nav
(function() {
  // Theme Toggle
  const savedTheme = localStorage.getItem('nexus_theme') || 'dark';
  if (savedTheme === 'light') document.documentElement.classList.add('light');

  window.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('nexus_theme', isLight ? 'light' : 'dark');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = isLight ? '🌙' : '☀️';
  };

  // Progress tracking
  window.trackProgress = function(type, id, data) {
    const p = JSON.parse(localStorage.getItem('nexus_progress') || '{}');
    if (!p[type]) p[type] = [];
    if (!p[type].find(x => x.id === id)) {
      p[type].push({ id, ...data, date: new Date().toISOString() });
      localStorage.setItem('nexus_progress', JSON.stringify(p));
    }
  };

  window.getProgress = function(type) {
    const p = JSON.parse(localStorage.getItem('nexus_progress') || '{}');
    return p[type] || [];
  };

  window.getAllProgress = function() {
    return JSON.parse(localStorage.getItem('nexus_progress') || '{}');
  };

  // Active nav
  document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      if (a.getAttribute('href') === path) a.classList.add('active');
    });
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = document.documentElement.classList.contains('light') ? '🌙' : '☀️';
  });
})();