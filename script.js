document.addEventListener('DOMContentLoaded', () => {
    /* 1. HERO NAME TYPING */
    const heroEl = document.getElementById('hero-text');
    const name = 'Saardhak';
    let nameIdx = 0;
    function typeName() {
      if (nameIdx <= name.length) {
        heroEl.textContent = name.slice(0, nameIdx++);
        setTimeout(typeName, 120);
      }
    }
    typeName();
  
    /* 2. SUBTITLE CYCLE & TYPE */
    const subtitleEl = document.getElementById('subtitle');
    const subtitles = ['Designer', 'Ideator', 'Entrepreneur', 'Innovator', 'Engineer'];
    let subIdx = 0, subChar = 0, deleting = false;
    function cycleSubtitle() {
      const current = subtitles[subIdx];
      if (!deleting) {
        subtitleEl.textContent = current.slice(0, ++subChar);
        if (subChar === current.length) {
          deleting = true;
          setTimeout(cycleSubtitle, 1500);
          return;
        }
      } else {
        subtitleEl.textContent = current.slice(0, --subChar);
        if (subChar === 0) {
          deleting = false;
          subIdx = (subIdx + 1) % subtitles.length;
        }
      }
      setTimeout(cycleSubtitle, deleting ? 60 : 120);
    }
    cycleSubtitle();
  
    /* 3. SCROLL → SCALE & FADE HERO */
    const container = document.querySelector('.container');
    container.addEventListener('scroll', () => {
      const scrollY = container.scrollTop;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1);
      const scale = 1 + progress * 0.5;
      const opacity = Math.max(1 - progress * 1.2, 0);
      heroEl.style.transform = `scale(${scale})`;
      heroEl.style.opacity = opacity;
    });
  });
  