// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   if (tabs.length > 0) {
//     const tabId = tabs[0].id // Get the tab ID of the active tab
//     chrome.scripting.executeScript(
//       {
//         target: {
//           tabId: tabId // Pass the tabId property explicitly
//         },
//         world: "MAIN", // Access the window object
//         func: () => {
//           console.log("TabId:", tabId)
//         }
//       },
//       () => {
//         console.log("Background script got callback after injection")
//       }
//     )
//   }
// })
