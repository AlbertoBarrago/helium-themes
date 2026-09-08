# hellium-themes

Custom themes for the **Helium** browser (Chromium-based).

## Themes

### Tokyo Punk

A dark, precise, terminal-inspired theme with a customizable Tokyo Node
start screen. Cold palette: cyan, purple, blue. See
[`tokyo-punk/README.md`](tokyo-punk/README.md).

### Ember Molten

A dark, warm, molten theme with a customizable Ember Node start screen. The
chromatic opposite of Tokyo Punk: amber, orange, ember-red on warm black. See
[`ember-molten/README.md`](ember-molten/README.md).

## How Helium theming works

Helium themes are **Chrome extension themes (Manifest V2)** installed via
`chrome://extensions` → Developer mode → **Load unpacked**. The `theme` key
maps Chromium's color tokens (frame, toolbar, tabs, omnibox, NTP, ...) to RGB
values. A theme can also override the new tab page with
`chrome_url_overrides.newtab`.

Helium additionally patches Chromium's `ui::ColorMixer` in its own source
(`helium-color-scheme.patch`) to redefine reference tokens; that layer is not
reachable from a theme extension.

## Use a start screen as your home page

Helium ignores `chrome_url_overrides.newtab` from extensions and uses its own
new tab page. To make a theme's start screen your home, point Helium at the
local file via the `--custom-ntp` flag (set in `chrome://flags`, search
"custom-ntp"):

```
file:///Users/albz/Projects/hellium-themes/tokyo-punk/newtab.html
file:///Users/albz/Projects/hellium-themes/ember-molten/newtab.html
```

Each theme's start screen is fully configurable from its `config.js` (title,
brand, search engine, quick links, daily quote, "I feel drunk" quotes and
jokes, background). Reload the new tab (Cmd+T) after editing.
