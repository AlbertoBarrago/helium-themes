# Tokyo Punk

A dark, precise, terminal-inspired theme for **Helium** (Chromium-based browser).

Blue-black surfaces, understated neon cyan/purple accents, and a customizable
**Tokyo Node** start screen. Built for a developer workstation at 02:37 AM in
2042: dark, quiet, technical, slightly dangerous, still extremely usable.

## What it themes

The theme is a **Chrome extension theme (Manifest V2)**. It controls the
browser chrome through Chromium's standard `theme` color keys:

- Window frame (active / inactive / incognito)
- Toolbar and toolbar buttons (idle / hover / pressed / focus)
- Tabs: active, inactive, hover, selected, loading spinner, alert (audio)
- Omnibox / address bar and its results dropdown
- Bookmark bar
- New tab page colors
- Status bubble, info bar, generic buttons

It also overrides the **new tab page** with the Tokyo Node start screen via
`chrome_url_overrides.newtab`.

## Install

1. Open Helium and go to `chrome://extensions`.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this `tokyo-punk` folder.
4. Open a new tab to see the Tokyo Node start screen.

> If colors don't update after editing the theme, remove it and re-add it via
> Load unpacked, or fully quit and relaunch Helium.

## Customize the start screen

Click the gear (bottom-right) on the new tab page:

- **Background image**: upload a local image, or paste an image URL. Stored
  locally via `chrome.storage.local` (no network, no remote dependency).
- **Image opacity**: dim the image so the UI stays readable.
- **Tokyo abstract background**: toggle the CSS-generated gradient/grid/scanlines.
- **Search engine**: pick DuckDuckGo, Google, Bing, or Brave.
- **Quick links**: add and remove shortcuts shown under the search bar. Each
  link opens in a new tab. Stored locally, no remote dependency.

The start screen shows only real data: local clock, online/offline network
state, and the session start time. No fake metrics.

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Theme colors + new tab override |
| `config.js` | **All start-screen settings in one place** (title, brand, search engine, quick links, opacity, background) |
| `newtab.html` | Tokyo Node start screen markup |
| `newtab.css` | Tokens (`--tp-*`) and styling |
| `newtab.js` | Clock, network, session, image persistence |
| `icon128.png` | Theme icon |

## Configure the start screen

Edit **`config.js`** to change the title, the "hi, albz :)" brand, the default
search engine, the quick links, the image opacity, and the abstract background
toggle. Reload the new tab (Cmd+T) after editing. No code changes needed.

You can also click the gear (bottom-right) on the new tab page for the
interactive settings (background image, opacity, search engine, quick links).

## Known limitations (Chromium / Helium)

- **Incognito windows are not themed** (Helium limitation, not a theme issue).
- **Internal pages** (Settings, Extensions, Downloads) keep Chromium's default
  colors; Helium's own color-mixer patch governs those, not a theme extension.
- Browser chrome is not a web page, so a theme cannot inject arbitrary CSS
  (no `userChrome.css` like Firefox). Control is limited to the theme color
  keys above.
- Chrome's theme API requires **Manifest V2**; MV3 does not support the
  `theme` key.
