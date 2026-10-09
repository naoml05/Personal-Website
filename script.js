(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Floating hearts and sparkles in the background ---- */
  const box = document.getElementById('floaters');
  if (box && !reduceMotion) {
    const symbols = ['♥', '✦', '★', '✿', '●', '✧'];
    const colors = ['#ff9ec7', '#8fd3ff', '#c3b1ff', '#ffe08a', '#9be8c8', '#ffc9a8'];
    const count = window.innerWidth < 700 ? 14 : 24;
    const rand = (min, max) => Math.random() * (max - min) + min;
    const pick = (list) => list[Math.floor(Math.random() * list.length)];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'floater';
      el.textContent = pick(symbols);
      el.style.setProperty('--x', rand(0, 100).toFixed(1) + '%');
      el.style.setProperty('--s', rand(14, 34).toFixed(0) + 'px');
      el.style.setProperty('--c', pick(colors));
      el.style.setProperty('--d', rand(14, 30).toFixed(1) + 's');
      el.style.setProperty('--delay', '-' + rand(0, 30).toFixed(1) + 's'); // negative = already mid-flight on load
      box.appendChild(el);
    }
  }

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Reveal-on-scroll (also triggers the skill meters) ---- */
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  /* ---- Footer year ---- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();