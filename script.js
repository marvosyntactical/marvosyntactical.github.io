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
  }, 800);
  // Create the neural network visualization
  createNeuralNetworkVisualization();


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
