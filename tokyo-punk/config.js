/* ============================================================
   Tokyo Punk // Configurazione
   Modifica qui i parametri della start screen, senza toccare
   il codice. Ricarica la nuova tab (Cmd+T) dopo ogni modifica.
   ============================================================ */

window.TOKYO_CONFIG = {
	/* Titolo mostrato nella barra delle tab */
	title: "blank",

	/* Icona della tab (favicon). Può essere un file locale (es. "favicon.svg")
	   o una URL remota (es. "https://example.com/icon.png") */
	favicon: "favicon.svg",

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

	/* Quote del giorno: una random al giorno, stabile per tutta la giornata.
	   Metti false per disattivarle. */
	showQuote: true,
	quotes: [
		"fallisci il 100% delle volte quello che non provi",
		"il codice funziona, non so perché. il codice non funziona, non so perché",
		"prima ottimizza la leggibilità, poi la velocità",
		"un bug oggi è una feature domani",
		"il refactoring è come pulire la casa: lo rimandi finché non ci inciampi",
		"se funziona, non toccarlo. se non funziona, non toccarlo nemmeno",
		"la documentazione è per chi viene dopo di te, cioè te tra 6 mesi",
		"il debug è due volte più difficile dello scrivere codice, quindi se scrivi codice al massimo della furbizia, per definizione non sei abbastanza furbo per debuggarlo",
		"non è che non ci riesco, è che non ho ancora finito di provarci",
		"il modo migliore per prevedere il futuro è inventarlo",
		"la disciplina batte il talento quando il talento non si allena",
		"ogni grande viaggio inizia con un singolo passo",
		"non contare i giorni, fai contare i giorni",
		"il successo è la somma di piccoli sforzi ripetuti ogni giorno",
		"fai oggi quello che gli altri non fanno, per vivere domani quello che gli altri non possono",
		"il momento migliore per piantare un albero era 20 anni fa. il secondo migliore è adesso",
		"non aspettare il momento perfetto, prendi il momento e rendilo perfetto",
		"chi si ferma è perduto, chi cammina arriva",
		"la motivazione ti fa partire, l'abitudine ti fa arrivare",
		"se puoi sognarlo, puoi farlo",
		"il fallimento non è cadere, ma restare a terra",
		"le difficoltà non sono per fermarti, ma per farti capire quanto ci tieni",
		"un giorno o giorno uno. decidi tu",
		"il talento vince le partite, ma il lavoro di squadra e l'intelligenza vincono i campionati",
		"non smettere quando sei stanco, smetti quando hai finito",
		"il segreto per andare avanti è iniziare",
		"la perfezione non è raggiungibile, ma se inseguiamo la perfezione possiamo catturare l'eccellenza",
		"ogni esperto è stato un principiante",
		"il coraggio non è l'assenza di paura, ma la capacità di andare avanti nonostante essa",
		"fai del tuo meglio finché non sai fare di meglio",
		"il futuro appartiene a chi crede nella bellezza dei propri sogni",
		"non puoi attraversare il mare semplicemente guardando l'acqua",
		"la più grande gloria non è non cadere mai, ma rialzarsi ogni volta che cadi",
		"inizia dove sei, usa quello che hai, fai quello che puoi",
		"il successo non è definitivo, il fallimento non è fatale: è il coraggio di continuare che conta",
		"chiunque smetta di imparare è vecchio, a venti o a ottant'anni",
		"il modo per iniziare è smettere di parlare e cominciare a fare",
		"non è quanto sei bravo, ma quanto vuoi esserlo",
		"le montagne si scalano un passo alla volta",
		"il dubbio uccide più sogni di quanti ne uccida il fallimento",
		"fai ciò che puoi, con quello che hai, dove sei",
		"il coraggio di iniziare è la prima vittoria",
		"la costanza è la virtù che trasforma i sogni in realtà",
		"non guardare l'orologio, fai quello che fa lui: continua ad andare",
		"il miglior momento per agire era ieri, il secondo migliore è adesso",
		"chi osa vince, chi non osa guarda gli altri vincere",
		"la tua unica competizione sei tu di ieri",
		"ogni giorno è una nuova occasione per cambiare la tua vita",
		"il lavoro duro batte il talento quando il talento non lavora duro",
		"non puoi tornare indietro e cambiare l'inizio, ma puoi iniziare da dove sei e cambiare il finale",
	],

	/* Opacità immagine di sfondo (0-100) */
	imageOpacity: 35,

	/* Mostra lo sfondo astratto Tokyo (gradient/grid/scanlines) */
	tokyoBg: true,
};
