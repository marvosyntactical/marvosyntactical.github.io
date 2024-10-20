document.addEventListener('DOMContentLoaded', function() {
  // Show the loading spinner for a few seconds
  setTimeout(function() {
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }, 800);

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
