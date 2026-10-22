document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }));
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', event => {
      glow.style.left = event.clientX + 'px';
      glow.style.top = event.clientY + 'px';
    }, { passive: true });
  }

  const topButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (topButton) topButton.classList.toggle('show', window.scrollY > 450);
    let current = 'home';
    document.querySelectorAll('main section[id]').forEach(section => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
  if (topButton) topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.addEventListener('click', event => {
    if (!event.target.closest('a,button')) return;
    const sparkle = document.createElement('span');
    sparkle.className = 'click-spark';
    sparkle.textContent = ['✨', '✦', '💜', '⭐'][Math.floor(Math.random() * 4)];
    sparkle.style.left = event.clientX + 'px';
    sparkle.style.top = event.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  });

  // Gentle pointer tilt for desktop project cards.
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });
  }
});