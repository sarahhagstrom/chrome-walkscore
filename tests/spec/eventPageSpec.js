var walkScore = "http://www.walkscore.com/score/";
var walkBadge = "http://pp.walk.sc/badge/walk/";
var bikeBadge = "http://pp.walk.sc/badge/bike/";
var transitBadge = "http://pp.walk.sc/badge/transit/";

describe("Slugify", function() {
	it("Basically works", function() {
        chromeWalkScore.slugify("123 A BC Def");
        expect(chromeWalkScore.address).toEqual("123 A BC Def");

        var slug = "123-a-bc-def";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
	});
    it("Works with spaces", function() {
        chromeWalkScore.slugify("   123   A  BC Def   ");
        expect(chromeWalkScore.address).toEqual("123   A  BC Def");

        var slug = "123-a-bc-def";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
    });
    it("Works with dashes", function() {
        chromeWalkScore.slugify("123----A  BC Def");
        expect(chromeWalkScore.address).toEqual("123----A  BC Def");

        var slug = "123-a-bc-def";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
    });
    it("Works with odd characters", function() {
        chromeWalkScore.slugify("123#$%^*()!@{}?:;.,<>'\"&/\\ A  BC Def");
        expect(chromeWalkScore.address).toEqual("123#$%^*()!@{}?:;.,<>'\"&/\\ A  BC Def");

        var slug = "123-a-bc-def";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
    });
    it("Truncates to 100 characters", function() {
        chromeWalkScore.slugify("Garbanzo seakale aubergine turnip welsh onion carrot water spinach brussels sprout swiss chard bitterleaf gram pea sprouts silver beet taro tatsoi asparagus napa cabbage daikon. Burdock sierra leone bologi salad summer purslane leek prairie turnip kohlrabi horseradish tatsoi radish. Silver beet shallot cress welsh onion bell pepper maize green bean lettuce yarrow chickweed gram aubergine lotus root gourd spring onion soko.");
        expect(chromeWalkScore.address).toEqual("Garbanzo seakale aubergine turnip welsh onion carrot water spinach brussels sprout swiss chard bitte");

        var slug = "garbanzo-seakale-aubergine-turnip-welsh-onion-carrot-water-spinach-brussels-sprout-swiss-chard-bitte";
        expect(chromeWalkScore.walkScoreURL).toEqual(walkScore + slug);
        expect(chromeWalkScore.walkBadgeURL).toEqual(walkBadge + slug + ".svg");
        expect(chromeWalkScore.bikeBadgeURL).toEqual(bikeBadge + slug + ".svg");
        expect(chromeWalkScore.transitBadgeURL).toEqual(transitBadge + slug + ".svg");
    });
});