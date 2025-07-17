// script.js

// 1. Typing effect for “Saardhak”
document.addEventListener('DOMContentLoaded', () => {
    const name = 'Saardhak';
    const heroText = document.getElementById('hero-text');
    let idx = 0;
  
    function type() {
      if (idx <= name.length) {
        heroText.textContent = name.substring(0, idx);
        idx++;
        setTimeout(type, 150);
      }
    }
    type();
  });
  
  // 2. Scroll progress bar
  const progressBar = document.getElementById('progress-bar');
  const container = document.querySelector('.container');
  container.addEventListener('scroll', () => {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
  
  // 3. Reveal sections on scroll
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: container,
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });
  