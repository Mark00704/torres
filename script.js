/* ============================================================
   TERMINAL PORTFOLIO — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     BOOT SEQUENCE
  ---------------------------------------------------------- */
  const boot = document.getElementById('boot');
  const bootLines = document.getElementById('bootLines');
  const skipBoot = document.getElementById('skipBoot');
  const terminal = document.getElementById('terminal');

  const BOOT_MESSAGES = [
    { text: 'KAI_OS v2.6.1 — initializing...', delay: 0,   cls: '' },
    { text: 'Loading kernel modules.............. [OK]', delay: 180, cls: 'ok' },
    { text: 'Mounting filesystem.................. [OK]', delay: 320, cls: 'ok' },
    { text: 'Starting network services............ [OK]', delay: 480, cls: 'ok' },
    { text: 'Checking memory.................. 16384 MB', delay: 600, cls: '' },
    { text: 'Loading portfolio data............... [OK]', delay: 780, cls: 'ok' },
    { text: 'Establishing secure connection....... [OK]', delay: 940, cls: 'ok' },
    { text: 'Spawning UI process.................. [OK]', delay: 1100, cls: 'ok' },
    { text: '', delay: 1200, cls: '' },
    { text: '██████████████████████ 100%', delay: 1300, cls: 'hi' },
    { text: '', delay: 1380, cls: '' },
    { text: 'Welcome. System ready.', delay: 1480, cls: 'hi' },
  ];

  let bootDone = false;

  function showBoot() {
    BOOT_MESSAGES.forEach(({ text, delay, cls }) => {
      setTimeout(() => {
        if (bootDone) return;
        const span = document.createElement('span');
        span.className = 'line' + (cls ? ' ' + cls : '');
        span.textContent = text;
        bootLines.appendChild(span);
        bootLines.scrollTop = bootLines.scrollHeight;
      }, delay);
    });

    setTimeout(() => {
      if (!bootDone) launchTerminal();
    }, 1900);
  }

  function launchTerminal() {
    bootDone = true;
    boot.style.opacity = '0';
    boot.style.transition = 'opacity 0.5s';
    setTimeout(() => {
      boot.hidden = true;
      terminal.hidden = false;
      startTerminal();
    }, 500);
  }

  skipBoot.addEventListener('click', launchTerminal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !bootDone) launchTerminal();
  });

  showBoot();

  /* ----------------------------------------------------------
     CLOCK
  ---------------------------------------------------------- */
  function updateClock() {
    const el = document.getElementById('tb-time');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-US', { hour12: false });
  }
  setInterval(updateClock, 1000);

  /* ----------------------------------------------------------
     SECTION NAVIGATION
  ---------------------------------------------------------- */
  const navBtns = document.querySelectorAll('.nav-cmd');
  const sections = {
    home: document.getElementById('s-home'),
    work: document.getElementById('s-work'),
    about: document.getElementById('s-about'),
    contact: document.getElementById('s-contact'),
  };
  const bbStatus = document.getElementById('bb-status');

  function switchSection(name) {
    Object.keys(sections).forEach(k => {
      sections[k].hidden = k !== name;
    });
    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === name);
    });
    if (bbStatus) bbStatus.textContent = 'STATUS: VIEWING /' + name.toUpperCase();
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
  });

  // Keyboard shortcuts F1–F4
  document.addEventListener('keydown', (e) => {
    if (!terminal || terminal.hidden) return;
    const map = { F1: 'home', F2: 'work', F3: 'about', F4: 'contact' };
    if (map[e.key]) { e.preventDefault(); switchSection(map[e.key]); }
  });

  /* ----------------------------------------------------------
     ASCII ART DRAW
  ---------------------------------------------------------- */
  const ASCII = [
    ' ███╗   ███╗ █████╗ ██████╗ ██╗  ██╗',
    ' ████╗ ████║██╔══██╗██╔══██╗██║ ██╔╝',
    ' ██╔████╔██║███████║██████╔╝█████╔╝ ',
    ' ██║╚██╔╝██║██╔══██║██╔══██╗██╔═██╗ ',
    ' ██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██╗',
    ' ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝',
    '',
    ' ████████╗ ██████╗ ██████╗ ██████╗ ███████╗███████╗',
    ' ╚══██╔══╝██╔═══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝',
    '    ██║   ██║   ██║██████╔╝██████╔╝█████╗  ███████╗',
    '    ██║   ██║   ██║██╔══██╗██╔══██╗██╔══╝  ╚════██║',
    '    ██║   ╚██████╔╝██║  ██║██║  ██║███████╗███████║',
    '    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝',
    '',
    ' TORRES // HANDSOME IT STUDENT',
  ].join('\n');

  function startTerminal() {
    updateClock();
    drawAscii();
    runTypewriters();
    animateCounters();
    animateSkillBars();
  }

  function drawAscii() {
    const el = document.getElementById('asciiArt');
    if (!el) return;
    el.textContent = '';
    let i = 0;
    const chars = ASCII.split('');
    function next() {
      if (i >= chars.length) return;
      el.textContent += chars[i++];
      setTimeout(next, i < 120 ? 4 : 2);
    }
    next();
  }

  /* ----------------------------------------------------------
     TYPEWRITER LINES
  ---------------------------------------------------------- */
  const TW_LINES = [
    { id: 'tw1', text: '> Hello. You can call mi makmak.', delay: 600 },
    { id: 'tw2', text: '> I am open for new friends.', delay: 1400 },
    { id: 'tw3', text: '> My type is you hehe jk', delay: 2300 },
    { id: 'tw4', text: '// Thankyou for visiting my Personal Portfilio Website.', delay: 3100 },
  ];

  function typeText(el, text, speed = 28) {
    return new Promise(resolve => {
      let i = 0;
      function tick() {
        el.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(tick, speed);
        else resolve();
      }
      tick();
    });
  }

  function runTypewriters() {
    TW_LINES.forEach(({ id, text, delay }) => {
      const el = document.getElementById(id);
      if (!el) return;
      setTimeout(() => typeText(el, text), delay);
    });
  }

  /* ----------------------------------------------------------
     PROFILE CARD CLOCK
  ---------------------------------------------------------- */
  function updateCardClock() {
    const el = document.getElementById('pc-time');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-US', { hour12: false });
  }
  setInterval(updateCardClock, 1000);
  updateCardClock();

  /* ----------------------------------------------------------
     PROFILE CARD SKILL BARS
  ---------------------------------------------------------- */
  function animateSkillBars() {
    setTimeout(() => {
      document.querySelectorAll('.pcs-fill').forEach(fill => {
        fill.classList.add('loaded');
      });
    }, 1000);
  }

  /* ----------------------------------------------------------
     COUNTER ANIMATION
  ---------------------------------------------------------- */
  function animateCounters() {
    document.querySelectorAll('.counter').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();
      function step(now) {
        const pct = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - pct, 3);
        el.textContent = Math.floor(eased * target);
        if (pct < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      setTimeout(() => requestAnimationFrame(step), 1200);
    });
  }

  /* ----------------------------------------------------------
     FAKE COMMAND LINE (CONTACT)
  ---------------------------------------------------------- */
  const cmdInput = document.getElementById('cmdInput');
  const cmdOutput = document.getElementById('cmdOutput');

  const CMD_RESPONSES = {
    help:    '> Available: help | status | email | clear | hello',
    status:  '> SYSTEM ONLINE. All modules operational. ● GREEN',
    email:   '> Redirecting to: kai@example.com',
    clear:   null, // special
    hello:   '> Hello there. Ready to build something great?',
    hi:      '> Hi. Nice to meet you.',
    hire:    '> Smart move. Send an email to get started.',
    default: '> Command not recognized. Type "help" for options.',
  };

  if (cmdInput) {
    cmdInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const val = cmdInput.value.trim().toLowerCase();
      cmdInput.value = '';
      if (!val) return;

      if (val === 'clear') {
        cmdOutput.textContent = '';
        return;
      }

      const response = CMD_RESPONSES[val] || CMD_RESPONSES.default;
      const line = document.createElement('div');
      line.textContent = response;
      cmdOutput.appendChild(line);
      cmdOutput.scrollTop = cmdOutput.scrollHeight;

      if (val === 'email') {
        setTimeout(() => window.open('mailto:kai@example.com'), 400);
      }
    });
  }

})();