// http://developer.chrome.com/extensions/options.html
var chromeWSOptions = chromeWSOptions || {};

(function (obj) {
    "use strict";

    // Save options to local storage
    obj.saveOptions = function () {
        var radios = document.getElementsByName("openIn"),
            saveButton = document.getElementById("save"),
            restorePadding,
            restoreText,
            i;

        for (i = 0; i < radios.length; i++) {
            if (radios[i].checked === true) {
                localStorage.WalkScoreOpenIn = radios[i].value;
            }
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
            i;

        // select default
        radios[0].checked = true;

        // If nothing's been saved yet, just go with the default and break out
        if (!openIn) {
            return;
        }

        for (i = 0; i < radios.length; i++) {
            if (radios[i].value === openIn) {
                radios[i].checked = true;
                break;
            }
        }
    };
}(chromeWSOptions));

document.addEventListener('DOMContentLoaded', chromeWSOptions.restoreOptions());
document.querySelector('#save').addEventListener('click', chromeWSOptions.saveOptions);