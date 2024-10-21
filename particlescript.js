import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, particles, controls;
const particleCount = 50;
const functionResolution = 20;

// Optimizer vars
let velocities = new Float32Array(particleCount * 3);
let accelerations = new Float32Array(particleCount * 3);
velocities.fill(0);
accelerations.fill(0);

let pbestPositions = new Float32Array(particleCount * 3);
let pbestValues = new Float32Array(particleCount);
let gbestPosition = new Float32Array(3);
let gbestValue = Infinity;

let t = 1;

function loginfo() {
	    let meanx = 0, meany = 0;
      let minLoss = Infinity;
			const positions = particles.geometry.attributes.position.array;
			for (let i = 0; i < particleCount; i++) {
				meanx += positions[i * 3] / particleCount;
				meany += positions[i * 3 + 1] / particleCount;

				const loss = objectiveFunction(positions[i * 3], positions[i * 3 + 1]);
        if (loss < minLoss) {
            minLoss = loss;
        }
			}

	    console.log("Mean: (" + meanx + "," + meany +")");
	    console.log("Loss: " + minLoss);
}

function sampleNormal() {
	    let u = 0, v = 0;
	    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
	    while (v === 0) v = Math.random();
	    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	    num = num / 10.0 + 0.5; // Translate to 0 -> 1
	    if (num > 1 || num < 0) return sampleNormal(); // resample between 0 and 1
	    return num;
}

function initOptimizer() {
    const optimizerType = document.getElementById('optimizer').value;
    
    if (optimizerType === 'sga') {
        optimizer = swarmGradStep;
    } else if (optimizerType === 'pso') {
        optimizer = particleSwarmOptimizationStep;
    } else if (optimizerType === 'cbo') {
        optimizer = consensusBasedOptimizationStep;
    } else {
				console.log("Not a Valid Optimizer!");
		}
}

function resetOptimizer() {
    velocities = new Float32Array(particleCount * 3);
    accelerations = new Float32Array(particleCount * 3);
    t = 1;
    
    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 5 + 25; // Initialize in bottom-left corner
        const y = Math.random() * 5 - 25;
        const z = objectiveFunction(x, y);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }

    particles.geometry.attributes.position.needsUpdate = true;
}

function objectiveFunction(x, y) {
    return Math.sin(x * 0.5) * Math.cos(y * 0.5) * 2 + y*y*0.02 + x*x*0.03;
}


function particleSwarmOptimizationStep() {
    const positions = particles.geometry.attributes.position.array;

    const c1 = parseFloat(document.getElementById('c1').value); // personal
    const c2 = parseFloat(document.getElementById('c2').value); // global
    const inertia = parseFloat(document.getElementById('inertia').value);
    const doMomentum = document.getElementById('doMomentum').checked;
    const beta1 = parseFloat(document.getElementById('beta1').value);
    const beta2 = parseFloat(document.getElementById('beta2').value);
    const lr = parseFloat(document.getElementById('lr').value);

    for (let i = 0; i < particleCount; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];

        const value = objectiveFunction(x, y);

        if (value < pbestValues[i]) {
            pbestValues[i] = value;
            pbestPositions[i * 3] = x;
            pbestPositions[i * 3 + 1] = y;
            pbestPositions[i * 3 + 2] = z;
        }

        if (value < gbestValue) {
            gbestValue = value;
            gbestPosition[0] = x;
            gbestPosition[1] = y;
            gbestPosition[2] = z;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        const pbestX = pbestPositions[i * 3] - positions[i * 3];
        const pbestY = pbestPositions[i * 3 + 1] - positions[i * 3 + 1];

        const gbestX = gbestPosition[0] - positions[i * 3];
        const gbestY = gbestPosition[1] - positions[i * 3 + 1];

        const r1 = Math.random();
        const r2 = Math.random();

        const vx = r1 * c1 * pbestX + r2 * c2 * gbestX;
        const vy = r1 * c1 * pbestY + r2 * c2 * gbestY;

        if (doMomentum) {
            velocities[i * 3] = beta1 * velocities[i * 3] + (1 - beta1) * vx;
            velocities[i * 3 + 1] = beta1 * velocities[i * 3 + 1] + (1 - beta1) * vy;

            accelerations[i * 3] = beta2 * accelerations[i * 3] + (1 - beta2) * vx ** 2;
            accelerations[i * 3 + 1] = beta2 * accelerations[i * 3 + 1] + (1 - beta2) * vy ** 2;

            const mthatX = velocities[i * 3] / (1 - beta1 ** t);
            const mthatY = velocities[i * 3 + 1] / (1 - beta1 ** t);

            const vthatX = accelerations[i * 3] / (1 - beta2 ** t);
            const vthatY = accelerations[i * 3 + 1] / (1 - beta2 ** t);

            const updateX = lr * (mthatX / (Math.sqrt(vthatX) + 1e-9));
            const updateY = lr * (mthatY / (Math.sqrt(vthatY) + 1e-9));

            positions[i * 3] += updateX;
            positions[i * 3 + 1] += updateY;
        } else {
            velocities[i * 3] = vx + inertia * velocities[i * 3];
            velocities[i * 3 + 1] = vy + inertia * velocities[i * 3 + 1];

            positions[i * 3] += velocities[i * 3];
            positions[i * 3 + 1] += velocities[i * 3 + 1];
        }

        positions[i * 3 + 2] = objectiveFunction(positions[i * 3], positions[i * 3 + 1]) + 1.0;
    }

    t++;
    particles.geometry.attributes.position.needsUpdate = true;
}

function getSoftmax(positions, temp) {
    // let maxLoss = -Infinity;
    // for (let i = 0; i < particleCount; i++) {
    //     const loss = objectiveFunction(positions[i * 3], positions[i * 3 + 1]);
    //     if (loss > maxLoss) {
    //         maxLoss = loss;
    //     }
    // }

    let sumExp = 0;
    const coeffs = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
        const loss = objectiveFunction(positions[i * 3], positions[i * 3 + 1]);
        const weight = Math.exp(-temp * loss);
        coeffs[i] = weight;
        sumExp += weight;
    }

    const softmax = [0, 0];
    for (let i = 0; i < particleCount; i++) {
        const coeff = coeffs[i] / sumExp;
        softmax[0] += positions[i * 3] * coeff;
        softmax[1] += positions[i * 3 + 1] * coeff;
    }

    return softmax;
}

function consensusBasedOptimizationStep() {
    const positions = particles.geometry.attributes.position.array;

    const lambda_ = parseFloat(document.getElementById('lambda').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const temp = 50.0;
    const dt = 0.1;
    const noiseType = 'component';
    const doMomentum = document.getElementById('doMomentum').checked;

    const beta1 = parseFloat(document.getElementById('beta1').value);
    const beta2 = parseFloat(document.getElementById('beta2').value);
    const lr = 1.0;

    const softmax = getSoftmax(positions, temp);

    for (let i = 0; i < particleCount; i++) {
        const vdetx = softmax[0] - positions[i * 3];
        const vdety = softmax[1] - positions[i * 3 + 1];

        const bx = sampleNormal();
        const by = sampleNormal();

        let diffusionx, diffusiony;
        if (noiseType === 'component') {
            diffusionx = vdetx * bx;
            diffusiony = vdety * by;
        } else {
            const norm = Math.sqrt(vdetx * vdetx + vdety * vdety);
            diffusionx = norm * bx;
            diffusiony = norm * by;
        }

        const vrndx = sigma * Math.sqrt(dt) * diffusionx;
        const vrndy = sigma * Math.sqrt(dt) * diffusiony;

        if (doMomentum) {
            velocities[i * 3] = beta1 * velocities[i * 3] + (1 - beta1) * vdetx;
            velocities[i * 3 + 1] = beta1 * velocities[i * 3 + 1] + (1 - beta1) * vdety;

            accelerations[i * 3] = beta2 * accelerations[i * 3] + (1 - beta2) * vdetx * vdetx;
            accelerations[i * 3 + 1] = beta2 * accelerations[i * 3 + 1] + (1 - beta2) * vdety * vdety;

            const mthatx = velocities[i * 3] / (1 - Math.pow(beta1, t));
            const mthaty = velocities[i * 3 + 1] / (1 - Math.pow(beta1, t));

            const vthatx = accelerations[i * 3] / (1 - Math.pow(beta2, t));
            const vthaty = accelerations[i * 3 + 1] / (1 - Math.pow(beta2, t));

            const updatex = lr * lambda_ * dt * (mthatx / (Math.sqrt(vthatx) + 1e-9)) + vrndx;
            const updatey = lr * lambda_ * dt * (mthaty / (Math.sqrt(vthaty) + 1e-9)) + vrndy;

            positions[i * 3] += updatex;
            positions[i * 3 + 1] += updatey;
        } else {
            const vx = lambda_ * dt * vdetx + vrndx;
            const vy = lambda_ * dt * vdety + vrndy;

            positions[i * 3] += vx;
            positions[i * 3 + 1] += vy;
        }

        positions[i * 3 + 2] = objectiveFunction(positions[i * 3], positions[i * 3 + 1]) + 1.0;
    }

    t++;
    particles.geometry.attributes.position.needsUpdate = true;
}

function swarmGradStep() {
    const positions = particles.geometry.attributes.position.array;

    
    const c1 = parseFloat(document.getElementById('c1').value);
    const c2 = parseFloat(document.getElementById('c2').value);
    const beta1 = parseFloat(document.getElementById('beta1').value);
    const beta2 = parseFloat(document.getElementById('beta2').value);
    const leak = parseFloat(document.getElementById('leak').value);
    const lr = parseFloat(document.getElementById('lr').value);
    const K = parseInt(document.getElementById('K').value);
    const doMomentum = document.getElementById('doMomentum').checked;
    const normalize = parseInt(document.getElementById('normalize').value);

    const objectiveFunctionString = document.getElementById('objectiveFunction').value;
    const objectiveFunction = new Function('x', 'y', `return ${objectiveFunctionString};`);


    for (let k = 0; k < K; k++) {
        const refIndices = shuffle(Array.from(Array(particleCount).keys()));

        for (let i = 0; i < particleCount; i++) {
            const refIndex = refIndices[i];

            const dx = positions[refIndex * 3] - positions[i * 3];
            const dy = positions[refIndex * 3 + 1] - positions[i * 3 + 1];

            let hx = dx;
            let hy = dy;

            if (normalize) {
                const norm = Math.sqrt(hx * hx + hy * hy) ** normalize + 1e-9;
                hx /= norm;
                hy /= norm;
            }

            const fdiff = objectiveFunction(positions[i * 3], positions[i * 3 + 1]) -
                  objectiveFunction(positions[refIndex * 3], positions[refIndex * 3 + 1]);

            const leakyFdiff = Math.max(fdiff, leak * fdiff);

            velocities[i * 3] += leakyFdiff * hx;
            velocities[i * 3 + 1] += leakyFdiff * hy;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        velocities[i * 3] /= K;
        velocities[i * 3 + 1] /= K;

        const r1 = 1.0;
        // const r2x = Math.random() - 0.5;
        // const r2y = Math.random() - 0.5;

        // const vrndx = r2x * c2;
        // const vrndy = r2y * c2;

        if (doMomentum) {
            velocities[i * 3] = beta1 * velocities[i * 3] + (1 - beta1) * velocities[i * 3];
            velocities[i * 3 + 1] = beta1 * velocities[i * 3 + 1] + (1 - beta1) * velocities[i * 3 + 1];

            accelerations[i * 3] = beta2 * accelerations[i * 3] + (1 - beta2) * velocities[i * 3] ** 2;
            accelerations[i * 3 + 1] = beta2 * accelerations[i * 3 + 1] + (1 - beta2) * velocities[i * 3 + 1] ** 2;

            const mthatx = velocities[i * 3] / (1 - beta1 ** t);
            const mthaty = velocities[i * 3 + 1] / (1 - beta1 ** t);

            const vthatx = accelerations[i * 3] / (1 - beta2 ** t);
            const vthaty = accelerations[i * 3 + 1] / (1 - beta2 ** t);

            const updatex = lr * c1 * r1 * (mthatx / (Math.sqrt(vthatx) + 1e-9)); // + vrndx;
            const updatey = lr * c1 * r1 * (mthaty / (Math.sqrt(vthaty) + 1e-9)); // + vrndy;

            positions[i * 3] += updatex;
            positions[i * 3 + 1] += updatey;
        } else {
            const vx = c1 * r1 * velocities[i * 3]; // + vrndx;
            const vy = c1 * r1 * velocities[i * 3 + 1]; // + vrndy;

            positions[i * 3] += vx;
            positions[i * 3 + 1] += vy;
        }

        positions[i * 3 + 2] = objectiveFunction(positions[i * 3], positions[i * 3 + 1]) + 1.0;
    }

    t++;
    particles.geometry.attributes.position.needsUpdate = true;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById('optimizer').addEventListener('change', () => {
    initOptimizer();
    resetOptimizer();
});



function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Camera position
    camera.position.set(40, 40, 40);
    camera.lookAt(0, 0, 0);

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
    
    // Initialize the optimizer
    initOptimizer();

    
    // Event listener for optimization step
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            optimizer();
        } else if (event.code === 'KeyR') {
            resetOptimizer();
        } else if (event.code === 'KeyP') {
            loginfo();
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
            const xPos = (x / (functionResolution - 1)) * 60 - 30;
            const yPos = (y / (functionResolution - 1)) * 60 - 30;
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

    const material = new THREE.MeshPhongMaterial({ color: 0x00ff88, wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}
            

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const x = sampleNormal() * 10; // Initialize in bottom-left corner
        const y = sampleNormal() * 10;
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
