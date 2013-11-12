With the Right-Click WalkScore Chrome extension, you can get the WalkScore of any address just by selecting it, right-clicking (or ctrl-clicking), and choosing the <b>Get WalkScore for this address</b> context menu item provided.

![Right-Click WalkScore Zillow screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/Zillowrightclick.png)

The default configuration is to pop up a small summary window with just the walk, transit, and bike score badges of an address:

![Right-Click WalkScore Zillow screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/Zillowresult.png)

If you click on the summary popup, it will expand and load the detailed page in a larger window:

![Right-Click WalkScore Zillow screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/Zillowresultexpand.png)

## Flexible input

Just like the input field in the WalkScore website itself, the input to the extension is somewhat flexible. It doesn't have to be a specific address.

You may, for example, get the WalkScore for a zip code, a city, or a neighborhood:

![Right-Click WalkScore Craigslist screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/CLrightclick.png)

The popup now shows the walk, transit, and bike scores of the entire Belltown neighborhood of Seattle:

![Right-Click WalkScore Craigslist screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/CLresult.png)

When you click on the popup, the expanded view is shown:

![Right-Click WalkScore Craigslist screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/CLresultexpand.png)

## Options

### Popups, Windows, and Tabs
From the options dialog, you can configure the extension to deliver the score in one of three ways:

![Right-Click WalkScore options screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/options.png)

As illustrated above, the first option opens a small popup window with just the walk, transit, and bike score badges of an address. When clicked, this window expands to show the detail view in a larger window. This option is the default.

You may also configure the extension to open the full WalkScore results page in a new tab or a new window, skipping the summary popup window altogether.

### Search City
<b>If you will be searching in multiple cities, do not set this option.</b>

<b>If you are searching in only one city, setting this option increases functionality.</b>
If, however, you will be searching in only one city, you can configure the extension to make sure all searches are qualified with that city's name.

This is helpful when searching for a room share on Craigslist, for example, as addresses are more often than not incomplete:

![Right-Click WalkScore options screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/CLPartialrightclick.png)

With 'Seattle' specified as the Search City in options, this partial lookup will succeed:

![Right-Click WalkScore options screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/CLPartialresult.png)

Expanding to give us the correct detail:

![Right-Click WalkScore options screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/CLPartialresultexpand.png)

Similarly, if you're researching neighborhoods, specifying the city will help in the case of ambiguous neighborhood names:

![Right-Click WalkScore options screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/CLNeighborhoodrightclick.png)

Because 'Seattle' is specified as the Search City, this neighborhood lookup will give us Beacon Hill in Seattle, rather than Beacon Hill in Boston:

![Right-Click WalkScore options screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/CLNeighborhoodresult.png)

Expanding to give us details about Beacon Hill, Seattle:

![Right-Click WalkScore options screenshot](https://raw.github.com/sarahhagstrom/chrome-walkscore/master/docs/CLNeighborhoodresultexpand.png)

<b>Do not qualify the city name unless you have good reason to do so.</b>
As the options dialog itself explains, usually you will want to enter the unqualified city name, so enter 'Seattle', rather than 'Seattle WA'.

This is because the extension will fill in any tokens that do not already exist in the selected text, so multiple tokens in this field increases the chances of unexpected results. For example if you select the text '123 1st Ave Seattle, Washington', the extension will append 'WA' to the end because whereas it found 'Seattle', it did not find 'WA' in the highlighted text. The result in this case will likely be unaffected, but there no doubt exist examples where the result will be affected. At any rate, WalkScore's search algorithm is sophisticated enough that the additional qualifications are usually unnecessary.

<b>Put quotes around city names which have spaces in them.</b>
Likewise, if your city's name has spaces in it, put quotes around it. So enter '"New York"' rather than 'New York'. Without quotes, unexpected things may happen. For example, if you configure the city name without quotes, if you select the text '123 York Ave', the extension will find 'York', but not 'New', so the resultant search will be for '123 York Ave New'. With quotes, the result is as expected: '123 York Ave New York'.

### The wacky background
The background of the options dialog is the WalkScore map overlay for the city of <a href="http://www.walkscore.com/MA/Boston" target="_blank">Boston, MA</a>.
