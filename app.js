const temp = document.querySelector('#temp');
const salt = document.querySelector('#salt');
const tempOut = document.querySelector('#tempOut');
const saltOut = document.querySelector('#saltOut');
const densityText = document.querySelector('#densityText');
const statusText = document.querySelector('#statusText');
const water = document.querySelector('.water');

function updateDensity() {
  const t = Number(temp.value), s = Number(salt.value);
  tempOut.textContent = t;
  saltOut.textContent = s;
  const density = 1027 + (35 - t) * 0.2 + (s - 35) * 0.78;
  document.querySelector('.formula').firstChild.textContent = `ρ ≈ ${density.toFixed(1)} `;
  if (density > 1030) { densityText.textContent = '高密度 · 更容易下沉'; statusText.textContent = '下沉趋势 ↑'; water.style.background = 'linear-gradient(#5eaebb,#04506d)'; }
  else if (density < 1025) { densityText.textContent = '低密度 · 更容易上浮'; statusText.textContent = '上升趋势 ↓'; water.style.background = 'linear-gradient(#98dfd0,#168ca0)'; }
  else { densityText.textContent = '标准海水 · 中等密度'; statusText.textContent = '正在平衡'; water.style.background = 'linear-gradient(#79d3cb,#08708f)'; }
}
temp.addEventListener('input', updateDensity);
salt.addEventListener('input', updateDensity);
updateDensity();

const ticketChecks = [...document.querySelectorAll('.ticket-item input')];
const ticketProgress = document.querySelector('#ticketProgress');
const ticketBar = document.querySelector('#ticketBar');
function updateTicketProgress() {
  const done = ticketChecks.filter(box => box.checked).length;
  ticketProgress.textContent = `${done} / ${ticketChecks.length} 已完成`;
  ticketBar.style.width = `${done / ticketChecks.length * 100}%`;
}
ticketChecks.forEach(box => box.addEventListener('change', updateTicketProgress));

const eofDashboard = document.querySelector('.eof-dashboard');
const eofCopy = {
  1: {
    label: 'EOF 1 · 赤道太平洋增暖型', variance: '48.6%', pc: 'PC 1', signal: 'ENSO',
    map: '暖异常集中在中东部赤道太平洋，可作为 El Niño 型海温变化的简化示意。',
    title: 'PC 1 时间系数 / 1982–2024', current: '+1.24 σ',
    caption: '正位相代表该空间型增强；负位相表示其反相状态。峰值年份可与 Niño3.4 指数一起解读。'
  },
  2: {
    label: 'EOF 2 · 东西反相的纬向位移型', variance: '16.8%', pc: 'PC 2', signal: '位移 / 结构变化',
    map: '西部偏冷、东部偏暖的反相结构，提示暖池与对流中心的东西摆动。',
    title: 'PC 2 时间系数 / 1982–2024', current: '−0.47 σ',
    caption: '第二模态补充第一模态未能解释的变化，适合用来观察 ENSO 空间结构的差异。'
  }
};
document.querySelectorAll('.eof-tab').forEach(button => button.addEventListener('click', () => {
  const mode = button.dataset.mode;
  const copy = eofCopy[mode];
  eofDashboard.dataset.mode = mode;
  document.querySelectorAll('.eof-tab').forEach(tab => tab.classList.toggle('active', tab === button));
  document.querySelector('#eofModeLabel').textContent = copy.label;
  document.querySelector('#eofVariance').textContent = copy.variance;
  document.querySelector('#eofPc').textContent = copy.pc;
  document.querySelector('#eofSignal').textContent = copy.signal;
  document.querySelector('#eofMapCaption').textContent = copy.map;
  document.querySelector('#pcTitle').textContent = copy.title;
  document.querySelector('#pcCurrent').textContent = copy.current;
  document.querySelector('#pcCaption').textContent = copy.caption;
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.style.opacity = '1';
    entry.target.style.transform = 'translateY(0)';
    observer.unobserve(entry.target);
  }
}), {threshold:.1});
document.querySelectorAll('.topic-card,.time-item,.data-card').forEach(el => { el.style.transition='opacity .7s ease, transform .7s ease'; el.style.opacity='0'; el.style.transform='translateY(15px)'; observer.observe(el); });
