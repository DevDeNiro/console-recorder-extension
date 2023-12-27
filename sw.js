// Listen for messages on window
chrome.runtime.onMessage.addListener(function (request, sendResponse) {
  if (request.type && request.message) {
    console.log(`Received ${request.type}: ${request.message}`);
    sendResponse({received: true, type: request.type});
  }
});
