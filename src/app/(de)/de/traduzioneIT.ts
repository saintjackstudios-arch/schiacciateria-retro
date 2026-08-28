/**
 * La traduzione italiana ESATTA di ogni riga della pagina tedesca.
 *
 * 🔒 SOLO IN LOCALE. Online questo file non viene nemmeno caricato: chi lo usa
 * lo monta dietro a `process.env.NODE_ENV !== 'production'`.
 *
 * Serve a Marco per rileggere in italiano quello che pubblichiamo in tedesco a
 * nome del cliente. Sull'inglese era un lusso, perche' l'inglese lo legge; sul
 * tedesco e' l'unico controllo che esiste — nessuno di noi lo parla.
 *
 * NON e' l'italiano "bello": e' la traduzione letterale, anche dove suona
 * male. Se una frase suona storta in italiano, o e' scritta storta in tedesco
 * o dice una cosa che nessuno ha mai detto. E' esattamente quello che questo
 * strumento serve a far vedere.
 *
 * La chiave e' il testo tedesco COME SI LEGGE A SCHERMO (innerText, spazi
 * normalizzati). Dove il CSS scrive in maiuscolo, la chiave e' in maiuscolo, e
 * la ß diventa SS. Se cambi una frase in tedesco e non la cambi qui, il
 * riquadro italiano sparisce da solo: e' il segnale che c'e' da tradurre.
 *
 * Convenzioni: '⚠️' in testa = da guardare con attenzione, non e' un errore.
 */

export const TRADUZIONE: Record<string, string> = {
  // ── APERTURA ───────────────────────────────────────────────────────────────
  'VIALE XX SETTEMBRE 16 · TRIEST': 'Viale XX Settembre 16 · Trieste',
  'WO MAN ISST IN TRIEST': 'Dove si mangia a Trieste',
  'Schiacciata, kleine Teller und kaltes Bier. 15 Minuten zu Fuß vom Bahnhof, 24 vom Kreuzfahrtterminal.':
    'Schiacciata, piatti piccoli e birra fredda. 15 minuti a piedi dalla stazione, 24 dal terminal delle crociere.',
  'TISCH RESERVIEREN': 'Prenota un tavolo',
  'ROUTE PLANEN': 'Calcola il percorso',
  'Im Essen sind wir gut. Im Bier sind wir sehr gut. Im Deutschen sind wir nicht gut — diese Seite haben Leute geschrieben, die vom Kochen leben. Wenn ein Wort falsch aussieht, ist es das wahrscheinlich auch. Satt machen können wir dich viel besser, als wir dir schreiben können.':
    'Nel cibo siamo bravi. Nella birra siamo molto bravi. In tedesco non siamo bravi — questa pagina l’hanno scritta persone che vivono di cucina. Se una parola sembra sbagliata, probabilmente lo è. A riempirti la pancia siamo molto più bravi che a scriverti.',

  // ── SCHIACCIATA ────────────────────────────────────────────────────────────
  'WAS IST EINE SCHIACCIATA?': 'Che cos’è una schiacciata?',
  'SIEHT AUS WIE EIN SANDWICH. IST KEINS.': 'Sembra un sandwich. Non lo è.',
  'Eine Schiacciata wird aus Focaccia-Teig gemacht, nicht aus Brotteig. Sie kommt hoch aus dem Ofen, innen weich, außen knusprig. Wir schneiden sie vor deinen Augen längs auf und füllen sie auf der Stelle.':
    'Una schiacciata è fatta con impasto da focaccia, non con impasto da pane. Esce alta dal forno, morbida dentro e croccante fuori. La tagliamo per lungo davanti ai tuoi occhi e la farciamo sul momento.',
  'Hinein kommen italienische Produkte und, wo es geht, Produkte von hier: Mortadella, Stracciatella, Prosciutto crudo, Porchetta, Trüffelcreme, gegrilltes Gemüse, frischer Meerrettich.':
    'Dentro ci vanno prodotti italiani e, dove si può, prodotti di qui: mortadella, stracciatella, prosciutto crudo, porchetta, crema al tartufo, verdure grigliate, kren fresco.',
  'Gegessen wird mit den Händen, im Stehen oder im Sitzen. Es ist keine Pizza und kein Panino — ein Panino ist Brot. Das hier ist Focaccia, und das ändert alles am Geschmack.':
    'Si mangia con le mani, in piedi o seduti. Non è pizza e non è un panino — il panino è pane. Questa è focaccia, e questo cambia tutto nel sapore.',
  'SO WIRD BESTELLT': 'Come si ordina',
  'Bestellt und bezahlt wird an der Theke, dann nimmst du es mit oder setzt dich hin. Wenn du dich hinsetzt, kümmert sich jemand um dich — wir sind mehr als einer im Service.':
    'Si ordina e si paga al banco, poi lo porti via o ti siedi. Se ti siedi, qualcuno si occupa di te — siamo più di uno a servire.',

  // ── BUFFET ─────────────────────────────────────────────────────────────────
  'WAS IST EIN TRIESTINER BUFFET?': 'Che cos’è un buffet triestino?',
  'ACHTUNG — FALSCHER FREUND': 'Attenzione — falso amico',
  'Überall sonst auf der Welt ist ein "Buffet" ein langer Tisch voller Speisen, von dem man sich selbst nimmt. In Triest bedeutet das Wort etwas völlig anderes.':
    'In tutto il resto del mondo un «buffet» è un tavolo lungo pieno di piatti da cui ci si serve da soli. A Trieste la parola vuol dire una cosa completamente diversa.',
  'Ein Triestiner Buffet ist eine Reihe sehr kleiner Teller. Tartine — kleine belegte Brötchen in Dutzenden Varianten. Gemüse, auf ein Dutzend Arten frittiert. Fleischbällchen: mit Kren, scharfe, frittierte, welche mit Mozzarella, alles Mögliche.':
    'Un buffet triestino è una serie di piatti molto piccoli. Tartine — piccoli panini aperti in decine di varianti. Verdure, fritte in una dozzina di modi. Polpette: col kren, piccanti, fritte, quelle con la mozzarella, di tutto.',
  'Jedes Stück kostet wenig. Statt sich für ein Gericht zu entscheiden, probiert man viele. Für den Preis eines Tellers Pasta woanders hast du ein Dutzend verschiedene Dinge probiert und bist satt.':
    'Ogni pezzo costa poco. Invece di scegliere un piatto solo, se ne provano tanti. Per il prezzo di un piatto di pasta altrove hai assaggiato una dozzina di cose diverse e sei sazio.',
  'AM BESTEN IN GESELLSCHAFT': 'Funziona meglio in compagnia',
  'Bestellt viele verschiedene Stücke, bestellt etwas zu trinken, und während ihr redet, esst ihr alle von einem großen Tablett in der Mitte des Tisches.':
    'Ordinate tanti pezzi diversi, ordinate qualcosa da bere, e mentre chiacchierate mangiate tutti da un vassoio grande in mezzo al tavolo.',
  'Das ist Fingerfood — kein Besteck. Wer lieber nicht mit den Händen isst, fragt an der Theke nach den langen Zahnstochern und spießt damit auf.':
    'È cibo da mangiare con le mani — niente posate. Chi preferisce non usare le mani chiede al banco gli stuzzicadenti lunghi e infilza con quelli.',
  'Wir sind eine Schiacciateria, kein Buffet. Aber die Gewohnheit ist dieselbe, und wir haben unsere eigene Art davon: Sie heißt Giro Ignorante und steht weiter unten auf dieser Seite.':
    'Siamo una schiacciateria, non un buffet. Ma l’abitudine è la stessa, e ne abbiamo una versione nostra: si chiama Giro Ignorante ed è più in basso in questa pagina.',

  // ── COSA ORDINARE ──────────────────────────────────────────────────────────
  'WAS DU BESTELLEN SOLLTEST': 'Cosa dovresti ordinare',
  'Die Namen bleiben mit Absicht auf Italienisch — sag sie an der Theke genau so, wie sie hier stehen, dann bekommst du das Richtige.':
    'I nomi restano in italiano di proposito — dilli al banco esattamente come sono scritti qui e ti arriva la cosa giusta.',
  'SCHIACCIATE': 'Schiacciate',
  'IL GIRO IGNORANTE': 'Il Giro Ignorante',

  'Mortadella, Stracciatella-Käse und gehackte Pistazien':
    'Mortadella, formaggio stracciatella e pistacchio tritato',
  'DIE, WEGEN DER DIE LEUTE WIEDERKOMMEN.': 'Quella per cui la gente torna.',
  'Kochschinken, panierte gebratene Aubergine, Senf und frischer Kren':
    'Prosciutto cotto, melanzana impanata e fritta, senape e kren fresco',
  'DAS TRIESTINISCHSTE AUF DER KARTE. KREN IST MEERRETTICH — SIEHE GLOSSAR.':
    'La cosa più triestina del menu. Il kren è rafano — vedi il glossario.',
  'Porchetta, Cacio-e-pepe-Creme, knusprige Zwiebeln und Grana':
    'Porchetta, crema cacio e pepe, cipolla croccante e grana',
  'GEROLLTER SCHWEINEBRATEN. KEIN LEICHTES MITTAGESSEN — UND WILL AUCH KEINS SEIN.':
    'Arrosto di maiale arrotolato. Non è un pranzo leggero, e non ci prova nemmeno.',
  'Prosciutto crudo, Stracciatella, Kirschtomaten und Basilikum':
    'Prosciutto crudo, stracciatella, pomodorini e basilico',
  'LUFTGETROCKNETER ROHSCHINKEN, DER KLASSIKER.': 'Prosciutto crudo stagionato, il classico.',
  'Kirschtomaten, gegrillte Zucchini, Rucola und Stracchino-Käse':
    'Pomodorini, zucchine grigliate, rucola e stracchino',
  'VEGETARISCH.': 'Vegetariana.',
  'Thunfisch, gemischter Blattsalat, Tomaten und Limettenmayonnaise':
    'Tonno, insalata mista, pomodori e maionese al lime',
  'KEIN FLEISCH, ABER FISCH.': 'Niente carne, ma c’è il pesce.',

  'Dieselben Schiacciate, in Stücke geschnitten, damit ein ganzer Tisch teilen kann. Zwei oder drei verschiedene Füllungen kommen zusammen und alle probieren alles — die einzige vernünftige Art herauszufinden, welche deine liebste ist.':
    'Le stesse schiacciate, tagliate a pezzi perché un tavolo intero possa condividerle. Arrivano insieme due o tre farciture diverse e tutti provano tutto — l’unico modo sensato per scoprire qual è la tua preferita.',
  'Eine Schiacciata, eine Füllung, in vier Stücke geschnitten':
    'Una schiacciata, una farcitura, tagliata in quattro pezzi',
  'ZUM PROBIEREN FÜR EINE PERSON, ODER EINE KLEINIGKEIT FÜR ZWEI.':
    'Un assaggio per una persona, o una cosetta per due.',
  'Zwei Schiacciate, zwei verschiedene Füllungen, in acht Stücke geschnitten':
    'Due schiacciate, due farciture diverse, tagliate in otto pezzi',
  'ZWEI PERSONEN, JE VIER STÜCKE, UND ZWEI SORTEN PROBIERT STATT EINER.':
    'Due persone, quattro pezzi a testa, e due gusti provati invece di uno.',
  'Drei Schiacciate, drei verschiedene Füllungen, in zwölf Stücke geschnitten':
    'Tre schiacciate, tre farciture diverse, tagliate in dodici pezzi',
  'FÜR EINEN GANZEN TISCH. DAS IST DIE BESTELLUNG.':
    'Per un tavolo intero. È questa l’ordinazione da fare.',

  'DIE GANZE KARTE': 'Il menu completo',
  'DIE VOLLSTÄNDIGE KARTE IST AUF ITALIENISCH — ABER DIE NAMEN DER GERICHTE UND DIE PREISE SIND DIESELBEN, UND FOTOS MUSS MAN NICHT ÜBERSETZEN.':
    'Il menu completo è in italiano — ma i nomi dei piatti e i prezzi sono gli stessi, e le foto non c’è bisogno di tradurle.',

  // ── COSA BERE ──────────────────────────────────────────────────────────────
  'WAS DU TRINKEN SOLLTEST': 'Cosa dovresti bere',
  'WENN DU HIER "EINEN SPRITZ" SAGST, BEKOMMST DU EINEN WEISSEN.':
    'Se qui dici «uno spritz», te ne arriva uno bianco.',
  'Friulanischer Weißwein, Sprudelwasser, Eis, eine Scheibe Zitrone. Kein Bitter, nichts Oranges. Das ist kein Fehler und keine Schikane von uns — in Triest bedeutet das Wort schlicht das. In neun von zehn Fällen ist es das, was ein Einheimischer bestellt.':
    'Vino bianco friulano, acqua frizzante, ghiaccio, una fetta di limone. Niente bitter, niente di arancione. Non è un errore e non è una cattiveria nostra — a Trieste la parola vuol dire semplicemente questo. In nove casi su dieci è quello che ordina uno del posto.',
  'Den orangen gibt es auch. Aperol, Campari und was dir sonst vorschwebt: Sag den Namen, und er kommt. Hier nimmt es niemand übel, und niemand verbessert dich — wir sind ja nicht die Franzosen. 💓':
    'Quello arancione c’è anche lui. Aperol, Campari e qualunque altra cosa tu abbia in mente: di’ il nome e arriva. Qui nessuno se la prende, e nessuno ti corregge — non siamo mica francesi. 💓',
  'DAS BIER IST DIE ANDERE ERNSTE SACHE': 'La birra è l’altra cosa seria',
  'Fünf vom Fass und eines, das wechselt — frag an der Theke, was heute läuft. Je nach Bier und Größe 3,00 € bis 7,00 €.':
    'Cinque alla spina e una che ruota — chiedi al banco cosa c’è oggi. A seconda della birra e della misura, da 3,00 € a 7,00 €.',
  'INDIA PALE ALE · 5,6 %': 'India Pale Ale · 5,6%',
  'Wenn du eine Empfehlung willst: die hier.': 'Se vuoi un consiglio, è questa.',
  'KELLERBIER · 5,1 %': 'Birra di cantina (keller) · 5,1%',
  'Die unkomplizierte.': 'Quella semplice, senza pretese.',
  'DOPPELT GEHOPFTES PILS · 4,8 %': 'Pilsner a doppio luppolo · 4,8%',
  'Trocken und herb.': 'Secca e amara.',
  'ABTEI-TRIPEL · 7,5 %': 'Tripel d’abbazia · 7,5%',
  'Stark. Belgische Art.': 'Forte. Stile belga.',
  'NATURTRÜBES KELLERBIER · 5,1 %': 'Birra di cantina non filtrata · 5,1%',
  'Trüb, und zwar mit Absicht.': 'Torbida, e apposta.',

  // ── QUANTO COSTA ───────────────────────────────────────────────────────────
  'WAS KOSTET DAS?': 'Quanto costa?',
  'Ein leichtes Mittagessen bleibt unter 10 €. Eine ganze Mahlzeit — eine große Schiacciata, etwas zum Teilen, Bier mit Freunden — liegt bei 15 bis 20 € pro Person.':
    'Un pranzo leggero sta sotto i 10 €. Un pasto completo — una schiacciata grande, qualcosa da condividere, birre con gli amici — sta sui 15-20 € a testa.',
  'Mit einer Rechnung von 50 € pro Kopf hier hinauszugehen ist ziemlich schwer. Wenn du es schaffst, hast du viel Bier gekauft — und wahrscheinlich auch ein paar neue Freunde.':
    'Uscire da qui con un conto da 50 € a testa è piuttosto difficile. Se ci riesci, hai comprato tanta birra — e probabilmente anche dei nuovi amici.',
  'KARTE GEHT': 'La carta va bene',
  'Wir nehmen Karten. Du kannst das Essen auch mitnehmen — praktisch, wenn du zurück zum Schiff oder zum Zug gehst.':
    'Accettiamo le carte. Puoi anche portare via il cibo — comodo se stai tornando alla nave o al treno.',

  // ── TRAPPOLE PER TURISTI ───────────────────────────────────────────────────
  'WIE MAN IN TRIEST DIE TOURISTENFALLEN UMGEHT': 'Come evitare le trappole per turisti a Trieste',
  'WO DIE EINHEIMISCHEN ESSEN': 'Dove mangiano quelli del posto',
  'Die Regel ist in jeder Hafenstadt an dieser Küste dieselbe: Je näher am Meerblick du isst, desto mehr von der Rechnung ist der Blick.':
    'La regola è la stessa in ogni città portuale di questa costa: più mangi vicino alla vista sul mare, più il conto è la vista.',
  'Zehn Minuten weiter landeinwärts hört die Aussichtssteuer auf. Auf dem Viale XX Settembre kauft Triest ein, geht spazieren und verbringt seine Abende, und die Preise in dieser Straße sind die, die die Stadt das ganze Jahr über zahlt.':
    'Dieci minuti più verso l’interno la tassa sul panorama finisce. Sul Viale XX Settembre Trieste fa la spesa, passeggia e passa le sue serate, e i prezzi di questa via sono quelli che la città paga tutti i giorni dell’anno.',
  'Es kostet dich einen ebenen, bequemen Spaziergang ohne eine einzige Steigung. Aufgeben musst du den Blick aufs Meer — und das Meer ist nach dem Essen immer noch da.':
    'Ti costa una camminata piana e comoda, senza una salita. Quello a cui rinunci è la vista sul mare — e il mare c’è ancora anche dopo pranzo.',
  'WORAN DU SIE ERKENNST, ÜBERALL IN ITALIEN': 'Come riconoscerle, in tutta Italia',
  'Eine Küche, die Pizza, Sushi und Paella anbietet, kann nichts davon richtig.':
    'Una cucina sola che offre pizza, sushi e paella non è brava in nessuna delle tre.',
  'Steht auf der Karte kein Preis, wird der Preis festgelegt, nachdem man dich gesehen hat.':
    'Se sul menu non ci sono i prezzi, il prezzo lo decidono dopo averti visto.',
  'Ist der Raum um vier Uhr nachmittags voll mit Leuten, die die Sprache des Ortes sprechen, hast du ihn gefunden.':
    'Se alle quattro del pomeriggio la sala è piena di gente che parla la lingua del posto, l’hai trovato.',

  // ── COME ARRIVARE ──────────────────────────────────────────────────────────
  'SO FINDEST DU UNS': 'Come ci trovi',
  'Viale XX Settembre 16, Triest. Wie auch immer du in diese Stadt gekommen bist, die Antwort steht unten — Triest ist klein und flach, fast alles ist zu Fuß machbar.':
    'Viale XX Settembre 16, Trieste. In qualunque modo tu sia arrivato in questa città, la risposta è qui sotto — Trieste è piccola e piatta, quasi tutto si fa a piedi.',

  'DU KOMMST MIT DEM KREUZFAHRTSCHIFF': 'Arrivi con la nave da crociera',
  '24 MINUTEN ZU FUSS · 1,7 KM VOM MOLO DEI BERSAGLIERI':
    '24 minuti a piedi · 1,7 km dal Molo dei Bersaglieri',
  'Vom Pier gehst du direkt auf die Piazza Unità d’Italia, den großen Platz zum Meer hin. Überquere ihn und halte dich landeinwärts, immer geradeaus über den Corso Italia und den Viale Carducci, unter den Arkaden. Du kommst am Brunnen am unteren Ende des Viale XX Settembre heraus. Von dort einfach die Allee hinauf. Wir sind auf der linken Seite, Hausnummer 16.':
    'Dal molo vai dritto in Piazza Unità d’Italia, la piazza grande che guarda il mare. Attraversala e tieni verso l’interno, sempre dritto per Corso Italia e Viale Carducci, sotto i portici. Sbuchi alla fontana in fondo al Viale XX Settembre. Da lì basta salire il viale. Siamo sulla sinistra, al numero 16.',
  'Mit dem Bus, 15 Minuten: 200 m an der Uferpromenade entlang bis zur Haltestelle Riva del Mandracchio vor dem Hotel Excelsior, dann die Linie 9 Richtung Piazzale Gioberti. Fünf Stationen, neun Minuten, aussteigen bei Via Battisti (Galleria Fenice) — von dort sind es 150 m. Etwa alle neun Minuten fährt einer.':
    'In autobus, 15 minuti: 200 m lungo le rive fino alla fermata Riva del Mandracchio davanti all’Hotel Excelsior, poi la linea 9 direzione Piazzale Gioberti. Cinque fermate, nove minuti, scendi a Via Battisti (Galleria Fenice) — da lì sono 150 m. Ne passa uno circa ogni nove minuti.',

  'DU KOMMST MIT DEM ZUG': 'Arrivi in treno',
  '15 MINUTEN ZU FUSS · 1,0 KM VOM BAHNHOF TRIESTE CENTRALE':
    '15 minuti a piedi · 1,0 km dalla stazione di Trieste Centrale',
  'Aus dem Bahnhof heraus landeinwärts über die Via Ghega und die Via Carducci. Der ganze Weg ist eben — keine Steigung, keine Stufen.':
    'Uscito dalla stazione, verso l’interno per Via Ghega e Via Carducci. Tutto il percorso è in piano — nessuna salita, nessun gradino.',
  'Mit dem Bus, 11 Minuten: Die Haltestelle Stazione Ferroviaria liegt 120 m vom Bahnhofsausgang. Die Linie 22 Richtung Cattinara (Ospedale) braucht vier Stationen und sechs Minuten; aussteigen bei Portici di Chiozza, dann 220 m zu Fuß. Die Linien 6 und 36 fahren auch hier entlang. Gegenüber dem Fußweg spart das etwa vier Minuten — nimm ihn also wegen des Koffers, nicht wegen der Uhr.':
    'In autobus, 11 minuti: la fermata Stazione Ferroviaria è a 120 m dall’uscita della stazione. La linea 22 direzione Cattinara (Ospedale) fa quattro fermate in sei minuti; scendi a Portici di Chiozza, poi 220 m a piedi. Passano di qui anche le linee 6 e 36. Rispetto al percorso a piedi risparmia circa quattro minuti — quindi prendilo per la valigia, non per l’orologio.',

  'DU KOMMST MIT DEM FLUGZEUG': 'Arrivi in aereo',
  'INSGESAMT ETWA 50 MINUTEN · FLUGHAFEN TRIEST (TRS), RONCHI DEI LEGIONARI':
    'In tutto circa 50 minuti · Aeroporto di Trieste (TRS), Ronchi dei Legionari',
  'Der Flughafen hat einen eigenen Bahnhof, der mit dem Terminal durch einen überdachten Steg verbunden ist. Nimm den Regionalzug nach Trieste Centrale — 29 bis 32 Minuten — und ab dort gilt der vorige Punkt: 15 Minuten zu Fuß oder die Linie 22.':
    'L’aeroporto ha una sua stazione ferroviaria, collegata al terminal da una passerella coperta. Prendi il treno regionale per Trieste Centrale — 29-32 minuti — e da lì vale il punto precedente: 15 minuti a piedi, oppure la linea 22.',

  'DU KOMMST MIT DEM AUTO': 'Arrivi in macchina',
  'UNTER EINER MINUTE ZU FUSS · GEPARKOM, VIA SPIRO TIPALDO XYDIAS 6 · GEÖFFNET 8:00–20:00':
    'Meno di un minuto a piedi · Geparkom, Via Spiro Tipaldo Xydias 6 · aperto 8:00-20:00',
  'Der Viale XX Settembre ist Fußgängerzone, bis vor unsere Tür kann man also nicht fahren. Tagsüber nimmst du das Parkhaus gleich nebenan — Geparkom, Via Spiro Tipaldo Xydias 6. Heraus, links, und du bist da. Zum Mittagessen ist das die einfache Antwort, und dieselbe gilt, wenn du aus Slowenien oder Kroatien herüberfährst.':
    'Il Viale XX Settembre è pedonale, quindi fino alla nostra porta non si arriva in auto. Di giorno prendi il parcheggio multipiano qui accanto — Geparkom, Via Spiro Tipaldo Xydias 6. Esci, giri a sinistra, e sei arrivato. Per pranzo è la risposta facile, ed è la stessa se arrivi in auto dalla Slovenia o dalla Croazia.',
  'Zum Abendessen? Das Parkhaus schließt um 20:00 Uhr und ist beim Weggehen also zu. Es geht trotzdem auf: In diesem Viertel arbeiten die Leute, und ab etwa acht Uhr abends fahren sie nach Hause, dann werden die Plätze auf der Straße frei. Lies das Schild neben den blau markierten Feldern, bevor du vom Auto weggehst — die gebührenpflichtigen Zeiten stehen am Automaten.':
    'Vieni a cena? Il parcheggio chiude alle 20:00, quindi quando esci lo trovi chiuso. Torna lo stesso: questo è un quartiere dove la gente lavora, e dall’ora di cena in poi tornano a casa e i posti in strada si liberano. Leggi il cartello accanto agli stalli con le strisce blu prima di allontanarti dall’auto — gli orari a pagamento sono scritti sul parchimetro.',

  'DU BIST SCHON IN DER ALTSTADT': 'Sei già in centro storico',
  '16 MINUTEN ZU FUSS · 1,1 KM VON DER PIAZZA UNITÀ D’ITALIA':
    '16 minuti a piedi · 1,1 km da Piazza Unità d’Italia',
  'Den Corso Italia hinauf und du bist auf dem Viale. Eine Straße, eine Richtung — viel falsch machen kann man nicht.':
    'Su per Corso Italia e sei sul Viale. Una strada, una direzione — sbagliare è difficile.',

  'DIE NÄCHSTE BUSHALTESTELLE': 'La fermata dell’autobus più vicina',
  'Via Battisti (Galleria Fenice) — 150 m — zwei Minuten zu Fuß. Dort halten die Linien 3 · 6 · 9 · 22 · 35 · 36 · 57 · 58 · B.':
    'Via Battisti (Galleria Fenice) — 150 m — due minuti a piedi. Lì fermano le linee 3 · 6 · 9 · 22 · 35 · 36 · 57 · 58 · B.',
  'In den Stadtbussen von Triest kannst du beim Einsteigen einfach eine kontaktlose Karte oder das Handy an das Lesegerät halten: Die Karte ist das Ticket. Sonst kaufst du es vorher, in jeder Tabaccheria oder am Zeitungskiosk.':
    'Sugli autobus urbani di Trieste, salendo puoi appoggiare al lettore una carta contactless o il telefono: la carta è il biglietto. Altrimenti lo compri prima, in una qualsiasi tabaccheria o edicola.',
  'IN GOOGLE MAPS ÖFFNEN': 'Apri in Google Maps',

  // ── IL DEHOR ───────────────────────────────────────────────────────────────
  'WO DU SITZT': 'Dove ti siedi',
  'Unsere Tische stehen draußen, direkt auf der Allee, unter den Platanen. Der Viale XX Settembre ist für den Verkehr gesperrt: Vor dir liegt also eine breite Fußgängerallee, keine Straße.':
    'I nostri tavoli sono fuori, proprio sul viale, sotto i platani. Il Viale XX Settembre è chiuso al traffico: quindi davanti a te c’è un ampio viale pedonale, non una strada.',
  'Sie stehen das ganze Jahr über da. Drinnen gibt es auch Tische, und im Winter sitzen dort die meisten — im Sommer bleiben aber fast alle draußen unter den Bäumen. Wenn du im Juli kommst, komm wegen draußen.':
    'Ci sono tutto l’anno. Dentro ci sono tavoli anche loro, e d’inverno è lì che si siede la maggior parte — ma d’estate quasi tutti restano fuori sotto gli alberi. Se vieni a luglio, vieni per il fuori.',
  'DAS IST DIE STRASSE DER EINHEIMISCHEN': 'Questa è la via di quelli del posto',
  'Nicht die Hafenpromenade, nicht der Postkartenplatz. Auf dem Viale geht Triest spazieren, kauft ein und verbringt seine Abende.':
    'Non le rive, non la piazza da cartolina. Sul Viale, Trieste passeggia, fa la spesa e passa le sue serate.',
  'Wenn du am Nebentisch jemanden Deutsch sprechen hörst, ist die Chance gut, dass es einer von uns ist, der es versucht.':
    'Se al tavolo accanto senti qualcuno parlare tedesco, c’è una buona probabilità che sia uno di noi che ci sta provando.',

  // ── ORARI ──────────────────────────────────────────────────────────────────
  'WANN WIR GEÖFFNET HABEN': 'Quando siamo aperti',
  'ÖFFNUNGSZEITEN': 'Orari di apertura',
  'SONNTAG': 'Domenica',
  'JEDEN TAG GEÖFFNET · SONNTAG NUR NACHMITTAGS UND ABENDS':
    'Aperti tutti i giorni · Domenica solo pomeriggio e sera',
  'RESERVIEREN IST EINE GUTE IDEE': 'Prenotare è una buona idea',
  'Du kannst jederzeit hereinkommen und an der Theke bestellen. Wenn du aber sicher einen Tisch willst — abends, draußen oder für eine Gruppe — ruf uns vorher an oder schreib uns.':
    'Puoi sempre entrare e ordinare al banco. Ma se vuoi essere sicuro di avere un tavolo — la sera, o fuori, o per un gruppo — chiamaci prima o scrivici.',
  'SCHREIB UNS AUF WHATSAPP': 'Scrivici su WhatsApp',

  // ── GLOSSARIO ──────────────────────────────────────────────────────────────
  'EIN PAAR WÖRTER, DIE DU HÖREN WIRST': 'Qualche parola che sentirai',
  'Triest hat seinen eigenen Wortschatz, und die Hälfte davon ist nicht Italienisch. Benutz eines dieser Wörter an der Theke und schau, was passiert.':
    'Trieste ha un vocabolario suo, e metà non è italiano. Usa una di queste parole al banco e guarda cosa succede.',
  'SKIATT-SCHA-TA': 'La pronuncia, riscritta come la leggerebbe un tedesco (in inglese era «skyat-CHA-ta»).',
  'Focaccia-Teig, gebacken, längs aufgeschnitten und gefüllt. Keine Pizza, kein Sandwich.':
    'Impasto da focaccia, cotto, tagliato per lungo e farcito. Non è pizza, non è un sandwich.',
  'BU-FEH': 'La pronuncia di «buffet» riscritta per un tedesco.',
  'In Triest ist damit kein Selbstbedienungsbüfett gemeint. Gemeint sind viele sehr kleine Teller, die man teilt.':
    'A Trieste non si intende un buffet self-service. Si intendono tanti piatti molto piccoli, da condividere.',
  'KREEN': 'La pronuncia di «Kren» riscritta per un tedesco.',
  'Geriebener Meerrettich. Scharf, ein bisschen wie Wasabi. Triest gibt ihn auf den Schinken und nimmt ihn ernst.':
    '⚠️ Rafano grattugiato. Piccante, un po’ come il wasabi. Trieste lo mette sul prosciutto e lo prende sul serio. → In Austria «Kren» È la parola di tutti i giorni per il rafano: qui stiamo spiegando a un viennese una parola che usa lui. Segnalato, tu hai detto di tradurre e basta.',
  'UN NERO': 'Un nero',
  'Ein Espresso. Bestell „un caffè“, und alle wissen, dass du nicht von hier bist.':
    'Un espresso. Ordina «un caffè» e tutti capiscono che non sei di qui.',
  'UN CAPO': 'Un capo',
  'Ein Espresso mit etwas Milchschaum. Im übrigen Italien heißt das Macchiato.':
    'Un espresso con un po’ di schiuma di latte. Nel resto d’Italia si chiama macchiato.',
  'Sag „un nero in b“ oder „un capo in b“, und er kommt im kleinen Glas statt in der Tasse. Das b steht für bicchiere, Glas.':
    'Di’ «un nero in b» oppure «un capo in b» e arriva nel bicchierino invece che nella tazzina. La b sta per bicchiere.',
  'REH-BE-KIN': 'La pronuncia di «rebechin» riscritta per un tedesco.',
  'Die kleine Zwischenmahlzeit am Vormittag oder am späten Nachmittag, im Stehen an der Theke, mit einem kleinen Glas dazu.':
    'Lo spuntino di metà mattina o di tardo pomeriggio, in piedi al banco, con un bicchierino di qualcosa.',
  'SCHPRITS BJAN-KO': 'La pronuncia di «spritz bianco» riscritta per un tedesco.',
  'Weißwein, Sprudelwasser, Eis, Zitrone. Das bekommst du hier, wenn du einfach „einen Spritz“ sagst.':
    '⚠️ Vino bianco, acqua frizzante, ghiaccio, limone. È quello che ti arriva qui se dici solo «uno spritz». → Anche questa: lo «Spritzer» austriaco è vino bianco e acqua frizzante, gliela stiamo spiegando a casa loro.',

  // ── FAQ ────────────────────────────────────────────────────────────────────
  'FRAGEN, DIE UNS GESTELLT WERDEN': 'Le domande che ci fanno',
  'MUSS ICH EINEN TISCH RESERVIEREN?': 'Devo prenotare un tavolo?',
  'Nicht unbedingt — du kannst einfach hereinkommen, an der Theke bestellen und dich hinsetzen. Eine Reservierung ist aber eine gute Idee, vor allem abends und wenn du sicher einen Tisch draußen willst. Ruf uns an oder schreib uns eine WhatsApp-Nachricht. Für eine Gruppe lohnt es sich jedes Mal.':
    'Non strettamente — puoi entrare, ordinare al banco e sederti. Ma prenotare è una buona idea, soprattutto la sera e se vuoi essere sicuro di un tavolo fuori. Chiamaci o mandaci un messaggio WhatsApp. Per un gruppo conviene ogni volta.',
  'SPRICHT BEI EUCH JEMAND ENGLISCH?': '⚠️ Da voi qualcuno parla inglese? → È la traduzione fedele della domanda inglese. Sulla pagina tedesca sta dicendo a un austriaco che al banco si parla INGLESE, non tedesco. Non l’ho cambiata perché non sappiamo se qualcuno parla tedesco.',
  'Ja. An der Theke kannst du auf Englisch bestellen.': 'Sì. Al banco puoi ordinare in inglese.',
  'KANN ICH MIT KARTE ZAHLEN?': 'Posso pagare con la carta?',
  'Ja, wir nehmen Karten.': 'Sì, accettiamo le carte.',
  'KANN ICH DAS ESSEN MITNEHMEN?': 'Posso portare via il cibo?',
  'Ja. Alles auf der Karte können wir zum Mitnehmen einpacken — praktisch, wenn du zurück zum Schiff oder zum Zug gehst.':
    'Sì. Tutto quello che c’è sul menu possiamo incartarlo da asporto — comodo se stai tornando alla nave o al treno.',
  'HABT IHR VEGETARISCHE GERICHTE?': 'Avete piatti vegetariani?',
  'Ja, und hier sind sie beim Namen. Die Schiacciata Fit: Kirschtomaten, gegrillte Zucchini, Rucola und Stracchino-Käse. Der Bruschettone Classico: Tomate, Knoblauch, Olivenöl und Basilikum. Die Pommes. Die Chifeletti — frittierte Triestiner Kartoffelnocken, innen weich, außen knusprig. Und beide Süßspeisen: die Nutella-Schiacciata und die Nutella-Chifeletti. Frag an der Theke, dann gehen wir den Rest mit dir durch.':
    'Sì, ed eccoli per nome. La schiacciata Fit: pomodorini, zucchine grigliate, rucola e stracchino. Il bruschettone Classico: pomodoro, aglio, olio e basilico. Le patatine. I chifeletti — gnocchi di patate triestini fritti, morbidi dentro e croccanti fuori. E tutti e due i dolci: la schiacciata alla Nutella e i chifeletti alla Nutella. Chiedi al banco e ti facciamo vedere il resto.',
  'HABT IHR GLUTENFREIE GERICHTE?': 'Avete piatti senza glutine?',
  'Eine glutenfreie Küche können wir nicht versprechen. Alles wird im selben Raum zubereitet, in dem wir den ganzen Tag mit Mehl arbeiten — wenn du Zöliakie hast, sagen wir dir das lieber ehrlich, als etwas zu riskieren. Frag uns an der Theke, dann sagen wir dir genau, was in jedem Gericht ist.':
    'Non possiamo promettere una cucina senza glutine. Si prepara tutto nello stesso spazio dove lavoriamo la farina tutto il giorno, quindi se sei celiaco preferiamo dirtelo onestamente piuttosto che rischiare. Chiedici al banco e ti diciamo esattamente cosa c’è in ogni piatto.',
  'KÖNNEN WIR DRAUSSEN SITZEN?': 'Possiamo sederci fuori?',
  'Ja, das ganze Jahr über. Unsere Tische stehen draußen auf der Allee unter den Platanen — der Viale XX Settembre ist für den Verkehr gesperrt, das ist also Gehweg und keine Straße. Drinnen gibt es auch Tische, dort sitzen die meisten im Winter; im Sommer bleiben fast alle draußen.':
    'Sì, tutto l’anno. I nostri tavoli sono fuori sul viale sotto i platani — il Viale XX Settembre è chiuso al traffico, quindi è marciapiede, non strada. Dentro ci sono tavoli anche loro, ed è lì che si siede la maggior parte d’inverno; d’estate quasi tutti restano fuori.',
  'GIBT ES EINE TOILETTE?': 'C’è un bagno?',
  'Ja, für Gäste.': 'Sì, per i clienti.',
  'IST ES ROLLSTUHLGERECHT?': 'È accessibile in sedia a rotelle?',
  'Ja. Alles liegt auf einer Ebene, drinnen gibt es keine Stufen.':
    'Sì. È tutto su un piano solo, dentro non ci sono gradini.',
  'WELCHE BUSHALTESTELLE IST DIE NÄCHSTE?': 'Qual è la fermata dell’autobus più vicina?',
  'Via Battisti (Galleria Fenice), 150 Meter entfernt — etwa zwei Minuten zu Fuß. Dort halten die Linien 3, 6, 9, 22, 35, 36, 57, 58 und B. Vom Kreuzfahrtterminal nimmst du die Linie 9, vom Bahnhof die Linie 22.':
    'Via Battisti (Galleria Fenice), a 150 metri — circa due minuti a piedi. Lì fermano le linee 3, 6, 9, 22, 35, 36, 57, 58 e B. Dal terminal crociere prendi la linea 9, dalla stazione la linea 22.',
  'WAS KOSTET EINE MAHLZEIT?': 'Quanto costa un pasto?',
  'Ein leichtes Mittagessen bleibt unter 10 €. Eine ganze Mahlzeit — eine große Schiacciata, etwas zum Teilen, Bier mit Freunden — liegt bei etwa 15 bis 20 € pro Person. Mit einer Rechnung von 50 € pro Kopf hier hinauszugehen ist ziemlich schwer. Wenn du es schaffst, hast du viel Bier gekauft — und wahrscheinlich auch ein paar neue Freunde.':
    'Un pranzo leggero sta sotto i 10 €. Un pasto completo — una schiacciata grande, qualcosa da condividere, birre con gli amici — sta sui 15-20 € a testa. Uscire da qui con un conto da 50 € a testa è piuttosto difficile. Se ci riesci, hai comprato tanta birra — e probabilmente anche dei nuovi amici.',
  'WIE SIND EURE ÖFFNUNGSZEITEN?': 'Quali sono i vostri orari?',
  'Montag bis Donnerstag 8:00 bis 01:00 Uhr, Freitag und Samstag 8:00 bis 02:00 Uhr, Sonntag 17:00 bis 23:30 Uhr. Wir haben jeden Tag offen; sonntags öffnen wir erst am Nachmittag.':
    'Da lunedì a giovedì 8:00-01:00, venerdì e sabato 8:00-02:00, domenica 17:00-23:30. Siamo aperti tutti i giorni; la domenica apriamo solo il pomeriggio.',

  // ── PIEDE ──────────────────────────────────────────────────────────────────
  'KOMM ESSEN': 'Vieni a mangiare',
  'Viale XX Settembre 16, Triest. Bestell an der Theke oder reservier einen Tisch und lass dich bedienen. So oder so: Sag einfach den Namen von dem, was du willst.':
    'Viale XX Settembre 16, Trieste. Ordina al banco, oppure prenota un tavolo e lasciati servire. In un modo o nell’altro: di’ semplicemente il nome della cosa che vuoi.',
  'ANFAHRT': 'Indicazioni stradali',
  'KARTE': 'Menu',
  '© 2026 BARRETRÒ. ALLE RECHTE VORBEHALTEN.': '© 2026 Barretrò. Tutti i diritti riservati.',
  'DATENSCHUTZ': 'Privacy',
  'COOKIE-RICHTLINIE': 'Cookie policy',
  'NUTZUNGSBEDINGUNGEN': 'Termini e condizioni',
  'TRANSPARENZHINWEIS (EU-KI-VERORDNUNG): EINIGE BILDER AUF DIESER WEBSITE SIND ILLUSTRATIV UND WURDEN MIT KÜNSTLICHER INTELLIGENZ ERZEUGT ODER BEARBEITET.':
    'Nota di trasparenza (regolamento europeo sull’IA): alcune immagini di questo sito sono illustrative e sono state generate o ottimizzate con l’intelligenza artificiale.',

  // ── BANNER COOKIE E BARRA MOBILE ───────────────────────────────────────────
  'ZIEMLICH WICHTIG!': 'Piuttosto importante!',
  'WIR HABEN COOKIES! 🍪': 'Abbiamo i cookie! 🍪',
  'Wir verwenden Cookies, damit die Website funktioniert, und um zu zählen, wie viele Leute uns besuchen (über Google Analytics). Ob du sie annimmst, entscheidest ganz allein du.':
    'Usiamo i cookie perché il sito funzioni e per contare quante persone vengono a trovarci (tramite Google Analytics). Se accettarli o no lo decidi solo tu.',
  'ALLE AKZEPTIEREN': 'Accetta tutto',
  'ABLEHNEN': 'Rifiuta',
  'MEHR IN DEN RECHTLICHEN HINWEISEN': 'Scopri di più nelle note legali',
  'ANRUFEN': 'Chiama',
};
