# LimitlessOrganizersHighlights

User script for highlighting tournaments on [Limitless](https://play.limitlesstcg.com/) for specific organizers.

# Prerequisites

Install [Tampermonkey](https://www.tampermonkey.net/) extension for your browser.
- [Chrome version](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Firefox version](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

# Usage

In Tampermonkey extension, follow there steps:
- Click on "Create a new script...".
- Click on utilities tab
- In "Import from URL" (bottom of the page), insert "https://raw.githubusercontent.com/MatuxGG/LimitlessOrganizersHighlights/refs/heads/main/LimitlessOrganizersHightslights.js" and click "Install".
- Then you can preview the user script. You can configurate organizers as you wish. You can add as many lines as you want, with the organizer name on left and the color (lightgreen, lightblue, #ffffff, etc...) of the found lines.
```
organizers: {
    'PTCGP FRANCE': 'lightgreen',
    // Add lines here
},
```
- Last, click on "Reinstall" to finish the setup :)

# (Optionnal) Set up auto updates

You can enable auto updates for this script by following these steps:
- Click on "Edit" for this script.
- Click on "Settings" tab.
- In "Updates" section, enter "https://raw.githubusercontent.com/MatuxGG/LimitlessOrganizersHighlights/refs/heads/main/LimitlessOrganizersHightslights.js".
- Last, click on "Save" to finish the setup :)
