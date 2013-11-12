// http://developer.chrome.com/extensions/options.html
var chromeWSOptions = chromeWSOptions || {};

(function (obj) {
    "use strict";

    // Save options to local storage
    obj.saveOptions = function () {
        var radios = document.getElementsByName("openIn"),
            saveButton = document.getElementById("save"),
            searchCity = document.getElementById("searchCity"),
            restorePadding,
            restoreText,
            i;

        for (i = 0; i < radios.length; i++) {
            if (radios[i].checked === true) {
                localStorage.WalkScoreOpenIn = radios[i].value;
            }
        }

        if (searchCity) {
            localStorage.WalkScoreSearchCity = searchCity.value;
        }

        // Change button text briefly to let user know the selection was saved.
        restorePadding = saveButton.style.paddingRight;
        restoreText = saveButton.innerText;
        saveButton.style.paddingRight = "10px";
        saveButton.style.paddingLeft = "10px";
        saveButton.innerText = "Selection Saved";

        setTimeout(function () {
            saveButton.innerText = restoreText;
            saveButton.style.paddingRight = restorePadding;
            saveButton.style.paddingLeft = restorePadding;
        }, 2200);
    };

    // Restores radio button state to saved value from local storage.
    obj.restoreOptions = function () {
        var openIn = localStorage.WalkScoreOpenIn,
            radios = document.getElementsByName("openIn"),
            searchCity = localStorage.WalkScoreSearchCity || "",
            searchCityInput = document.getElementById("searchCity"),
            i;

        // first radio button is the default
        radios[0].checked = true;

        for (i = 0; i < radios.length; i++) {
            if (radios[i].value === openIn) {
                radios[i].checked = true;
                break;
            }
        }

        searchCityInput.value = searchCity;
    };
}(chromeWSOptions));

document.addEventListener('DOMContentLoaded', chromeWSOptions.restoreOptions());
document.addEventListener('keydown', function(event) {
    if (event && event.keyCode === 13) {
        // Hitting enter is the same as clicking on the
        // add button
        chromeWSOptions.saveOptions();
    }
});
document.querySelector('#save').addEventListener('click', chromeWSOptions.saveOptions);