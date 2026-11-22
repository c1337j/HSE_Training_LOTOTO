/* ==========================================================================
   LOTOTO MASTER — 15-Level Translations: German, Swedish, Chinese, Japanese
   ========================================================================== */
(function (global) {
  'use strict';

  const i18n = global.LOTOTO && global.LOTOTO.i18n;
  if (!i18n) return;

  /* ==================== DEUTSCH (de) ==================== */
  i18n.registerLevelLocale('de', {
    1: {
      title: 'Pumpen-Gleitringdichtung',
      targetName: 'Kreiselpumpe P-101',
      standard: 'Einzelabsperrung & Entleerung',
      conceptTag: 'LOTOTO-Basis: Sperren, Entleeren & Prüfen',
      workScope: 'Undichte Gleitringdichtung an P-101 tauschen. Medium & Strom freischalten, Gehäuse entleeren und Energiefreiheit prüfen.',
      briefDesc: 'Deine erste Arbeitsfreigabe! P-101 steht saug- und druckseitig unter Prozessdruck plus 480V vom MCC-101.',
      lessonFocus: 'Immer Saug- UND Druckseite (Gegendruck!) absperren, MCC sperren, entleeren und Tryout an Startschalter & Manometer durchführen.',
      takeaway: 'Nie den Tryout überspringen! Der Startversuch und 0 PSI am Manometer beweisen, dass wirklich die richtige Maschine isoliert wurde.'
    },
    2: {
      title: 'Korbsieb-Reinigung',
      targetName: 'Inline-Korbsieb S-102',
      standard: 'Absperren, Entlüften & Entleeren',
      conceptTag: 'Gas entlüften & Flüssigkeit entleeren',
      workScope: 'Deckel von S-102 zur Reinigung öffnen. Beidseitig sperren, Druck abbauen, Flüssigkeit ablassen und 0 PSI bestätigen.',
      briefDesc: 'S-102 hat keinen Elektromotor, hält aber unter Druck stehende Flüssigkeit. Öffnen unter Restdruck führt zu schweren Spritzverletzungen.',
      lessonFocus: 'Nach dem Sperren beider Ventile öffne Entlüftung (VT-201) UND Tiefpunkt-Entleerung (DR-201).',
      takeaway: 'Hochpunkt-Entlüftung und Tiefpunkt-Entleerung wirken zusammen: Entlüften bricht das Vakuum für vollständiges Entleeren.'
    },
    3: {
      title: 'Die Bypass-Falle',
      targetName: 'Förderpumpe P-103',
      standard: 'Vollständige System-Isolierung',
      conceptTag: 'Versteckte Bypass- & Anwärmleitungen',
      workScope: 'Laufrad an P-103 ausbauen. Achte auf die obere Anwärm-Bypassleitung direkt zur Pumpendruckseite!',
      briefDesc: 'Viele Pumpen besitzen Anwärm- oder Mindestmengen-Bypässe. Werden nur Saug- und Druckventil gesperrt, strömt weiter Medium nach!',
      lessonFocus: 'Verfolge JEDEN Abzweig am Zielaggregat im R&I-Fließbild anhand der animierten Strömung.',
      takeaway: 'Nie nur zwei Anschlüsse an einer Pumpe annehmen — immer Bypässe, Spül- und Rückführleitungen prüfen.'
    },
    4: {
      title: 'Regelventilen nicht vertrauen',
      targetName: 'Inline-Erhitzer E-401',
      standard: 'Manuelle Zwangsabsperrung',
      conceptTag: 'Regelventile ≠ Gültiges LOTO',
      workScope: 'Inline-Erhitzer E-401 freischalten. Regelventil FV-401 liegt davor — NICHT als Absperrstelle verwenden!',
      briefDesc: 'Ein aus der Messwarte geschlossenes Regelventil isoliert nicht sicher: Sitze können lecken und Antriebe bei Ausfall öffnen.',
      lessonFocus: 'Ignoriere FV-401 und sperre die Handventile (V-401, V-402) sowie den Hand-Bypass (V-403).',
      takeaway: 'Sicherheitsregeln verbieten Regelventile als LOTO-Barriere — immer Handarmaturen absperren.'
    },
    5: {
      title: 'Die Rückschlagventil-Illusion',
      targetName: 'Booster-Pumpe P-105',
      standard: 'Manuelle Druckabsperrung',
      conceptTag: 'Rückschlagventile ≠ Absperrpunkte',
      workScope: 'Lager an P-105 prüfen. Hinter Rückschlagventil CV-501 stehen 185 PSI Gegendruck an.',
      briefDesc: 'CV-501 verhindert Rückfluss beim Abschalten, hält aber 185 PSI nicht zuverlässig bei geöffnetem Pumpengehäuse.',
      lessonFocus: 'Vertraue NIE einem Rückschlagventil für LOTOTO! Sperre das Handventil V-502.',
      takeaway: 'Rückschlagventile schützen den Prozess, NIE Menschen — immer ein manuelles Absperrventil sperren.'
    },
    6: {
      title: 'Parallele Zwillingspumpen',
      targetName: 'Pumpe P-201A (P-201B AKTIV halten!)',
      standard: 'Selektive Strang-Isolierung',
      conceptTag: 'Betriebspumpe sperren · Reserve läuft',
      keepLiveRule: 'Halte die Reservepumpe P-201B unterbrechungsfrei in Betrieb!',
      workScope: 'Isoliere P-201A für Lagerwechsel, während P-201B die Anlage weiter versorgt.',
      briefDesc: 'P-201A und P-201B teilen gemeinsame Sammelleitungen. Schließen von Hauptventil V-600 legt die ganze Anlage still!',
      lessonFocus: 'Nutze die engsten lokalen Absperrungen an P-201A (V-601, V-602, MCC-201A), sodass P-201B weiterläuft.',
      takeaway: 'Präzise lokale LOTOTO-Grenzen minimieren Restvolumen und vermeiden unnötige Anlagenabschaltungen.'
    },
    7: {
      title: 'Rohrbündel-Wärmetauscher',
      targetName: 'Kühler E-301 (Mantel + Rohre)',
      standard: 'Beidseitige Isolierung',
      conceptTag: 'Zwei getrennte Medienkammern sperren',
      workScope: 'Rohrbündel an E-301 ziehen. Sperre & entleere SOWOHL Heißprozess (Rohre) ALS AUCH Kühlwasser (Mantel)!',
      briefDesc: 'Ein Wärmetauscher führt zwei getrennte Drucksysteme. Undichte Rohre können Druck von einer Seite auf die andere übertragen.',
      lessonFocus: 'Beide Ströme (Orange & Cyan) isolieren, beide Seiten entleeren und BEIDE Manometer auf 0 PSI prüfen.',
      takeaway: 'Wärmetauscher immer als Mehrquellen-Apparate behandeln — innere Lecks verbinden Mantel- und Rohrseite.'
    },
    8: {
      title: 'Schwerkraft & Hochbehälter',
      targetName: 'Mischbehälter V-302',
      standard: 'Mehrstutzen- & Schwerkraft-LOTO',
      conceptTag: 'Gespeicherte Lageenergie (Gravitation)',
      workScope: 'Füllstandsflansch an V-302 wechseln. Vergiss nicht den Hochbehälter, der von oben durch Schwerkraft einspeist!',
      briefDesc: 'Auch ohne Pumpen erzeugt ein erhöhter Vorlagebehälter gefährlichen statischen Druck zusätzlich zu Lauge und Ablauf.',
      lessonFocus: 'Alle DREI Stutzen sperren (V-801 Schwerkraft, V-802 Zulauf, V-803 Ablauf), dann entlüften und entleeren.',
      takeaway: 'Schwerkraft ist eine stille Energiequelle — prüfe stets höhere Ebenen und Hochbehälter im R&I.'
    },
    9: {
      title: 'Rührwerksreaktor mit Heizmantel',
      targetName: 'Chemiereaktor R-401',
      standard: 'Multi-Energie LOTOTO',
      conceptTag: 'Mechanik + Wärme + Chemie',
      workScope: 'Rührblätter in R-401 prüfen. Prozess, Dampfmantel UND 480V-Rührwerksmotor komplett freischalten!',
      briefDesc: 'R-401 vereint DREI Gefahren: Druckprozess im Kessel, 150 PSI Heizdampf im Mantel und 480V-Rührwerk.',
      lessonFocus: 'Alle 4 Ventile + MCC-401 sperren, Kessel und Mantel entspannen, Rührwerksschalter und beide Manometer testen.',
      takeaway: 'Bei Multi-Energie-Anlagen muss jede Disziplin (Elektrik, Thermik, Chemie) einzeln verifiziert werden.'
    },
    10: {
      title: 'Double Block & Bleed (DBB)',
      targetName: 'Hochdruck-Gaszähler M-501',
      standard: 'Double Block & Bleed (DBB)',
      conceptTag: '600 PSI Hochdruck-DBB-Standard',
      workScope: 'Hochdruck-Gaszähler M-501 ausbauen. 600 PSI erfordern Double Block & Bleed auf BEIDEN Seiten!',
      briefDesc: 'Bei Hochdruck oder toxischen Gasen reicht ein Ventil nicht: DBB sperrt ZWEI Ventile in Reihe mit geöffneter Zwischenentspannung.',
      lessonFocus: 'Alle VIER Blockventile sperren (V-1001/1002 & V-1003/1004), beide Bleeds (BL-1001/1002) & VT-1001 öffnen, PI-1001 prüfen.',
      takeaway: 'Die offene Zwischenentspannung beweist Dichtheit und führt eventuelle Leckagen sicher ab.'
    },
    11: {
      title: 'Sichere Trennung — Leitungsöffnung',
      targetName: 'Säure-Verdampfer E-502',
      standard: 'Sichere Trennung (Steckscheiben)',
      conceptTag: 'Erst drucklos machen → Steckscheiben drehen',
      workScope: 'Schweißarbeiten an E-502! Ventile allein reichen nicht — Steckscheiben (SB) sind zwingend vorgeschrieben.',
      briefDesc: 'Für Heißarbeiten oder korrosive Medien müssen massive Stahl-Steckscheiben in die Flansche gedreht werden.',
      lessonFocus: 'REIHENFOLGE BEACHTEN! Erst V-1101/V-1102 sperren, DANN auf 0 PSI entspannen, und ERST DANACH SB-1101 & SB-1102 drehen!',
      takeaway: 'Nie einen Flansch zum Drehen einer Steckscheibe lösen, solange noch Restdruck anliegt.'
    },
    12: {
      title: 'Abscheider & PSV-Schutz',
      targetName: '2-Phasen-Abscheider V-601',
      standard: 'Mehrstutzen + PSV-Schutz',
      conceptTag: 'PSV-Schutz + N2-Rückschlagfalle',
      workScope: 'V-601 für Demister-Tausch isolieren. Achte auf das N2-Rückschlagventil und schließe NIEMALS das Sicherheitsventil (PSV)!',
      briefDesc: 'V-601 besitzt 4 aktive Leitungen (Zulauf, Gas, Flüssigkeit, N2) sowie Sicherheitsventil PSV-1201 als Überdruckschutz.',
      lessonFocus: 'V-1201, V-1202, V-1203 und V-1204 sperren (CV-1201 ignorieren). PSV-1201 OFFEN lassen!',
      takeaway: 'Niemals ein Sicherheitsventil (PSV) bei noch verbundenen Druckquellen absperren.'
    },
    13: {
      title: 'Multi-Energie-Gaskompressor',
      targetName: 'Kolbenkompressor K-701',
      standard: 'Multi-Disziplin LOTOTO',
      conceptTag: 'Gas + Rückführung + Wasser + 2x MCC',
      workScope: 'Ventilrevision an K-701. Gas, Anti-Surge-Rückführung, Kühlwasser UND BEIDE Motoren (Hauptantrieb + Schmierölpumpe) sperren!',
      briefDesc: 'Kompressoren kombinieren Hochdruckgas, Rückführschleife, Rückschlagfalle, Kühlwasser und zwei Stromkreise.',
      lessonFocus: 'Alle 5 Handventile + MCC-701 & MCC-702 sperren, Gas entspannen, Wasser ablassen und beide Startschalter & Manometer prüfen.',
      takeaway: 'Hilfsaggregate wie Schmierölpumpen haben oft eigene MCC-Abgänge — immer alle Stromkreise prüfen!'
    },
    14: {
      title: 'Enger Raum — Lagertank',
      targetName: 'Lagertank T-801',
      standard: 'Sichere Trennung Befahren',
      conceptTag: 'Voll-Steckscheiben + Heizschlange + Gas',
      workScope: 'Einstieg in Tank T-801! ALLE Prozessstutzen mit Steckscheiben trennen, Heizschlange & Rührwerk sperren, entleeren und Freimessung bestehen!',
      briefDesc: 'Das Befahren enger Räume verlangt höchste LOTOTO-Stufe: Absperren, Entleeren, physische Steckscheiben überall und 0% UEG / 20,9% O2.',
      lessonFocus: 'Alle Ventile + MCC-801 sperren, Tank & Schlange entleeren, SB-1401/1402/1403 drehen, HS-801/PI-1401 und GD-801 prüfen.',
      takeaway: 'Nie einen Behälter befahren, der nur durch geschlossene Ventile gesichert ist — Steckscheiben & Freimessung retten Leben.'
    },
    15: {
      title: 'Großstillstand — Einsatzpumpen-Paket',
      targetName: 'Paket P-901A + E-901 (P-901B AKTIV!)',
      standard: 'Master-Turnaround LOTOTO',
      conceptTag: 'Alle Kompetenzen vereint — Finale!',
      keepLiveRule: 'Halte Reservepumpe P-901B online Richtung Alternativ-Header!',
      workScope: 'Abschlussprüfung! Isoliere P-901A und E-901 gemeinsam, während P-901B die Versorgung aufrechterhält.',
      briefDesc: 'Alles zusammen auf einem R&I: aktive Sammelleitung, Rückschlag- & Regelventilfallen, 350 PSI Dampf-DBB, Steckscheibe, MCC & Gastest.',
      lessonFocus: 'Systematisch vorgehen: (1) Strang A, Dampf-DBB & MCC-901A sperren ohne P-901B zu stören; (2) entleeren; (3) SB-1501 drehen; (4) alle Tryouts.',
      takeaway: 'Glückwunsch, LOTOTO-Meister! Gründliches Markieren und Prüfen der Energiefreiheit schützt jedes Teammitglied.'
    }
  });

  /* ==================== SVENSKA (sv) ==================== */
  i18n.registerLevelLocale('sv', {
    1: {
      title: 'Byte av Pumptätning',
      targetName: 'Centrifugalpump P-101',
      standard: 'Enkel Avstängning & Dränering',
      conceptTag: 'Grundläggande LOTOTO: Lås, Dränera, Prova',
      workScope: 'Byt läckande mekanisk tätning på P-101. Isolera vätska och el, dränera pumphuset och bekräfta nollenergi.',
      briefDesc: 'Ditt första arbetstillstånd! P-101 har trycksatt media på sug- och trycksida samt 480V från MCC-101.',
      lessonFocus: 'Isolera ALLTID både sug- och trycksida (mottryck!), lås brytaren, dränera och gör Tryout på startknapp och manometer.',
      takeaway: 'Hoppa aldrig över Tryout! Att prova startknappen och se 0 PSI bevisar att rätt utrustning är låst.'
    },
    2: {
      title: 'Rengöring av Korgfilter',
      targetName: 'Inline-filter S-102',
      standard: 'Isolera, Lufta & Dränera',
      conceptTag: 'Avluftning & Vätskedränering',
      workScope: 'Öppna filterlocket på S-102 för rengöring. Isolera båda sidor, lufta ut tryck, dränera och bekräfta 0 PSI.',
      briefDesc: 'S-102 har ingen motor men innehåller trycksatt vätska. Att öppna under tryck ger farligt stänk.',
      lessonFocus: 'Lås båda blockventilerna och öppna sedan både hög avluftning (VT-201) OCH låg dränering (DR-201).',
      takeaway: 'Avluftning upptill och dränering nedtill samverkar så att vakuum bryts och vätskan rinner ut helt.'
    },
    3: {
      title: 'Bypass-fällan',
      targetName: 'Transferpump P-103',
      standard: 'Fullständig Systemisolering',
      conceptTag: 'Spåra Dolda Bypass-ledningar',
      workScope: 'Demontera pumphjul på P-103. Se upp för uppvärmnings-bypass som ansluter direkt till trycksidan!',
      briefDesc: 'Många pumpar har bypass- eller recirkulationsledningar. Låser du bara sug och tryck matar bypassen tillbaka tryck!',
      lessonFocus: 'Följ VARJE anslutning till målpumpen på P&ID-schemat och se det animerade flödet.',
      takeaway: 'Anta aldrig att en pump bara har två rör — granska alltid bypass-, spol- och återföringsledningar.'
    },
    4: {
      title: 'Lita Inte på Reglerventiler',
      targetName: 'Inline-värmare E-401',
      standard: 'Manuell Blockisolering',
      conceptTag: 'Reglerventiler ≠ Giltig LOTO',
      workScope: 'Isolera värmare E-401. Reglerventil FV-401 sitter uppströms — använd den INTE som säker isolering!',
      briefDesc: 'En stängd reglerventil läcker ofta genom sätet och kan öppna vid luftbortfall.',
      lessonFocus: 'Hoppa över FV-401 och lås manuella ventiler (V-401, V-402) samt manuell bypass (V-403).',
      takeaway: 'Reglerventiler får aldrig användas som LOTO-barriär — lås alltid manuella avstängningsventiler.'
    },
    5: {
      title: 'Backventil-illusionen',
      targetName: 'Boosterpump P-105',
      standard: 'Manuell Tryckisolering',
      conceptTag: 'Backventiler ≠ Isoleringspunkter',
      workScope: 'Inspektera lager på P-105. Tryckledningen håller 185 PSI bakom backventil CV-501.',
      briefDesc: 'CV-501 hindrar återflöde vid driftstopp men kan aldrig garantera 185 PSI säkerhet under service.',
      lessonFocus: 'Lita ALDRIG på en backventil för LOTOTO! Lås manuella ventilen V-502.',
      takeaway: 'Backventiler skyddar processen, ALDRIG personalen — lås alltid en manuell blockventil.'
    },
    6: {
      title: 'Parallella Tvillingpumpar',
      targetName: 'Pump P-201A (Håll P-201B I DRIFT!)',
      standard: 'Selektiv Linjeisolering',
      conceptTag: 'Isolera Pump A · Reserv B Online',
      keepLiveRule: 'Håll reservpumpen P-201B igång utan avbrott!',
      workScope: 'Isolera P-201A för lagerbyte medan reservpumpen P-201B håller anläggningen i drift.',
      briefDesc: 'P-201A och P-201B delar stamledningar. Stänger du huvudventilen V-600 stannar hela enheten!',
      lessonFocus: 'Välj närmaste lokala isoleringspunkter runt P-201A (V-601, V-602, MCC-201A).',
      takeaway: 'Tajta lokala LOTO-gränser minimerar instängd volym och håller övrig drift igång.'
    },
    7: {
      title: 'Tubvärmeväxlare',
      targetName: 'Kylare E-301 (Mantel + Tuber)',
      standard: 'Dubbelsidig Isolering',
      conceptTag: 'Isolera Två Separata Kammare',
      workScope: 'Dra tubknippet på E-301. Isolera & dränera BÅDE Varm Process (Tuber) OCH Kylvatten (Mantel)!',
      briefDesc: 'En värmeväxlare har två skilda trycksystem. Läckande tuber kan överföra tryck mellan sidorna.',
      lessonFocus: 'Isolera båda strömmarna (orange & cyan), dränera båda sidor och kontrollera BÅDA manometrarna på 0 PSI.',
      takeaway: 'Behandla alltid värmeväxlare som flerkällsutrustning — inre läckage kopplar samman sidorna.'
    },
    8: {
      title: 'Fallhöjd & Högtank',
      targetName: 'Blandningstank V-302',
      standard: 'Flerstuts- & Gravitations-LOTO',
      conceptTag: 'Lagrad Gravitationsenergi',
      workScope: 'Byt nivåfläns på V-302. Glöm inte högtanken som matar med självfall uppifrån!',
      briefDesc: 'Även utan pumpar skapar en upphöjd tank farligt statiskt tryck utöver lutmatning och utlopp.',
      lessonFocus: 'Lås ALLA TRE anslutningar (V-801 fallhöjd, V-802 lut, V-803 utlopp), lufta och dränera.',
      takeaway: 'Gravitation är en tyst energikälla — kontrollera alltid övre våningsplan på P&ID.'
    },
    9: {
      title: 'Omrörd Mantlad Reaktor',
      targetName: 'Kemireaktor R-401',
      standard: 'Flerenergi-LOTOTO',
      conceptTag: 'Mekanisk + Termisk + Kemisk',
      workScope: 'Inspektera omrörarblad i R-401. Isolera process, ångmantel OCH 480V omrörarmotor!',
      briefDesc: 'R-401 förenar TRE risker: trycksatt process, 150 PSI ånga i manteln och 480V omrörare.',
      lessonFocus: 'Lås alla 4 ventiler + MCC-401, avlasta både kärl och mantel, prova omrörare och båda manometrar.',
      takeaway: 'Flerenergiutrustning kräver verifiering av varje disciplin: el, värme och kemi.'
    },
    10: {
      title: 'Double Block & Bleed (DBB)',
      targetName: 'Högtrycksgasmätare M-501',
      standard: 'Double Block & Bleed (DBB)',
      conceptTag: '600 PSI Högtrycks-DBB',
      workScope: 'Kalibrera och demontera M-501. 600 PSI gas kräver Double Block & Bleed på BÅDA sidor!',
      briefDesc: 'Vid högt tryck räcker inte en ventil: DBB låser TVÅ ventiler i serie med öppen mellandränering.',
      lessonFocus: 'Lås alla FYRA blockventiler (V-1001/1002 & V-1003/1004), öppna BL-1001/1002 & VT-1001, verifiera PI-1001.',
      takeaway: 'Öppen mellandränering visar att första ventilen håller tätt och leder säkert bort småläckage.'
    },
    11: {
      title: 'Säker Isolering — Röröppning',
      targetName: 'Syrakokare E-502',
      standard: 'Positiv Isolering (Blindbrickor)',
      conceptTag: 'Tryckavlasta Först → Vänd Blindbrickor',
      workScope: 'Heta arbeten på E-502! Ventiler räcker inte — glasögonflänsar (SB) måste vändas till blindläge.',
      briefDesc: 'För svetsning eller syraledningar krävs fysiska blindbrickor i stål mellan flänsarna.',
      lessonFocus: 'ORDNINGEN ÄR AVGÖRANDE! Lås V-1101/V-1102, tryckavlasta SEDAN till 0 PSI, och vänd FÖRST DÄREFTER SB-1101 & SB-1102!',
      takeaway: 'Öppna aldrig en fläns för blindning medan resttryck finns kvar i röret.'
    },
    12: {
      title: 'Separator & PSV-skydd',
      targetName: '2-Fasseparator V-601',
      standard: 'Flerstuts + Säkerhetsventil',
      conceptTag: 'PSV-skydd + N2-backventilfälla',
      workScope: 'Isolera V-601 för demisterbyte. Se upp för N2-backventilen och stäng ALDRIG PSV-ventilen!',
      briefDesc: 'V-601 har 4 aktiva anslutningar (process, gas, vätska, N2) samt säkerhetsventil PSV-1201.',
      lessonFocus: 'Lås V-1201, V-1202, V-1203 och V-1204 (ignorera CV-1201). Lämna PSV-1201 ÖPPEN!',
      takeaway: 'Blockera aldrig en säkerhetsventil (PSV) så länge tryckkällor fortfarande är inkopplade.'
    },
    13: {
      title: 'Flerenergi-Gaskompressor',
      targetName: 'Kolvkompressor K-701',
      standard: 'Flerdisciplin-LOTOTO',
      conceptTag: 'Gas + Återföring + Kylvatten + 2x MCC',
      workScope: 'Ventilöversyn på K-701. Isolera gas, recirkulation, kylvatten OCH BÅDA elmotorerna (Huvud + Smörjolja)!',
      briefDesc: 'Kompressorer kombinerar högtrycksgas, återföringsslinga, backventil, vattenkylning och två elmatningar.',
      lessonFocus: 'Lås alla 5 manuella ventiler + MCC-701 & MCC-702, avlasta gas, dränera vatten och gör Tryout på båda knappar och manometer.',
      takeaway: 'Hjälpsystem som smörjoljepumpar har ofta egna brytare — kontrollera alltid alla elkretsar!'
    },
    14: {
      title: 'Slutet Utrymme — Lagertank',
      targetName: 'Lagertank T-801',
      standard: 'Säker Isolering Slutet Utrymme',
      conceptTag: 'Full Blindning + Ångslinga + Gastest',
      workScope: 'Personal ska gå in i T-801! Blinda ALLA processtutsar, isolera ångslinga & omrörare, dränera och klara Gastestet!',
      briefDesc: 'Tillträde i slutet utrymme kräver högsta LOTOTO-nivå: låsning, dränering, fysiska blindbrickor överallt samt 0% LEL / 20.9% O2.',
      lessonFocus: 'Lås alla ventiler + MCC-801, dränera tank & slinga, vänd SB-1401/1402/1403, testa HS-801/PI-1401 och sedan GD-801.',
      takeaway: 'Gå aldrig in i ett slutet utrymme skyddat bara av stängda ventiler — blindning och gasmätning räddar liv.'
    },
    15: {
      title: 'Revisionsstopp — Matarpaket',
      targetName: 'Paket P-901A + E-901 (P-901B I DRIFT!)',
      standard: 'Mästar-LOTOTO Revisionsstopp',
      conceptTag: 'Alla Färdigheter — Stor Final!',
      keepLiveRule: 'Håll reservpumpen P-901B igång mot alternativ samlingsledning!',
      workScope: 'Slutprov! Isolera P-901A och E-901 tillsammans medan reservpumpen P-901B fortsätter leverera.',
      briefDesc: 'Allt samlat på en P&ID: delad aktiv ledning, back- & reglerventilfällor, 350 PSI ång-DBB, blindbricka, MCC & gastest.',
      lessonFocus: 'Arbeta metodiskt: (1) lås linje A, ång-DBB & MCC-901A utan att stoppa P-901B; (2) dränera; (3) vänd SB-1501; (4) slutför alla Tryouts.',
      takeaway: 'Grattis, LOTOTO-Mästare! Metodisk P&ID-markering och nollenergiverifiering skyddar hela arbetslaget.'
    }
  });

  /* ==================== 中文 简体 (zh) ==================== */
  i18n.registerLevelLocale('zh', {
    1: {
      title: '离心泵机封更换',
      targetName: '离心泵 P-101',
      standard: '单阀截断与排凝',
      conceptTag: '基础 LOTOTO：上锁、排凝与测试',
      workScope: '更换 P-101 泄漏的机械密封。隔离工艺流体与电源，排净泵腔残液并确认零能量。',
      briefDesc: '你的第一份作业许可！P-101 进出口均带压，并由 MCC-101 提供 480V 电源。',
      lessonFocus: '务必同时锁闭进口阀与出口阀（防背压倒窜！），断开并锁定 MCC，打开排凝，再通过现场启停按钮和压力表完成测试。',
      takeaway: '绝不可跳过测试验证 (Tryout)！点动试车不转且压力表归零，才能证明锁定了正确的设备。'
    },
    2: {
      title: '篮式过滤器清洗',
      targetName: '在线篮式过滤器 S-102',
      standard: '隔离、放空与排凝',
      conceptTag: '高点放空与低点排凝',
      workScope: '打开过滤器端盖清理杂物。隔离上下游，高点放空泄压，低点排净液体并确认 0 PSI。',
      briefDesc: 'S-102 没有电机，但内部存有带压液体，带残压开盖极易造成喷溅伤害。',
      lessonFocus: '锁闭上下游阀门后，同时打开高点放空阀 (VT-201) 破真空泄压，以及低点排凝阀 (DR-201) 排空液体。',
      takeaway: '高点放空与低点排凝需配合使用：放空可破除真空锁，确保内部液体彻底排净。'
    },
    3: {
      title: '旁路回流陷阱',
      targetName: '热油输送泵 P-103',
      standard: '全包络能量隔离',
      conceptTag: '排查隐蔽旁路与暖泵线',
      workScope: '拆卸 P-103 叶轮。警惕顶部暖泵旁路管线直接连通至泵出口！',
      briefDesc: '许多工业泵配有暖泵或最小流量旁路，仅关闭主进出口阀会导致流体经旁路倒灌进泵体。',
      lessonFocus: '沿 P&ID 追踪目标设备的每一条支管，借助动态流向动画识别漏网能量。',
      takeaway: '切勿默认泵只有一进一出两根管——务必逐一核查暖泵线、冲洗线和回流旁路。'
    },
    4: {
      title: '切勿轻信调节阀',
      targetName: '管道加热器 E-401',
      standard: '手动可靠截断',
      conceptTag: '调节阀 ≠ 有效 LOTO 隔离',
      workScope: '隔离加热器 E-401 进行检查。上游装有气动调节阀 FV-401——严禁将其当作隔离点！',
      briefDesc: '中控室关闭自动调节阀并不能实现安全隔离：阀芯存在内漏且失气时可能自动全开。',
      lessonFocus: '绕开调节阀 FV-401，锁闭手动切断阀 (V-401、V-402) 及手动旁路阀 (V-403)。',
      takeaway: '安全规程严禁使用自动调节阀作为 LOTO 隔离边界，必须上锁锁闭手动切断阀。'
    },
    5: {
      title: '止回阀的假象',
      targetName: '增压泵 P-105',
      standard: '手动出口截断隔离',
      conceptTag: '止回阀 ≠ 可靠隔离点',
      workScope: '检修 P-105 轴承。出口总管在止回阀 CV-501 后方存在 185 PSI 高压背压。',
      briefDesc: '止回阀 CV-501 仅用于停泵防倒流，绝不能在拆泵检修时依靠它阻挡 185 PSI 压力。',
      lessonFocus: '绝不依赖止回阀做 LOTOTO！它无法上锁且易卡阻内漏，请锁闭下游手动阀 V-502。',
      takeaway: '止回阀是工艺保护元件，绝非人身安全隔离屏障，必须锁定手动切断阀。'
    },
    6: {
      title: '双泵并联运行',
      targetName: '运行泵 P-201A（保持 P-201B 运行！）',
      standard: '选择性支路隔离',
      conceptTag: '隔离检修泵 · 保持备用泵在线',
      keepLiveRule: '保持备用泵 P-201B 持续在线运行！',
      workScope: '隔离 P-201A 更换轴承，同时确保备用泵 P-201B 不停机、维持装置供料。',
      briefDesc: 'P-201A 与 P-201B 共用进出口总管，误关总管阀 V-600 会导致整套装置停工！',
      lessonFocus: '仅锁定紧邻 P-201A 的局部隔离阀与断路器 (V-601、V-602、MCC-201A)，让 P-201B 正常输送。',
      takeaway: '优秀的 LOTOTO 隔离边界应紧贴目标设备，既减少存液量又避免非计划停产。'
    },
    7: {
      title: '管壳式换热器',
      targetName: '工艺冷却器 E-301（管程 + 壳程）',
      standard: '双程独立隔离',
      conceptTag: '隔离两个独立受压腔室',
      workScope: '抽出 E-301 管束。必须同时隔离并排净热工艺侧（管程）和冷却水侧（壳程）！',
      briefDesc: '换热器内部包含两套独立带压介质，换热管一旦穿孔就会造成跨程串压。',
      lessonFocus: '同时隔离热介质（橙色）与冷却水（青色），两侧均需排凝，并验证两块压力表均为 0 PSI。',
      takeaway: '换热器必须按多能源设备对待，即使只拆一侧封头也要隔离另一侧介质。'
    },
    8: {
      title: '高位重力静压',
      targetName: '混合罐 V-302',
      standard: '多管口重力能量锁闭',
      conceptTag: '受控重力势能隔离',
      workScope: '更换 V-302 液位计法兰。别忘了上方高位槽产生的重力自流压头！',
      briefDesc: '即使没有任何机泵运行，高位槽依然会产生危险的液体静压，且罐体连有碱液进料和出料管。',
      lessonFocus: '锁闭全部三个管口（高位重力阀 V-801、碱液阀 V-802、出口阀 V-803），随后放空并排凝。',
      takeaway: '重力是隐蔽的能量源！拆检低位设备前务必核对 P&ID 上的高位储罐。'
    },
    9: {
      title: '夹套搅拌反应釜',
      targetName: '化学反应釜 R-401',
      standard: '多能源联合 LOTOTO',
      conceptTag: '机械 + 热能 + 化学能',
      workScope: '检查 R-401 内部搅拌桨叶。隔离工艺物料、夹套蒸汽以及 480V 搅拌电机！',
      briefDesc: 'R-401 同时存在三种危险能量：釜内带压工艺介质、150 PSI 夹套蒸汽以及 480V 旋转搅拌器。',
      lessonFocus: '锁闭 4 台阀门与 MCC-401，分别泄放釜内与夹套压力，并完成搅拌点动和双压力表验证。',
      takeaway: '多能源设备必须逐专业确认——机械/电气转动、蒸汽热源和工艺介质缺一不可。'
    },
    10: {
      title: '双截断与放空 (DBB)',
      targetName: '高压燃气流量计 M-501',
      standard: '双截断与放空 (DBB)',
      conceptTag: '600 PSI 高压烃类 DBB 标准',
      workScope: '拆检校验 M-501。600 PSI 高压气体工况要求上下游两侧均实施双截断与放空！',
      briefDesc: '在高压或剧毒管线上单阀不足以保障安全：DBB 通过串联两道锁闭阀并打开中间导淋阀证明零内漏。',
      lessonFocus: '锁闭全部 4 道截断阀 (V-1001/1002 & V-1003/1004)，打开两侧导淋 (BL-1001/1002) 与放空 VT-1001，确认 PI-1001。',
      takeaway: 'DBB 中开启的阀间导淋既能检验上游阀门严密性，又能将微量内漏安全导出。'
    },
    11: {
      title: '可靠物理隔离 — 断管动火',
      targetName: '酸性再沸器 E-502',
      standard: '可靠隔离（八字盲板）',
      conceptTag: '先泄压归零 → 再翻盲板',
      workScope: 'E-502 动火焊接作业！仅关阀不够，必须翻转八字盲板 (SB) 实现物理硬隔离。',
      briefDesc: '动火、腐蚀性介质断管或进罐作业必须插入实心钢制八字盲板。',
      lessonFocus: '顺序至关重要！先锁闭 V-1101/V-1102，再放空排凝至 0 PSI，确认无压后才能拆法兰翻转 SB-1101 与 SB-1102！',
      takeaway: '严禁在存在残压时拆松法兰翻盲板——必须先彻底泄压归零。'
    },
    12: {
      title: '分离罐与安全阀保护',
      targetName: '两相分离罐 V-601',
      standard: '多管口隔离 + PSV 保护',
      conceptTag: '保护安全阀 + 氮气止回阀陷阱',
      workScope: '隔离 V-601 更换除沫器。警惕氮气止回阀陷阱，且严禁关闭安全阀 (PSV) 下方阀门！',
      briefDesc: 'V-601 连有 4 条带压管线（进料、气相、液相、氮封）以及保护容器不超压的 PSV-1201。',
      lessonFocus: '锁闭 V-1201、V-1202、V-1203 与 V-1204（忽略止回阀 CV-1201），保持 PSV-1201 铅封常开！',
      takeaway: '设备仍连接压力源时绝不可关闭安全阀，它是防止容器超压爆裂的最后防线。'
    },
    13: {
      title: '多能源燃气压缩机',
      targetName: '往复式压缩机 K-701',
      standard: '多专业综合 LOTOTO',
      conceptTag: '工艺气 + 回流 + 冷却水 + 双 MCC',
      workScope: '大修 K-701 气阀。隔离工艺气、防喘振回流线、冷却水夹套以及两路电源（主电机 + 润滑油泵）！',
      briefDesc: '压缩机撬块汇集高压气体、回流旁路、出口止回阀、水冷系统及两套独立电控回路。',
      lessonFocus: '锁闭 5 台手动阀 + MCC-701 与 MCC-702，气体放空、水套排凝，并验证两台启停按钮和压力表。',
      takeaway: '润滑油泵等辅助设备往往有独立配电柜，上锁前务必核对全部电气单线图！'
    },
    14: {
      title: '受限空间作业 — 储罐',
      targetName: '常压烃类储罐 T-801',
      standard: '受限空间可靠隔离',
      conceptTag: '全盲板隔离 + 伴热盘管 + 气体检测',
      workScope: '人员需进入 T-801 内部焊检！所有工艺管口均须加装八字盲板，隔离盘管与搅拌机，排净并通过气体检测！',
      briefDesc: '受限空间作业采用最高 LOTOTO 标准：关阀、排空、全管口物理盲板隔离，并通过 0% LEL / 20.9% O2 检测。',
      lessonFocus: '锁闭全部阀门与 MCC-801，排净罐底与蒸汽盘管，翻转三块盲板 (SB-1401/1402/1403)，测试 HS-801/PI-1401 后执行 GD-801。',
      takeaway: '绝不可仅靠关阀进入受限空间！可靠盲板隔离与合格气体检测是生命线。'
    },
    15: {
      title: '大师级停工检修 — 进料单元',
      targetName: 'P-901A + E-901 组合包（保持 P-901B 运行！）',
      standard: '大修级大师 LOTOTO',
      conceptTag: '全技能终极挑战 — 总决赛！',
      keepLiveRule: '保持备用进料泵 P-901B 持续向备用总管供料！',
      workScope: '终极认证！将进料泵 P-901A 与预热器 E-901 作为联合检修包彻底隔离，同时保持 P-901B 正常运行！',
      briefDesc: '集大成之战：共用带压总管、止回阀与调节阀陷阱、350 PSI 高压蒸汽 DBB、八字盲板、MCC 电源与气体检测。',
      lessonFocus: '条理清晰：(1) 锁闭 A 线、蒸汽 DBB 与 MCC-901A 且不切断 P-901B；(2) 打开导淋与排凝；(3) 翻转 SB-1501；(4) 完成全部测试验证。',
      takeaway: '恭喜晋升 LOTOTO 大师！严谨的 P&ID 隔离标记与零能量验证，守护着每一位现场作业人员的生命安全。'
    }
  });

  /* ==================== 日本語 (ja) ==================== */
  i18n.registerLevelLocale('ja', {
    1: {
      title: 'ポンプ軸封交換',
      targetName: '遠心ポンプ P-101',
      standard: '単弁遮断・ドレン',
      conceptTag: '基本 LOTOTO：施錠・脱圧・動作確認',
      workScope: 'P-101 の漏洩メカニカルシール交換。流体と電源を隔離し、ケーシングをドレンしてゼロエネルギーを確認。',
      briefDesc: '最初の作業許可です！P-101 は吸込・吐出両側が加圧されており、MCC-101 から 480V が供給されています。',
      lessonFocus: '吸込・吐出（背圧！）の両弁と MCC ブレーカーを施錠し、ドレン抜圧後、現場起動スイッチと圧力計で Tryout を行います。',
      takeaway: 'Tryout を決して省略しないでください！施錠後の起動テストと 0 PSI 確認が正しい隔離の証明になります。'
    },
    2: {
      title: 'ストレーナー清掃',
      targetName: 'インラインストレーナー S-102',
      standard: '遮断・ベント・ドレン',
      conceptTag: 'ガスベントと液ドレン抜圧',
      workScope: '異物清掃のため S-102 カバーを開放。両側を遮断し、ベント・ドレンを開放して 0 PSI を確認。',
      briefDesc: 'S-102 にモーターはありませんが加圧液が滞留しています。残圧のまま開放すると噴出事故につながります。',
      lessonFocus: '上下流の弁を施錠後、高点ベント (VT-201) と低点ドレン (DR-201) の両方を開けて完全脱圧します。',
      takeaway: '高点ベントで真空を破ることで、低点ドレンから内部液を完全に抜き切ることができます。'
    },
    3: {
      title: 'バイパスの罠',
      targetName: '移送ポンプ P-103',
      standard: '全系統エンベロープ隔離',
      conceptTag: '隠れたバイパス・暖機配管の追跡',
      workScope: 'P-103 インペラ分解。ポンプ吐出側へ直結する上部暖機バイパスに注意してください！',
      briefDesc: '多くのポンプには暖機・ミニマムフローバイパスがあります。主弁2つだけではバイパスから圧力が回り込みます。',
      lessonFocus: 'P&ID 上で対象機器に繋がるすべての枝管とライブ流体アニメーションを確認しましょう。',
      takeaway: 'ポンプの配管が2本だけと決めつけず、暖機・フラッシュ・循環バイパスを必ず確認しましょう。'
    },
    4: {
      title: '調節弁を信じるな',
      targetName: 'インラインヒーター E-401',
      standard: '手動弁による確実遮断',
      conceptTag: '調節弁 ≠ 有効な LOTO',
      workScope: '点検のため E-401 を隔離。上流に調節弁 FV-401 がありますが、隔離点として使用してはなりません！',
      briefDesc: '計器室から閉じた自動調節弁は内部リークや計装空気喪失での開動作リスクがあり、隔離点になりません。',
      lessonFocus: 'FV-401 は使わず、手動遮断弁 (V-401, V-402) と手動バイパス (V-403) を施錠しましょう。',
      takeaway: '安全基準上、自動調節弁は LOTO 遮断境界として禁止されています。必ず手動遮断弁を施錠します。'
    },
    5: {
      title: '逆止弁の錯覚',
      targetName: 'ブースターポンプ P-105',
      standard: '手動吐出遮断',
      conceptTag: '逆止弁 ≠ 隔離ポイント',
      workScope: 'P-105 軸受点検。逆止弁 CV-501 の下流には 185 PSI の吐出ヘッダー背圧があります。',
      briefDesc: 'CV-501 は停止時の逆流防止用であり、分解整備中に 185 PSI を安全に止める保証はありません。',
      lessonFocus: '逆止弁は施錠できず漏れやすいため LOTO 不可。下流の手動遮断弁 V-502 を施錠してください。',
      takeaway: '逆止弁はプロセス保護用であり人身安全用ではありません。必ず手動遮断弁を施錠します。'
    },
    6: {
      title: '並列ツインポンプ',
      targetName: 'ポンプ P-201A（P-201B 運転維持！）',
      standard: '選択的ライン隔離',
      conceptTag: '対象機のみ隔離・予備機稼働維持',
      keepLiveRule: '予備ポンプ P-201B のオンライン運転を維持してください！',
      workScope: '予備ポンプ P-201B でプラント運転を継続しながら、P-201A のみ隔離して軸受交換を行います。',
      briefDesc: '共通ヘッダーの元弁 V-600 を閉めると予備機まで停止しユニット全体がトリップします！',
      lessonFocus: 'P-201A 直近の局所遮断弁・MCC (V-601, V-602, MCC-201A) のみを施錠しましょう。',
      takeaway: '対象機器に最も近い隔離境界を選ぶことで、残液量と運転への影響を最小化できます。'
    },
    7: {
      title: '多管式熱交換器',
      targetName: '冷却器 E-301（胴側＋管側）',
      standard: '両側独立隔離',
      conceptTag: '2つの独立圧力室を隔離',
      workScope: 'E-301 チューブバンドル引抜き。高温プロセス（管側）と冷却水（胴側）の両方を隔離・ドレンしてください！',
      briefDesc: '熱交換器は内部に2系統の圧力流体を持ち、チューブ損傷時には別室へ圧力が漏洩します。',
      lessonFocus: 'オレンジ・シアンの両系統を隔離し、両側ドレンと2つの圧力計の 0 PSI 確認を行います。',
      takeaway: '熱交換器は常に複合エネルギー機器として扱い、片側開放でも両側を隔離します。'
    },
    8: {
      title: '重力水頭と高架タンク',
      targetName: '混合ドラム V-302',
      standard: '多ノズル・重力エネルギー施錠',
      conceptTag: '位置エネルギー（重力ヘッド）',
      workScope: 'V-302 液面計フランジ交換。上部高架タンクからの重力落下ヘッドを見落とさないでください！',
      briefDesc: 'ポンプが止まっていても高所のタンクは危険な静水圧を生みます。薬液入口・出口と合わせて隔離が必要です。',
      lessonFocus: '3本すべてのノズル (V-801 重力、V-802 薬液、V-803 出口) を施錠し、ベント・ドレンを開放します。',
      takeaway: '重力は音のないエネルギー源です。P&ID で上階タンクや高所配管を必ず確認しましょう。'
    },
    9: {
      title: 'ジャケット付撹拌反応器',
      targetName: '化学反応器 R-401',
      standard: 'マルチエネルギー LOTOTO',
      conceptTag: '機械＋熱＋化学エネルギー',
      workScope: 'R-401 撹拌翼点検。プロセス配管、蒸気ジャケット、480V 撹拌モーターをすべて隔離！',
      briefDesc: 'R-401 には加圧プロセス、150 PSI 蒸気ジャケット、480V 回転撹拌機の3大ハザードが共存します。',
      lessonFocus: '4弁＋MCC-401 を施錠し、槽内とジャケット双方を脱圧、起動スイッチと2つの圧力計を Tryout します。',
      takeaway: '複合エネルギー機器では電気・熱・化学それぞれのゼロエネルギー検証が不可欠です。'
    },
    10: {
      title: 'ダブルブロック＆ブリード (DBB)',
      targetName: '高圧ガスメーター M-501',
      standard: 'ダブルブロック＆ブリード (DBB)',
      conceptTag: '600 PSI 高圧炭化水素 DBB 基準',
      workScope: 'M-501 校正・取外し。600 PSI 高圧ガスのため上下流とも DBB 隔離が必須です！',
      briefDesc: '高圧・毒性流体では単弁では不十分。直列2弁を施錠し中間ブリード弁を開放して漏れゼロを証明します。',
      lessonFocus: '4つのブロック弁 (V-1001/1002 & V-1003/1004) を施錠し、BL-1001/1002 と VT-1001 を開け PI-1001 を確認。',
      takeaway: '中間ブリードの開放により一次弁のシート漏れを監視しつつ安全に逃がすことができます。'
    },
    11: {
      title: '確実遮断 — ライン開放作業',
      targetName: '酸リボイラー E-502',
      standard: '確実遮断（メガネブラインド）',
      conceptTag: '完全脱圧 → ブラインド反転',
      workScope: 'E-502 の火気溶接補修！弁閉止だけでは不十分であり、メガネブラインド (SB) の挿入が必須です。',
      briefDesc: '火気作業や腐食性ラインの開放には、フランジ間に鋼製閉止板を挿入する物理遮断が必要です。',
      lessonFocus: '手順厳守！まず V-1101/V-1102 を施錠し、ベント・ドレンで 0 PSI へ脱圧してから SB-1101/1102 を反転！',
      takeaway: '残圧がある状態でフランジを緩めてブラインドを回すことは重大事故の原因になります。'
    },
    12: {
      title: 'セパレーターと安全弁保護',
      targetName: '気液分離ドラム V-601',
      standard: '多ノズル＋PSV 保護',
      conceptTag: 'PSV 保護＋N2 逆止弁トラップ',
      workScope: 'デミスター交換のため V-601 を隔離。N2 逆止弁の罠に注意し、安全弁 (PSV) は絶対に閉めないでください！',
      briefDesc: 'V-601 には4本の加圧系統（入口・ガス・液・N2）と、過圧から守る PSV-1201 が接続されています。',
      lessonFocus: 'V-1201〜V-1204 を施錠（CV-1201 は無視）。PSV-1201 は常開のまま維持してください！',
      takeaway: '圧力源が繋がった機器の安全弁を遮断してはいけません。最後の過圧防護装置です。'
    },
    13: {
      title: '複合エネルギーガス圧縮機',
      targetName: '往復動圧縮機 K-701',
      standard: '多分野統合 LOTOTO',
      conceptTag: 'ガス＋リサイクル＋冷却水＋2系統 MCC',
      workScope: 'K-701 弁整備。ガス吸込/吐出、アンチサージ循環、冷却水、および2台のモーター（主機＋潤滑油ポンプ）を隔離！',
      briefDesc: '圧縮機は高圧ガス、循環ループ、吐出逆止弁、冷却水、さらに2つの独立電気回路を持ちます。',
      lessonFocus: '手動弁5つ＋MCC-701/702 を施錠し、ガスブローダウンと水ドレン、2つの起動スイッチと圧力計を確認。',
      takeaway: '潤滑油ポンプなどの補機は別電源盤から給電されることが多く、全電気系統の確認が必須です。'
    },
    14: {
      title: '密閉空間立入 — 貯蔵タンク',
      targetName: '炭化水素貯蔵タンク T-801',
      standard: '密閉空間・確実遮断',
      conceptTag: '全ノズル閉止板＋蒸気コイル＋ガス検知',
      workScope: 'T-801 内部溶接検査の立入作業！全プロセスノズルにブラインドを挿入し、コイルと撹拌機を隔離、ガス測定に合格せよ！',
      briefDesc: '密閉空間立入は最高レベルの LOTOTO 基準：施錠・ドレン・全ノズル物理ブラインド・0% LEL / 20.9% O2 確認が必須です。',
      lessonFocus: '全弁＋MCC-801 を施錠、タンクとコイルをドレン、SB-1401/1402/1403 を閉止、HS-801/PI-1401 確認後 GD-801 を実行。',
      takeaway: '閉止弁だけの隔離で密閉空間へ立ち入ってはいけません。物理遮断とガス検知が命を守ります。'
    },
    15: {
      title: 'マスター定修 — チャージユニット',
      targetName: 'P-901A + E-901 パッケージ（P-901B 稼働維持！）',
      standard: 'マスター定修 LOTOTO',
      conceptTag: '全スキル総動員 — 最終試験！',
      keepLiveRule: '予備ポンプ P-901B の代替ヘッダー向けオンライン運転を維持してください！',
      workScope: '最終認定試験！予備ポンプ P-901B を稼働維持したまま、P-901A と予熱器 E-901 を一体パッケージとして完全隔離せよ！',
      briefDesc: 'これまでの集大成：共通稼働ヘッダー、逆止弁・調節弁の罠、350 PSI 高圧蒸気 DBB、ブラインド、MCC、ガス検知。',
      lessonFocus: '手順通り：(1) P-901B を止めず A系統・蒸気DBB・MCC-901A を施錠；(2) ブリード＆ドレン；(3) SB-1501 反転；(4) 全 Tryout 完了。',
      takeaway: 'LOTOTO マスター認定おめでとうございます！綿密な P&ID マーキングとゼロエネルギー確認が仲間全員の安全を守ります。'
    }
  });
})(window);
