/* ==========================================================================
   LOTOTO MASTER — 15-Level Translations: Spanish, French, Portuguese, Italian
   ========================================================================== */
(function (global) {
  'use strict';

  const i18n = global.LOTOTO && global.LOTOTO.i18n;
  if (!i18n) return;

  /* ==================== ESPAÑOL (es) ==================== */
  i18n.registerLevelLocale('es', {
    1: {
      title: 'Cambio de Sello de Bomba',
      targetName: 'Bomba Centrífuga P-101',
      standard: 'Bloqueo Simple y Purga',
      conceptTag: 'LOTOTO Básico: Bloqueo, Drenaje y Prueba',
      workScope: 'Reemplazar el sello mecánico con fuga en P-101. Aísla energía hidráulica y eléctrica, drena la carcasa y verifica energía cero.',
      briefDesc: '¡Tu primer permiso de trabajo! La bomba P-101 tiene fluido vivo en succión y descarga, además de 480V desde MCC-101.',
      lessonFocus: 'Aísla SIEMPRE succión y descarga (¡contrapresión!), bloquea el interruptor eléctrico, drena el fluido atrapado y realiza Tryout en el botón local y manómetro.',
      takeaway: '¡Nunca omitas el Tryout! Intentar arrancar una bomba bloqueada y confirmar 0 PSI prueba que bloqueaste el equipo correcto.'
    },
    2: {
      title: 'Limpieza de Filtro Canasta',
      targetName: 'Filtro en Línea S-102',
      standard: 'Aislamiento, Venteo y Drenaje',
      conceptTag: 'Venteo de Vapor y Drenaje de Líquido',
      workScope: 'Abrir tapa del filtro para limpiar residuos. Aísla ambos lados, ventea presión atrapada, drena líquido y confirma 0 PSI.',
      briefDesc: 'El filtro S-102 no tiene motor eléctrico, pero retiene líquido presurizado. Abrir la tapa con presión atrapada provoca proyecciones graves.',
      lessonFocus: 'Tras bloquear ambas válvulas, abre el Venteo superior (VT-201) para romper vacío/aliviar gas Y el Drenaje inferior (DR-201) para vaciar líquido.',
      takeaway: 'Venteos altos y drenajes bajos trabajan juntos: ventear evita el vacío y permite drenar completamente el líquido.'
    },
    3: {
      title: 'La Trampa del Bypass',
      targetName: 'Bomba de Transferencia P-103',
      standard: 'Aislamiento Total de Envolvente',
      conceptTag: 'Rastreo de Líneas de Bypass y Calentamiento',
      workScope: 'Retirar impulsor en P-103. ¡Cuidado con la línea superior de bypass que conecta directo a la descarga de la bomba!',
      briefDesc: 'Muchas bombas tienen bypass de calentamiento o recirculación. Bloquear solo succión y descarga deja el bypass alimentando fluido vivo a la bomba.',
      lessonFocus: 'Rastrea CADA ramal conectado al equipo objetivo en el P&ID y observa la animación de flujo vivo.',
      takeaway: 'Nunca asumas que una bomba solo tiene dos conexiones: revisa siempre bypasses, líneas de lavado y recirculaciones.'
    },
    4: {
      title: 'No Confíes en Válvulas de Control',
      targetName: 'Calentador en Línea E-401',
      standard: 'Bloqueo Positivo Manual',
      conceptTag: 'Válvulas de Control ≠ LOTO Válido',
      workScope: 'Aislar el calentador E-401 para inspección. La válvula de control FV-401 está aguas arriba: ¡NO confíes en ella para aislar!',
      briefDesc: 'Cerrar una válvula automática desde sala de control NO aísla un equipo: sus asientos fugan y el actuador puede abrirse por falla.',
      lessonFocus: 'Ignora la válvula de control FV-401 y bloquea las válvulas manuales (V-401, V-402) más el bypass manual (V-403).',
      takeaway: 'Las normas de seguridad prohíben usar válvulas de control automáticas como barrera LOTO: bloquea siempre válvulas manuales.'
    },
    5: {
      title: 'La Ilusión de la Válvula Check',
      targetName: 'Bomba Booster P-105',
      standard: 'Aislamiento con Bloqueo Manual',
      conceptTag: 'Válvulas Check ≠ Puntos de Aislamiento',
      workScope: 'Inspeccionar rodamientos de P-105. El colector de descarga tiene 185 PSI detrás de la válvula check CV-501.',
      briefDesc: 'La válvula check CV-501 evita flujo inverso en paro, pero ¿puedes confiar en ella para contener 185 PSI mientras abren la bomba?',
      lessonFocus: '¡NUNCA confíes en una válvula check para LOTOTO! No se puede bloquear y suele fugar. Bloquea la válvula manual V-502.',
      takeaway: 'Las válvulas check protegen el proceso, NUNCA a las personas: bloquea siempre una válvula manual positiva.'
    },
    6: {
      title: 'Bombas Paralelas Gemelas',
      targetName: 'Bomba P-201A (¡Mantener P-201B VIVA!)',
      standard: 'Aislamiento Selectivo de Tren',
      conceptTag: 'Aislar Tren en Servicio · Respaldo Activo',
      keepLiveRule: '¡Mantén operando en línea la bomba de respaldo P-201B!',
      workScope: 'Aísla la bomba P-201A para cambio de rodamientos mientras P-201B mantiene la planta en marcha.',
      briefDesc: 'P-201A y P-201B comparten colectores de succión y descarga. Cerrar la válvula general V-600 detendría toda la unidad.',
      lessonFocus: 'Usa los límites locales más cercanos a P-201A (V-601, V-602, MCC-201A) para que P-201B siga bombeando sin interrupción.',
      takeaway: 'Un buen aislamiento LOTOTO es preciso y cercano al equipo objetivo para minimizar volumen atrapado e impacto operativo.'
    },
    7: {
      title: 'Intercambiador Carcasa y Tubos',
      targetName: 'Enfriador E-301 (Carcasa + Tubos)',
      standard: 'Aislamiento de Doble Lado',
      conceptTag: 'Aislar Dos Cámaras de Fluido Independientes',
      workScope: 'Extraer haz tubular de E-301. ¡Aísla y drena TANTO el Proceso Caliente (Tubos) COMO el Agua de Enfriamiento (Carcasa)!',
      briefDesc: 'Un intercambiador alberga dos sistemas presurizados separados. Tubos con fuga pueden transferir presión de un lado al otro.',
      lessonFocus: 'Aísla ambas corrientes (naranja y cian), drena ambos lados y confirma AMBOS manómetros en 0 PSI.',
      takeaway: 'Trata siempre los intercambiadores como equipos multifuente: un tubo roto puede liberar energía desde el lado opuesto.'
    },
    8: {
      title: 'Carga Gravitacional y Tanque Elevado',
      targetName: 'Tambor Mezclador V-302',
      standard: 'Bloqueo Multiboquilla por Gravedad',
      conceptTag: 'Energía Gravitacional Almacenada',
      workScope: 'Reemplazar brida de transmisor en V-302. ¡No olvides el tanque elevado que alimenta por gravedad desde arriba!',
      briefDesc: 'Incluso sin bombas encendidas, un tanque elevado genera presión hidrostática peligrosa además de la alimentación cáustica y salida.',
      lessonFocus: 'Bloquea las TRES boquillas — caída por gravedad (V-801), alimentación (V-802) y salida (V-803) — y luego ventea y drena.',
      takeaway: 'La gravedad es una fuente de energía silenciosa: revisa siempre niveles superiores y tanques elevados en el P&ID.'
    },
    9: {
      title: 'Reactor Encamisado con Agitador',
      targetName: 'Reactor Químico R-401',
      standard: 'LOTOTO Multienergía',
      conceptTag: 'Energía Mecánica + Térmica + Química',
      workScope: 'Inspeccionar aspas internas del agitador R-401. ¡Aísla proceso, camisa de vapor y motor eléctrico de 480V!',
      briefDesc: 'El reactor R-401 combina TRES peligros: proceso químico presurizado, vapor de 150 PSI en la camisa y motor agitador de 480V.',
      lessonFocus: 'Bloquea las 4 válvulas + MCC-401, libera presión del recipiente y de la camisa, y verifica el agitador y ambos manómetros.',
      takeaway: 'Los equipos multienergía exigen verificar cada disciplina: rotación eléctrica, vapor térmico y proceso químico.'
    },
    10: {
      title: 'Doble Bloqueo y Purga (DBB)',
      targetName: 'Medidor de Gas Alta Presión M-501',
      standard: 'Doble Bloqueo y Purga (DBB)',
      conceptTag: 'Estándar DBB de Hidrocarburos a 600 PSI',
      workScope: 'Calibrar y retirar medidor M-501. ¡El servicio de 600 PSI exige Doble Bloqueo y Purga en AMBOS lados!',
      briefDesc: 'En líneas de alta presión o tóxicas, una sola válvula no basta. DBB bloquea DOS válvulas en serie y abre una purga intermedia para probar hermeticidad.',
      lessonFocus: 'Bloquea las CUATRO válvulas (V-1001/1002 y V-1003/1004), abre AMBAS purgas (BL-1001/1002), ventea VT-1001 y verifica PI-1001.',
      takeaway: 'La purga abierta entre válvulas en un DBB demuestra cero paso y evacúa cualquier goteo antes de llegar al trabajador.'
    },
    11: {
      title: 'Aislamiento Positivo — Apertura de Línea',
      targetName: 'Rehervidor de Ácido E-502',
      standard: 'Aislamiento Positivo (Bridas Ciegas)',
      conceptTag: 'Despresurizar Primero → Girar Bridas Ciegas',
      workScope: '¡Soldadura y trabajo en caliente en E-502! Las válvulas no bastan: es obligatorio colocar Bridas Ciegas (SB).',
      briefDesc: 'Para trabajo en caliente o sustancias corrosivas, debes girar Bridas Ciegas sólidas de acero dentro de las bridas.',
      lessonFocus: '¡LA SECUENCIA IMPORTA! Primero bloquea V-1101 y V-1102, LUEGO ventea y drena a 0 PSI, y SOLO ENTONCES gira SB-1101 y SB-1102.',
      takeaway: 'Nunca abras una brida para girar una figura 8 mientras exista presión atrapada: despresuriza siempre a 0 PSI primero.'
    },
    12: {
      title: 'Separador Bifásico y Protección PSV',
      targetName: 'Separador Bifásico V-601',
      standard: 'Multiboquilla + Protección de Alivio',
      conceptTag: 'Protección PSV + Trampa Check de N2',
      workScope: 'Aislar separador V-601 para cambio de demister. ¡Cuidado con la check de Nitrógeno y NUNCA aísles la PSV!',
      briefDesc: 'V-601 tiene 4 conexiones vivas (proceso, gas, líquido y N2) más una Válvula de Seguridad PSV-1201 protegiendo el recipiente.',
      lessonFocus: 'Bloquea V-1201, V-1202, V-1203 y V-1204 (ignorando CV-1201). Deja ABIERTA la válvula PSV-1201.',
      takeaway: 'Nunca anules una válvula de alivio PSV en equipos conectados a fuentes vivas: es la última defensa contra una ruptura.'
    },
    13: {
      title: 'Compresor de Gas Multienergía',
      targetName: 'Compresor Reciprocante K-701',
      standard: 'LOTOTO Multidisciplinario',
      conceptTag: 'Gas + Reciclo + Agua + Dos MCC',
      workScope: 'Mantenimiento de válvulas en K-701. Aísla gas, reciclo antisurge, camisa de agua y AMBOS motores eléctricos (Principal + Bomba de Lubricación).',
      briefDesc: 'Los compresores reúnen gas a alta presión, lazo de reciclo, check de descarga, enfriamiento por agua y dos circuitos eléctricos independientes.',
      lessonFocus: 'Bloquea las 5 válvulas manuales + AMBOS interruptores (MCC-701/702), ventea gas, drena agua y prueba ambos botones y manómetro.',
      takeaway: 'Los patines auxiliares como bombas de aceite suelen tener tableros eléctricos separados: revisa siempre todos los circuitos.'
    },
    14: {
      title: 'Espacio Confinado — Tanque',
      targetName: 'Tanque de Almacenamiento T-801',
      standard: 'Aislamiento Positivo Espacio Confinado',
      conceptTag: 'Cegado Total + Serpentín + Prueba de Gas',
      workScope: '¡Ingreso de personal a T-801! Ciega TODAS las boquillas con Bridas Ciegas, aísla serpentín y mezclador, drena y aprueba el monitoreo de gases.',
      briefDesc: 'El ingreso a espacios confinados exige el máximo estándar LOTOTO: bloqueo, drenaje, cegado físico positivo en cada boquilla y medición LEL/O2.',
      lessonFocus: 'Bloquea todas las válvulas + MCC-801, drena tanque y serpentín, gira las TRES bridas ciegas (SB-1401/1402/1403), prueba HS-801/PI-1401 y ejecuta GD-801.',
      takeaway: '¡Nunca ingreses a un espacio confinado protegido solo por válvulas cerradas! El cegado físico y 0% LEL salvan vidas.'
    },
    15: {
      title: 'Parada Maestra — Unidad de Carga',
      targetName: 'Paquete P-901A + E-901 (¡P-901B VIVA!)',
      standard: 'LOTOTO Maestro de Parada',
      conceptTag: 'Todas las Habilidades — ¡Gran Final!',
      keepLiveRule: '¡Mantén la bomba de respaldo P-901B en línea hacia el colector alterno!',
      workScope: '¡Certificación final! Aísla la Bomba P-901A y el Precalentador E-901 en conjunto mientras P-901B sigue operando en línea.',
      briefDesc: 'Todo lo aprendido en un solo P&ID: colector compartido vivo, trampas check y control, DBB de vapor a 350 PSI, brida ciega, MCC y prueba de gas.',
      lessonFocus: 'Sé metódico: (1) bloquea tren A, DBB vapor y MCC-901A sin cortar P-901B; (2) abre purga y drenajes; (3) gira SB-1501; (4) completa todos los Tryout.',
      takeaway: '¡Felicidades, Maestro LOTOTO! El marcado metódico de P&ID y verificar energía cero protege a cada persona que confía en tu permiso.'
    }
  });

  /* ==================== FRANÇAIS (fr) ==================== */
  i18n.registerLevelLocale('fr', {
    1: {
      title: 'Remplacement Garniture Pompe',
      targetName: 'Pompe Centrifuge P-101',
      standard: 'Blocage Simple & Purge',
      conceptTag: 'LOTOTO de Base : Consigner, Purger, Tester',
      workScope: 'Remplacer la garniture mécanique de P-101. Isolez fluides et électricité, purgez le corps de pompe et vérifiez l\'énergie zéro.',
      briefDesc: 'Votre premier permis ! La pompe P-101 reçoit du fluide sous pression à l\'aspiration et au refoulement plus du 480V depuis MCC-101.',
      lessonFocus: 'Isolez TOUJOURS aspiration et refoulement (contre-pression !), cadenassez le disjoncteur, purgez, puis faites l\'Essai sur le bouton local et le manomètre.',
      takeaway: 'Ne sautez jamais l\'Essai (Tryout) ! Tenter de démarrer une pompe cadenassée et lire 0 PSI prouve que la bonne machine est isolée.'
    },
    2: {
      title: 'Nettoyage Filtre Panier',
      targetName: 'Filtre en Ligne S-102',
      standard: 'Isolement, Évent & Purge',
      conceptTag: 'Évent Vapeur & Purge Liquide',
      workScope: 'Ouvrir le couvercle du filtre S-102. Isolez les deux côtés, ouvrez l\'évent et la purge, puis confirmez 0 PSI.',
      briefDesc: 'Le filtre S-102 n\'a pas de moteur mais contient du liquide sous pression. L\'ouvrir sous pression piégée cause des projections graves.',
      lessonFocus: 'Après cadenassage amont/aval, ouvrez l\'Évent haut (VT-201) ET la Purge basse (DR-201) pour vider totalement le liquide.',
      takeaway: 'Évent haut et purge basse agissent ensemble : l\'évent casse le vide et permet une vidange complète.'
    },
    3: {
      title: 'Le Piège du By-Pass',
      targetName: 'Pompe de Transfert P-103',
      standard: 'Isolement Complet d\'Enveloppe',
      conceptTag: 'Tracer les Lignes de By-Pass Cachées',
      workScope: 'Déposer la roue de P-103. Méfiez-vous de la ligne de réchauffage en by-pass reliée directement au refoulement !',
      briefDesc: 'De nombreuses pompes possèdent un by-pass de maintien en température. Fermer uniquement aspiration et refoulement laisse le by-pass réalimenter la pompe !',
      lessonFocus: 'Suivez CHAQUE piquage connecté à l\'équipement cible sur le P&ID en observant l\'animation du flux actif.',
      takeaway: 'Ne supposez jamais qu\'une pompe n\'a que deux conduites : vérifiez toujours by-pass, rinçages et recirculations.'
    },
    4: {
      title: 'Ne Faites Pas Confiance aux Vannes de Régulation',
      targetName: 'Réchauffeur en Ligne E-401',
      standard: 'Blocage Manuel Positif',
      conceptTag: 'Vannes de Régulation ≠ LOTO Valide',
      workScope: 'Isoler le réchauffeur E-401. La vanne de régulation FV-401 est en amont : ne l\'utilisez PAS comme point de consignation !',
      briefDesc: 'Fermer une vanne automatique depuis la salle de contrôle n\'isole pas un équipement : les sièges fuient et l\'actionneur peut s\'ouvrir en défaut.',
      lessonFocus: 'Ignorez FV-401 et cadenassez les vannes manuelles (V-401, V-402) ainsi que le by-pass manuel (V-403).',
      takeaway: 'Les normes interdisent d\'utiliser une vanne de régulation comme barrière LOTO — cadenassez toujours des vannes manuelles.'
    },
    5: {
      title: 'L\'Illusion du Clapet Anti-Retour',
      targetName: 'Pompe Booster P-105',
      standard: 'Isolement par Vanne Manuelle',
      conceptTag: 'Clapets Anti-Retour ≠ Isolement',
      workScope: 'Inspecter les paliers de P-105. Le collecteur aval est à 185 PSI derrière le clapet CV-501.',
      briefDesc: 'Le clapet CV-501 freine le retour de fluide à l\'arrêt, mais peut-il retenir 185 PSI en toute sécurité pendant l\'ouverture de la pompe ?',
      lessonFocus: 'Ne comptez JAMAIS sur un clapet pour le LOTOTO : il fuit et ne se cadenasse pas. Cadenassez la vanne manuelle V-502.',
      takeaway: 'Un clapet protège le procédé, JAMAIS les intervenants : cadenassez toujours une vanne manuelle.'
    },
    6: {
      title: 'Pompes Parallèles Jumelles',
      targetName: 'Pompe P-201A (Garder P-201B ACTIVE !)',
      standard: 'Isolement Sélectif de Ligne',
      conceptTag: 'Isoler Pompe A · Maintenir Secours B',
      keepLiveRule: 'Maintenez la pompe de secours P-201B en fonctionnement !',
      workScope: 'Isolez P-201A pour remplacer ses roulements tout en laissant P-201B alimenter l\'usine.',
      briefDesc: 'P-201A et P-201B partagent les mêmes collecteurs. Fermer la vanne générale V-600 arrêterait toute l\'unité !',
      lessonFocus: 'Cadenassez les limites locales de P-201A (V-601, V-602, MCC-201A) afin que P-201B reste active.',
      takeaway: 'Une consignation chirurgicale au plus près de la machine réduit les volumes piégés et préserve la production.'
    },
    7: {
      title: 'Échangeur Calandre & Tubes',
      targetName: 'Refroidisseur E-301 (Calandre + Tubes)',
      standard: 'Isolement Double Circuit',
      conceptTag: 'Isoler Deux Chambres Indépendantes',
      workScope: 'Tirer le faisceau de E-301. Isolez et purgez le Procédé Chaud (Tubes) ET l\'Eau de Refroidissement (Calandre) !',
      briefDesc: 'Un échangeur renferme deux circuits sous pression distincts. Des tubes percés peuvent transférer la pression d\'un compartiment à l\'autre.',
      lessonFocus: 'Isolez les deux circuits (orange et cyan), purgez les deux côtés et vérifiez LES DEUX manomètres à 0 PSI.',
      takeaway: 'Considérez toujours un échangeur comme un équipement multi-sources : une fuite interne expose à l\'autre fluide.'
    },
    8: {
      title: 'Charge Gravitaire & Réservoir en Hauteur',
      targetName: 'Ballon Mélangeur V-302',
      standard: 'Consignation Multi-Piquages & Gravité',
      conceptTag: 'Énergie Gravitaire Stockée',
      workScope: 'Remplacer la bride de niveau sur V-302. N\'oubliez pas la cuve aérienne qui alimente par gravité !',
      briefDesc: 'Même pompe arrêtée, un réservoir en hauteur crée une pression statique dangereuse en plus de l\'alimentation caustique et de la sortie.',
      lessonFocus: 'Cadenassez les TROIS conduites (V-801 gravité, V-802 procédé, V-803 sortie), puis ouvrez évent et purge.',
      takeaway: 'La gravité est une énergie silencieuse : vérifiez toujours les étages supérieurs sur les P&ID.'
    },
    9: {
      title: 'Réacteur Agité Double Enveloppe',
      targetName: 'Réacteur Chimique R-401',
      standard: 'LOTOTO Multi-Énergies',
      conceptTag: 'Mécanique + Thermique + Chimique',
      workScope: 'Inspecter les pales de R-401. Isolez procédé, double enveloppe vapeur et moteur agitateur 480V !',
      briefDesc: 'R-401 combine TROIS dangers : procédé chimique sous pression, vapeur 150 PSI dans la double enveloppe et agitateur 480V.',
      lessonFocus: 'Cadenassez les 4 vannes + MCC-401, dépressurisez cuve et enveloppe, puis testez l\'agitateur et les deux manomètres.',
      takeaway: 'Les équipements multi-énergies exigent la vérification de chaque discipline : électrique, thermique et chimique.'
    },
    10: {
      title: 'Double Blocage & Purge (DBB)',
      targetName: 'Compteur Gaz Haute Pression M-501',
      standard: 'Double Blocage & Purge (DBB)',
      conceptTag: 'Standard DBB Hydrocarbures 600 PSI',
      workScope: 'Déposer et étalonner M-501. Le service 600 PSI impose un Double Blocage & Purge des DEUX côtés !',
      briefDesc: 'Sur lignes haute pression ou toxiques, une seule vanne ne suffit pas : le DBB verrouille DEUX vannes en série avec une purge intermédiaire ouverte.',
      lessonFocus: 'Cadenassez les QUATRE vannes (V-1001/1002 & V-1003/1004), ouvrez les purges BL-1001/1002, l\'évent VT-1001 et vérifiez PI-1001.',
      takeaway: 'La purge intermédiaire ouverte prouve l\'étanchéité de la première vanne et évacue tout suintement en sécurité.'
    },
    11: {
      title: 'Isolement Positif — Ouverture de Ligne',
      targetName: 'Rebouilleur Acide E-502',
      standard: 'Isolement Positif (Joints Pleins)',
      conceptTag: 'Dépressuriser d\'Abord → Poser Joints Pleins',
      workScope: 'Travaux par point chaud sur E-502 ! Des vannes seules ne suffisent pas : les Joints Lunettes (SB) sont obligatoires.',
      briefDesc: 'Pour soudure ou ouverture sur fluide corrosif, il faut tourner des joints pleins en acier dans les brides.',
      lessonFocus: 'L\'ORDRE COMPTE ! Cadenassez V-1101/V-1102, PUIS dépressurisez à 0 PSI, et ENSUITE SEULEMENT tournez SB-1101 et SB-1102.',
      takeaway: 'N\'ouvrez jamais une bride pour tourner un joint lunette tant qu\'il reste de la pression piégée.'
    },
    12: {
      title: 'Ballon Séparateur & Protection PSV',
      targetName: 'Séparateur Diphasique V-601',
      standard: 'Multi-Piquages + Sûreté PSV',
      conceptTag: 'Protection PSV + Piège Clapet N2',
      workScope: 'Isoler V-601 pour remplacer le dévésiculeur. Attention au clapet d\'azote et ne fermez JAMAIS la PSV !',
      briefDesc: 'V-601 possède 4 conduites actives (procédé, gaz, liquide, N2) ainsi qu\'une soupape PSV-1201 protégeant le ballon.',
      lessonFocus: 'Cadenassez V-1201, V-1202, V-1203 et V-1204 (sans toucher CV-1201). Laissez PSV-1201 OUVERTE !',
      takeaway: 'N\'isolez jamais une soupape de sûreté sur un appareil encore relié à des sources actives.'
    },
    13: {
      title: 'Compresseur Gaz Multi-Énergies',
      targetName: 'Compresseur Alternatif K-701',
      standard: 'LOTOTO Multi-Disciplines',
      conceptTag: 'Gaz + Recyclage + Eau + Double MCC',
      workScope: 'Révision clapets sur K-701. Isolez gaz, recyclage anti-pompage, eau de refroidissement et LES DEUX moteurs (Principal + Pompe Huile).',
      briefDesc: 'Un compresseur cumule gaz haute pression, boucle de recyclage, clapet refoulement, circuit d\'eau et deux départs électriques.',
      lessonFocus: 'Cadenassez les 5 vannes manuelles + MCC-701 & MCC-702, décomprimez, purgez l\'eau et testez les deux boutons et le manomètre.',
      takeaway: 'Les auxiliaires (lubrification) ont souvent leur propre disjoncteur : vérifiez tous les départs électriques.'
    },
    14: {
      title: 'Espace Confiné — Réservoir',
      targetName: 'Bac de Stockage T-801',
      standard: 'Isolement Positif Espace Confiné',
      conceptTag: 'Joints Pleins + Serpentin + Test Gaz',
      workScope: 'Entrée de personnel dans T-801 ! Posez des joints pleins sur TOUS les piquages procédé, isolez serpentin & agitateur, purgez et validez le test gaz.',
      briefDesc: 'L\'entrée en espace confiné impose le niveau LOTOTO maximal : cadenassage, vidange, joints pleins physiques partout et contrôle 0% LIE / 20.9% O2.',
      lessonFocus: 'Cadenassez toutes les vannes + MCC-801, purgez bac & serpentin, posez SB-1401/1402/1403, testez HS-801/PI-1401 puis GD-801.',
      takeaway: 'N\'entrez jamais dans un espace confiné protégé par de simples vannes : joints pleins et contrôle atmosphérique sauvent des vies.'
    },
    15: {
      title: 'Grand Arrêt — Unité de Charge',
      targetName: 'Ensemble P-901A + E-901 (P-901B ACTIVE !)',
      standard: 'LOTOTO Maître d\'Arrêt',
      conceptTag: 'Toutes Compétences Réunies — Finale !',
      keepLiveRule: 'Maintenez la pompe de secours P-901B en ligne vers le collecteur alterné !',
      workScope: 'Certification finale ! Isolez ensemble P-901A et E-901 tout en gardant P-901B en service continu.',
      briefDesc: 'Tout ce que vous avez appris réuni : collecteur actif, pièges clapet & régulation, DBB vapeur 350 PSI, joint plein, MCC et test gaz.',
      lessonFocus: 'Procédez avec méthode : (1) cadenassez train A, DBB vapeur & MCC-901A sans couper P-901B ; (2) purgez ; (3) posez SB-1501 ; (4) faites tous les Essais.',
      takeaway: 'Félicitations, Maître LOTOTO ! Un surlignage rigoureux et la vérification d\'énergie zéro protègent toute l\'équipe.'
    }
  });

  /* ==================== PORTUGUÊS (pt) ==================== */
  i18n.registerLevelLocale('pt', {
    1: {
      title: 'Troca de Selo da Bomba',
      targetName: 'Bomba Centrífuga P-101',
      standard: 'Bloqueio Simples e Dreno',
      conceptTag: 'LOTOTO Básico: Bloquear, Drenar e Testar',
      workScope: 'Substituir selo mecânico de P-101. Isole energia hidráulica e elétrica, drene a carcaça e confirme energia zero.',
      briefDesc: 'Sua primeira permissão! A bomba P-101 possui fluido pressurizado na sucção e descarga além de 480V do MCC-101.',
      lessonFocus: 'Isole SEMPRE sucção e descarga (contrapressão!), trave o disjuntor, drene o fluido retido e faça Tryout na botoeira e manômetro.',
      takeaway: 'Nunca pule o Tryout! Tentar partir a bomba travada e confirmar 0 PSI prova que o equipamento correto foi bloqueado.'
    },
    2: {
      title: 'Limpeza do Filtro Cesto',
      targetName: 'Filtro em Linha S-102',
      standard: 'Isolar, Ventilar e Drenar',
      conceptTag: 'Ventilação de Gás e Drenagem de Líquido',
      workScope: 'Abrir tampa do filtro S-102 para limpeza. Isole ambos os lados, ventile a pressão, drene o líquido e confirme 0 PSI.',
      briefDesc: 'O filtro S-102 não possui motor, mas retém líquido sob pressão. Abrir com pressão aprisionada causa projeção grave.',
      lessonFocus: 'Após travar as válvulas de bloqueio, abra o Vent superior (VT-201) E o Dreno inferior (DR-201) para esvaziar completamente.',
      takeaway: 'Vents altos e drenos baixos atuam juntos: ventilar quebra o vácuo e permite drenagem total.'
    },
    3: {
      title: 'A Armadilha do Bypass',
      targetName: 'Bomba de Transferência P-103',
      standard: 'Isolamento Total do Envelope',
      conceptTag: 'Rastreamento de Linhas de Bypass',
      workScope: 'Retirar rotor de P-103. Atenção à linha superior de bypass ligada diretamente à descarga da bomba!',
      briefDesc: 'Muitas bombas têm bypass de aquecimento ou recirculação. Travar apenas sucção e descarga deixa fluido vivo retornar pelo bypass.',
      lessonFocus: 'Rastreie CADA ramal conectado ao equipamento no P&ID observando o fluxo animado.',
      takeaway: 'Nunca presuma apenas duas conexões numa bomba: verifique sempre bypasses, linhas de flush e recirculação.'
    },
    4: {
      title: 'Não Confie em Válvulas de Controle',
      targetName: 'Aquecedor em Linha E-401',
      standard: 'Bloqueio Manual Positivo',
      conceptTag: 'Válvulas de Controle ≠ LOTO Válido',
      workScope: 'Isolar aquecedor E-401. A válvula de controle FV-401 fica a montante — NÃO confie nela como isolamento!',
      briefDesc: 'Fechar uma válvula automática pela sala de controle não garante isolamento: sedes vazam e atuadores podem abrir por falha.',
      lessonFocus: 'Ignore FV-401 e trave as válvulas manuais (V-401, V-402) e o bypass manual (V-403).',
      takeaway: 'Normas de segurança proíbem válvulas de controle como barreira LOTO — bloqueie sempre válvulas manuais.'
    },
    5: {
      title: 'A Ilusão da Válvula de Retenção',
      targetName: 'Bomba Booster P-105',
      standard: 'Bloqueio Manual na Descarga',
      conceptTag: 'Válvulas de Retenção ≠ Isolamento',
      workScope: 'Inspecionar mancais de P-105. O header de descarga tem 185 PSI atrás da retenção CV-501.',
      briefDesc: 'A retenção CV-501 evita retorno no desligamento, mas não pode segurar 185 PSI com segurança durante manutenção.',
      lessonFocus: 'NUNCA confie numa válvula de retenção para LOTOTO! Trave a válvula manual V-502.',
      takeaway: 'Válvulas de retenção protegem o processo, NUNCA pessoas: use sempre uma válvula manual cadeada.'
    },
    6: {
      title: 'Bombas Paralelas Gêmeas',
      targetName: 'Bomba P-201A (Manter P-201B VIVA!)',
      standard: 'Isolamento Seletivo de Trem',
      conceptTag: 'Isolar Bomba A · Manter Reserva B',
      keepLiveRule: 'Mantenha a bomba reserva P-201B operando normalmente!',
      workScope: 'Isole P-201A para troca de rolamentos mantendo a bomba reserva P-201B em operação contínua.',
      briefDesc: 'P-201A e P-201B compartilham sucção e descarga. Fechar a válvula geral V-600 pararia toda a unidade!',
      lessonFocus: 'Trave apenas os bloqueios locais de P-201A (V-601, V-602, MCC-201A) mantendo P-201B em marcha.',
      takeaway: 'Um bom limite LOTOTO é cirúrgico e próximo ao equipamento alvo, evitando paradas desnecessárias.'
    },
    7: {
      title: 'Trocador Casco e Tubos',
      targetName: 'Resfriador E-301 (Casco + Tubos)',
      standard: 'Isolamento Duplo Lado',
      conceptTag: 'Isolar Duas Câmaras Independentes',
      workScope: 'Sacar feixe tubular de E-301. Isole e drene TANTO Processo Quente (Tubos) QUANTO Água de Resfriamento (Casco)!',
      briefDesc: 'Um trocador abriga dois sistemas pressurizados distintos. Tubos furados podem transferir pressão de um lado ao outro.',
      lessonFocus: 'Isole ambos os fluxos (laranja e ciano), drene os dois lados e confirme AMBOS os manômetros em 0 PSI.',
      takeaway: 'Trate trocadores sempre como equipamentos multifonte: vazamentos internos cruzam energia entre casco e tubos.'
    },
    8: {
      title: 'Pressão Gravitacional e Tanque Elevado',
      targetName: 'Vaso Misturador V-302',
      standard: 'Bloqueio Multi-Bocal e Gravidade',
      conceptTag: 'Energia Gravitacional Armazenada',
      workScope: 'Trocar flange de nível em V-302. Não esqueça o tanque elevado alimentando por gravidade de cima!',
      briefDesc: 'Mesmo sem bombas, um tanque elevado cria coluna hidrostática perigosa além da alimentação química e saída.',
      lessonFocus: 'Trave os TRÊS bocais (V-801 gravidade, V-802 cáustico, V-803 saída), depois ventile e drene.',
      takeaway: 'A gravidade é uma energia silenciosa: cheque sempre andares superiores e tanques elevados no P&ID.'
    },
    9: {
      title: 'Reator Encamisado com Agitador',
      targetName: 'Reator Químico R-401',
      standard: 'LOTOTO Multienergia',
      conceptTag: 'Mecânica + Térmica + Química',
      workScope: 'Inspecionar pás do agitador R-401. Isole processo, camisa de vapor e motor elétrico de 480V!',
      briefDesc: 'R-401 reúne TRÊS energias: processo químico pressurizado, vapor a 150 PSI na camisa e motor agitador de 480V.',
      lessonFocus: 'Trave as 4 válvulas + MCC-401, despressurize vaso e camisa, e faça Tryout no agitador e nos dois manômetros.',
      takeaway: 'Equipamentos multienergia exigem verificação em todas as disciplinas: elétrica, térmica e de processo.'
    },
    10: {
      title: 'Duplo Bloqueio e Dreno (DBB)',
      targetName: 'Medidor de Gás Alta Pressão M-501',
      standard: 'Duplo Bloqueio e Dreno (DBB)',
      conceptTag: 'Padrão DBB 600 PSI',
      workScope: 'Retirar e calibrar M-501. Serviço a 600 PSI exige Duplo Bloqueio e Dreno em AMBOS os lados!',
      briefDesc: 'Em linhas de alta pressão ou tóxicas, uma válvula não basta. O DBB trava DUAS válvulas em série com um dreno intermediário aberto.',
      lessonFocus: 'Trave as QUATRO válvulas (V-1001/1002 e V-1003/1004), abra BL-1001/1002 e VT-1001, e confirme PI-1001.',
      takeaway: 'O dreno intermediário aberto comprova estanqueidade e desvia qualquer passagem com segurança.'
    },
    11: {
      title: 'Isolamento Positivo — Abertura de Linha',
      targetName: 'Refervedor de Ácido E-502',
      standard: 'Isolamento Positivo (Raquetes)',
      conceptTag: 'Despressurizar Primeiro → Virar Raquetes',
      workScope: 'Trabalho a quente em E-502! Válvulas não bastam — é obrigatório virar Raquetes (SB).',
      briefDesc: 'Para solda ou quebra de contenção em ácido, é necessário inserir discos cegos sólidos nos flanges.',
      lessonFocus: 'SEQUÊNCIA IMPORTA! Trave V-1101/V-1102, DEPOIS ventile e drene até 0 PSI, e SÓ ENTÃO vire SB-1101 e SB-1102.',
      takeaway: 'Nunca abra um flange para raquetear com pressão retida: despressurize sempre a 0 PSI primeiro.'
    },
    12: {
      title: 'Vaso Separador e Proteção PSV',
      targetName: 'Separador Bifásico V-601',
      standard: 'Multi-Bocal + Alívio PSV',
      conceptTag: 'Proteção PSV + Armadilha Retenção N2',
      workScope: 'Isolar separador V-601 para troca de demister. Atenção à retenção de N2 e NUNCA feche a PSV!',
      briefDesc: 'V-601 possui 4 conexões vivas (processo, gás, líquido e N2) além da válvula de segurança PSV-1201.',
      lessonFocus: 'Trave V-1201, V-1202, V-1203 e V-1204 (ignorando CV-1201). Mantenha PSV-1201 ABERTA!',
      takeaway: 'Nunca bloqueie uma PSV em vaso ligado a fontes vivas — ela é a última proteção contra ruptura.'
    },
    13: {
      title: 'Compressor de Gás Multienergia',
      targetName: 'Compressor Alternativo K-701',
      standard: 'LOTOTO Multidisciplinar',
      conceptTag: 'Gás + Reciclo + Água + Dois MCCs',
      workScope: 'Revisar válvulas do compressor K-701. Isole gás, reciclo, água de resfriamento e AMBOS motores (Principal + Bomba de Óleo).',
      briefDesc: 'Compressores combinam gás em alta pressão, loop de reciclo, retenção na descarga, água e dois alimentadores elétricos.',
      lessonFocus: 'Trave as 5 válvulas + MCC-701 e MCC-702, alise gás, drene água e teste ambas botoeiras e manômetro.',
      takeaway: 'Skids auxiliares como bombas de óleo costumam ter disjuntores separados: confira todos os circuitos!'
    },
    14: {
      title: 'Espaço Confinado — Tanque',
      targetName: 'Tanque de Armazenamento T-801',
      standard: 'Isolamento Positivo Espaço Confinado',
      conceptTag: 'Raqueteamento Total + Serpentina + Gás',
      workScope: 'Entrada de equipe em T-801! Raqueteie TODOS os bocais, isole serpentina e misturador, drene e aprove o Teste de Gases.',
      briefDesc: 'Entrada em espaço confinado exige padrão máximo LOTOTO: bloqueio, drenagem, raquetes sólidas em todos os bocais e medição 0% LIE / 20.9% O2.',
      lessonFocus: 'Trave válvulas + MCC-801, drene tanque e serpentina, vire SB-1401/1402/1403, teste HS-801/PI-1401 e execute GD-801.',
      takeaway: 'Nunca entre em espaço confinado protegido apenas por válvulas: raquetes físicas e medição atmosférica salvam vidas.'
    },
    15: {
      title: 'Parada Mestre — Unidade de Carga',
      targetName: 'Conjunto P-901A + E-901 (P-901B VIVA!)',
      standard: 'LOTOTO Mestre de Parada',
      conceptTag: 'Todas as Habilidades — Grande Final!',
      keepLiveRule: 'Mantenha a bomba reserva P-901B operando para o header alterno!',
      workScope: 'Certificação final! Isole P-901A e E-901 juntos mantendo a bomba reserva P-901B online.',
      briefDesc: 'Tudo reunido num só P&ID: header vivo, retenção e controle, DBB de vapor 350 PSI, raquete, MCC e teste de gás.',
      lessonFocus: 'Siga com método: (1) trave trem A, DBB vapor e MCC-901A sem parar P-901B; (2) drene; (3) vire SB-1501; (4) conclua todos os Tryouts.',
      takeaway: 'Parabéns, Mestre LOTOTO! Marcação rigorosa no P&ID e verificação de energia zero protegem cada trabalhador.'
    }
  });

  /* ==================== ITALIANO (it) ==================== */
  i18n.registerLevelLocale('it', {
    1: {
      title: 'Sostituzione Tenuta Pompa',
      targetName: 'Pompa Centrifuga P-101',
      standard: 'Blocco Singolo e Drenaggio',
      conceptTag: 'LOTOTO Base: Blocco, Drenaggio e Prova',
      workScope: 'Sostituire la tenuta meccanica di P-101. Isola fluido ed elettricità, drena il corpo pompa e verifica energia zero.',
      briefDesc: 'Il tuo primo permesso! P-101 ha fluido in pressione su aspirazione e mandata oltre a 480V da MCC-101.',
      lessonFocus: 'Isola SEMPRE aspirazione e mandata (contropressione!), blocca l\'MCC, drena ed esegui il Tryout su pulsante locale e manometro.',
      takeaway: 'Non saltare mai il Tryout! Provare ad avviare la pompa bloccata e leggere 0 PSI dimostra che l\'isolamento è reale.'
    },
    2: {
      title: 'Pulizia Filtro a Cestello',
      targetName: 'Filtro in Linea S-102',
      standard: 'Isola, Sfiata e Drena',
      conceptTag: 'Sfiato Gas e Drenaggio Liquido',
      workScope: 'Aprire il coperchio di S-102 per pulizia. Isola entrambi i lati, sfiata la pressione, drena il liquido e verifica 0 PSI.',
      briefDesc: 'S-102 non ha motore ma trattiene liquido in pressione. Aprire con pressione residua provoca spruzzi pericolosi.',
      lessonFocus: 'Dopo aver lucchettato monte e valle, apri Sfiato alto (VT-201) E Drenaggio basso (DR-201) per svuotare completamente.',
      takeaway: 'Sfiato in alto e drenaggio in basso lavorano insieme: sfiatare rompe il vuoto e consente lo svuotamento completo.'
    },
    3: {
      title: 'La Trappola del Bypass',
      targetName: 'Pompa di Trasferimento P-103',
      standard: 'Isolamento Completo dell\'Inviluppo',
      conceptTag: 'Individuare Linee di Bypass Nascoste',
      workScope: 'Smontare la girante di P-103. Attenzione alla linea di bypass superiore collegata direttamente alla mandata!',
      briefDesc: 'Molte pompe hanno bypass di riscaldamento o ricircolo. Bloccare solo aspirazione e mandata lascia rientrare fluido dal bypass.',
      lessonFocus: 'Segui OGNI diramazione collegata alla pompa sul P&ID osservando il flusso animato.',
      takeaway: 'Non presumere mai solo due connessioni su una pompa: controlla sempre bypass, lavaggi e ricircoli.'
    },
    4: {
      title: 'Non Fidarti delle Valvole di Regolazione',
      targetName: 'Riscaldatore in Linea E-401',
      standard: 'Blocco Manuale Positivo',
      conceptTag: 'Valvole di Regolazione ≠ LOTO Valido',
      workScope: 'Isolare il riscaldatore E-401. La valvola di regolazione FV-401 è a monte: NON usarla come isolamento!',
      briefDesc: 'Chiudere una valvola automatica da sala controllo non isola l\'apparecchio: le sedi trafilano e l\'attuatore può aprirsi per guasto.',
      lessonFocus: 'Evita FV-401 e lucchetta le valvole manuali (V-401, V-402) più il bypass manuale (V-403).',
      takeaway: 'Le norme vietano l\'uso di valvole di regolazione come barriera LOTO: blocca sempre valvole manuali.'
    },
    5: {
      title: 'L\'Illusione della Valvola di Ritegno',
      targetName: 'Pompa Booster P-105',
      standard: 'Blocco Manuale in Mandata',
      conceptTag: 'Valvole di Ritegno ≠ Isolamento',
      workScope: 'Ispezionare i cuscinetti di P-105. Il collettore di mandata è a 185 PSI dietro il ritegno CV-501.',
      briefDesc: 'CV-501 frena il riflusso a pompa ferma, ma non può trattenere in sicurezza 185 PSI mentre si apre la macchina.',
      lessonFocus: 'Non fidarti MAI di una valvola di ritegno per il LOTOTO! Lucchetta la valvola manuale V-502.',
      takeaway: 'Le valvole di ritegno proteggono il processo, MAI le persone: blocca sempre una valvola manuale.'
    },
    6: {
      title: 'Pompe Gemelle in Parallelo',
      targetName: 'Pompa P-201A (Mantieni P-201B ATTIVA!)',
      standard: 'Isolamento Selettivo di Treno',
      conceptTag: 'Isola Pompa A · Riserva B in Marcia',
      keepLiveRule: 'Mantieni la pompa di riserva P-201B in marcia online!',
      workScope: 'Isola P-201A per sostituire i cuscinetti lasciando P-201B in servizio continuo.',
      briefDesc: 'P-201A e P-201B condividono collettori di aspirazione e mandata. Chiudere la valvola generale V-600 fermerebbe l\'unità!',
      lessonFocus: 'Lucchetta solo i blocchi locali di P-201A (V-601, V-602, MCC-201A) lasciando P-201B attiva.',
      takeaway: 'Un isolamento LOTOTO preciso e vicino all\'apparecchio riduce volumi residui e fermate inutili.'
    },
    7: {
      title: 'Scambiatore a Fascio Tubiero',
      targetName: 'Scambiatore E-301 (Mantello + Tubi)',
      standard: 'Isolamento Doppio Lato',
      conceptTag: 'Isolare Due Camere Indipendenti',
      workScope: 'Estrarre il fascio tubiero di E-301. Isola e drena SIA Processo Caldo (Tubi) CHE Acqua di Raffreddamento (Mantello)!',
      briefDesc: 'Uno scambiatore contiene due circuiti pressurizzati separati. Tubi forati possono trasferire pressione tra le camere.',
      lessonFocus: 'Isola entrambi i circuiti (arancio e ciano), drena i due lati e verifica ENTRAMBI i manometri a 0 PSI.',
      takeaway: 'Considera sempre gli scambiatori apparecchi multi-sorgente: perdite interne collegano mantello e tubi.'
    },
    8: {
      title: 'Battente Gravitazionale e Serbatoio Alto',
      targetName: 'Serbatoio Miscelatore V-302',
      standard: 'Blocco Multi-Bocchello e Gravità',
      conceptTag: 'Energia Gravitazionale Immagazzinata',
      workScope: 'Sostituire flangia di livello su V-302. Non dimenticare il serbatoio sopraelevato che alimenta per gravità!',
      briefDesc: 'Anche a pompe ferme, un serbatoio in quota crea pressione idrostatica pericolosa oltre all\'alimentazione chimica e all\'uscita.',
      lessonFocus: 'Lucchetta TUTTI E TRE i bocchelli (V-801 gravità, V-802 caustica, V-803 uscita), poi sfiata e drena.',
      takeaway: 'La gravità è un\'energia silenziosa: controlla sempre i piani superiori e i serbatoi in quota sul P&ID.'
    },
    9: {
      title: 'Reattore Incamiciato con Agitatore',
      targetName: 'Reattore Chimico R-401',
      standard: 'LOTOTO Multi-Energia',
      conceptTag: 'Meccanica + Termica + Chimica',
      workScope: 'Ispezionare pale dell\'agitatore R-401. Isola processo, camicia vapore e motore 480V!',
      briefDesc: 'R-401 unisce TRE pericoli: processo chimico in pressione, vapore 150 PSI in camicia e agitatore 480V.',
      lessonFocus: 'Lucchetta le 4 valvole + MCC-401, scarica pressione da reattore e camicia, poi esegui Tryout su agitatore e manometri.',
      takeaway: 'Gli impianti multi-energia richiedono la verifica di ogni disciplina: elettrica, termica e chimica.'
    },
    10: {
      title: 'Doppio Blocco e Spurgo (DBB)',
      targetName: 'Misuratore Gas Alta Pressione M-501',
      standard: 'Doppio Blocco e Spurgo (DBB)',
      conceptTag: 'Standard DBB 600 PSI',
      workScope: 'Tarare e rimuovere M-501. Il servizio a 600 PSI richiede Doppio Blocco e Spurgo su ENTRAMBI i lati!',
      briefDesc: 'Su linee ad alta pressione o tossiche una sola valvola non basta: il DBB blocca DUE valvole in serie con spurgo intermedio aperto.',
      lessonFocus: 'Lucchetta tutte e QUATTRO le valvole (V-1001/1002 e V-1003/1004), apri BL-1001/1002 e VT-1001, poi verifica PI-1001.',
      takeaway: 'Lo spurgo intermedio aperto dimostra la tenuta della prima valvola e scarica in sicurezza eventuali trafilamenti.'
    },
    11: {
      title: 'Isolamento Positivo — Apertura Linea',
      targetName: 'Ribollitore Acido E-502',
      standard: 'Isolamento Positivo (Dischi Ciechi)',
      conceptTag: 'Depressurizza Prima → Inserisci Dischi Ciechi',
      workScope: 'Lavori a caldo su E-502! Le valvole non bastano: servono Dischi a 8 / Ciechi (SB).',
      briefDesc: 'Per saldature o apertura su fluidi corrosivi è obbligatorio ruotare dischi ciechi pieni tra le flange.',
      lessonFocus: 'LA SEQUENZA CONTA! Lucchetta V-1101/V-1102, POI sfiata e drena a 0 PSI, e SOLO DOPO ruota SB-1101 e SB-1102.',
      takeaway: 'Non aprire mai una flangia per ciecare una linea se esiste ancora pressione residua.'
    },
    12: {
      title: 'Separatore Bifase e Protezione PSV',
      targetName: 'Separatore Bifase V-601',
      standard: 'Multi-Bocchello + Sicurezza PSV',
      conceptTag: 'Protezione PSV + Trappola Ritegno N2',
      workScope: 'Isolare V-601 per cambio demister. Attenzione al ritegno N2 e NON chiudere mai la PSV!',
      briefDesc: 'V-601 ha 4 linee attive (processo, gas, liquido, N2) più una valvola di sicurezza PSV-1201 a protezione del recipiente.',
      lessonFocus: 'Lucchetta V-1201, V-1202, V-1203 e V-1204 (ignorando CV-1201). Lascia APERTA PSV-1201!',
      takeaway: 'Non isolare mai una valvola di sicurezza PSV su apparecchi collegati a fonti attive.'
    },
    13: {
      title: 'Compressore Gas Multi-Energia',
      targetName: 'Compressore Alternativo K-701',
      standard: 'LOTOTO Multidisciplinare',
      conceptTag: 'Gas + Riciclo + Acqua + Doppio MCC',
      workScope: 'Revisione valvole su K-701. Isola gas, riciclo, acqua di raffreddamento ed ENTRAMBI i motori (Principale + Pompa Olio).',
      briefDesc: 'Un compressore combina gas in pressione, loop di riciclo, ritegno in mandata, acqua e due alimentazioni elettriche.',
      lessonFocus: 'Lucchetta le 5 valvole + MCC-701 e MCC-702, scarica gas, drena acqua e testa entrambi i pulsanti e il manometro.',
      takeaway: 'Gli ausiliari (pompe olio) hanno spesso interruttori separati: verifica sempre tutti i quadri elettrici.'
    },
    14: {
      title: 'Spazio Confinato — Serbatoio',
      targetName: 'Serbatoio di Stoccaggio T-801',
      standard: 'Isolamento Positivo Spazio Confinato',
      conceptTag: 'Ciecatura Totale + Serpentina + Test Gas',
      workScope: 'Ingresso personale in T-801! Cieca TUTTI i bocchelli di processo, isola serpentina e miscelatore, drena ed esegui il Test Gas.',
      briefDesc: 'L\'ingresso in spazio confinato richiede il massimo standard LOTOTO: blocco, drenaggio, dischi ciechi su ogni bocchello e controllo 0% LEL / 20.9% O2.',
      lessonFocus: 'Lucchetta tutte le valvole + MCC-801, drena serbatoio e serpentina, ruota SB-1401/1402/1403, testa HS-801/PI-1401 e poi GD-801.',
      takeaway: 'Non entrare mai in uno spazio confinato protetto solo da valvole chiuse: dischi ciechi e analisi gas salvano vite.'
    },
    15: {
      title: 'Fermata Generale — Unità di Carica',
      targetName: 'Pacchetto P-901A + E-901 (P-901B ATTIVA!)',
      standard: 'LOTOTO Master di Fermata',
      conceptTag: 'Tutte le Competenze — Gran Finale!',
      keepLiveRule: 'Mantieni la pompa di riserva P-901B in marcia sul collettore alternativo!',
      workScope: 'Certificazione finale! Isola P-901A ed E-901 insieme mantenendo P-901B attiva online.',
      briefDesc: 'Tutto insieme in un unico P&ID: collettore attivo, trappole ritegno e regolazione, DBB vapore 350 PSI, disco cieco, MCC e test gas.',
      lessonFocus: 'Procedi con metodo: (1) blocca treno A, DBB vapore e MCC-901A senza fermare P-901B; (2) drena; (3) ruota SB-1501; (4) completa tutti i Tryout.',
      takeaway: 'Complimenti, Maestro LOTOTO! Marcatura rigorosa sul P&ID e verifica di energia zero proteggono l\'intera squadra.'
    }
  });
})(window);
