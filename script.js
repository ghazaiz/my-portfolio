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
  const toastText = toast ? toast.querySelector('.toast-text') : null;
  let toastTimer;
  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'ghazaiznadeem00@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      if (toastText) toastText.textContent = 'Copied to clipboard';
      copyBtn.classList.add('copied');
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
        copyBtn.classList.remove('copied');
      }, 1800);
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

  // ---- reveal-on-scroll for focus cards ----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const focusCards = document.querySelectorAll('.focus-card');
  if ('IntersectionObserver' in window && !reduceMotion && focusCards.length) {
    focusCards.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(18px)'; el.style.transition = 'opacity .5s ease, transform .5s ease'; });
    const focusObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          focusObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
    focusCards.forEach((el, i) => { setTimeout(() => focusObserver.observe(el), 0); });
  }

  // ---- embed the two front-end demo pages directly (no external files needed) ----
  const profileCardDemoHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profile Card</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap");

  * { padding: 0; margin: 0; box-sizing: border-box; }

  body {
    background: #1bacc5;
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: Montserrat, sans-serif;
    color: #b3afbf;
  }

  .card {
    padding: 15px;
    width: 300px;
    background: #222;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.7);
    user-select: none;
  }

  .cover-photo {
    position: relative;
    background: url(https://i.pravatar.cc/500?img=48);
    background-size: cover;
    background-position: center;
    height: 150px;
    border-radius: 5px 5px 0 0;
  }

  .profile {
    position: absolute;
    width: 100px;
    height: 100px;
    object-fit: cover;
    bottom: -50px;
    left: 15px;
    border-radius: 50%;
    border: 2px solid #222;
    background: #222;
    padding: 5px;
  }

  .profile-name {
    font-size: 18px;
    margin: 22px 0 0 108px;
    color: #fff;
  }

  .about {
    margin-top: 26px;
    line-height: 1.6;
    font-size: 14px;
  }

  .btn {
    margin: 20px 8px 0;
    background: #77d2eb;
    padding: 9px 20px;
    border-radius: 3px;
    border: 1px solid #7ce3ff;
    font-weight: bold;
    font-family: Montserrat, sans-serif;
    font-size: 13px;
    cursor: pointer;
    color: #222;
    transition: 0.2s;
  }

  .btn:last-of-type {
    background: transparent;
    border-color: #7ce3ff;
    color: #7ce3ff;
  }

  .btn:hover { background: #7ce3ff; color: #222; }

  .icons {
    width: 160px;
    margin: 18px auto 6px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .icons i {
    cursor: pointer;
    padding: 5px;
    font-size: 17px;
    color: #b3afbf;
    transition: 0.2s;
  }

  .icons i:hover { color: #7ce3ff; }
</style>
</head>
<body>
  <div class="card">
    <div class="cover-photo">
      <img src="https://i.pravatar.cc/150?img=47" class="profile" alt="Profile photo">
    </div>
    <h3 class="profile-name">Ghazaiz Nadeem</h3>
    <p class="about">UI/UX Designer <br> Front End Developer</p>
    <button class="btn">Message</button>
    <button class="btn">Following</button>
    <div class="icons">
      <i class="fa-brands fa-instagram"></i>
      <i class="fa-brands fa-github"></i>
      <i class="fa-brands fa-youtube"></i>
      <i class="fa-brands fa-twitter"></i>
    </div>
  </div>
</body>
</html>
`;
  const loginPageDemoHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login Page</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
  body{
    margin:0;
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:#ffc7c7;
    font-family:'Montserrat', sans-serif;
    color:#ffb6b9;
  }
  .login-container{
    width:270px;
    padding:22px;
    background-color:rgba(252,247,246,0.9);
    border-radius:8px;
    box-shadow:0 0 10px 3px #d4ada2;
    transition:transform 0.4s;
  }
  .login-container:hover{ transform:scale(1.03); }
  h2{ margin-bottom:18px; text-align:center; font-size:24px; color:#ffb6b9; }
  .logo{
    width:80px; height:80px; margin:0 auto 16px;
    border-radius:50%;
    background:url("https://i.pravatar.cc/200?img=32") center/cover;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
    transition:transform 0.9s;
  }
  .logo:hover{ transform:rotate(360deg); }
  .input-group{ margin-bottom:14px; font-size:15px; position:relative; }
  #username, #password{
    width:100%; padding:9px; font-size:14px;
    border:1px solid #ccc; border-radius:4px;
    box-shadow:0 4px 8px rgba(0,0,0,0.15);
    box-sizing:border-box;
  }
  .password-wrapper{ position:relative; }
  #togglePasswordIcon{ position:absolute; right:10px; top:11px; cursor:pointer; color:#999; }
  .remember-me{ font-size:13px; margin-right:5px; }
  button{
    width:100%; margin-top:8px; padding:9px; font-size:15px;
    color:#fff; background-color:#ff9da0; border:none; border-radius:6px;
    cursor:pointer; box-shadow:0 4px 8px rgba(0,0,0,0.2);
  }
  button:hover{ background-color:#fa7175; }
  a{ color:rgb(158,16,116); }
  .signup-link{ margin-top:10px; font-size:13px; text-align:center; }
</style>
</head>
<body>
  <div class="login-container">
    <div class="logo"></div>
    <h2>Login</h2>
    <form id="demoLoginForm">
      <div class="input-group">
        <label for="username"><b>Username:</b></label>
        <input type="text" id="username" name="username" required placeholder="Enter your username">
      </div>
      <div class="input-group password-group">
        <label for="password"><b>Password:</b></label>
        <div class="password-wrapper">
          <input type="password" id="password" name="password" required placeholder="Enter your password">
          <i class="fa fa-eye-slash" id="togglePasswordIcon" onclick="togglePassword()"></i>
        </div>
      </div>
      <div class="remember-me">
        <input type="checkbox" id="remember" name="remember">
        <label for="remember"><b>Remember me</b></label>
      </div>
      <button type="submit">Login</button>
      <p class="signup-link"><b>Don't have an account?</b> <a href="#" onclick="return false;">Sign up</a></p>
    </form>
  </div>
  <script>
    function togglePassword() {
      const input = document.getElementById("password");
      const icon = document.getElementById("togglePasswordIcon");
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      }
    }
    document.getElementById("demoLoginForm").addEventListener("submit", function(e){
      e.preventDefault();
    });
  </script>
</body>
</html>
`;
  const profileFrame = document.getElementById('demo-profilecard');
  const loginFrame = document.getElementById('demo-loginpage');
  if (profileFrame) profileFrame.srcdoc = profileCardDemoHTML;
  if (loginFrame) loginFrame.srcdoc = loginPageDemoHTML;

  // ---- front-end demo tabs: switch between Profile Card / Login Page ----
  const demoTabs = document.querySelectorAll('.demo-tab');
  const demoTitle = document.getElementById('demo-project-title');
  const demoDesc = document.getElementById('demo-project-desc');
  const demoCopy = {
    profilecard: {
      title: 'Profile Card — Live Demo',
      desc: "Built from scratch with HTML & CSS. Hover keeps this preview open — it's the actual project running, not a screenshot.",
      frame: 'demo-profilecard'
    },
    loginpage: {
      title: 'Login Page — Live Demo',
      desc: 'Built from scratch with HTML, CSS &amp; a touch of JS (password toggle). Fully interactive right here.',
      frame: 'demo-loginpage'
    }
  };
  if (demoTabs.length) {
    demoTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.demo;
        const info = demoCopy[key];
        if (!info) return;
        demoTabs.forEach(t => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        document.querySelectorAll('.demo-frame').forEach(f => f.classList.toggle('is-active', f.id === info.frame));
        if (demoTitle) demoTitle.textContent = info.title;
        if (demoDesc) demoDesc.innerHTML = info.desc;
      });
    });
  }

  // ---- skill fan hover state: push the other cards and image aside ----
  const skillFan = document.querySelector('.skill-fan');
  const fanCards = document.querySelectorAll('.fan-card');
  if (skillFan && fanCards.length) {
    const clearSkillState = () => {
      skillFan.classList.remove('is-active', 'shift-left', 'shift-right');
      fanCards.forEach(card => card.classList.remove('is-active'));
    };

    const setSkillState = (activeCard) => {
      const shiftDirection = activeCard.dataset.shift || 'right';
      skillFan.classList.add('is-active', shiftDirection === 'left' ? 'shift-left' : 'shift-right');
      fanCards.forEach(card => card.classList.toggle('is-active', card === activeCard));
    };

    fanCards.forEach(card => {
      card.addEventListener('mouseenter', () => setSkillState(card));
      card.addEventListener('focusin', () => setSkillState(card));
    });

    skillFan.addEventListener('mouseleave', clearSkillState);
    skillFan.addEventListener('focusout', (event) => {
      if (!skillFan.contains(event.relatedTarget)) clearSkillState();
    });
  }