document.addEventListener('DOMContentLoaded', function() {
  // Show the loading spinner for a few seconds
  setTimeout(function() {
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }, 800);

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
