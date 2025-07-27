// Animated Background (simple particles)
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticles() {
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      alpha: Math.random() * 0.5 + 0.5
    });
  }
}
createParticles();

// Neural Network Effect
const neuralNodes = [];
const NEURAL_NODE_COUNT = 22;

function createNeuralNodes() {
  neuralNodes.length = 0;
  for (let i = 0; i < NEURAL_NODE_COUNT; i++) {
    neuralNodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 2.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      pulse: Math.random() * Math.PI * 2
    });
  }
}
createNeuralNodes();

function animateNeuralNetwork() {
  // Animate nodes
  for (let node of neuralNodes) {
    node.x += node.dx;
    node.y += node.dy;
    node.pulse += 0.04;
    // Bounce off edges
    if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.dy *= -1;
  }
  // Draw lines between close nodes
  for (let i = 0; i < neuralNodes.length; i++) {
    for (let j = i + 1; j < neuralNodes.length; j++) {
      const a = neuralNodes[i];
      const b = neuralNodes[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 180) {
        ctx.save();
        ctx.globalAlpha = 0.13 + 0.12 * Math.cos(a.pulse + j);
        ctx.strokeStyle = '#00c6ff';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
  // Draw nodes
  for (let node of neuralNodes) {
    ctx.save();
    ctx.globalAlpha = 0.7 + 0.3 * Math.sin(node.pulse);
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r + Math.sin(node.pulse) * 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = '#00c6ff';
    ctx.shadowColor = '#00c6ff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }
}

// Rain Drops Effect
const raindrops = [];
const RAIN_DROP_COUNT = 60;

function createRaindrops() {
  raindrops.length = 0;
  for (let i = 0; i < RAIN_DROP_COUNT; i++) {
    raindrops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: Math.random() * 18 + 12,
      speed: Math.random() * 2.5 + 2.5,
      alpha: Math.random() * 0.3 + 0.2
    });
  }
}
createRaindrops();

function animateRaindrops() {
  for (let drop of raindrops) {
    ctx.save();
    ctx.globalAlpha = drop.alpha;
    ctx.strokeStyle = '#00c6ff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.len);
    ctx.stroke();
    ctx.restore();
    drop.y += drop.speed;
    if (drop.y > canvas.height) {
      drop.x = Math.random() * canvas.width;
      drop.y = -drop.len;
      drop.len = Math.random() * 18 + 12;
      drop.speed = Math.random() * 2.5 + 2.5;
      drop.alpha = Math.random() * 0.3 + 0.2;
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Rain drops effect
  //animateRaindrops();
  // Neural network effect
  animateNeuralNetwork();
  // Draw particles
  for (let p of particles) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#00c6ff';
    ctx.shadowColor = '#00c6ff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Animated Text Effect (typing)
const animatedText = document.querySelector('.animated-text');
if (animatedText) {
  const text = animatedText.textContent;
  animatedText.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      animatedText.textContent += text[i];
      i++;
      setTimeout(type, 80);
    }
  }
  type();
}

// Time Display
function updateTime() {
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    timeElement.textContent = timeString;
  }
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Subtle Section Fade-in on Scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(40px)';
  section.style.transition = 'opacity 0.8s, transform 0.8s';
  observer.observe(section);
});

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach(reveal => {
    const revealTop = reveal.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('active');
    } else {
      reveal.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
  createNeuralNodes();
  createRaindrops();
});
