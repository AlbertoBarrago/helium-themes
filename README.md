# hellium-themes

Custom themes for the **Helium** browser (Chromium-based).

## Tokyo Punk

A dark, precise, terminal-inspired theme with a customizable Tokyo Node
start screen. See [`tokyo-punk/README.md`](tokyo-punk/README.md).

```
tokyo-punk/
  manifest.json   theme colors + new tab override
  newtab.html     Tokyo Node start screen
  newtab.css      --tp-* design tokens
  newtab.js       clock / network / session / image persistence
  icon128.png     theme icon
```

## How Helium theming works

Helium themes are **Chrome extension themes (Manifest V2)** installed via
`chrome://extensions` → Developer mode → **Load unpacked**. The `theme` key
maps Chromium's color tokens (frame, toolbar, tabs, omnibox, NTP, ...) to RGB
values. A theme can also override the new tab page with
`chrome_url_overrides.newtab`.

Helium additionally patches Chromium's `ui::ColorMixer` in its own source
(`helium-color-scheme.patch`) to redefine reference tokens; that layer is not
reachable from a theme extension.
