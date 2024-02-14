if (typeof selectionActive === 'undefined') {
  var selectionActive = true;
  var selectedElement = null;
}


document.body.addEventListener('mouseover', function (e) {
  if (!selectionActive) return;
  if (selectedElement) {
    selectedElement.style.backgroundColor = '';
  }
  e.target.style.backgroundColor = 'rgba(173, 216, 230, 0.5)'; // light baby blue
  selectedElement = e.target;
});

document.body.addEventListener('mouseout', function (e) {
  if (!selectionActive) return;
  if (selectedElement) {
    selectedElement.style.backgroundColor = '';
  }
});

document.body.addEventListener('click', function (e) {
  if (!selectionActive) return;
  e.preventDefault();
  let html = e.target.outerHTML;
  // Send the HTML to background.js
  chrome.runtime.sendMessage({ html: html });
  return false;
}, true);

document.body.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (selectedElement) {
      selectedElement.style.backgroundColor = '';
      selectedElement = null;
    }
    selectionActive = false;
  }
});

document.body.addEventListener('click', function (e) {
  if (!selectionActive) return;
  e.preventDefault();
  let html = e.target.outerHTML;
  // Copy the HTML to the clipboard
  navigator.clipboard.writeText(html)
    .then(() => {
      alert("Copied to clipboard! Shall we open this in vsCode?\nOnce vsCode loads up, you can paste the code\nand start editing right away!");
      window.open('vscode://');
    })
    .catch(err => {
      console.error('Failed to copy the element: ', err);
    });
  return false;
}, true);
