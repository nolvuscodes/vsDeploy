// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: () => {
//       let selectedElement = null;
//       let selectionActive = true;

//       document.body.addEventListener('mouseover', function(e) {
//         if (!selectionActive) return;
//         if (selectedElement) {
//           selectedElement.style.backgroundColor = '';
//         }
//         e.target.style.backgroundColor = 'rgba(173, 216, 230, 0.5)'; // light baby blue
//         selectedElement = e.target;
//       });

//       document.body.addEventListener('mouseout', function(e) {
//         if (!selectionActive) return;
//         if (selectedElement) {
//           selectedElement.style.backgroundColor = '';
//         }
//       });

//       document.body.addEventListener('click', function(e) {
//         if (!selectionActive) return;
//         e.preventDefault();
//         let html = e.target.outerHTML;
//         // Copy the HTML to the clipboard
//         navigator.clipboard.writeText(html)
//           .then(() => {
//             alert("Copied to clipboard! Shall we open this in vsCode?\nOnce vsCode loads up, you can paste the code\nand start editing right away!");
//             window.open('vscode://');
//           })
//           .catch(err => {
//             console.error('Failed to copy the element: ', err);
//           });
//         return false;
//       }, true);

//       document.body.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape') {
//           if (selectedElement) {
//             selectedElement.style.backgroundColor = '';
//             selectedElement = null;
//           }
//           selectionActive = false;
//         }
//       });
//     }
//   });
// });
// background.js
chrome.runtime.onInstalled.addListener(function() {
  // Create a parent item and two children.
  chrome.contextMenus.create({"title": "vsDeploy", "id": "parent"});
  chrome.contextMenus.create({"title": "GitHub Repository", "parentId": "parent", "id": "repo"});
  chrome.contextMenus.create({"title": "Issues", "parentId": "parent", "id": "issues"});
  chrome.contextMenus.create({"title": "Get Started Wiki", "parentId": "parent", "id": "wiki"});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  switch(info.menuItemId) {
    case "repo":
      openRepo();
      break;
    case "issues":
      openIssues();
      break;
    case "wiki":
      openWiki();
      break;
  }
});

function openRepo() {
  chrome.tabs.create({url: "https://github.com/nolvuscodes/vsdeploy"});
}

function openIssues() {
  chrome.tabs.create({url: "https://github.com/nolvuscodes/vsdeploy/issues"});
}

function openWiki() {
  chrome.tabs.create({url: "https://github.com/nolvuscodes/vsdeploy/wiki"});
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      let selectedElement = null;
      let selectionActive = true;

      document.body.addEventListener('mouseover', function(e) {
        if (!selectionActive) return;
        if (selectedElement) {
          selectedElement.style.backgroundColor = '';
        }
        e.target.style.backgroundColor = 'rgba(173, 216, 230, 0.5)'; // light baby blue
        selectedElement = e.target;
      });

      document.body.addEventListener('mouseout', function(e) {
        if (!selectionActive) return;
        if (selectedElement) {
          selectedElement.style.backgroundColor = '';
        }
      });

      document.body.addEventListener('click', function(e) {
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

      document.body.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          if (selectedElement) {
            selectedElement.style.backgroundColor = '';
            selectedElement = null;
          }
          selectionActive = false;
        }
      });
    }
  });
});
