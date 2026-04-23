// Skript für Portfolio-Interaktivität
// Enthält Navigation, Dark‑Mode‑Umschaltung und Fade‑In‑Effekte

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  const darkToggle = document.getElementById('darkModeToggle');

  // Mobiles Menü umschalten
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
  });

  // Glattes Scrollen und Schließen des Menüs bei Klick auf Link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      // Standardverhalten verhindern
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        window.scrollTo({
          top: targetEl.offsetTop - 70,
          behavior: 'smooth'
        });
      }
      navLinks.classList.remove('nav-open');
    });
  });

  // Dark‑Mode: aus LocalStorage laden
  const savedDark = localStorage.getItem('darkMode') === 'true';
  if (savedDark) {
    document.documentElement.classList.add('dark-mode');
  }

  // Dark‑Mode umschalten und speichern
  darkToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
  });

  // Fade‑In Effekt mittels Intersection Observer
  const sections = document.querySelectorAll('.fade-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));
});