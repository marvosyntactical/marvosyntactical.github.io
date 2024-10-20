import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 20);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.getElementById('container').appendChild(renderer.domElement);

// Add a light source
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 20, 20);
scene.add(light);


// Set up the controls for dragging the view
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 10;
controls.maxDistance = 40;

// Set up the objective function
let objectiveFunction = 'x^2 + y^2';

// Function to evaluate the objective function
function evaluateFunction(x, y) {
  const func = new Function('x', 'y', `return ${objectiveFunction};`);
  return func(x, y);
}


// Function to create the function surface
function createFunctionSurface() {
  const geometry = new THREE.PlaneGeometry(20, 20, 100, 100);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: true,
    side: THREE.DoubleSide,
  });
  const surface = new THREE.Mesh(geometry, material);
  surface.rotateX(-Math.PI / 2);
  scene.add(surface);

  // Update the surface vertices based on the function
  const vertices = surface.geometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const z = evaluateFunction(x, y);
    vertices[i + 2] = z;
  }
  surface.geometry.attributes.position.needsUpdate = true;
}

// Function to render the scene
function render() {
  // Clear the scene
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  // Create the function surface
  createFunctionSurface();

  // Render the scene
  renderer.render(scene, camera);
}

// Function to handle the start button click
function handleStartButtonClick() {
  // Get the input value for the objective function
  objectiveFunction = document.getElementById('function').value;

  // Render the scene
  render();
}

// Add event listener to the start button
document.getElementById('startButton').addEventListener('click', handleStartButtonClick);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize the renderer when the window is resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
