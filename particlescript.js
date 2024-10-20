import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, particles, controls;
const particleCount = 50;
const functionResolution = 20;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Camera position
    camera.position.set(30, 30, 30);
    camera.lookAt(scene.position);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);

    // Create function surface
    createFunctionSurface();

    // Create particles
    createParticles();

    // Event listener for optimization step
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            optimizationStep();
        }
    });

    // Animation loop
    animate();
}
function createFunctionSurface() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    for (let x = 0; x < functionResolution; x++) {
        for (let y = 0; y < functionResolution; y++) {
            const xPos = (x / (functionResolution - 1)) * 20 - 10;
            const yPos = (y / (functionResolution - 1)) * 20 - 10;
            const zPos = objectiveFunction(xPos, yPos);
            vertices.push(xPos, yPos, zPos);
        }
    }

    for (let x = 0; x < functionResolution - 1; x++) {
        for (let y = 0; y < functionResolution - 1; y++) {
            const topLeft = x * functionResolution + y;
            const topRight = topLeft + 1;
            const bottomLeft = (x + 1) * functionResolution + y;
            const bottomRight = bottomLeft + 1;

            indices.push(topLeft, bottomLeft, topRight);
            indices.push(bottomLeft, bottomRight, topRight);
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}
            
            
            
            
            
            
            
            
            

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 2 - 11; // Initialize in bottom-left corner
        const y = Math.random() * 2 - 11;
        const z = objectiveFunction(x, y);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.3 });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function objectiveFunction(x, y) {
    // Example objective function (you can replace this with your own)
    return Math.sin(x * 0.5) * Math.cos(y * 0.5) * 2 + Math.exp(y*0.3);
}


function optimizationStep() {
    // Placeholder for optimization step
    console.log("Optimization step");

    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
        // Simple random movement for demonstration
        positions[i * 3] += (Math.random() - 0.5) * 2.0;
        positions[i * 3 + 1] += (Math.random() - 0.5) * 2.0;
        positions[i * 3 + 2] = objectiveFunction(positions[i * 3], positions[i * 3 + 1]);
    }
    particles.geometry.attributes.position.needsUpdate = true;
}


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
