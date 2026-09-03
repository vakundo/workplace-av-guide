'use strict';

// Connection instructions transcribed from the supplied Condo Room AV System guide.
const commonSteps = [
  { title: 'Turn on the TV.', detail: 'Use the TV remote.', label: 'TV remote', display: 'Power on' },
  { title: 'Select CONDO AV.', detail: 'Set the TV input to CONDO AV.', label: 'TV input', display: 'CONDO AV' }
];
const connections = {
  pc: { name: 'Room PC', input: '1', switchLabel: 'PC', finish: 'Your meeting or presentation is ready on the room PC.', steps: [
    { title: 'Choose 1 — PC.', detail: 'Select 1 on the AV switch remote.', label: 'AV switch remote', display: '1 · PC' },
    { title: 'Open the cabinet.', detail: 'Find the cabinet below the TV.', label: 'Below the TV', display: 'Room PC' },
    { title: 'Power on. Sign in.', detail: 'Turn on the room PC and sign in.', label: 'Room PC', display: 'Sign in' },
    { title: 'Open your meeting.', detail: 'Open your meeting or presentation on the room PC.', label: 'Ready to begin', display: 'Let’s meet.' }
  ]},
  hdmi: { name: 'HDMI', input: '2', switchLabel: 'HDMI', finish: 'Your laptop is connected for your presentation.', steps: [
    { title: 'Choose 2 — HDMI.', detail: 'Select 2 on the AV switch remote.', label: 'AV switch remote', display: '2 · HDMI' },
    { title: 'Connect your laptop.', detail: 'Connect the HDMI cable / Type-C connection to your laptop.', label: 'Wired connection', display: 'HDMI / Type-C' },
    { title: 'Choose your view.', detail: 'On your laptop, choose Duplicate or Extend as needed.', label: 'Laptop display setting', display: 'Duplicate / Extend' }
  ]},
  clickshare: { name: 'ClickShare', input: '3', switchLabel: 'ClickShare', finish: 'Your screen is shared through ClickShare.', steps: [
    { title: 'Choose 3 — ClickShare.', detail: 'Select 3 on the AV switch remote.', label: 'AV switch remote', display: '3 · ClickShare' },
    { title: 'Plug in the Button.', detail: 'Connect the ClickShare USB-C Button to your laptop.', label: 'Your laptop', display: 'USB-C Button' },
    { title: 'Give it a moment.', detail: 'Wait until the ClickShare Button is ready.', label: 'ClickShare Button', display: 'Wait until ready' },
    { title: 'Press to share.', detail: 'Press the ClickShare Button to share your screen.', label: 'ClickShare Button', display: 'Press. Share.' }
  ]}
};

const $ = id => document.getElementById(id);
const page = $('condo');
const back = document.querySelector('.back');
let selected = null;
let step = 0;

function route() {
  const open = location.hash === '#condo';
  document.body.classList.toggle('room-open', open);
  page.classList.toggle('active', open);
  page.setAttribute('aria-hidden', String(!open));
  document.title = open ? 'Condo Room — CAN AV Guide' : 'CAN — AV Guide';
  if (open) { window.scrollTo(0, 0); back.focus({ preventScroll: true }); }
}

function chooseConnection(key) {
  selected = connections[key];
  step = 0;
  $('connection-picker').hidden = true;
  $('connection-guide').hidden = false;
  $('connection-label').textContent = selected.name;
  $('guide-mode').textContent = selected.name;
  $('switch-number').textContent = selected.input;
  $('switch-label').textContent = selected.switchLabel;
  $('all-steps').replaceChildren();
  [...commonSteps, ...selected.steps].forEach(item => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = item.title;
    const span = document.createElement('span');
    span.textContent = item.detail;
    li.append(strong, span);
    $('all-steps').append(li);
  });
  document.querySelector('.quick-reference').open = false;
  renderStep();
  $('next-step').focus({ preventScroll: true });
}

function renderStep() {
  const steps = [...commonSteps, ...selected.steps];
  const finished = step === steps.length;
  $('guide-progress').max = steps.length;
  $('guide-progress').value = step;
  $('step-count').textContent = finished ? 'ALL STEPS COMPLETE' : `STEP ${step + 1} OF ${steps.length}`;
  $('step-percent').textContent = `${Math.round(step / steps.length * 100)}%`;
  $('previous-step').disabled = step === 0;
  $('next-step').textContent = finished ? 'Start again ↺' : step === steps.length - 1 ? 'Done. Finish ✓' : 'Done. Next →';
  const item = finished ? { title: 'You’re all set.', detail: selected.finish, label: 'Connected', display: 'Ready.' } : steps[step];
  const heading = document.createElement('h3');
  heading.textContent = item.title;
  const detail = document.createElement('p');
  detail.textContent = item.detail;
  const visual = document.createElement('div');
  visual.className = 'instruction-display' + (finished ? ' complete' : '');
  visual.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span');
  label.textContent = item.label;
  const value = document.createElement('strong');
  value.textContent = item.display;
  visual.append(label, value);
  $('step-body').replaceChildren(heading, detail, visual);
  $('step-dots').replaceChildren();
  steps.forEach((item, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.textContent = index < step ? '✓' : index + 1;
    dot.className = index === step ? 'current' : index < step ? 'done' : '';
    dot.setAttribute('aria-label', `Step ${index + 1}: ${item.title}`);
    if (index === step) dot.setAttribute('aria-current', 'step');
    dot.addEventListener('click', () => { step = index; renderStep(); $('next-step').focus({ preventScroll: true }); });
    $('step-dots').append(dot);
  });
}

document.querySelectorAll('[data-connection]').forEach(button => button.addEventListener('click', () => chooseConnection(button.dataset.connection)));
$('next-step').addEventListener('click', () => { step = step === commonSteps.length + selected.steps.length ? 0 : step + 1; renderStep(); });
$('previous-step').addEventListener('click', () => { if (step > 0) { step--; renderStep(); } });
$('change-connection').addEventListener('click', () => {
  $('connection-guide').hidden = true;
  $('connection-picker').hidden = false;
  document.querySelector('[data-connection]').focus({ preventScroll: true });
});
back.addEventListener('click', () => { location.hash = 'rooms'; });
window.addEventListener('hashchange', route);
route();
