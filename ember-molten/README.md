# Ember Molten

A dark, warm, molten theme for **Helium** (Chromium-based browser). The
chromatic opposite of Tokyo Punk: amber, orange and ember-red on a warm black,
with a customizable **Ember Node** start screen.

## What it themes

Same as Tokyo Punk: window frame, toolbar, tabs, omnibox, bookmark bar, new tab
page colors, plus a custom new tab page via `chrome_url_overrides.newtab`.

## Install

1. Open Helium and go to `chrome://extensions`.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this `ember-molten` folder.
4. Open a new tab to see the Ember Node start screen.

> If colors don't update after editing the theme, remove it and re-add it via
> Load unpacked, or fully quit and relaunch Helium.

## Use as your home page

Helium ignores `chrome_url_overrides.newtab` from extensions and uses its own
new tab page. To make Ember Node your home, point Helium at the local file via
the `--custom-ntp` flag:

```
file:///Users/albz/Projects/helium-themes/ember-molten/newtab.html
```

Set it in `chrome://flags` (search "custom-ntp") or launch with:

```
open -a Helium --args --custom-ntp="file:///Users/albz/Projects/helium-themes/ember-molten/newtab.html"
```

## Configure the start screen

Edit **`config.js`** to change the title, the "hi, albz :)" brand, the default
search engine, the quick links, the daily quote, the "I feel drunk" quotes and
jokes, the image opacity, and the ember background toggle. Reload the new tab
(Cmd+T) after editing. No code changes needed.

You can also click the gear (bottom-right) on the new tab page for the
interactive settings (background image, opacity, search engine, quick links).

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Theme colors + new tab override |
| `config.js` | All start-screen settings in one place |
| `newtab.html` | Ember Node start screen markup |
| `newtab.css` | Tokens (`--em-*`) and styling |
| `newtab.js` | Clock, network, session, image persistence |
| `favicon.svg` | Tab icon (amber chevron) |
| `icon128.png` | Theme icon |

## Known limitations (Chromium / Helium)

- **Incognito windows are not themed** (Helium limitation, not a theme issue).
- **Internal pages** (Settings, Extensions, Downloads) keep Chromium's default
  colors; Helium's own color-mixer patch governs those, not a theme extension.
- Browser chrome is not a web page, so a theme cannot inject arbitrary CSS.
  Control is limited to the theme color keys.
- Chrome's theme API requires **Manifest V2**; MV3 does not support the `theme`
  key.
