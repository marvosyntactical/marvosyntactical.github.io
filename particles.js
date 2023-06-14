const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  console.error('WebGL context not available');
}

const NUM_PARTICLES = 100;
const particles = [];
const links = [];

for (let i = 0; i < NUM_PARTICLES; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    radius: Math.random() * 5 + 5,
    color: [Math.random(), Math.random(), Math.random(), 1],
  });
}

for (let i = 0; i < NUM_PARTICLES; i++) {
  const particle1 = particles[i];
  const particle2 = particles[(i + 1) % NUM_PARTICLES];
  const dx = particle2.x - particle1.x;
  const dy = particle2.y - particle1.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  links.push({
    particle1,
    particle2,
    length,
    color: [Math.random(), Math.random(), Math.random(), 1],
  });
}

function updateParticles(dt) {
  for (let particle of particles) {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;

    if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
      particle.vx *= -1;
    }
    if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
      particle.vy *= -1;
    }
  }
}

function updateLinks() {
  for (let link of links) {
    const dx = link.particle2.x - link.particle1.x;
    const dy = link.particle2.y - link.particle1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance !== link.length) {
      const displacement = distance - link.length;
      const direction = { x: dx / distance, y: dy / distance };
      link.particle1.x += displacement * 0.5 * direction.x;
      link.particle1.y += displacement * 0.5 * direction.y;
      link.particle2.x -= displacement * 0.5 * direction.x;
      link.particle2.y -= displacement * 0.5 * direction.y;
    }
  }
}
  
function drawParticles() {
  for (let particle of particles) {
    const { x, y, radius, color } = particle;

    gl.beginPath();
    gl.arc(x, y, radius, 0, 2 * Math.PI);
    gl.fillStyle = `rgba(${color[0] * 255},${color[1] * 255},${color[2] * 255},${color[3]})`;
    gl.fill();
  }
}

function drawLinks() {
  for (let link of links) {
    const { particle1, particle2, color } = link;

    gl.beginPath();
    gl.moveTo(particle1.x, particle1.y);
    gl.lineTo(particle2.x, particle2.y);
    gl.strokeStyle = `rgba(${color[0] * 255},${color[1] * 255},${color[2] * 255},${color[3]})`;
    gl.stroke();
  }
}

function render() {
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const dt = 1 / 60;

  updateParticles(dt);
  updateLinks();

  drawParticles();
  drawLinks();

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
