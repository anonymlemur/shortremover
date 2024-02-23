// ==UserScript==
// @name         Shortremover
// @namespace    N/A
// @version      1
// @description  Removes shorts from home and subscriptions pages.
// @author       Lemur
// @match        https://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function removeRendererWithShorts(renderer) {
        const spanElement = renderer.querySelector('span#title.style-scope.ytd-rich-shelf-renderer');
        if (spanElement && spanElement.textContent.trim() === 'Shorts') {
            renderer.style.display = "none";
        }
    }

    function removeShorts() {
        const renderers = document.querySelectorAll('ytd-rich-section-renderer');
        for (const renderer of renderers) {
            removeRendererWithShorts(renderer);
        }
    }

    // Initially try to remove shorts
    removeShorts();

    // Set up a MutationObserver to watch for DOM changes
    const observer = new MutationObserver((mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                removeShorts();
            }
        }
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

    // Try to remove shorts periodically every 3 seconds
    setInterval(removeShorts, 3000);

})();
