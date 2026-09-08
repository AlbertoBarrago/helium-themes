/* ============================================================
   Tokyo Punk // Configurazione
   Modifica qui i parametri della start screen, senza toccare
   il codice. Ricarica la nuova tab (Cmd+T) dopo ogni modifica.
   ============================================================ */

window.TOKYO_CONFIG = {
  /* Titolo mostrato nella barra delle tab */
  title: "Lorem Ipsum",

  /* Brand in alto: tre parti (colori: he=cyan, ium=testo, sep=grigio) */
  brand: {
    he: "hi, ",
    ium: "albz",
    sep: ":)",
  },

  /* Motore di ricerca di default.
     Formato: URL + "?q=" (o equivalente) */
  searchEngine: "https://www.google.com/search?q=",

  /* Quick links mostrati sotto la barra di ricerca */
  quickLinks: [
    { name: "GitHub", url: "https://github.com" },
    { name: "YouTube", url: "https://youtube.com" },
    { name: "Reddit", url: "https://reddit.com" },
    { name: "Hacker News", url: "https://news.ycombinator.com" },
    { name: "X", url: "https://x.com" },
  ],

  /* Opacità immagine di sfondo (0-100) */
  imageOpacity: 35,

  /* Mostra lo sfondo astratto Tokyo (gradient/grid/scanlines) */
  tokyoBg: true,
};
