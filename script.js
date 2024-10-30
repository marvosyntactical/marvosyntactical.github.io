function createVoronoiDiagram() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.5';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Reduce number of points
    const numPoints = 20;
    let points = Array.from({ length: numPoints }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        originalX: 0,
        originalY: 0
    }));
    
    points.forEach(point => {
        point.originalX = point.x;
        point.originalY = point.y;
    });

    // Pre-calculate grid for optimization
    const gridSize = 15; // Larger grid cells = better performance
    const grid = [];
    const cols = Math.ceil(canvas.width / gridSize);
    const rows = Math.ceil(canvas.height / gridSize);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            grid.push({
                x: x * gridSize,
                y: y * gridSize
            });
        }
    }

    function drawVoronoi() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.strokeStyle = '#32CD32';
        ctx.lineWidth = 0.5;

        // Process grid points instead of individual pixels
        grid.forEach(cell => {
            const x = cell.x;
            const y = cell.y;

            let closest = 0;
            let secondClosest = 1;
            let minDist = Number.MAX_VALUE;
            let secondMinDist = Number.MAX_VALUE;

            // Only check nearby points using distance optimization
            for (let i = 0; i < points.length; i++) {
                const dx = x - points[i].x;
                const dy = y - points[i].y;
                const dist = dx * dx + dy * dy;
                
                if (dist < minDist) {
                    secondMinDist = minDist;
                    minDist = dist;
                } else if (dist < secondMinDist) {
                    secondMinDist = dist;
                }
            }

            const diff = Math.abs(Math.sqrt(minDist) - Math.sqrt(secondMinDist));
            if (diff < gridSize) {
                ctx.moveTo(x, y);
                ctx.lineTo(x + gridSize, y);
            }
        });

        ctx.stroke();
    }

    let isUpdating = false;
    let lastUpdateTime = 0;
    const updateInterval = 50; // Minimum time between updates in ms

    function updatePoints(event) {
        const currentTime = Date.now();
        if (isUpdating || currentTime - lastUpdateTime < updateInterval) {
            return;
        }

        isUpdating = true;
        lastUpdateTime = currentTime;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Find closest points more efficiently
        const closestPoints = points
            .map((point, index) => ({
                index,
                distance: Math.hypot(point.x - mouseX, point.y - mouseY)
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);

        // Update only the closest points
        closestPoints.forEach(({index}) => {
            const point = points[index];
            const dx = mouseX - point.x;
            const dy = mouseY - point.y;
            point.x += dx * 0.05;
            point.y += dy * 0.05;
        });

        // Update points returning to original position less frequently
        points.forEach((point, index) => {
            if (!closestPoints.some(p => p.index === index)) {
                point.x += (point.originalX - point.x) * 0.02;
                point.y += (point.originalY - point.y) * 0.02;
            }
        });

        drawVoronoi();
        isUpdating = false;
    }

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawVoronoi();
        }, 250);
    });

    // Throttled mousemove handler
    const throttledUpdate = (event) => {
        if (!isUpdating) {
            requestAnimationFrame(() => updatePoints(event));
        }
    };

    document.addEventListener('mousemove', throttledUpdate, { passive: true });

    // Initial draw
    drawVoronoi();

    return function cleanup() {
        document.removeEventListener('mousemove', throttledUpdate);
        window.removeEventListener('resize', drawVoronoi);
        document.body.removeChild(canvas);
    };
}

// Function to create a neural network visualization
function createNeuralNetworkVisualization() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Define the neural network layers
  const layers = [2, 4, 5, 2, 8, 3, 7, 10, 3, 2, 9, 8];

  // Calculate the positions of the neurons
  const neuronPositions = layers.map((numNeurons, layerIndex) => {
    const layerSpacing = canvas.width / (layers.length + 1);
    const neuronSpacing = canvas.height / (numNeurons + 1);

    return Array.from({ length: numNeurons }, (_, neuronIndex) => ({
      x: layerSpacing * (layerIndex + 1),
      y: neuronSpacing * (neuronIndex + 1),
    }));
  });

  // Function to draw the neural network
  function drawNeuralNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the triangles between the layers
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayer = neuronPositions[layerIndex];
      const nextLayer = neuronPositions[layerIndex + 1];

      for (let i = 0; i < currentLayer.length; i++) {
        for (let j = 0; j < nextLayer.length; j++) {
          ctx.beginPath();
          ctx.moveTo(currentLayer[i].x, currentLayer[i].y);
          ctx.lineTo(nextLayer[j].x, nextLayer[j].y);
          ctx.lineTo(
            (currentLayer[i].x + nextLayer[j].x) / 2,
            (currentLayer[i].y + nextLayer[j].y) / 2
          );
          ctx.closePath();

          ctx.fillStyle = 'rgba(0, 255, 0, 0.9)';
          ctx.fill();
        }
      }
    }
  }

  // Function to update the triangle positions based on mouse movement
  function updateTriangles(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY - 400;

    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayer = neuronPositions[layerIndex];
      const nextLayer = neuronPositions[layerIndex + 1];

      for (let i = 0; i < currentLayer.length; i++) {
        for (let j = 0; j < nextLayer.length; j++) {
          const triangleCenterX = (currentLayer[i].x + nextLayer[j].x) / 2;
          const triangleCenterY = (currentLayer[i].y + nextLayer[j].y) / 2;

          const dx = mouseX - triangleCenterX;
          const dy = mouseY - triangleCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = 10;
          const distanceRatio = Math.min(distance / maxDistance, 1);

          const offsetX = dx * distanceRatio * 0.1;
          const offsetY = dy * distanceRatio * 0.1;

          currentLayer[i].x += offsetX;
          currentLayer[i].y += offsetY;
          nextLayer[j].x += offsetX;
          nextLayer[j].y += offsetY;
        }
      }
    }

    drawNeuralNetwork();
  }

  // Add event listener for mouse movement
  document.addEventListener('mousemove', updateTriangles);

  // Initial draw of the neural network
  drawNeuralNetwork();
}



document.addEventListener('DOMContentLoaded', function() {
  // Show the loading spinner for a few seconds
  setTimeout(function() {
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }, 400);
  // Create the neural network visualization
  // createNeuralNetworkVisualization();
	createVoronoiDiagram();

  // Function to simulate typing effect
  function typeText(element, text, cursor, delay, callback) {
    let i = 0;
    const timer = setInterval(function() {
      if (i < text.length) {
        element.textContent = text.slice(0, i + 1);
        element.insertAdjacentHTML('beforeend', cursor);
        i++;
      } else {
        clearInterval(timer);
        element.innerHTML = element.dataset.originalHtml;
        callback();
      }
    }, delay);
  }

  // Function to apply typing effect to all visible text
  function applyTypingEffect() {
    const elements = document.querySelectorAll('h1, h2, p, li');
    const cursor = '<span class="cursor">|</span>';
    const delay = 10; // Adjust the delay between each character (in milliseconds)

    elements.forEach(function(element) {
      element.dataset.originalHtml = element.innerHTML;
      element.textContent = '';

      // Hide bullet points for list items
      if (element.tagName === 'LI') {
        element.style.listStyleType = 'none';
      }
    });

    let currentIndex = 0;

    function typeNextElement() {
      if (currentIndex < elements.length) {
        const element = elements[currentIndex];
        const text = element.dataset.originalHtml.replace(/(<([^>]+)>)/gi, '');
        typeText(element, text, cursor, delay, function() {
          // Restore bullet points for list items after typing effect
          if (element.tagName === 'LI') {
            element.style.listStyleType = '';
          }
          typeNextElement();
        });
        currentIndex++;
      }
    }

    typeNextElement();
  }

  // Apply typing effect when the page loads
  applyTypingEffect();
  
  let mode = 'normal';
  let selectedLink = 0;
  let commandMode = false;
  let command = '';
  
  function updateSelectedLink() {
    const links = document.querySelectorAll('a');
    links.forEach((link, index) => {
      if (index === selectedLink) {
        link.classList.add('selected');
      } else {
        link.classList.remove('selected');
      }
    });
  }

  function executeCode() {
    const content = document.getElementById('content');
    const code = content.innerText.trim();

    if (code.startsWith(':w !python3')) {
      const pythonCode = code.slice(12);
      const resultBox = document.createElement('div');
      resultBox.classList.add('result-box');
      resultBox.innerText = 'Executing Python code...';
      content.appendChild(resultBox);

      // Execute the Python code using an API or server-side script
      // and update the result box with the output
      // For demonstration purposes, we'll just display a dummy result
      setTimeout(() => {
        resultBox.innerText = 'Python code executed successfully!';
      }, 1000);
    }
  }
  
  
  
  document.addEventListener('keydown', function(event) {
    if (mode === 'normal') {
      if (event.key === 'j') {
        // Move to the next link
        selectedLink = (selectedLink + 1) % document.querySelectorAll('a').length;
        updateSelectedLink();
      } else if (event.key === 'k') {
        // Move to the previous link
        selectedLink = (selectedLink - 1 + document.querySelectorAll('a').length) % document.querySelectorAll('a').length;
        updateSelectedLink();
      } else if (event.key === 'Enter') {
        // Open the selected link
        document.querySelectorAll('a')[selectedLink].click();
      } else if (event.key === 'i') {
				event.preventDefault(); // Prevent default behavior of inserting "i"
        mode = 'insert';
        document.getElementById('content').setAttribute('contenteditable', 'true');
        document.getElementById('content').focus();
      }
    } else if (mode === 'insert') {
      if (event.key === 'Escape') {
        mode = 'normal';
        document.getElementById('content').setAttribute('contenteditable', 'false');
        document.getElementById('content').blur();
      }
    }
  });
  
  function updateCommandDisplay() {
  const commandDisplay = document.getElementById('command-display');
  commandDisplay.innerText = command;
  }
  
  updateSelectedLink();
});
