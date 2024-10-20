let scene, camera, renderer, drone, obstacles;
let moveSpeed = 0.1;

function createStreetLines() {
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    const points = [];
    for (let i = -100; i < 100; i += 5) {
        points.push(new THREE.Vector3(-5, 0, i));
        points.push(new THREE.Vector3(-4.5, 0, i));
        points.push(new THREE.Vector3(4.5, 0, i));
        points.push(new THREE.Vector3(5, 0, i));

        if (i % 20 === 0) {
            points.push(new THREE.Vector3(-0.5, 0, i));
            points.push(new THREE.Vector3(0.5, 0, i));
        }
    }

    lineGeometry.setFromPoints(points);
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
}

function createDrone() {
    const drone = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(1, 0.5, 2);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x32cd32 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    drone.add(body);

    const propellerGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1);
    const propellerMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    for (let i = 0; i < 4; i++) {
        const propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
        propeller.position.set(
            Math.sin(i * Math.PI / 2) * 0.8,
            0.3,
            Math.cos(i * Math.PI / 2) * 0.8
        );
        propeller.rotation.y = i * Math.PI / 2;
        drone.add(propeller);
    }

    drone.position.set(0, 0, 0);

    return drone;
}

function createPalmTree() {
    const tree = new THREE.Group();

    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 5, 32);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    tree.add(trunk);

    const leafGeometry = new THREE.ConeGeometry(1.5, 3, 32);
    const leafMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    for (let i = 0; i < 4; i++) {
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.y = 3.5;
        leaf.rotation.y = i * Math.PI / 2;
        tree.add(leaf);
    }

    tree.position.y = 2.5;
    return tree;
}
function createStreetLight() {
    const light = new THREE.Group();

    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 32);
    const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    light.add(pole);

    const lightGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const bulb = new THREE.Mesh(lightGeometry, lightMaterial);
    bulb.position.set(0, 3.5, 0);
    light.add(bulb);
    light.position.y = 3;
    return light;
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create drone
    drone = createDrone();
    drone.rotation.x = Math.PI / 2;
	drone.position.set(0, 0, -10);
	scene.add(drone);

    // Position camera and drone
    
    // Adjust camera
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, -50);
    drone.position.set(0, 0, -5);

    // Create obstacles
    obstacles = [];
    for (let i = 0; i < 20; i++) {
        let obstacle;
        const rand = Math.random();

        if (rand < 0.33) {
            const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
            const obstacleMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
            obstacle.position.y = 1; // Set the y-position for cubes
        } else if (rand < 0.66) {
            obstacle = createPalmTree();
            obstacle.position.y = 0; // Set the y-position for palm trees
        } else {
            obstacle = createStreetLight();
            obstacle.position.y = 0; // Set the y-position for street lights
        }

        obstacle.position.set(
            (Math.random() < 0.5 ? -1 : 1) * 4,
            obstacle.position.y,
            -Math.random() * 100 - 50
        );
        scene.add(obstacle);
        obstacles.push(obstacle);
    }
    
    createStreetLines();

    // Set up post-processing
    composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    const asciiPass = new THREE.ShaderPass(AsciiShader);
    asciiPass.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    composer.addPass(asciiPass);

    // Event listeners
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onWindowResize);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
}

const gameSpeed = 0.01; // Adjust this value to change speed

let score = 0;

function updateScore() {
    score++;
    document.getElementById('score').textContent = score;
}


function animate() {
    requestAnimationFrame(animate);

    obstacles.forEach(obstacle => {
        obstacle.position.z += gameSpeed;
        if (obstacle.position.z > 10) {
            obstacle.position.z = -100;
            obstacle.position.x = (Math.random() < 0.5 ? -1 : 1) * 4;
            // Maintain the correct y-position based on the obstacle type
            if (obstacle.geometry.type === 'BoxGeometry') {
                obstacle.position.y = 1;
            } else {
                obstacle.position.y = 0;
            }
        }
    });

    checkCollisions();
    composer.render();
}

function onKeyDown(event) {
    const moveDistance = 1;
    switch(event.key) {
        case 'h':
            if (drone.position.x > -8) drone.position.x -= moveDistance;
            break;
        case 'l':
            if (drone.position.x < 8) drone.position.x += moveDistance;
            break;
        case 'j':
            if (drone.position.y > -4) drone.position.y -= moveDistance;
            break;
        case 'k':
            if (drone.position.y < 4) drone.position.y += moveDistance;
            break;
    }
}

window.addEventListener('keydown', onKeyDown);

const AsciiShader = {
    uniforms: {
        tDiffuse: { value: null },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        varying vec2 vUv;

        const vec2 fontSize = vec2(1.0, 2.0);

        float character(float n, vec2 p) {
            p = floor(p*vec2(4.0, -4.0) + 2.5);
            if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y) {
                if (int(mod(n/exp2(p.y*4.0 + p.x), 2.0)) == 1) return 1.0;
            }
            return 0.0;
        }

        void main() {
            vec2 uv = gl_FragCoord.xy;
            vec2 textCoords = uv / fontSize;
            vec2 cellCoords = fract(textCoords);
            vec2 cellCenter = floor(textCoords) + 0.5;
            vec2 texCoords = cellCenter * fontSize / resolution;

            vec4 color = texture2D(tDiffuse, texCoords);
            float gray = (color.r + color.g + color.b) / 3.0;

            float n = 65536.0;
            if (gray > 0.2) n = 65600.0;
            if (gray > 0.3) n = 332772.0;
            if (gray > 0.4) n = 15255086.0;
            if (gray > 0.5) n = 23385164.0;
            if (gray > 0.6) n = 15252014.0;
            if (gray > 0.7) n = 13199452.0;
            if (gray > 0.8) n = 11512810.0;

            vec2 p = cellCoords;
            float c = character(n, p);

            gl_FragColor = vec4(c, c, c, 1.0);
        }
    `
};

function onWindowResize() {
	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    composer.setSize(window.innerWidth, window.innerHeight);
	    
	    // Update ASCII shader resolution
	    AsciiShader.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);


let lastTime = 0;

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Move obstacles
    obstacles.forEach(obstacle => {
        obstacle.position.z += gameSpeed * deltaTime;
        if (obstacle.position.z > 5) {
            obstacle.position.z = -20;
            obstacle.position.x = Math.random() * 10 - 5;
            obstacle.position.y = Math.random() * 10 - 5;
        }
    });

    // Check for collisions
    obstacles.forEach(obstacle => {
        if (drone.position.distanceTo(obstacle.position) < 1) {
            console.log("Collision detected!");
            // Implement game over logic here
        }
    });

    // Render the scene
    composer.render();

    requestAnimationFrame(gameLoop);
}

function startGame() {
    init();
    lastTime = performance.now();
    gameLoop(lastTime);
}

// Start the game when the window loads
window.onload = startGame;

let isGameOver = false;

function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (drone.position.distanceTo(obstacle.position) < 1 && !isGameOver) {
            console.log("Collision detected!");
            gameOver();
        }
    });
}

function gameOver() {
    isGameOver = true;
    document.getElementById('gameOverScreen').style.display = 'block';
}

function restartGame() {
    isGameOver = false;
    document.getElementById('gameOverScreen').style.display = 'none';
    
    // Reset drone position
    drone.position.set(0, 0, -5);
    
    // Reset obstacles
    obstacles.forEach(obstacle => {
        obstacle.position.set(
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            -Math.random() * 20 - 10
        );
    });
    score = 0;
    document.getElementById('score').textContent = score;
}

// Add this to your init() function
document.getElementById('restartButton').addEventListener('click', restartGame);
