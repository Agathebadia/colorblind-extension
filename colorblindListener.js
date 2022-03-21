//Listeners for colorblind filter buttons
//Injects a javascript file on click event, the js file applies a filter to simulate colorblindness

window.selectedFilter = null;
window.onload = function() {
  if (!chrome || !chrome.storage || !chrome.storage.local) return;
  chrome.storage.local.get(["key"], function(result) {
    try {
      document.getElementById(result.key).click();
    } catch (e) {
      console.log(e);
    }
  });
};

function setSelected(value) {
  try {
    chrome.storage.local.set({ key: value }, function() {
      document.getElementById(value).checked = true;
    });
  } catch {}
}

function injectFilter(fileName) {
  chrome.tabs.executeScript({ file: fileName });
}

document.querySelectorAll(['[id^="radio"]']).forEach(radioButton => {
  const filter = radioButton.parentElement.id.replace("option-", "");
  radioButton.addEventListener("click", function() {
    // page-specific filters
    setSelected(radioButton.id);
    injectFilter(`filters/${filter}.js`);
    // popup-specific filters
    applyFilter((window.selectedFilter = filter));
  });
});
