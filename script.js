const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll(){
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  const copyBtn = document.getElementById('copy-email');
  const toast = document.getElementById('toast');
  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'ghazaiznadeem00@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    }).catch(() => { window.location.href = 'mailto:' + email; });
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const vid = document.querySelector('.hero-video-wrap video');
    if (vid) vid.pause();
  }

  // ---- typewriter: cycles through skill words ----
  const twEl = document.getElementById('tw-text');
  const twWords = ['Python', 'C++', 'Front-End', 'SEO', 'Digital Marketing'];
  if (twEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let wordIndex = 0, charIndex = 0, deleting = false;
    function twTick(){
      const word = twWords[wordIndex];
      if (!deleting){
        charIndex++;
        twEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length){ deleting = true; setTimeout(twTick, 1100); return; }
      } else {
        charIndex--;
        twEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0){ deleting = false; wordIndex = (wordIndex + 1) % twWords.length; }
      }
      setTimeout(twTick, deleting ? 45 : 90);
    }
    twTick();
  } else if (twEl) {
    twEl.textContent = twWords[0];
  }

  // ---- journey map: reveal milestones + draw path on scroll ----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const journeyTargets = document.querySelectorAll('.milestone-row, .journey-path.js-animate');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const journeyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          journeyObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -60px 0px' });
    journeyTargets.forEach(el => journeyObserver.observe(el));
  } else {
    journeyTargets.forEach(el => el.classList.add('in-view'));
  }