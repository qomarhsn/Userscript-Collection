// ==UserScript==
// @name         LinkedIn Job Card Styler
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Change the background color of job card footers on LinkedIn
// @author       @maab-fw
// @match        https://www.linkedin.com/jobs/*
// @grant        none
// @homepageURL  https://github.com/qomarhsn/Userscript-Collection
// @supportURL   https://github.com/qomarhsn/Userscript-Collection/issues
// @updateURL    https://github.com/qomarhsn/Userscript-Collection/raw/main/linkedIn-job-card-styler.user.js
// @downloadURL  https://github.com/qomarhsn/Userscript-Collection/raw/main/linkedIn-job-card-styler.user.js
// ==/UserScript==

(function () {
  "use strict";

  window.addEventListener("load", function () {
    function styleJobCards() {
      document
        .querySelectorAll(".job-card-container__footer-job-state:not(.custom-styled)")
        .forEach((el) => {
          el.style.backgroundColor = "#cb112d";
          el.style.color = "#ffffff";
          el.classList.add("custom-styled"); // Mark the element as styled
        });
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length) {
          styleJobCards();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    styleJobCards();
  });
})();
