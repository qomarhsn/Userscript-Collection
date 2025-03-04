// ==UserScript==
// @name         YouTube Quick Downloader
// @namespace    https://github.com/qomarhsn/Userscript-Collection
// @version      1.1
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

(function() {
    'use strict';

    function addDownloadIcon() {
        if (document.getElementById('ss-download-icon')) return;

        let btn = document.createElement('div');
        btn.id = 'ss-download-icon';
        btn.style.position = 'fixed';
        btn.style.top = '50%';
        btn.style.left = '10px';
        btn.style.transform = 'translateY(-50%)';
        btn.style.background = 'red';
        btn.style.padding = '8px';
        btn.style.borderRadius = '50%';
        btn.style.cursor = 'pointer';
        btn.style.zIndex = '9999';
        btn.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)';
        btn.style.transition = '0.3s';
        btn.style.border = '2px solid black';

        btn.onmouseover = function() { 
            btn.style.background = 'black';  
            btn.style.border = '2px solid red';  
        };
        btn.onmouseout = function() { 
            btn.style.background = 'red';  
            btn.style.border = '2px solid black';  
        };

        let icon = document.createElement('div');
        icon.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20h14v-2H5v2zm7-18v10.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V2h1z" fill="white"/>
            </svg>
        `;
        icon.style.width = '20px';
        icon.style.height = '20px';

        btn.onclick = function() {
            let newUrl = window.location.href.replace(/(www|m)\.youtube\.com/, 'www.ssyoutube.com');
            window.open(newUrl, '_blank');
        };

        btn.appendChild(icon);
        document.body.appendChild(btn);
    }

    window.addEventListener('load', addDownloadIcon);
})();
