const timeEl = document.getElementById('time');
const clockEl = document.getElementById('clock');
const saberEl = document.querySelector('.saber');
const trailEl = document.querySelector('.saber-trail');
const labelEl = document.getElementById('label');

const jediColors = [
  { var: '--jedi-cyan', name: 'CYAN' },
  { var: '--jedi-magenta', name: 'MAGENTA' },
  { var: '--jedi-indigo', name: 'INDIGO' },
  { var: '--jedi-yellow', name: 'YELLOW' }
];

const sithColors = [
  { var: '--sith-red', name: 'RED' },
  { var: '--sith-orange', name: 'ORANGE' },
  { var: '--sith-yellow', name: 'YELLOW' }
];

let lastHour = null;
let jediIndex = 0;
let sithIndex = 0;

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 14;
  const y = (e.clientY / window.innerHeight - 0.5) * -14;
  clockEl.style.transform = `scale(1) rotateX(${y}deg) rotateY(${x}deg)`;
});

function applyColor(value, label) {
  clockEl.style.color = value;
  labelEl.textContent = label;
  trailEl.style.background = `linear-gradient(to right, transparent, ${value}, transparent)`;
}

function rotateColorByHour(hour) {
  if (hour === 6 || hour === 18) {
    const neutral = getComputedStyle(document.documentElement).getPropertyValue('--neutral-white');
    applyColor(neutral, 'BALANCE OF THE FORCE');
    return;
  }

  if (hour > 6 && hour < 18) {
    const c = jediColors[jediIndex++ % jediColors.length];
    applyColor(getComputedStyle(document.documentElement).getPropertyValue(c.var), `JEDI ORDER · ${c.name}`);
  } else {
    const c = sithColors[sithIndex++ % sithColors.length];
    applyColor(getComputedStyle(document.documentElement).getPropertyValue(c.var), `SITH EMPIRE · ${c.name}`);
  }

  trailEl.style.transition = 'none';
  trailEl.style.left = '-100%';
  requestAnimationFrame(() => {
    trailEl.style.transition = 'left 0.7s ease-out';
    trailEl.style.left = '100%';
  });
}

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;

  timeEl.textContent = `${h}:${m}:${s} ${ampm}`;

  saberEl.classList.add('pulse');
  setTimeout(() => saberEl.classList.remove('pulse'), 120);

  if (now.getHours() !== lastHour) {
    rotateColorByHour(now.getHours());
    lastHour = now.getHours();
  }
}

lastHour = new Date().getHours();
rotateColorByHour(lastHour);
updateClock();
setInterval(updateClock, 1000);

