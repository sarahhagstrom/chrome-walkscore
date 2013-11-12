var chromeWalkScore = chromeWalkScore || {};

(function (obj) {
    "use strict";

    obj.logging = false;
    obj.address = "";
    obj.walkScoreURL = "";
    obj.walkBadgeURL = "";
    obj.bikeBadgeURL = "";
    obj.transitBadgeURL = "";

    obj.log = function (message) {
        if (obj.logging) {
            window.console.log(message);
        }
    };

    obj.slugify = function (value) {
        // Converts to lowercase, removes non-word characters (alphanumerics and
        // underscores) and converts spaces to hyphens. Also strips leading and
        // trailing whitespace.
        // Then assigns object properties used by popup.js
        var slug;

        value = value.trim().slice(0, 100);
        slug = value.toLowerCase().replace(/[^\w\s\-]/g, '');
        slug = slug.replace(/[\-\s]+/g, '-');

        obj.address = value;
        obj.walkScoreURL = "http://www.walkscore.com/score/" + slug;
        obj.walkBadgeURL = "http://pp.walk.sc/badge/walk/" + slug + ".svg";
        obj.bikeBadgeURL = "http://pp.walk.sc/badge/bike/" + slug + ".svg";
        obj.transitBadgeURL = "http://pp.walk.sc/badge/transit/" + slug + ".svg";
    };

    obj.tokenize = function (text) {
        // take what the user has entered and make some sense of it.

        // Get rid of everything that's not a word, a quote, or white space,
        text = text.replace(/[^\w\s\"]/g, '');
        // replace multiple spaces with single spaces
        text = text.trim().replace(/\s+/g, " ");
        // remove spaces around quotes
        text = text.replace(/\s*"\s*/g, '"');

        var params = [],
            start = 0,
            index = text.indexOf('"'),
            p;

        while (index !== -1 && index < text.length - 1) {
            // if there were params before the quoted parameter
            if (start !== index) {
                // split anything before the first quote up by spaces
                params.push.apply(params, text.substring(start, index).trim().split(/\s+/));
            }

            // look for next quote
            start = index + 1; // starting with the char after the first quote
            index = text.indexOf('"', start);
            if (index === -1) {
                // end quote was omitted, assign as end of the string
                index = text.length;
            }

            // add the quoted string
            params.push(text.substring(start, index));

            start = index + 1; // starting with the char after the end quote
            index = text.indexOf('"', start);
        }

        if (index === -1 && start < text.length) {
            // chop up rest of string by spaces
            params.push.apply(params, text.substring(start).split(/\s+/));
        }

        return params;
    };

    obj.appendSearchCity = function (selectionText) {
        // Add search city to the selectionText, if one has been configured
        var searchCity = localStorage.WalkScoreSearchCity || "",
            searchCityTokens = obj.tokenize(searchCity),
            lowerCaseSelectionText = selectionText.toLowerCase(),
            i;

        if (searchCity.length > 0) {
            for (i = 0; i < searchCityTokens.length; i++) {
                if (lowerCaseSelectionText.indexOf(searchCityTokens[i].toLowerCase()) === -1) {
                    selectionText += " " + searchCityTokens[i];
                }
            }
        }

        return selectionText;
    };

    obj.onClickHandler = function (info, tab) {
        if (info.menuItemId === "WalkScoreSelection") {

            obj.slugify(obj.appendSearchCity(info.selectionText));

            // Read in the user's preference for how the WalkScore should
            // be opened.
            var openIn = localStorage.WalkScoreOpenIn;

            if (openIn === "smallpopup") {
                // http://developer.chrome.com/extensions/windows.html#method-create
                chrome.windows.create({
                    "url": "popup.html",
                    "width": 360,
                    "height": 174,
                    "type": "popup"
                });
            } else if (openIn === "fullpopup") {
                // http://developer.chrome.com/extensions/windows.html#method-create
                chrome.windows.create({
                    "url": obj.walkScoreURL,
                    "type": "normal"
                });
            } else if (openIn === "fulltab") {
                // http://developer.chrome.com/extensions/tabs.html#method-create
                chrome.tabs.create({
                    "url": obj.walkScoreURL,
                    "active": false,
                    "openerTabId": tab.id,
                    "index": tab.index + 1
                });
            }
        }
    };

}(chromeWalkScore));

chrome.contextMenus.onClicked.addListener(chromeWalkScore.onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function () {
    "use strict";
    chrome.contextMenus.create({
        "title": "Get WalkScore for this address",
        "contexts": ["selection"],
        "id": "WalkScoreSelection"
    }, function () {
        if (chrome.extension.lastError) {
            window.console.log("An error occurred during WalkScore context menu creation: " + chrome.extension.lastError.message);
        }
    });
});