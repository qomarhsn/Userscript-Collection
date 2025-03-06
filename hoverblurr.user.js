// ==UserScript==
// @name         HoverBlurr
// @namespace    https://github.com/qomarhsn/Userscript-Collection
// @version      2.0
// @description  Apply blur effect to images on the web with customizable blur amount and site whitelist functionality.
// @author       Qomarul Hasan
// @license      MIT
// @match        *://*/*
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @homepageURL  https://github.com/qomarhsn/Userscript-Collection
// @supportURL   https://github.com/qomarhsn/Userscript-Collection/issues
// @updateURL    https://github.com/qomarhsn/Userscript-Collection/raw/main/hoverblurr.user.js
// @downloadURL  https://github.com/qomarhsn/Userscript-Collection/raw/main/hoverblurr.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Default blur value and initialization
    let blurValue = GM_getValue('blurValue', 20);  // Load stored blur value, default 20%
    let whitelist = GM_getValue('whitelist', []);  // Load stored whitelist

    // Store the style ID to remove later
    let styleId = 'hoverblurr-styles';

    // Apply blur effect to images on the page
    function applyBlur() {
        // Remove existing styles
        let existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }

        // Apply new blur style
        let style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            img, image {
                filter: blur(${blurValue}px);
                transition: filter 0.3s ease;
            }
            img:hover, image:hover {
                filter: blur(0px);
            }
        `;
        document.head.appendChild(style);
    }

    // Remove blur effect from images
    function removeBlur() {
        // Remove the blur styles if any
        let existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }

        // Apply style to remove blur
        let style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            img, image {
                filter: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Check if the current site is whitelisted
    function isWhitelisted(callback) {
        const hostname = window.location.hostname;
        callback(whitelist.includes(hostname));
    }

    // Update blur effect based on whitelist status
    function updateBlurBasedOnWhitelist() {
        isWhitelisted(function(whitelisted) {
            if (whitelisted) {
                removeBlur();
            } else {
                applyBlur();
            }
        });
    }

    // Apply blur on page load or reload
    updateBlurBasedOnWhitelist();

    // Create icon for settings (SVG icon)
    const icon = document.createElement('div');
    icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19 12h2"></path>
            <path d="M5 12H3"></path>
            <path d="M12 5V3"></path>
            <path d="M12 19v2"></path>
            <path d="M16.24 7.76l1.42-1.42"></path>
            <path d="M7.76 16.24l-1.42 1.42"></path>
            <path d="M16.24 16.24l1.42 1.42"></path>
            <path d="M7.76 7.76l-1.42-1.42"></path>
        </svg>
    `;
    icon.style.position = 'fixed';
    icon.style.bottom = '15px';
    icon.style.left = '15px';
    icon.style.backgroundColor = '#000';  // Pure black background
    icon.style.color = 'white';
    icon.style.padding = '10px';
    icon.style.borderRadius = '50%';
    icon.style.cursor = 'pointer';
    icon.style.zIndex = '10000';
    icon.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(icon);

    // Create settings menu
    const settingsMenu = document.createElement('div');
    settingsMenu.style.position = 'fixed';
    settingsMenu.style.bottom = '60px';
    settingsMenu.style.left = '15px';
    settingsMenu.style.backgroundColor = '#000';  // Pure black background
    settingsMenu.style.color = 'white';
    settingsMenu.style.padding = '16px';
    settingsMenu.style.borderRadius = '12px';
    settingsMenu.style.display = 'none';
    settingsMenu.style.width = '280px';
    settingsMenu.style.height = '400px';  // Set height to 400px
    settingsMenu.style.overflowY = 'auto'; // Enable scrolling
    settingsMenu.style.zIndex = '10001';
    settingsMenu.style.boxShadow = '0px 6px 10px rgba(0, 0, 0, 0.5)';
    settingsMenu.style.transition = 'transform 0.3s ease-in-out';
    settingsMenu.style.transform = 'translateY(10px)';
    settingsMenu.style.textAlign = 'center';  // Center content
    document.body.appendChild(settingsMenu);

    // Blur input field (slider)
    const blurInputLabel = document.createElement('label');
    blurInputLabel.innerText = `Blur Amount`;
    blurInputLabel.style.fontSize = '14px';
    blurInputLabel.style.marginBottom = '10px';
    const blurInputSlider = document.createElement('input');
    blurInputSlider.type = 'range';
    blurInputSlider.min = '1';
    blurInputSlider.max = '100';
    blurInputSlider.value = blurValue;
    blurInputSlider.style.width = '100%';
    blurInputSlider.style.marginBottom = '15px';
    blurInputSlider.style.cursor = 'pointer';
    blurInputLabel.appendChild(blurInputSlider);
    settingsMenu.appendChild(blurInputLabel);

    // Display value for the slider
    const blurInputValue = document.createElement('div');
    blurInputValue.innerText = `Blur: ${blurValue}%`;
    blurInputValue.style.fontSize = '14px';
    blurInputValue.style.marginTop = '8px';
    settingsMenu.appendChild(blurInputValue);

    // Whitelist button
    const whitelistButton = document.createElement('button');
    whitelistButton.innerText = 'Whitelist Site';
    whitelistButton.style.backgroundColor = '#007bff';
    whitelistButton.style.color = 'white';
    whitelistButton.style.border = 'none';
    whitelistButton.style.padding = '10px 18px';
    whitelistButton.style.cursor = 'pointer';
    whitelistButton.style.marginTop = '12px';
    whitelistButton.style.borderRadius = '8px';
    settingsMenu.appendChild(whitelistButton);

    // Whitelisted sites list
    const whitelistList = document.createElement('ul');
    whitelistList.style.listStyleType = 'none';
    whitelistList.style.padding = '0';
    whitelistList.style.marginTop = '20px';
    settingsMenu.appendChild(whitelistList);

    // Load and display whitelisted sites
    function updateWhitelistDisplay() {
        whitelistList.innerHTML = '';  // Clear current list
        whitelist.forEach(site => {
            const listItem = document.createElement('li');
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';
            listItem.style.justifyContent = 'space-between';
            listItem.style.padding = '8px';
            listItem.style.borderBottom = '1px solid #444';
            listItem.innerText = site;
            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remove';
            removeButton.style.marginLeft = '10px';
            removeButton.style.background = 'red';
            removeButton.style.color = 'white';
            removeButton.style.border = 'none';
            removeButton.style.padding = '6px 10px';
            removeButton.style.borderRadius = '4px';
            removeButton.addEventListener('click', function() {
                whitelist = whitelist.filter(item => item !== site);
                GM_setValue('whitelist', whitelist);
                updateWhitelistDisplay(); // Update display immediately
                updateBlurBasedOnWhitelist(); // Reapply blur effect based on new whitelist
            });
            listItem.appendChild(removeButton);
            whitelistList.appendChild(listItem);
        });
    }
    updateWhitelistDisplay();

    // Handle slider input change
    blurInputSlider.addEventListener('input', function() {
        blurValue = (blurInputSlider.value);  // Directly use the value (1-100)
        blurInputValue.innerText = `Blur: ${blurInputSlider.value}%`;
        GM_setValue('blurValue', blurValue);  // Store blur value

        // Apply blur if the site is not whitelisted
        isWhitelisted(function(whitelisted) {
            if (!whitelisted) {
                applyBlur();  // Apply blur effect only if site is not whitelisted
            }
        });
    });

    // Handle whitelist button click
    whitelistButton.addEventListener('click', function() {
        const hostname = window.location.hostname;
        if (whitelist.includes(hostname)) {
            whitelist = whitelist.filter(site => site !== hostname);
            whitelistButton.innerText = 'Whitelist Site';
        } else {
            whitelist.push(hostname);
            whitelistButton.innerText = 'Remove from Whitelist';
        }
        GM_setValue('whitelist', whitelist);
        updateWhitelistDisplay();
        updateBlurBasedOnWhitelist(); // Apply the blur immediately after whitelist change
    });

    // Toggle settings menu visibility
    icon.addEventListener('click', function() {
        settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'm') { // Alt + M to toggle the menu
            settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
        }
        if (e.altKey && e.key === 'w') { // Alt + W to whitelist/remove current site
            const hostname = window.location.hostname;
            if (whitelist.includes(hostname)) {
                whitelist = whitelist.filter(site => site !== hostname);
                whitelistButton.innerText = 'Whitelist Site';
            } else {
                whitelist.push(hostname);
                whitelistButton.innerText = 'Remove from Whitelist';
            }
            GM_setValue('whitelist', whitelist);
            updateWhitelistDisplay();
            updateBlurBasedOnWhitelist();
        }
    });

})();
