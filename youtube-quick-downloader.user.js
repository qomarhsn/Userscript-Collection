// ==UserScript==
// @name         YouTube Quick Downloader
// @namespace    https://github.com/qomarhsn/Userscript-Collection
// @version      1.2
// @description  Adds a floating button to YouTube for quick video downloads via ssyoutube.com.
// @author       Qomarul Hasan
// @license      MIT
// @match        *://www.youtube.com/watch?v=*
// @match        *://m.youtube.com/watch?v=*
// @icon         https://www.youtube.com/favicon.ico
// @run-at       document-end
// @grant        none
// @homepageURL  https://github.com/qomarhsn/Userscript-Collection
// @supportURL   https://github.com/qomarhsn/Userscript-Collection/issues
// @updateURL    https://github.com/qomarhsn/Userscript-Collection/raw/main/youtube-quick-downloader.user.js
// @downloadURL  https://github.com/qomarhsn/Userscript-Collection/raw/main/youtube-quick-downloader.user.js
// ==/UserScript==

(function () {
    'use strict';

    function addDownloadButton() {
        let topControls = document.querySelector('.ytp-chrome-top');
        if (!topControls || document.getElementById('ss-download-button')) return;

        let btn = document.createElement('button');
        btn.id = 'ss-download-button';
        btn.className = 'ytp-button'; // YouTube's native button style
        btn.style.position = 'absolute';
        btn.style.top = '12px';
        btn.style.left = '12px';
        btn.style.width = '36px';
        btn.style.height = '36px';
        btn.style.borderRadius = '50%'; // Rounded shape
        btn.style.background = 'rgba(255, 255, 255, 0.4)'; // YouTube-like transparency
        btn.style.padding = '6px';
        btn.style.cursor = 'pointer';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.transition = '0.3s';

        // Hover effect: Slightly increase opacity
        btn.onmouseover = function () {
            btn.style.background = 'rgba(255, 255, 255, 0.6)';
        };
        btn.onmouseout = function () {
            btn.style.background = 'rgba(255, 255, 255, 0.4)';
        };

        // Add SVG icon (download symbol)
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20h14v-2H5v2zm7-18v10.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V2h1z"/>
            </svg>
        `;

        // Click event to open download link
        btn.onclick = function () {
            let newUrl = window.location.href.replace(/(www|m)\.youtube\.com/, 'www.ssyoutube.com');
            window.open(newUrl, '_blank');
        };

        topControls.appendChild(btn);
    }

    function observeDOM() {
        let observer = new MutationObserver(() => addDownloadButton());
        observer.observe(document.body, { childList: true, subtree: true });
    }

    addDownloadButton();
    observeDOM();
})();
