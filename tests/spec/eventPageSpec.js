var walkScore = "http://www.walkscore.com/score/";
var walkBadge = "http://pp.walk.sc/badge/walk/";
var bikeBadge = "http://pp.walk.sc/badge/bike/";
var transitBadge = "http://pp.walk.sc/badge/transit/";

describe("Slugify", function () {
	it("Basically works", function () {
        chromeWalkScore.slugify("123 A BC Def");
        expect(chromeWalkScore.address).toEqual("123 A BC Def");

        var slug = "123-a-bc-def";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
	});
    it("Works with spaces", function () {
        chromeWalkScore.slugify("   123   A  BC Def   ");
        expect(chromeWalkScore.address).toEqual("123   A  BC Def");

        var slug = "123-a-bc-def";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
    });
    it("Works with dashes", function () {
        chromeWalkScore.slugify("123----A  BC Def");
        expect(chromeWalkScore.address).toEqual("123----A  BC Def");

        var slug = "123-a-bc-def";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
    });
    it("Works with odd characters", function () {
        chromeWalkScore.slugify("123#$%^*()!@{}?:;.,<>'\"&/\\ A  BC Def");
        expect(chromeWalkScore.address).toEqual("123#$%^*()!@{}?:;.,<>'\"&/\\ A  BC Def");

        var slug = "123-a-bc-def";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
    });
    it("Truncates to 100 characters", function () {
        chromeWalkScore.slugify("Garbanzo seakale aubergine turnip welsh onion carrot water spinach brussels sprout swiss chard bitterleaf gram pea sprouts silver beet taro tatsoi asparagus napa cabbage daikon. Burdock sierra leone bologi salad summer purslane leek prairie turnip kohlrabi horseradish tatsoi radish. Silver beet shallot cress welsh onion bell pepper maize green bean lettuce yarrow chickweed gram aubergine lotus root gourd spring onion soko.");
        expect(chromeWalkScore.address).toEqual("Garbanzo seakale aubergine turnip welsh onion carrot water spinach brussels sprout swiss chard bitte");

        var slug = "garbanzo-seakale-aubergine-turnip-welsh-onion-carrot-water-spinach-brussels-sprout-swiss-chard-bitte";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
    });
});

describe("Append Search City", function () {
    it("Basically works", function() {
        localStorage.WalkScoreSearchCity = "";
        var value = chromeWalkScore.appendSearchCity("abc 123");
        expect(value).toEqual("abc 123");
        delete localStorage.WalkScoreSearchCity;
        value = chromeWalkScore.appendSearchCity("abc 123");
        expect(value).toEqual("abc 123");
        localStorage.WalkScoreSearchCity = "Seattle";
        value = chromeWalkScore.appendSearchCity("abc 123");
        expect(value).toEqual("abc 123 Seattle");
    });
    it("Doesn't append if city name is already in the search string", function () {
        localStorage.WalkScoreSearchCity = "Seattle";
        var value = chromeWalkScore.appendSearchCity("abc 123 Seattle");
        expect(value).toEqual("abc 123 Seattle");
        value = chromeWalkScore.appendSearchCity("Seattle abc 123");
        expect(value).toEqual("Seattle abc 123");
        value = chromeWalkScore.appendSearchCity("abc Seattle 123");
        expect(value).toEqual("abc Seattle 123");
    });
    it("Works even if case doesn't match", function () {
        localStorage.WalkScoreSearchCity = "Seattle";
        var value = chromeWalkScore.appendSearchCity("abc 123 seATTle");
        expect(value).toEqual("abc 123 seATTle");
    });
    it("Works with multiple-token search cities", function () {
        localStorage.WalkScoreSearchCity = "Melbourne Victoria Australia";
        var value = chromeWalkScore.appendSearchCity("abc 123");
        expect(value).toEqual("abc 123 Melbourne Victoria Australia");
        value = chromeWalkScore.appendSearchCity("abc 123 Melbourne");
        expect(value).toEqual("abc 123 Melbourne Victoria Australia");
        value = chromeWalkScore.appendSearchCity("abc 123 Melbourne Victoria");
        expect(value).toEqual("abc 123 Melbourne Victoria Australia");
        value = chromeWalkScore.appendSearchCity("abc 123 Melbourne Victoria Australia");
        expect(value).toEqual("abc 123 Melbourne Victoria Australia");
        value = chromeWalkScore.appendSearchCity("melbourne 123 abc");
        expect(value).toEqual("melbourne 123 abc Victoria Australia")
    });
    it("Ignores non-word characters", function () {
        localStorage.WalkScoreSearchCity = "Melbourne, Victoria$%, Australia #%*//";
        var value = chromeWalkScore.appendSearchCity("abc 123");
        expect(value).toEqual("abc 123 Melbourne Victoria Australia");
        value = chromeWalkScore.appendSearchCity("abc 123 Melbourne");
        expect(value).toEqual("abc 123 Melbourne Victoria Australia");
        value = chromeWalkScore.appendSearchCity("abc 123 Melbourne Victoria");
        expect(value).toEqual("abc 123 Melbourne Victoria Australia");
        value = chromeWalkScore.appendSearchCity("abc 123 Melbourne Victoria Australia");
        expect(value).toEqual("abc 123 Melbourne Victoria Australia");
        value = chromeWalkScore.appendSearchCity("melbourne 123 abc");
        expect(value).toEqual("melbourne 123 abc Victoria Australia")
    });
    it("Treats all tokens between quotes as a single token", function() {
        localStorage.WalkScoreSearchCity = '"New York"';
        var value = chromeWalkScore.appendSearchCity("abc 123");
        expect(value).toEqual("abc 123 New York");
        value = chromeWalkScore.appendSearchCity("abc New 123");
        expect(value).toEqual("abc New 123 New York");
        value = chromeWalkScore.appendSearchCity("abc York 123");
        expect(value).toEqual("abc York 123 New York");
        value = chromeWalkScore.appendSearchCity("abc New York 123");
        expect(value).toEqual("abc New York 123");

        localStorage.WalkScoreSearchCity = '"New London", Wisconsin';
        value = chromeWalkScore.appendSearchCity("abc 123");
        expect(value).toEqual("abc 123 New London Wisconsin");
        value = chromeWalkScore.appendSearchCity("abc Wisconsin 123");
        expect(value).toEqual("abc Wisconsin 123 New London");
        value = chromeWalkScore.appendSearchCity("abc London 123");
        expect(value).toEqual("abc London 123 New London Wisconsin");
        value = chromeWalkScore.appendSearchCity("abc 123 New");
        expect(value).toEqual("abc 123 New New London Wisconsin");
        value = chromeWalkScore.appendSearchCity("abc 123 New London");
        expect(value).toEqual("abc 123 New London Wisconsin");

        localStorage.WalkScoreSearchCity = '"New London", "New South Wales", Australia';
        value = chromeWalkScore.appendSearchCity("abc 123");
        expect(value).toEqual("abc 123 New London New South Wales Australia");
        value = chromeWalkScore.appendSearchCity("abc 123 London Road Wales Circuit");
        expect(value).toEqual("abc 123 London Road Wales Circuit New London New South Wales Australia");
        value = chromeWalkScore.appendSearchCity("abc 123 Wales Road New London");
        expect(value).toEqual("abc 123 Wales Road New London New South Wales Australia");
        value = chromeWalkScore.appendSearchCity("abc 123 Wales Road New London 123");
        expect(value).toEqual("abc 123 Wales Road New London 123 New South Wales Australia");
    });
});