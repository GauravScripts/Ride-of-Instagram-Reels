// ==UserScript==
// @name         Enhanced Instagram Reels Redirect
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Redirect Instagram Reels pages to various URLs
// @author       Gaurav Gupta
// @match        *://*.instagram.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // List of languages for GitHub trending
    const languages = ["javascript", "typescript", "java", "scss", "css", "html", "powershell", "python"];
    const timeFrames = ["daily", "weekly", "monthly"];
    const HACKERONE_URL = "https://hackerone.com/hacktivity";
    const COUNTER_KEY = "redirectCounter";

    // Initialize or retrieve the counter from localStorage
    let redirectCounter = parseInt(localStorage.getItem(COUNTER_KEY), 10) || 0;

    // Function to determine the redirection URL
    const getRedirectURL = () => {
        redirectCounter++;
        localStorage.setItem(COUNTER_KEY, redirectCounter);

        // Redirect to HackerOne every 3rd time
        if (redirectCounter % 3 === 0) {
            return HACKERONE_URL;
        }

        // Randomize the language and timeframe
        const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
        const randomTimeFrame = timeFrames[Math.floor(Math.random() * timeFrames.length)];
        return `https://github.com/trending/${randomLanguage}?since=${randomTimeFrame}`;
    };

    // Function to check the URL and redirect if needed
    const checkAndRedirect = () => {
        if (window.location.href.includes("reels")) {
            window.location.href = getRedirectURL();
        }
    };

    // Run the check initially
    checkAndRedirect();

    // Monitor URL changes using MutationObserver
    const observer = new MutationObserver(() => {
        checkAndRedirect();
    });

    // Observe changes in the document's body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("Enhanced Instagram Reels Redirect script with persistent counter is running.");
})();
