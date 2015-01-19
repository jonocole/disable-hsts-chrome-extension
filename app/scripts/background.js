'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId) {
  chrome.pageAction.show(tabId);
});

chrome.webRequest.onHeadersReceived.addListener(function (details) {
  var headers = details.responseHeaders;
  if (headers) {
    headers = headers.filter(function(header) {
      return header.name.toLowerCase() !== 'strict-transport-security';
    });
    return {responseHeaders: headers};
  }
}, {urls: ['https://*/*']}, ['blocking', 'responseHeaders']);

console.log('\'Allo \'Allo! Event Page for Page Action');
