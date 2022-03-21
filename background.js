chrome.scripting.executeScript({
    target: {tabId: chrome.window.getCurrent, allFrames: true},
    files: ['colorblindListener.js'],
});
