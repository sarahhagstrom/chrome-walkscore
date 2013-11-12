var chromeWSPopup = chromeWSPopup || {};

(function (obj) {
    "use strict";

    obj.displaySelectedText = function () {
        var selectedText = window.getSelection().toString(),
            selectedTextElement = document.getElementById("selectedText");

        if (selectedText && selectedTextElement) {
            selectedTextElement.innerHTML = selectedText;
        }
    };

    obj.displayImage = function () {
        chrome.runtime.getBackgroundPage(function (backgroundPage) {
            var outerDiv = document.getElementById("outerDiv"),
                link = document.getElementById("walkScoreLink"),
                walkImg = document.getElementById("walkScoreBadge"),
                transitImg = document.getElementById("transitScoreBadge"),
                bikeImg = document.getElementById("bikeScoreBadge"),
                addressHeader = document.getElementById("addressHeader"),
                errorMessage = document.getElementById("errorMessage"),
                spinner = document.getElementById("spinner");

            // Attempt to load badges from URLs assembled from selected text
            walkImg.src = backgroundPage.chromeWalkScore.walkBadgeURL;
            transitImg.src = backgroundPage.chromeWalkScore.transitBadgeURL;
            bikeImg.src = backgroundPage.chromeWalkScore.bikeBadgeURL;
            addressHeader.innerText = backgroundPage.chromeWalkScore.address;

            outerDiv.style.display = "block";

            // Wait to enable the link until we're sure the WalkScore will load
            link.onclick = function () { return false; };
            link.style.cursor = 'default';

            // If the selected address generates an error, each badge should
            // be transparent, the error message should be displayed, and the
            // display should not respond to a click event
            walkImg.addEventListener('error', function () {
                walkImg.onerror = null;
                walkImg.src = 'img/pixel.png';
                errorMessage.style.display = 'block';
                outerDiv.style.marginTop = 0;
            });

            walkImg.addEventListener('load', function () {
                if (walkImg.src.indexOf('pixel.png') === -1) {
                    // When WalkScore image is successfully loaded,
                    // enable the WalkScore link
                    link.href = backgroundPage.chromeWalkScore.walkScoreURL;
                    link.style.cursor = 'pointer';
                    link.onclick = null;

                    // When the WalkScore page link is clicked, resize the window and
                    // load the full WalkScore page.
                    link.addEventListener('click', function () {
                        window.resizeTo(800, 800);
                        // While the page is loading, display the spinner
                        spinner.style.display = 'block';
                    });
                }
            });

            // If the BikeScore doesn't load, make the badge transparent
            bikeImg.addEventListener('error', function () {
                bikeImg.onerror = null;
                bikeImg.src = 'img/pixel.png';
            });

            // If the TransitScore doesn't load, make the badge transparent.
            transitImg.addEventListener('error', function () {
                transitImg.onerror = null;
                transitImg.src = 'img/pixel.png';
            });
        });

    };

}(chromeWSPopup));

// Run the population script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    chromeWSPopup.displayImage();
});