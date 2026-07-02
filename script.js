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

  const stage = document.getElementById('cube-stage');
  const rotator = document.getElementById('cube-rotator');

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotator.style.animationPlayState = 'paused';
    rotator.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
  });
  stage.addEventListener('mouseleave', () => {
    rotator.style.transform = '';
    rotator.style.animationPlayState = 'running';
  });

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
