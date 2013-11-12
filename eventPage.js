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

    obj.onClickHandler = function (info, tab) {
        if (info.menuItemId === "WalkScoreSelection") {
            obj.slugify(info.selectionText);

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