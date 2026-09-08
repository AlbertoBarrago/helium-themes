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

	/* Quote con autore: usate dal bottone "I feel drunk" (massime celebri) */
	famousQuotes: [
		{ text: "fallisci il 100% delle volte quello che non provi", author: "Wayne Gretzky" },
		{ text: "il modo migliore per prevedere il futuro è inventarlo", author: "Alan Kay" },
		{ text: "la semplicità è la massima sofisticazione", author: "Leonardo da Vinci" },
		{ text: "il talento vince le partite, ma l'intelligenza e il lavoro di squadra vincono i campionati", author: "Michael Jordan" },
		{ text: "non è quanto sei bravo, ma quanto vuoi esserlo", author: "Michael Jordan" },
		{ text: "il successo è la somma di piccoli sforzi ripetuti ogni giorno", author: "Robert Collier" },
		{ text: "la disciplina è il ponte tra gli obiettivi e i risultati", author: "Jim Rohn" },
		{ text: "il coraggio non è l'assenza di paura, ma la capacità di andare avanti nonostante essa", author: "Nelson Mandela" },
		{ text: "chiunque smetta di imparare è vecchio, a venti o a ottant'anni", author: "Henry Ford" },
		{ text: "il futuro appartiene a chi crede nella bellezza dei propri sogni", author: "Eleanor Roosevelt" },
		{ text: "la più grande gloria non è non cadere mai, ma rialzarsi ogni volta che cadi", author: "Confucio" },
		{ text: "inizia dove sei, usa quello che hai, fai quello che puoi", author: "Arthur Ashe" },
		{ text: "il modo per iniziare è smettere di parlare e cominciare a fare", author: "Walt Disney" },
		{ text: "il dubbio uccide più sogni di quanti ne uccida il fallimento", author: "Suzy Kassem" },
		{ text: "la costanza è la virtù che trasforma i sogni in realtà", author: "William James" },
		{ text: "il lavoro duro batte il talento quando il talento non lavora duro", author: "Tim Notke" },
		{ text: "non puoi attraversare il mare semplicemente guardando l'acqua", author: "Rabindranath Tagore" },
		{ text: "il segreto per andare avanti è iniziare", author: "Mark Twain" },
		{ text: "ogni esperto è stato un principiante", author: "Helen Hayes" },
		{ text: "la motivazione ti fa partire, l'abitudine ti fa arrivare", author: "Jim Ryun" },
	],

	/* Barzellette: usate dal bottone "I feel drunk" */
	jokes: [
		"perché i programmatori confondono Halloween e Natale? perché OCT 31 = DEC 25",
		"ci sono 10 tipi di persone: quelle che capiscono il binario e quelle che non lo capiscono",
		"un programmatore cammina per strada e vede un cartello 'cani che mordono'. pensa: 'ah, un problema di puntatori'",
		"perché il programmatore è uscito dall'aria condizionata? perché era in un loop infinito",
		"come fa un programmatore a spegnere il computer? clicca su 'start'",
		"il mio codice funziona, non so perché. il mio codice non funziona, non so perché. la mia vita è un mistero",
		"perché gli sviluppatori odiano la natura? perché ha troppi bug",
		"un bug è solo una feature che non hai ancora documentato",
		"perché il programmatore è andato in terapia? perché aveva troppi problemi di attaccamento (attachment)",
		"quanti programmatori servono per cambiare una lampadina? nessuno, è un problema hardware",
		"perché il programmatore preferisce il buio? perché la luce attira i bug",
		"il mio capo mi ha detto di lavorare sodo. ora sudo mentre lavoro",
		"perché il programmatore non gioca a nascondino? perché i bravi giocatori sono bravi a nascondere i bug",
		"un programmatore entra in un bar e ordina 0 birre. il barista dice 'non ne ho'. il programmatore esce soddisfatto",
		"perché il programmatore è sempre stanco? perché passa la vita a fare debug",
		"la differenza tra un programmatore e un dio: dio non crede di essere un programmatore",
		"perché il programmatore non sa nuotare? perché è abituato a stare in acqua (waterfall)",
		"il mio codice è come il vino: migliora con l'età, ma nessuno lo capisce",
		"perché il programmatore ha smesso di usare il mouse? perché preferiva il puntatore",
		"un programmatore muore e va in paradiso. san pietro dice 'ecco, qui tutto è perfetto'. il programmatore risponde 'perfetto? ma non c'è un bug da fixare?'",
	],

	/* Opacità immagine di sfondo (0-100) */
	imageOpacity: 35,

	/* Mostra lo sfondo astratto Tokyo (gradient/grid/scanlines) */
	tokyoBg: true,
};
