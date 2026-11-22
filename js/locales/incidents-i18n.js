/* ==========================================================================
   LOTOTO MASTER — HSE Incident Consequence & Process Sequencing i18n
   All 9 languages: en, es, fr, pt, de, sv, zh, ja, it
   ========================================================================== */
(function (global) {
  'use strict';

  const i18n = global.LOTOTO && global.LOTOTO.i18n;
  if (!i18n) return;

  /* ==================== ENGLISH (en) ==================== */
  i18n.registerLocale('en', {
    inc_badge_fatal: 'CRITICAL HSE INCIDENT — POTENTIAL FATALITY',
    inc_badge_hazard: 'PROCESS SAFETY & EQUIPMENT HAZARD',
    inc_lbl_device: 'DEVICE',
    inc_lbl_medium: 'MEDIUM',
    inc_lbl_rating: 'LINE / RATING',
    inc_lbl_severity: 'SEVERITY',
    inc_sev_fatal: 'FATAL / LIFE-THREATENING',
    inc_sev_hazard: 'EQUIPMENT / INJURY RISK',
    inc_consequence_hdr: 'REAL-WORLD FIELD CONSEQUENCE',
    inc_sequence_hdr: 'REQUIRED SAFE ISOLATION SEQUENCE',
    inc_btn_restart: '↺ Acknowledge & Restart Level',
    inc_btn_continue: 'Acknowledge & Continue (-{pen}% Safety)',

    med_process: 'Pressurized Process Fluid',
    med_steam: 'High-Temp Steam / Thermal',
    med_water: 'Cooling Water',
    med_gas: 'High-Pressure Gas / Hydrocarbon',
    med_gravity: 'Gravity-Head Chemical',
    med_electrical: 'Live Electrical Drive',

    // Fatal Incidents (Force Restart)
    inc_live_vent_steam_title: 'Fatal Superheated Steam Release',
    inc_live_vent_steam_body: 'Opening {tag} on a live {psi} PSI, {size} steam line ({temp}) releases an invisible, supersonic jet of superheated steam. A worker at the valve would suffer instantaneous, fatal full-thickness thermal burns and scalding.',
    inc_live_vent_steam_seq: '1. Lock out all upstream & downstream block valves first. 2. Confirm the pipe highlights Yellow (isolated). 3. Only then open {tag} to safely bleed trapped pressure to 0 PSI.',

    inc_live_vent_gas_title: 'Catastrophic High-Pressure Gas Jet Release',
    inc_live_vent_gas_body: 'Opening {tag} on a live {psi} PSI, {size} pressurized gas line causes an uncontrolled high-velocity jet release—creating lethal kinetic impact, asphyxiation risk, and immediate vapor-cloud explosion/flash-fire fatality.',
    inc_live_vent_gas_seq: '1. Lock out all upstream & downstream block valves (both DBB valves if required). 2. Confirm the segment is isolated. 3. Open {tag} to safely depressurize to 0 PSI.',

    inc_live_vent_process_title: 'Fatal Pressurized Process Release',
    inc_live_vent_process_body: 'Opening {tag} while the {size} line is still live at {psi} PSI blasts high-pressure hazardous fluid directly onto the operator—causing severe chemical exposure, high-pressure fluid injection, or fatal injury.',
    inc_live_vent_process_seq: '1. Stop & lock out any running motors. 2. Close & lock ALL upstream, downstream, and bypass valves. 3. Open {tag} only after the section is isolated.',

    inc_live_blind_title: 'Catastrophic Line-Break Release (Live Flange)',
    inc_live_blind_body: 'Breaking flange bolts to swing spectacle blind {tag} on a live {psi} PSI, {size} line causes an immediate 360° gasket blowout, drenching the technician in hazardous pressurized fluid—resulting in fatal burns or chemical injury.',
    inc_live_blind_seq: '1. Close & lock all manual block valves. 2. Open vents/drains to depressurize the spool to 0 PSI (Green highlighter). 3. Only break flanges to swing {tag} at verified 0 PSI.',

    inc_psv_title: 'Loss of Overpressure Protection (Vessel Rupture)',
    inc_psv_body: 'Closing {tag} defeats the Pressure Safety Valve while live energy sources remain connected. Any blocked discharge or thermal expansion will overpressurize and catastrophically rupture the vessel—causing a fatal blast.',
    inc_psv_seq: 'NEVER close a car-sealed open PSV valve during isolation. Leave {tag} open so relief protection remains active while isolating all feed and outlet nozzles.',

    // Equipment & Process Sequence Hazards (Penalty + Continue)
    inc_cavitation_title: 'Pump Cavitation & Dry-Running Hazard',
    inc_cavitation_body: 'Closing suction valve {tag} while {equip} is still running ({breaker} energized) starves the pump of suction head (NPSH). Vapor bubbles violently implode inside the casing, destroying the mechanical seal and risking overheating or fire.',
    inc_cavitation_seq: '1. Stop & Lock Out electrical breaker {breaker} FIRST. 2. Once the pump is stopped, close & lock suction valve {tag} and discharge valves.',

    inc_deadhead_title: 'Pump Deadheading & Overpressure Hazard',
    inc_deadhead_body: 'Closing discharge/bypass valve {tag} while {equip} is still running ({breaker} energized) deadheads the pump against closed discharge. Pressure spikes to shutoff head and churned liquid rapidly boils, risking catastrophic seal or casing rupture.',
    inc_deadhead_seq: '1. Stop & Lock Out electrical breaker {breaker} FIRST. 2. Only close & lock discharge valve {tag} after rotating equipment is de-energized.',

    inc_comp_surge_title: 'Compressor Surge & Overpressure Hazard',
    inc_comp_surge_body: 'Blocking gas valve {tag} while high-horsepower compressor {equip} is still running ({breaker} energized) causes violent surge and rapid discharge overpressure capable of rupturing cylinders or piping.',
    inc_comp_surge_seq: '1. Lock out Main Compressor Drive {breaker} FIRST. 2. Next lock out Lube Oil Pump. 3. Then isolate process gas and cooling water valves.',

    inc_lube_title: 'Loss of Lubrication — Bearing Seizure',
    inc_lube_body: 'Locking out Lube Oil Pump {tag} while Main Compressor Drive {breaker} is still running strips hydrodynamic oil film from high-load bearings—causing immediate metal-to-metal seizure, mechanical destruction, and fire risk.',
    inc_lube_seq: '1. ALWAYS shut down & lock out Main Drive {breaker} FIRST. 2. Lock out auxiliary Lube Oil Pump {tag} only after the main compressor has stopped.',

    inc_cooler_cw_title: 'Exchanger Boil-Off & Thermal Overpressure',
    inc_cooler_cw_body: 'Shutting off Cooling Water ({tag}) while hot process fluid is still flowing through {equip} traps stagnant water against live hot tubes—flashing shell-side water into steam and risking thermal overpressure rupture.',
    inc_cooler_cw_seq: '1. Isolate the HOT PROCESS side FIRST ({req}). 2. Only close Cooling Water valve {tag} after the hot heat source is isolated.',

    inc_heater_proc_title: 'Stagnant Fluid Boiling & Thermal Expansion',
    inc_heater_proc_body: 'Blocking in process fluid ({tag}) while live high-pressure steam is still heating {equip} traps stagnant liquid against hot steam—causing rapid thermal expansion, boiling, and overpressure rupture.',
    inc_heater_proc_seq: '1. Isolate the STEAM HEATING side FIRST ({req}). 2. Only close process valve {tag} after the heat input is completely shut off.',

    inc_comp_cw_title: 'Compressor Cooling Loss & Overheating',
    inc_comp_cw_body: 'Closing Cooling Water ({tag}) while compressor {equip} is still running ({breaker} energized) causes rapid cylinder overheating, thermal distortion, and compressed gas auto-ignition risk.',
    inc_comp_cw_seq: '1. Lock out Main Drive {breaker} FIRST. 2. Isolate cooling water valve {tag} only after the compressor is shut down.',

    inc_trapped_blind_title: 'Residual Pressure Line-Break Spray Hazard',
    inc_trapped_blind_body: 'Attempting to unbolt flanges to swing {tag} while trapped residual pressure remains releases a sudden chemical/fluid spray directly across the flange gap onto the technician\'s hands and face.',
    inc_trapped_blind_seq: '1. Keep block valves locked. 2. Open vents/drains until pressure drops to 0 PSI (Green highlighter). 3. Then safely swing spectacle blind {tag}.',

    inc_tryout_elec_title: 'Failed Electrical Tryout — Unexpected Startup',
    inc_tryout_elec_body: 'Pressing local Start switch {tag} started the equipment because electrical power is STILL LIVE! Had maintenance begun work, rotating shafts or impellers would cause fatal entanglement or crush injuries.',
    inc_tryout_elec_seq: '1. Open, Lock & Tag the MCC electrical breaker FIRST. 2. Return to {tag} and press Start to confirm the motor stays completely dead.',

    inc_trap_cv_title: 'Invalid Isolation — Pneumatic Control Valve',
    inc_trap_cv_body: 'Relying on automated control valve {tag} for LOTO is a leading cause of industrial fatalities. Internal trim leaks pressure across the seat, and instrument air or power loss can suddenly stroke the valve open onto workers.',
    inc_trap_cv_seq: 'Never use a control valve (FV/LV/PV) as a LOTO barrier. Close, Lock & Tag the manual upstream and downstream block valves instead.',

    inc_trap_check_title: 'Invalid Isolation — Mechanical Check Valve',
    inc_trap_check_body: 'Check valve {tag} cannot be locked out and frequently fails to seal due to debris, wear, or low differential pressure—allowing full live header backpressure to flood opened equipment.',
    inc_trap_check_seq: 'Never rely on a check valve (CV) for isolation. Trace downstream and Lock & Tag the manual positive block valve instead.',

    log_seq_block: 'Sequence error at {tag}: {title}',
    guide_seq_rule_html: '<strong>Safe Operating Sequence:</strong> Always stop &amp; lock out motors <em>before</em> closing pump/compressor valves (prevents deadheading &amp; cavitation), and isolate heat sources <em>before</em> cooling/trapped fluid on exchangers!'
  });

  /* ==================== ESPAÑOL (es) ==================== */
  i18n.registerLocale('es', {
    inc_badge_fatal: 'INCIDENTE CRÍTICO HSE — RIESGO FATAL',
    inc_badge_hazard: 'PELIGRO DE PROCESO Y EQUIPOS',
    inc_lbl_device: 'DISPOSITIVO',
    inc_lbl_medium: 'MEDIO',
    inc_lbl_rating: 'LÍNEA / PRESIÓN',
    inc_lbl_severity: 'SEVERIDAD',
    inc_sev_fatal: 'FATAL / RIESGO DE MUERTE',
    inc_sev_hazard: 'DAÑO GRAVE / LESIÓN',
    inc_consequence_hdr: 'CONSECUENCIA REAL EN CAMPO',
    inc_sequence_hdr: 'SECUENCIA SEGURA REQUERIDA',
    inc_btn_restart: '↺ Reconocer y Reiniciar Nivel',
    inc_btn_continue: 'Reconocer y Continuar (-{pen}% Seguridad)',

    med_process: 'Fluido de Proceso Presurizado',
    med_steam: 'Vapor / Fluido de Alta Temp.',
    med_water: 'Agua de Enfriamiento',
    med_gas: 'Gas / Hidrocarburo Alta Presión',
    med_gravity: 'Químico por Gravedad',
    med_electrical: 'Motor Eléctrico Energizado',

    inc_live_vent_steam_title: 'Liberación Fatal de Vapor Sobrecalentado',
    inc_live_vent_steam_body: 'Abrir {tag} en una línea viva de vapor de {size} a {psi} PSI ({temp}) libera un chorro supersónico invisible de vapor. Un trabajador junto a la válvula sufriría quemaduras térmicas fatales instantáneas.',
    inc_live_vent_steam_seq: '1. Bloquea todas las válvulas aguas arriba y abajo primero. 2. Verifica que la tubería se resalte en Amarillo. 3. Solo entonces abre {tag} para despresurizar a 0 PSI.',

    inc_live_vent_gas_title: 'Fuga Catastrófica de Gas a Alta Presión',
    inc_live_vent_gas_body: 'Abrir {tag} en una línea viva de gas de {size} a {psi} PSI genera un chorro de alta velocidad con trauma cinético letal, riesgo de asfixia e ignición/explosión inmediata de nube de vapor.',
    inc_live_vent_gas_seq: '1. Bloquea todas las válvulas aguas arriba y abajo (incluyendo pares DBB). 2. Confirma aislamiento. 3. Abre {tag} para despresurizar con seguridad.',

    inc_live_vent_process_title: 'Liberación Fatal de Fluido Presurizado',
    inc_live_vent_process_body: 'Abrir {tag} con la línea de {size} viva a {psi} PSI proyecta fluido peligroso a alta presión directamente sobre el operador, causando exposición química grave o lesiones fatales.',
    inc_live_vent_process_seq: '1. Apaga y bloquea motores. 2. Cierra y bloquea TODAS las válvulas (incluidos bypasses). 3. Abre {tag} solo cuando la sección esté aislada.',

    inc_live_blind_title: 'Apertura Catastrófica de Línea Viva',
    inc_live_blind_body: 'Aflojar pernos para girar la brida ciega {tag} en una línea viva de {size} a {psi} PSI provoca un soplado de empaque de 360°, bañando al técnico en fluido peligroso con riesgo fatal.',
    inc_live_blind_seq: '1. Bloquea todas las válvulas manuales. 2. Abre venteos/drenajes hasta 0 PSI (resaltado Verde). 3. Solo gira {tag} con 0 PSI verificados.',

    inc_psv_title: 'Pérdida de Protección contra Sobrepresión',
    inc_psv_body: 'Cerrar {tag} anula la Válvula de Seguridad (PSV) con fuentes vivas conectadas. Cualquier bloqueo o expansión térmica provocará sobrepresión y ruptura catastrófica fatal del recipiente.',
    inc_psv_seq: 'NUNCA cierres la válvula de una PSV mientras existan fuentes de presión conectadas. Déjala abierta mientras aíslas las demás boquillas.',

    inc_cavitation_title: 'Cavitación y Marcha en Seco de Bomba',
    inc_cavitation_body: 'Cerrar la succión {tag} con {equip} en marcha ({breaker} energizado) deja sin NPSH a la bomba: las burbujas de vapor implosionan, destruyen el sello mecánico y causan sobrecalentamiento o incendio.',
    inc_cavitation_seq: '1. Apaga y bloquea el interruptor {breaker} PRIMERO. 2. Con la bomba detenida, cierra y bloquea {tag} y la descarga.',

    inc_deadhead_title: 'Bomba Trabajando a Descarga Cerrada (Deadhead)',
    inc_deadhead_body: 'Cerrar la descarga/bypass {tag} con {equip} en marcha ({breaker} energizado) dispara la presión a cabeza de cierre y hierve el fluido en la carcasa, arriesgando ruptura del sello o carcasa.',
    inc_deadhead_seq: '1. Apaga y bloquea el interruptor {breaker} PRIMERO. 2. Cierra y bloquea {tag} solo tras detener el equipo.',

    inc_comp_surge_title: 'Bombeo (Surge) y Sobrepresión en Compresor',
    inc_comp_surge_body: 'Cerrar {tag} con el compresor {equip} en marcha ({breaker} energizado) provoca surge violento y sobrepresión capaz de fracturar cilindros o tuberías.',
    inc_comp_surge_seq: '1. Bloquea el Motor Principal {breaker} PRIMERO. 2. Luego bloquea la Bomba de Lubricación. 3. Después aísla gas y agua.',

    inc_lube_title: 'Pérdida de Lubricación — Agarrotamiento',
    inc_lube_body: 'Apagar la bomba de lubricación {tag} mientras el motor principal {breaker} sigue girando destruye la película de aceite, causando agarrotamiento inmediato de rodamientos e incendio.',
    inc_lube_seq: '1. Detén y bloquea SIEMPRE el Motor Principal {breaker} PRIMERO. 2. Bloquea la bomba de lubricación {tag} después.',

    inc_cooler_cw_title: 'Ebullición y Sobrepresión Térmica en Carcasa',
    inc_cooler_cw_body: 'Cortar el agua de enfriamiento ({tag}) mientras fluye proceso caliente en {equip} hierve el agua estancada convirtiéndola en vapor, con riesgo de ruptura por sobrepresión.',
    inc_cooler_cw_seq: '1. Aísla PRIMERO el lado de PROCESO CALIENTE ({req}). 2. Luego cierra el agua de enfriamiento {tag}.',

    inc_heater_proc_title: 'Expansión Térmica y Ebullición de Fluido Atrapado',
    inc_heater_proc_body: 'Encerrar fluido de proceso ({tag}) mientras entra vapor vivo a {equip} hierve el líquido estancado generando expansión térmica severa y riesgo de ruptura.',
    inc_heater_proc_seq: '1. Aísla PRIMERO el VAPOR DE CALENTAMIENTO ({req}). 2. Solo entonces cierra la válvula de proceso {tag}.',

    inc_comp_cw_title: 'Pérdida de Enfriamiento del Compresor',
    inc_comp_cw_body: 'Cerrar el agua de enfriamiento ({tag}) con el compresor {equip} en marcha ({breaker} vivo) produce sobrecalentamiento rápido y riesgo de autoignición del gas.',
    inc_comp_cw_seq: '1. Bloquea el Motor Principal {breaker} PRIMERO. 2. Cierra el agua de enfriamiento {tag} después.',

    inc_trapped_blind_title: 'Riesgo de Proyección por Presión Residual',
    inc_trapped_blind_body: 'Abrir bridas para girar {tag} mientras queda presión atrapada libera un rocío químico presurizado directamente sobre las manos y el rostro del técnico.',
    inc_trapped_blind_seq: '1. Mantén bloqueadas las válvulas. 2. Abre venteo/drenaje hasta 0 PSI (Verde). 3. Gira {tag} con seguridad.',

    inc_tryout_elec_title: 'Prueba Eléctrica Fallida — Arranque Inesperado',
    inc_tryout_elec_body: 'Al pulsar {tag} arrancó el equipo porque la electricidad SIGUE VIVA. Si el personal ya estuviera trabajando, los ejes giratorios causarían atrapamiento o muerte.',
    inc_tryout_elec_seq: '1. Abre, bloquea y etiqueta el interruptor MCC PRIMERO. 2. Luego prueba {tag} para confirmar energía cero.',

    inc_trap_cv_title: 'Aislamiento Inválido — Válvula de Control',
    inc_trap_cv_body: 'Confiar en la válvula de control {tag} causa accidentes fatales: sus asientos fugan y ante falla de aire o señal puede abrirse repentinamente sobre los trabajadores.',
    inc_trap_cv_seq: 'Nunca uses una válvula de control para LOTO. Cierra y bloquea las válvulas manuales.',

    inc_trap_check_title: 'Aislamiento Inválido — Válvula Check',
    inc_trap_check_body: 'La válvula check {tag} no se puede bloquear y suele fugar por suciedad o desgaste, permitiendo que la contrapresión del colector inunde el equipo abierto.',
    inc_trap_check_seq: 'Nunca confíes en una válvula check para LOTO. Bloquea la válvula manual aguas abajo.',

    log_seq_block: 'Error de secuencia en {tag}: {title}',
    guide_seq_rule_html: '<strong>Secuencia Segura de Operación:</strong> Apaga y bloquea motores <em>antes</em> de cerrar válvulas de bombas/compresores (evita cavitación y deadhead), y corta la fuente de calor <em>antes</em> del enfriamiento en intercambiadores.'
  });

  /* ==================== FRANÇAIS (fr) ==================== */
  i18n.registerLocale('fr', {
    inc_badge_fatal: 'INCIDENT CRITIQUE HSE — RISQUE MORTEL',
    inc_badge_hazard: 'DANGER PROCÉDÉ & ÉQUIPEMENT',
    inc_lbl_device: 'ÉQUIPEMENT',
    inc_lbl_medium: 'FLUIDE',
    inc_lbl_rating: 'LIGNE / PRESSION',
    inc_lbl_severity: 'GRAVITÉ',
    inc_sev_fatal: 'MORTEL / DANGER DE MORT',
    inc_sev_hazard: 'DOMMAGE GRAVE / BLESSURE',
    inc_consequence_hdr: 'CONSÉQUENCE RÉELLE SUR LE TERRAIN',
    inc_sequence_hdr: 'SÉQUENCE D\'ISOLEMENT SÛRE REQUISE',
    inc_btn_restart: '↺ Acquitter et Redémarrer le Niveau',
    inc_btn_continue: 'Acquitter et Continuer (-{pen}% Sécurité)',

    med_process: 'Fluide Procédé Sous Pression',
    med_steam: 'Vapeur Haute Température',
    med_water: 'Eau de Refroidissement',
    med_gas: 'Gaz / Hydrocarbure Haute Pression',
    med_gravity: 'Produit Chimique par Gravité',
    med_electrical: 'Moteur Électrique Sous Tension',

    inc_live_vent_steam_title: 'Rejet Mortel de Vapeur Surchauffée',
    inc_live_vent_steam_body: 'Ouvrir {tag} sur une ligne vapeur active de {size} à {psi} PSI ({temp}) libère un jet supersonique invisible. L\'opérateur subirait des brûlures thermiques mortelles instantanées.',
    inc_live_vent_steam_seq: '1. Cadenassez d\'abord toutes les vannes amont et aval. 2. Vérifiez le surlignage Jaune. 3. Ouvrez ensuite {tag} pour tomber à 0 PSI.',

    inc_live_vent_gas_title: 'Fuite Catastrophique de Gaz Haute Pression',
    inc_live_vent_gas_body: 'Ouvrir {tag} sur une conduite de gaz active de {size} à {psi} PSI provoque un jet violent causant traumatisme létal, asphyxie ou explosion immédiate de nuage de vapeur.',
    inc_live_vent_gas_seq: '1. Cadenassez toutes les vannes amont/aval (paires DBB incluses). 2. Vérifiez l\'isolement. 3. Ouvrez {tag} pour dépressuriser à 0 PSI.',

    inc_live_vent_process_title: 'Rejet Mortel de Fluide Sous Pression',
    inc_live_vent_process_body: 'Ouvrir {tag} sur une ligne {size} active à {psi} PSI projette du fluide dangereux sous pression sur l\'intervenant, entraînant brûlure chimique grave ou décès.',
    inc_live_vent_process_seq: '1. Consignez les moteurs. 2. Fermez et cadenassez TOUTES les vannes (by-pass compris). 3. Ouvrez {tag} uniquement après isolement.',

    inc_live_blind_title: 'Ouverture Catastrophique de Bride en Pression',
    inc_live_blind_body: 'Déboulonner une bride pour tourner le joint plein {tag} sur une ligne {size} active à {psi} PSI provoque un soufflage du joint à 360°, aspergeant mortellement le technicien.',
    inc_live_blind_seq: '1. Cadenassez les vannes manuelles. 2. Ouvrez évents/purges jusqu\'à 0 PSI (Vert). 3. Ne tournez {tag} qu\'à 0 PSI vérifié.',

    inc_psv_title: 'Perte de Protection Surpression (Rupture)',
    inc_psv_body: 'Fermer {tag} neutralise la soupape de sûreté (PSV) alors que des sources actives subsistent. Toute surpression fera éclater le ballon avec effet de souffle mortel.',
    inc_psv_seq: 'Ne fermez JAMAIS une vanne sous PSV tant que des sources actives sont connectées. Laissez {tag} ouverte.',

    inc_cavitation_title: 'Cavitation & Marche à Sec de Pompe',
    inc_cavitation_body: 'Fermer l\'aspiration {tag} alors que {equip} tourne encore ({breaker} actif) provoque une cavitation violente, détruisant la garniture mécanique avec risque d\'incendie.',
    inc_cavitation_seq: '1. Consignez le disjoncteur {breaker} EN PREMIER. 2. Une fois la pompe arrêtée, fermez et cadenassez {tag}.',

    inc_deadhead_title: 'Pompage Vanne Fermée (Deadheading) & Surpression',
    inc_deadhead_body: 'Fermer le refoulement {tag} pendant que {equip} tourne ({breaker} actif) fait grimper la pression et bouillir le liquide dans le corps de pompe jusqu\'à rupture de garniture.',
    inc_deadhead_seq: '1. Consignez le disjoncteur {breaker} EN PREMIER. 2. Fermez {tag} uniquement après l\'arrêt du moteur.',

    inc_comp_surge_title: 'Pompage (Surge) & Surpression Compresseur',
    inc_comp_surge_body: 'Fermer {tag} alors que le compresseur {equip} tourne ({breaker} actif) déclenche un pompage violent et une surpression pouvant rompre les cylindres.',
    inc_comp_surge_seq: '1. Consignez le Moteur Principal {breaker} EN PREMIER. 2. Puis la pompe à huile. 3. Enfin les vannes gaz et eau.',

    inc_lube_title: 'Perte de Lubrification — Serrage des Paliers',
    inc_lube_body: 'Couper la pompe à huile {tag} pendant que {breaker} entraîne le compresseur supprime le film d\'huile, provoquant un serrage immédiat des paliers et un risque d\'incendie.',
    inc_lube_seq: '1. Consignez TOUJOURS le Moteur Principal {breaker} D\'ABORD. 2. Consignez ensuite la pompe à huile {tag}.',

    inc_cooler_cw_title: 'Vaporisation & Surpression Thermique Calandre',
    inc_cooler_cw_body: 'Couper l\'eau de refroidissement ({tag}) pendant que le fluide chaud circule dans {equip} vaporise l\'eau stagnante en calandre et risque d\'éclater l\'échangeur.',
    inc_cooler_cw_seq: '1. Isolez d\'abord le PROCÉDÉ CHAUD ({req}). 2. Fermez l\'eau de refroidissement {tag} ensuite.',

    inc_heater_proc_title: 'Ébullition & Dilatation Thermique du Fluide Piégé',
    inc_heater_proc_body: 'Emprisonner le fluide procédé ({tag}) alors que la vapeur chauffe encore {equip} fait bouillir le liquide stagnant avec risque de rupture par surpression.',
    inc_heater_proc_seq: '1. Isolez d\'abord la VAPEUR DE CHAUFFE ({req}). 2. Fermez ensuite la vanne procédé {tag}.',

    inc_comp_cw_title: 'Perte de Refroidissement Compresseur',
    inc_comp_cw_body: 'Fermer l\'eau ({tag}) alors que le compresseur {equip} tourne ({breaker} actif) entraîne une surchauffe rapide des cylindres et un risque d\'auto-inflammation.',
    inc_comp_cw_seq: '1. Consignez le Moteur Principal {breaker} EN PREMIER. 2. Isolez l\'eau de refroidissement {tag} après arrêt.',

    inc_trapped_blind_title: 'Projection par Pression Résiduelle à la Bride',
    inc_trapped_blind_body: 'Ouvrir les brides pour {tag} avec une pression piégée projette un jet chimique dangereux sur les mains et le visage du technicien.',
    inc_trapped_blind_seq: '1. Gardez les vannes fermées. 2. Purgez jusqu\'à 0 PSI (Vert). 3. Tournez ensuite {tag}.',

    inc_tryout_elec_title: 'Essai Électrique Échoué — Démarrage Intempestif',
    inc_tryout_elec_body: 'Appuyer sur {tag} a démarré le moteur car l\'alimentation est ENCORE ACTIVE ! Un intervenant aurait subi un entraînement ou écrasement mortel.',
    inc_tryout_elec_seq: '1. Ouvrez et cadenassez le disjoncteur MCC D\'ABORD. 2. Testez ensuite {tag} pour prouver l\'énergie zéro.',

    inc_trap_cv_title: 'Isolement Invalide — Vanne de Régulation',
    inc_trap_cv_body: 'Une vanne de régulation ({tag}) fuit par le siège et peut s\'ouvrir brutalement en cas de perte d\'air instrument, exposant mortellement l\'équipe.',
    inc_trap_cv_seq: 'N\'utilisez jamais une vanne de régulation pour le LOTO. Cadenassez les vannes d\'isolement manuelles.',

    inc_trap_check_title: 'Isolement Invalide — Clapet Anti-Retour',
    inc_trap_check_body: 'Le clapet {tag} ne peut pas être cadenassé et fuit fréquemment, laissant la contre-pression du collecteur envahir l\'équipement ouvert.',
    inc_trap_check_seq: 'Ne comptez jamais sur un clapet (CV). Cadenassez la vanne manuelle en aval.',

    log_seq_block: 'Erreur de séquence sur {tag} : {title}',
    guide_seq_rule_html: '<strong>Séquence d\'Exploitation Sûre :</strong> Consignez toujours les moteurs <em>avant</em> de fermer les vannes de pompe/compresseur, et isolez les sources chaudes <em>avant</em> l\'eau ou le fluide sur les échangeurs !'
  });

  /* ==================== PORTUGUÊS (pt) ==================== */
  i18n.registerLocale('pt', {
    inc_badge_fatal: 'INCIDENTE CRÍTICO HSE — RISCO FATAL',
    inc_badge_hazard: 'PERIGO DE PROCESSO E EQUIPAMENTO',
    inc_lbl_device: 'DISPOSITIVO',
    inc_lbl_medium: 'FLUIDO',
    inc_lbl_rating: 'LINHA / PRESSÃO',
    inc_lbl_severity: 'SEVERIDADE',
    inc_sev_fatal: 'FATAL / RISCO DE MORTE',
    inc_sev_hazard: 'DANO GRAVE / LESÃO',
    inc_consequence_hdr: 'CONSEQUÊNCIA REAL EM CAMPO',
    inc_sequence_hdr: 'SEQUÊNCIA SEGURA OBRIGATÓRIA',
    inc_btn_restart: '↺ Reconhecer e Reiniciar Nível',
    inc_btn_continue: 'Reconhecer e Continuar (-{pen}% Segurança)',

    med_process: 'Fluido de Processo Pressurizado',
    med_steam: 'Vapor / Alta Temperatura',
    med_water: 'Água de Resfriamento',
    med_gas: 'Gás / Hidrocarboneto Alta Pressão',
    med_gravity: 'Químico por Gravidade',
    med_electrical: 'Motor Elétrico Energizado',

    inc_live_vent_steam_title: 'Liberação Fatal de Vapor Superaquecido',
    inc_live_vent_steam_body: 'Abrir {tag} numa linha viva de vapor de {size} a {psi} PSI ({temp}) libera um jato supersônico invisível. O operador sofreria queimaduras térmicas fatais instantâneas.',
    inc_live_vent_steam_seq: '1. Trave todas as válvulas a montante e jusante primeiro. 2. Confirme o destaque Amarelo. 3. Só então abra {tag} para aliviar a 0 PSI.',

    inc_live_vent_gas_title: 'Vazamento Catastrófico de Gás em Alta Pressão',
    inc_live_vent_gas_body: 'Abrir {tag} numa linha viva de gás de {size} a {psi} PSI gera jato de altíssima velocidade com trauma letal, asfixia e explosão imediata de nuvem de vapor.',
    inc_live_vent_gas_seq: '1. Trave todas as válvulas (incluindo pares DBB). 2. Confirme o isolamento. 3. Abra {tag} para despressurizar até 0 PSI.',

    inc_live_vent_process_title: 'Liberação Fatal de Fluido Pressurizado',
    inc_live_vent_process_body: 'Abrir {tag} com a linha de {size} viva a {psi} PSI projeta fluido perigoso diretamente sobre o operador, causando exposição química grave ou fatalidade.',
    inc_live_vent_process_seq: '1. Desligue e trave motores. 2. Feche e trave TODAS as válvulas (incluindo bypass). 3. Abra {tag} somente após isolar.',

    inc_live_blind_title: 'Quebra Catastrófica de Contenção (Linha Viva)',
    inc_live_blind_body: 'Soltar parafusos para virar a raquete {tag} numa linha viva de {size} a {psi} PSI rompe a junta em 360°, atingindo o técnico com fluido pressurizado de forma fatal.',
    inc_live_blind_seq: '1. Trave todas as válvulas manuais. 2. Despressurize via vents/drenos até 0 PSI (Verde). 3. Vire {tag} somente em 0 PSI.',

    inc_psv_title: 'Perda de Proteção contra Sobrepressão',
    inc_psv_body: 'Fechar {tag} desativa a Válvula de Segurança (PSV) com fontes vivas conectadas. Qualquer sobrepressão causará ruptura catastrófica fatal do vaso.',
    inc_psv_seq: 'NUNCA feche uma válvula sob PSV com fontes de pressão ligadas. Mantenha {tag} aberta.',

    inc_cavitation_title: 'Cavitação e Operação a Seco da Bomba',
    inc_cavitation_body: 'Fechar a sucção {tag} com {equip} rodando ({breaker} energizado) causa falta de NPSH, cavitação severa, quebra do selo mecânico e risco de incêndio.',
    inc_cavitation_seq: '1. Desligue e trave o disjuntor {breaker} PRIMEIRO. 2. Com a bomba parada, feche e trave {tag}.',

    inc_deadhead_title: 'Bomba com Descarga Fechada (Deadhead)',
    inc_deadhead_body: 'Fechar descarga/bypass {tag} com {equip} rodando ({breaker} energizado) eleva a pressão ao máximo e ferve o fluido na carcaça, arriscando ruptura do selo ou carcaça.',
    inc_deadhead_seq: '1. Desligue e trave o disjuntor {breaker} PRIMEIRO. 2. Feche {tag} somente após parar o motor.',

    inc_comp_surge_title: 'Surge e Sobrepressão no Compressor',
    inc_comp_surge_body: 'Fechar {tag} com o compressor {equip} rodando ({breaker} energizado) provoca surge violento e sobrepressão capaz de romper cilindros e tubulações.',
    inc_comp_surge_seq: '1. Trave o Motor Principal {breaker} PRIMEIRO. 2. Depois a Bomba de Óleo. 3. Então isole gás e água.',

    inc_lube_title: 'Perda de Lubrificação — Travamento de Mancais',
    inc_lube_body: 'Desligar a bomba de óleo {tag} enquanto {breaker} aciona o compressor elimina o filme lubrificante, causando travamento imediato dos mancais e incêndio.',
    inc_lube_seq: '1. Desligue e trave SEMPRE o Motor Principal {breaker} PRIMEIRO. 2. Trave a bomba de óleo {tag} depois.',

    inc_cooler_cw_title: 'Ebulição e Sobrepressão Térmica no Casco',
    inc_cooler_cw_body: 'Cortar a água de resfriamento ({tag}) com processo quente fluindo em {equip} ferve a água estagnada no casco, gerando vapor e risco de ruptura.',
    inc_cooler_cw_seq: '1. Isole PRIMEIRO o PROCESSO QUENTE ({req}). 2. Só depois feche a água de resfriamento {tag}.',

    inc_heater_proc_title: 'Expansão Térmica e Ebulição de Fluido Preso',
    inc_heater_proc_body: 'Aprisionar fluido de processo ({tag}) enquanto entra vapor vivo em {equip} ferve o líquido estagnado causando expansão térmica severa e ruptura.',
    inc_heater_proc_seq: '1. Isole PRIMEIRO o VAPOR DE AQUECIMENTO ({req}). 2. Feche a válvula de processo {tag} em seguida.',

    inc_comp_cw_title: 'Perda de Resfriamento do Compressor',
    inc_comp_cw_body: 'Fechar a água ({tag}) com o compressor {equip} em marcha ({breaker} vivo) causa superaquecimento rápido e risco de autoignição do gás.',
    inc_comp_cw_seq: '1. Trave o Motor Principal {breaker} PRIMEIRO. 2. Feche a água {tag} após a parada.',

    inc_trapped_blind_title: 'Risco de Spray por Pressão Residual no Flange',
    inc_trapped_blind_body: 'Abrir flanges para virar {tag} com pressão retida libera jato químico direto nas mãos e rosto do técnico.',
    inc_trapped_blind_seq: '1. Mantenha válvulas travadas. 2. Drene até 0 PSI (Verde). 3. Vire {tag} com segurança.',

    inc_tryout_elec_title: 'Tryout Elétrico Falhou — Partida Inesperada',
    inc_tryout_elec_body: 'Acionar {tag} ligou o motor pois a energia AINDA ESTÁ VIVA! Em campo, eixos giratórios causariam esmagamento ou morte.',
    inc_tryout_elec_seq: '1. Abra e trave o disjuntor MCC PRIMEIRO. 2. Retorne a {tag} para confirmar energia zero.',

    inc_trap_cv_title: 'Isolamento Inválido — Válvula de Controle',
    inc_trap_cv_body: 'Confiar na válvula de controle {tag} para LOTO é fatal: a sede vaza e falhas de ar ou sinal podem abri-la subitamente sobre a equipe.',
    inc_trap_cv_seq: 'Nunca use válvula de controle como barreira LOTO. Trave as válvulas manuais.',

    inc_trap_check_title: 'Isolamento Inválido — Válvula de Retenção',
    inc_trap_check_body: 'A retenção {tag} não aceita cadeado e costuma dar passagem por sujeira ou desgaste, inundando o equipamento aberto com contrapressão.',
    inc_trap_check_seq: 'Nunca confie em válvula de retenção. Trave a válvula manual a jusante.',

    log_seq_block: 'Erro de sequência em {tag}: {title}',
    guide_seq_rule_html: '<strong>Sequência Segura de Operação:</strong> Sempre desligue e trave motores <em>antes</em> de fechar válvulas de bombas/compressores, e isole fontes quentes <em>antes</em> do resfriamento em trocadores!'
  });

  /* ==================== ITALIANO (it) ==================== */
  i18n.registerLocale('it', {
    inc_badge_fatal: 'INCIDENTE CRITICO HSE — RISCHIO MORTALE',
    inc_badge_hazard: 'PERICOLO DI PROCESSO E IMPIANTO',
    inc_lbl_device: 'DISPOSITIVO',
    inc_lbl_medium: 'FLUIDO',
    inc_lbl_rating: 'LINEA / PRESSIONE',
    inc_lbl_severity: 'GRAVITÀ',
    inc_sev_fatal: 'MORTALE / PERICOLO DI VITA',
    inc_sev_hazard: 'DANNO GRAVE / INFORTUNIO',
    inc_consequence_hdr: 'CONSEGUENZA REALE IN CAMPO',
    inc_sequence_hdr: 'SEQUENZA SICURA OBBLIGATORIA',
    inc_btn_restart: '↺ Conferma e Riavvia Livello',
    inc_btn_continue: 'Conferma e Continua (-{pen}% Sicurezza)',

    med_process: 'Fluido di Processo in Pressione',
    med_steam: 'Vapore / Alta Temperatura',
    med_water: 'Acqua di Raffreddamento',
    med_gas: 'Gas / Idrocarburo Alta Pressione',
    med_gravity: 'Chimico per Gravità',
    med_electrical: 'Motore Elettrico in Tensione',

    inc_live_vent_steam_title: 'Rilascio Mortale di Vapore Surriscaldato',
    inc_live_vent_steam_body: 'Aprire {tag} su una linea vapore attiva da {size} a {psi} PSI ({temp}) sprigiona un getto supersonico invisibile, causando ustioni termiche mortali istantanee.',
    inc_live_vent_steam_seq: '1. Lucchetta prima tutte le valvole a monte e valle. 2. Verifica evidenziazione Gialla. 3. Solo dopo apri {tag} fino a 0 PSI.',

    inc_live_vent_gas_title: 'Rilascio Catastrofico di Gas ad Alta Pressione',
    inc_live_vent_gas_body: 'Aprire {tag} su una linea gas attiva da {size} a {psi} PSI provoca un getto ad alta velocità con trauma letale, asfissia ed esplosione immediata di nube di vapore.',
    inc_live_vent_gas_seq: '1. Lucchetta tutte le valvole (incluse coppie DBB). 2. Verifica isolamento. 3. Apri {tag} per depressurizzare a 0 PSI.',

    inc_live_vent_process_title: 'Rilascio Mortale di Fluido in Pressione',
    inc_live_vent_process_body: 'Aprire {tag} con la linea da {size} attiva a {psi} PSI investe l\'operatore con fluido pericoloso ad alta pressione, causando gravi lesioni chimiche o decesso.',
    inc_live_vent_process_seq: '1. Ferma e blocca i motori. 2. Chiudi e lucchetta TUTTE le valvole (bypass inclusi). 3. Apri {tag} solo dopo l\'isolamento.',

    inc_live_blind_title: 'Apertura Catastrofica di Flangia in Pressione',
    inc_live_blind_body: 'Sbullonare la flangia per ruotare {tag} su una linea attiva da {size} a {psi} PSI provoca lo scoppio della guarnizione a 360°, investendo mortalmente il tecnico.',
    inc_live_blind_seq: '1. Lucchetta le valvole manuali. 2. Depressurizza a 0 PSI (Verde). 3. Ruota {tag} solo a 0 PSI verificati.',

    inc_psv_title: 'Perdita Protezione Sovrappressione (Scoppio)',
    inc_psv_body: 'Chiudere {tag} esclude la Valvola di Sicurezza (PSV) con fonti attive collegate: una sovrappressione farà esplodere il recipiente con conseguenze fatali.',
    inc_psv_seq: 'NON chiudere mai la valvola di una PSV con fonti attive collegate. Lascia {tag} aperta.',

    inc_cavitation_title: 'Cavitazione e Marcia a Secco Pompa',
    inc_cavitation_body: 'Chiudere l\'aspirazione {tag} mentre {equip} gira ({breaker} attivo) priva la pompa di NPSH, causando cavitazione violenta, rottura tenuta meccanica e rischio incendio.',
    inc_cavitation_seq: '1. Seziona e lucchetta {breaker} PER PRIMO. 2. A pompa ferma chiudi e lucchetta {tag}.',

    inc_deadhead_title: 'Pompa a Mandata Chiusa (Deadheading)',
    inc_deadhead_body: 'Chiudere mandata/bypass {tag} con {equip} in marcia ({breaker} attivo) fa schizzare la pressione e bollire il fluido nel corpo pompa fino alla rottura della tenuta.',
    inc_deadhead_seq: '1. Seziona e lucchetta {breaker} PER PRIMO. 2. Chiudi {tag} solo dopo l\'arresto del motore.',

    inc_comp_surge_title: 'Pompaggio (Surge) e Sovrappressione Compressore',
    inc_comp_surge_body: 'Chiudere {tag} con il compressore {equip} in marcia ({breaker} attivo) provoca surge violento e sovrappressione capace di rompere cilindri e tubazioni.',
    inc_comp_surge_seq: '1. Blocca il Motore Principale {breaker} PER PRIMO. 2. Poi la pompa olio. 3. Infine valvole gas e acqua.',

    inc_lube_title: 'Perdita Lubrificazione — Grippaggio Cuscinetti',
    inc_lube_body: 'Fermare la pompa olio {tag} mentre {breaker} aziona il compressore elimina il film d\'olio causando grippaggio immediato dei cuscinetti e incendio.',
    inc_lube_seq: '1. Ferma e blocca SEMPRE il Motore Principale {breaker} PRIMA. 2. Poi blocca la pompa olio {tag}.',

    inc_cooler_cw_title: 'Ebollizione e Sovrappressione Termica Mantello',
    inc_cooler_cw_body: 'Chiudere l\'acqua di raffreddamento ({tag}) mentre fluisce fluido caldo in {equip} fa bollire l\'acqua stagnante nel mantello con rischio di rottura.',
    inc_cooler_cw_seq: '1. Isola PRIMA il PROCESSO CALDO ({req}). 2. Chiudi l\'acqua {tag} solo dopo.',

    inc_heater_proc_title: 'Espansione Termica ed Ebollizione Fluido Intrappolato',
    inc_heater_proc_body: 'Intrappolare fluido di processo ({tag}) mentre il vapore riscalda ancora {equip} fa bollire il liquido stagnante causando sovrappressione e rottura.',
    inc_heater_proc_seq: '1. Isola PRIMA il VAPORE DI RISCALDAMENTO ({req}). 2. Chiudi poi la valvola processo {tag}.',

    inc_comp_cw_title: 'Perdita Raffreddamento Compressore',
    inc_comp_cw_body: 'Chiudere l\'acqua ({tag}) con il compressore {equip} acceso ({breaker} attivo) provoca surriscaldamento rapido e rischio di autoaccensione del gas.',
    inc_comp_cw_seq: '1. Blocca il Motore Principale {breaker} PRIMA. 2. Isola l\'acqua {tag} dopo l\'arresto.',

    inc_trapped_blind_title: 'Spruzzo da Pressione Residua sulla Flangia',
    inc_trapped_blind_body: 'Aprire le flange per {tag} con pressione residua sprigiona uno spruzzo chimico diretto su mani e volto del tecnico.',
    inc_trapped_blind_seq: '1. Tieni chiuse le valvole. 2. Scarica a 0 PSI (Verde). 3. Ruota {tag} in sicurezza.',

    inc_tryout_elec_title: 'Tryout Elettrico Fallito — Avvio Inatteso',
    inc_tryout_elec_body: 'Premere {tag} ha avviato il motore perché la tensione è ANCORA ATTIVA! In campo gli organi rotanti causerebbero lesioni mortali.',
    inc_tryout_elec_seq: '1. Apri e lucchetta l\'interruttore MCC PRIMA. 2. Torna su {tag} per verificare energia zero.',

    inc_trap_cv_title: 'Isolamento Non Valido — Valvola di Regolazione',
    inc_trap_cv_body: 'Affidarsi alla valvola {tag} per il LOTO è fatale: la sede trafila e un guasto d\'aria o segnale può aprirla improvvisamente.',
    inc_trap_cv_seq: 'Mai usare valvole di regolazione per il LOTO. Lucchetta le valvole manuali.',

    inc_trap_check_title: 'Isolamento Non Valido — Valvola di Ritegno',
    inc_trap_check_body: 'La valvola di ritegno {tag} non è lucchettabile e trafila spesso contropressione nell\'apparecchio aperto.',
    inc_trap_check_seq: 'Mai fidarsi di una valvola di ritegno. Lucchetta la valvola manuale a valle.',

    log_seq_block: 'Errore sequenza su {tag}: {title}',
    guide_seq_rule_html: '<strong>Sequenza Operativa Sicura:</strong> Ferma e blocca sempre i motori <em>prima</em> di chiudere le valvole di pompe/compressori, e isola le fonti calde <em>prima</em> del raffreddamento sugli scambiatori!'
  });

  /* ==================== DEUTSCH (de) ==================== */
  i18n.registerLocale('de', {
    inc_badge_fatal: 'KRITISCHER HSE-VORFALL — LEBENSGEFAHR',
    inc_badge_hazard: 'PROZESS- & ANLAGENSICHERHEITSGEFAHR',
    inc_lbl_device: 'ARMATUR / GERÄT',
    inc_lbl_medium: 'MEDIUM',
    inc_lbl_rating: 'LEITUNG / DRUCK',
    inc_lbl_severity: 'SCHWEREGRAD',
    inc_sev_fatal: 'TÖDLICH / LEBENSBEDROHLICH',
    inc_sev_hazard: 'SCHWERER SCHADEN / VERLETZUNG',
    inc_consequence_hdr: 'REALE FOLGE IM ANLAGENBETRIEB',
    inc_sequence_hdr: 'ERFORDERLICHE SICHERE REIHENFOLGE',
    inc_btn_restart: '↺ Bestätigen & Level neu starten',
    inc_btn_continue: 'Bestätigen & Weiter (-{pen}% Sicherheit)',

    med_process: 'Druckführendes Prozessmedium',
    med_steam: 'Heißdampf / Thermisches Medium',
    med_water: 'Kühlwasser',
    med_gas: 'Hochdruckgas / Kohlenwasserstoff',
    med_gravity: 'Schwerkraft-Chemikalie',
    med_electrical: 'Aktiver Elektroantrieb',

    inc_live_vent_steam_title: 'Tödlicher Austritt von überhitztem Dampf',
    inc_live_vent_steam_body: 'Das Öffnen von {tag} an einer aktiven {size}-Dampfleitung mit {psi} PSI ({temp}) setzt einen unsichtbaren Überschall-Dampfstrahl frei — mit sofortigen, tödlichen schwersten Verbrühungen.',
    inc_live_vent_steam_seq: '1. Zuerst alle vor- und nachgeschalteten Absperrventile sperren. 2. Gelbe Markierung prüfen. 3. Erst dann {tag} zum Entspannen auf 0 PSI öffnen.',

    inc_live_vent_gas_title: 'Katastrophaler Hochdruck-Gasaustritt',
    inc_live_vent_gas_body: 'Das Öffnen von {tag} an einer aktiven {size}-Gasleitung mit {psi} PSI erzeugt einen Hochgeschwindigkeitsstrahl mit tödlicher Aufprallwirkung, Erstickungsgefahr und sofortiger Gaswolkenexplosion.',
    inc_live_vent_gas_seq: '1. Alle Absperrventile sperren (inkl. DBB-Paare). 2. Isolierung prüfen. 3. Erst dann {tag} auf 0 PSI entspannen.',

    inc_live_vent_process_title: 'Tödlicher Austritt von Druckmedium',
    inc_live_vent_process_body: 'Das Öffnen von {tag} bei aktivem Druck von {psi} PSI in der {size}-Leitung schleudert gefährliches Medium direkt auf den Bediener — schwere Verätzung, Hochdruckinjektion oder Tod.',
    inc_live_vent_process_seq: '1. Antriebe abschalten & sperren. 2. ALLE Zu-, Ab- und Bypassventile sperren. 3. {tag} erst nach vollständiger Isolierung öffnen.',

    inc_live_blind_title: 'Katastrophaler Flansch-Austritt (Unter Druck)',
    inc_live_blind_body: 'Das Lösen von Flanschschrauben für Steckscheibe {tag} an einer aktiven {size}-Leitung mit {psi} PSI verursacht sofortiges Ausblasen der Dichtung rundum — tödliche Verätzungen oder Verbrennungen.',
    inc_live_blind_seq: '1. Handventile sperren. 2. Über Entlüftung/Entleerung auf 0 PSI entspannen (Grün). 3. {tag} erst bei geprüften 0 PSI drehen.',

    inc_psv_title: 'Verlust des Überdruckschutzes (Behälterbersten)',
    inc_psv_body: 'Das Schließen von {tag} setzt das Sicherheitsventil (PSV) bei verbundenen Druckquellen außer Kraft. Jeder Druckanstieg führt zum katastrophalen, tödlichen Zerbersten des Behälters.',
    inc_psv_seq: 'NIEMALS ein Sicherheitsventil-Absperrorgan bei aktiven Druckquellen schließen. {tag} offen lassen.',

    inc_cavitation_title: 'Pumpen-Kavitation & Trockenlauf',
    inc_cavitation_body: 'Das Schließen des Saugventils {tag} bei laufender {equip} ({breaker} aktiv) führt zu NPSH-Mangel, heftiger Kavitation, Zerstörung der Gleitringdichtung und Brandgefahr.',
    inc_cavitation_seq: '1. ZUERST Leistungsschalter {breaker} abschalten & sperren. 2. Erst bei stehender Pumpe {tag} schließen.',

    inc_deadhead_title: 'Fahren gegen geschlossenen Schieber (Deadhead)',
    inc_deadhead_body: 'Das Schließen von {tag} bei laufender {equip} ({breaker} aktiv) treibt den Druck auf Nullförderhöhe und bringt das Medium im Gehäuse zum Sieden — Risiko eines Dichtungs- oder Gehäusebruchs.',
    inc_deadhead_seq: '1. ZUERST Leistungsschalter {breaker} abschalten & sperren. 2. Erst danach {tag} schließen.',

    inc_comp_surge_title: 'Kompressor-Pumpen (Surge) & Überdruck',
    inc_comp_surge_body: 'Das Schließen von {tag} bei laufendem Kompressor {equip} ({breaker} aktiv) verursacht heftiges Pumpen und schlagartigen Überdruck mit Berstgefahr.',
    inc_comp_surge_seq: '1. Hauptantrieb {breaker} ZUERST sperren. 2. Danach Schmierölpumpe. 3. Dann Gas- und Kühlwasserventile.',

    inc_lube_title: 'Schmierölverlust — Lagerschaden & Fressen',
    inc_lube_body: 'Abschalten der Schmierölpumpe {tag} während Hauptantrieb {breaker} läuft reißt den Schmierfilm ab — sofortiges Festfressen der Lager, Zerstörung und Brandgefahr.',
    inc_lube_seq: '1. IMMER ZUERST Hauptantrieb {breaker} sperren. 2. Erst nach Stillstand Schmierölpumpe {tag} sperren.',

    inc_cooler_cw_title: 'Verdampfen & Thermischer Überdruck im Mantel',
    inc_cooler_cw_body: 'Absperren von Kühlwasser ({tag}) bei heißem Prozessfluss in {equip} bringt stehendes Wasser im Mantel zum Verdampfen — Gefahr eines thermischen Überdruckbruchs.',
    inc_cooler_cw_seq: '1. ZUERST die HEISSE PROZESSSEITE isolieren ({req}). 2. Erst danach Kühlwasser {tag} schließen.',

    inc_heater_proc_title: 'Wärmeausdehnung & Sieden eingeschlossenen Mediums',
    inc_heater_proc_body: 'Einschließen von Prozessflüssigkeit ({tag}) bei aktivem Heizdampf in {equip} führt zu starker Wärmeausdehnung, Sieden und Berstgefahr.',
    inc_heater_proc_seq: '1. ZUERST die HEIZDAMPFSEITE isolieren ({req}). 2. Erst danach Prozessventil {tag} schließen.',

    inc_comp_cw_title: 'Kühlwasserverlust & Überhitzung am Kompressor',
    inc_comp_cw_body: 'Schließen von Kühlwasser ({tag}) bei laufendem Kompressor {equip} ({breaker} aktiv) verursacht rasche Überhitzung und Gas-Selbstentzündungsgefahr.',
    inc_comp_cw_seq: '1. Hauptantrieb {breaker} ZUERST sperren. 2. Kühlwasser {tag} erst nach Stillstand sperren.',

    inc_trapped_blind_title: 'Spritzgefahr durch Restdruck am Flansch',
    inc_trapped_blind_body: 'Lösen des Flansches für {tag} bei anstehendem Restdruck spritzt Medium direkt auf Hände und Gesicht des Monteurs.',
    inc_trapped_blind_seq: '1. Ventile gesperrt lassen. 2. Über Entlüftung/Entleerung auf 0 PSI entspannen (Grün). 3. Dann {tag} drehen.',

    inc_tryout_elec_title: 'Elektrischer Tryout fehlgeschlagen — Unerwarteter Anlauf',
    inc_tryout_elec_body: 'Betätigen von {tag} hat den Motor gestartet — Spannung ist NOCH AKTIV! Bei Wartungsarbeiten droht tödliches Einziehen oder Quetschen.',
    inc_tryout_elec_seq: '1. MCC-Schalter ZUERST abschalten & sperren. 2. Danach {tag} zur Prüfung der Spannungsfreiheit testen.',

    inc_trap_cv_title: 'Unzulässige Isolierung — Regelventil',
    inc_trap_cv_body: 'Regelventile ({tag}) dichten nicht sicher ab und können bei Ausfall von Steuerluft plötzlich öffnen — eine Hauptursache tödlicher LOTO-Unfälle.',
    inc_trap_cv_seq: 'Niemals Regelventile für LOTO nutzen. Immer Handabsperrventile schließen & sperren.',

    inc_trap_check_title: 'Unzulässige Isolierung — Rückschlagventil',
    inc_trap_check_body: 'Rückschlagventil {tag} ist nicht abschließbar und leckt oft durch Schmutz oder Verschleiß, sodass Gegendruck in geöffnete Anlagen strömt.',
    inc_trap_check_seq: 'Niemals auf Rückschlagventile verlassen. Das nachgeschaltete Handventil sperren.',

    log_seq_block: 'Reihenfolgefehler an {tag}: {title}',
    guide_seq_rule_html: '<strong>Sichere Betriebsreihenfolge:</strong> Motoren immer <em>vor</em> Pumpen-/Kompressorventilen sperren (verhindert Kavitation & Deadhead), und Wärmequellen immer <em>vor</em> Kühlung/Medium an Wärmetauschern isolieren!'
  });

  /* ==================== SVENSKA (sv) ==================== */
  i18n.registerLocale('sv', {
    inc_badge_fatal: 'KRITISK HSE-HÄNDELSE — LIVSFARA',
    inc_badge_hazard: 'PROCESS- & UTRUSTNINGSRISK',
    inc_lbl_device: 'KOMPONENT',
    inc_lbl_medium: 'MEDIUM',
    inc_lbl_rating: 'LEDNING / TRYCK',
    inc_lbl_severity: 'ALLVARLIGHET',
    inc_sev_fatal: 'DÖDLIG / LIVSHOTANDE',
    inc_sev_hazard: 'ALLVARLIG SKADA / RISK',
    inc_consequence_hdr: 'VERKLIG KONSEKVENS I FÄLT',
    inc_sequence_hdr: 'KRÄVD SÄKER ISOLERINGSORDNING',
    inc_btn_restart: '↺ Bekräfta & Starta om Nivån',
    inc_btn_continue: 'Bekräfta & Fortsätt (-{pen}% Säkerhet)',

    med_process: 'Trycksatt Processvätska',
    med_steam: 'Högtemperaturånga',
    med_water: 'Kylvatten',
    med_gas: 'Högtrycksgas / Kolväte',
    med_gravity: 'Självfalls-Kemikalie',
    med_electrical: 'Spänningssatt Eldrift',

    inc_live_vent_steam_title: 'Dödligt Utsläpp av Överhettad Ånga',
    inc_live_vent_steam_body: 'Att öppna {tag} på en aktiv {size} ångledning med {psi} PSI ({temp}) frigör en osynlig överljudsstråle som orsakar omedelbara, dödliga brännskador.',
    inc_live_vent_steam_seq: '1. Lås alla uppströms- och nedströmsventiler först. 2. Bekräfta Gul markering. 3. Öppna sedan {tag} till 0 PSI.',

    inc_live_vent_gas_title: 'Katastrofalt Högtrycks-Gasutsläpp',
    inc_live_vent_gas_body: 'Att öppna {tag} på en aktiv {size} gasledning med {psi} PSI skapar en dödlig gasstråle med kvävningsrisk och omedelbar gasmolnsexplosion.',
    inc_live_vent_gas_seq: '1. Lås alla blockventiler (inkl. DBB-par). 2. Bekräfta isolering. 3. Öppna {tag} till 0 PSI.',

    inc_live_vent_process_title: 'Dödligt Trycksatt Processutsläpp',
    inc_live_vent_process_body: 'Att öppna {tag} när {size}-ledningen har {psi} PSI sprutar farligt medium direkt mot operatören med risk för svår kemisk skada eller dödsfall.',
    inc_live_vent_process_seq: '1. Stoppa & lås motorer. 2. Lås ALLA ventiler (inkl. bypass). 3. Öppna {tag} först när sträckan är isolerad.',

    inc_live_blind_title: 'Katastrofal Flänsöppning under Tryck',
    inc_live_blind_body: 'Att lossa flänsbultar för blindbricka {tag} på en aktiv {size}-ledning med {psi} PSI blåser ut packningen 360° med dödliga kemiska eller termiska skador.',
    inc_live_blind_seq: '1. Lås manuella ventiler. 2. Avlasta till 0 PSI (Grön). 3. Vänd {tag} först vid bekräftade 0 PSI.',

    inc_psv_title: 'Förlust av Övertrycksskydd (Kärlbrott)',
    inc_psv_body: 'Att stänga {tag} slår ut säkerhetsventilen (PSV) medan tryckkällor är inkopplade — övertryck kan spränga kärlet med dödlig utgång.',
    inc_psv_seq: 'Stäng ALDRIG en PSV-ventil medan aktiva källor finns. Lämna {tag} öppen.',

    inc_cavitation_title: 'Pumpkavitation & Torrkörning',
    inc_cavitation_body: 'Att stänga sugventil {tag} medan {equip} går ({breaker} på) ger NPSH-brist, kraftig kavitation, förstörd axeltätning och brandrisk.',
    inc_cavitation_seq: '1. Bryt & lås brytare {breaker} FÖRST. 2. Stäng sedan {tag}.',

    inc_deadhead_title: 'Pumpning mot Stängd Ventil (Deadheading)',
    inc_deadhead_body: 'Att stänga tryck/bypass {tag} medan {equip} går ({breaker} på) höjer trycket och kokar vätskan i pumphuset tills tätning eller hus brister.',
    inc_deadhead_seq: '1. Bryt & lås brytare {breaker} FÖRST. 2. Stäng {tag} först när motorn står still.',

    inc_comp_surge_title: 'Kompressor-Surge & Övertryck',
    inc_comp_surge_body: 'Att stänga {tag} medan kompressor {equip} går ({breaker} på) orsakar våldsam surge och övertryck med risk för cylinderbrott.',
    inc_comp_surge_seq: '1. Lås Huvuddrift {breaker} FÖRST. 2. Sedan smörjoljepump. 3. Därefter gas- och kylvattenventiler.',

    inc_lube_title: 'Förlorad Smörjning — Lagerskärning',
    inc_lube_body: 'Att stoppa smörjoljepump {tag} medan huvuddrift {breaker} kör förstör oljefilmen och leder till omedelbar lagerskärning och brand.',
    inc_lube_seq: '1. Lås ALLTID Huvuddrift {breaker} FÖRST. 2. Lås smörjoljepump {tag} efter stopp.',

    inc_cooler_cw_title: 'Kokning & Termiskt Övertryck i Mantel',
    inc_cooler_cw_body: 'Att stänga kylvatten ({tag}) med varm process kvar i {equip} kokar stillastående vatten till ånga med risk för mantelbrott.',
    inc_cooler_cw_seq: '1. Isolera VARMA PROCESSEN FÖRST ({req}). 2. Stäng kylvatten {tag} efteråt.',

    inc_heater_proc_title: 'Termisk Expansion & Kokning av Instängd Vätska',
    inc_heater_proc_body: 'Att stänga in processvätska ({tag}) medan ånga värmer {equip} kokar vätskan och orsakar farligt övertryck.',
    inc_heater_proc_seq: '1. Isolera ÅNGVÄRMEN FÖRST ({req}). 2. Stäng processventil {tag} därefter.',

    inc_comp_cw_title: 'Förlorad Kompressorkylning',
    inc_comp_cw_body: 'Att stänga kylvatten ({tag}) medan kompressor {equip} kör ({breaker} på) ger snabb överhettning och självantändningsrisk.',
    inc_comp_cw_seq: '1. Lås Huvuddrift {breaker} FÖRST. 2. Stäng kylvatten {tag} efteråt.',

    inc_trapped_blind_title: 'Sprutrisk från Resttryck vid Fläns',
    inc_trapped_blind_body: 'Att öppna flänsen för {tag} med instängt tryck sprutar kemikalie över teknikerns händer och ansikte.',
    inc_trapped_blind_seq: '1. Håll ventiler låsta. 2. Avlasta till 0 PSI (Grön). 3. Vänd {tag}.',

    inc_tryout_elec_title: 'Misslyckad El-Tryout — Oväntad Start',
    inc_tryout_elec_body: 'Att trycka på {tag} startade motorn eftersom elen FORTFARANDE ÄR PÅ! Vid arbete hade roterande delar orsakat dödlig klämning.',
    inc_tryout_elec_seq: '1. Bryt & lås MCC-brytaren FÖRST. 2. Testa sedan {tag}.',

    inc_trap_cv_title: 'Ogiltig Isolering — Reglerventil',
    inc_trap_cv_body: 'Reglerventil {tag} läcker genom sätet och kan öppna vid luftbortfall — aldrig tillåten som LOTO-barriär.',
    inc_trap_cv_seq: 'Använd alltid manuella blockventiler för LOTO.',

    inc_trap_check_title: 'Ogiltig Isolering — Backventil',
    inc_trap_check_body: 'Backventil {tag} kan inte låsas och läcker ofta mottryck in i öppen utrustning.',
    inc_trap_check_seq: 'Lita aldrig på backventiler — lås manuell ventil nedströms.',

    log_seq_block: 'Ordningsfel vid {tag}: {title}',
    guide_seq_rule_html: '<strong>Säker Isoleringsordning:</strong> Stoppa &amp; lås alltid motorer <em>innan</em> pump-/kompressorventiler stängs, och isolera värmekällor <em>innan</em> kylning på värmeväxlare!'
  });

  /* ==================== 中文 简体 (zh) ==================== */
  i18n.registerLocale('zh', {
    inc_badge_fatal: '重大 HSE 安全事故 — 致命后果',
    inc_badge_hazard: '工艺安全与设备损坏警报',
    inc_lbl_device: '操作设备',
    inc_lbl_medium: '介质类型',
    inc_lbl_rating: '管径 / 压力',
    inc_lbl_severity: '后果等级',
    inc_sev_fatal: '致命 / 危及生命',
    inc_sev_hazard: '设备损毁 / 重伤风险',
    inc_consequence_hdr: '现场真实后果评估',
    inc_sequence_hdr: '正确的安全隔离顺序',
    inc_btn_restart: '↺ 确认并重新开始本关',
    inc_btn_continue: '确认并继续（扣 {pen}% 安全分）',

    med_process: '带压工艺流体',
    med_steam: '高温高压蒸汽 / 热媒',
    med_water: '冷却水',
    med_gas: '高压燃气 / 烃类气体',
    med_gravity: '高位重力化学介质',
    med_electrical: '带电运行电机',

    inc_live_vent_steam_title: '致命高温高压蒸汽喷射事故',
    inc_live_vent_steam_body: '在带压 {psi} PSI、{size} 蒸汽管线（{temp}）上打开 {tag}，会瞬间喷射出肉眼不可见的超音速过热蒸汽，现场作业人员将遭受瞬时致命深度烫伤。',
    inc_live_vent_steam_seq: '1. 先锁闭上下游全部切断阀。2. 确认管线高亮为黄色（已隔离）。3. 再打开 {tag} 安全泄压至 0 PSI。',

    inc_live_vent_gas_title: '灾难性高压气体喷射与闪爆事故',
    inc_live_vent_gas_body: '在带压 {psi} PSI、{size} 燃气管线上打开 {tag} 会引发高速高压气体喷射，造成致命冲击伤害、窒息以及瞬时蒸气云闪爆死亡事故。',
    inc_live_vent_gas_seq: '1. 锁闭全部上下游切断阀（含 DBB 阀组）。2. 确认隔离生效。3. 打开 {tag} 安全泄压至 0 PSI。',

    inc_live_vent_process_title: '致命带压工艺介质喷溅事故',
    inc_live_vent_process_body: '在 {size} 管线仍带压 {psi} PSI 时打开 {tag}，高压危险介质将直接喷向操作员，造成严重化学灼伤、高压注射伤或死亡。',
    inc_live_vent_process_seq: '1. 先停机并锁闭电机电源。2. 关闭并锁闭全部进出及旁路阀。3. 隔离后再打开 {tag}。',

    inc_live_blind_title: '灾难性带压断管泄漏（盲板作业）',
    inc_live_blind_body: '在带压 {psi} PSI、{size} 管线上拆螺栓翻转八字盲板 {tag} 会导致垫片 360° 瞬间吹穿，腐蚀性或高温介质全面喷洒至作业人员面部与身体，造成致命伤亡。',
    inc_live_blind_seq: '1. 锁闭全部手动切断阀。2. 通过放空/排凝彻底泄压至 0 PSI（绿色高亮）。3. 确认无压后再拆法兰翻转 {tag}。',

    inc_psv_title: '丧失超压保护 — 容器灾难性爆炸',
    inc_psv_body: '在压力源仍连通时关闭安全阀下方 {tag} 会使容器失去最后一道超压泄放保护，任何憋压或受热膨胀都将导致容器灾难性爆裂并造成人员伤亡。',
    inc_psv_seq: '存在带压源时严禁关闭安全阀 (PSV) 铅封常开阀，请保持 {tag} 开启并隔离其他工艺管口。',

    inc_cavitation_title: '离心泵汽蚀与干磨事故风险',
    inc_cavitation_body: '在 {equip} 仍通电运行（{breaker} 未断电）时关闭进口阀 {tag}，泵会瞬间失去汽蚀余量 (NPSH)，产生剧烈汽蚀与干磨，迅速毁坏机封并引发泄漏火灾。',
    inc_cavitation_seq: '1. 必须先断开并锁闭电机断路器 {breaker}。2. 停泵后再锁闭进口阀 {tag} 及出口阀。',

    inc_deadhead_title: '泵憋压（死头运行）与过热爆裂风险',
    inc_deadhead_body: '在 {equip} 仍运行（{breaker} 带电）时关闭出口/旁路阀 {tag} 会使泵憋压至关闭扬程，泵腔内介质迅速汽化沸腾，极易导致机封爆裂或泵壳损坏。',
    inc_deadhead_seq: '1. 必须先断开并锁闭断路器 {breaker}。2. 停机后再锁闭出口阀 {tag}。',

    inc_comp_surge_title: '压缩机喘振与高压超压风险',
    inc_comp_surge_body: '在高压压缩机 {equip} 运行中（{breaker} 带电）关闭气体阀门 {tag} 会引发剧烈喘振与瞬间超压，可能冲破气缸或管道。',
    inc_comp_surge_seq: '1. 先锁闭主驱动 {breaker}。2. 再锁闭润滑油泵。3. 最后关闭工艺气与冷却水阀。',

    inc_lube_title: '润滑中断 — 压缩机抱轴烧瓦',
    inc_lube_body: '在主电机 {breaker} 仍在运行时断开润滑油泵 {tag} 会瞬间破坏轴承油膜，导致金属干摩擦抱轴、严重机损甚至火灾。',
    inc_lube_seq: '1. 务必先停机并锁闭主电机 {breaker}。2. 停机后再锁闭辅助润滑油泵 {tag}。',

    inc_cooler_cw_title: '换热器壳程沸腾与热超压风险',
    inc_cooler_cw_body: '在热工艺介质仍在 {equip} 中流动时切断冷却水 ({tag})，滞留壳程水会迅速汽化沸腾并造成热超压爆管。',
    inc_cooler_cw_seq: '1. 必须先隔离热工艺侧 ({req})。2. 再关闭冷却水阀 {tag}。',

    inc_heater_proc_title: '滞留物料受热沸腾与热膨胀憋压',
    inc_heater_proc_body: '在高压加热蒸汽仍进入 {equip} 时封堵工艺侧 ({tag})，滞留液体受热急剧膨胀汽化，存在严重超压破裂风险。',
    inc_heater_proc_seq: '1. 必须先隔离加热蒸汽侧 ({req})。2. 再关闭工艺阀 {tag}。',

    inc_comp_cw_title: '压缩机断水过热风险',
    inc_comp_cw_body: '在压缩机 {equip} 运行中（{breaker} 带电）关闭冷却水 ({tag}) 会导致气缸迅速过热变形并引发气体自燃风险。',
    inc_comp_cw_seq: '1. 先锁闭主电机 {breaker}。2. 停机后再隔离冷却水 {tag}。',

    inc_trapped_blind_title: '残余压力导致法兰喷溅伤害',
    inc_trapped_blind_body: '在管线仍存残压时松开法兰翻转 {tag}，会导致危险介质从法兰缝隙喷向作业人员手部和面部。',
    inc_trapped_blind_seq: '1. 保持切断阀锁闭。2. 打开放空/排凝降至 0 PSI（绿色）。3. 再翻转盲板 {tag}。',

    inc_tryout_elec_title: '电气测试失败 — 设备意外启动',
    inc_tryout_elec_body: '按下现场按钮 {tag} 后电机启动了！电源仍处于带电状态——若检修人员已接触转轴，将导致致命卷入或挤压事故。',
    inc_tryout_elec_seq: '1. 先断开并上锁挂牌 MCC 断路器。2. 再回现场按 {tag} 验证无法启动。',

    inc_trap_cv_title: '无效隔离 — 气动调节阀陷阱',
    inc_trap_cv_body: '依赖调节阀 {tag} 做 LOTO 是工业致死事故主因之一：阀座内漏且失气/失电时可能突然打开冲伤人员。',
    inc_trap_cv_seq: '绝不使用调节阀做 LOTO，请锁闭上下游手动切断阀。',

    inc_trap_check_title: '无效隔离 — 止回阀陷阱',
    inc_trap_check_body: '止回阀 {tag} 无法上锁且易因杂质卡涩倒漏，会导致总管高压倒灌进拆开的设备。',
    inc_trap_check_seq: '绝不依赖止回阀隔离，请锁闭下游手动切断阀。',

    log_seq_block: '{tag} 顺序违规：{title}',
    guide_seq_rule_html: '<strong>安全隔离顺序：</strong>务必先停电锁闭电机<em>再</em>关闭泵/压缩机阀门（防止汽蚀和憋压）；换热器务必先断热源<em>再</em>断冷却水或封堵物料！'
  });

  /* ==================== 日本語 (ja) ==================== */
  i18n.registerLocale('ja', {
    inc_badge_fatal: '重大 HSE 事故 — 死亡災害リスク',
    inc_badge_hazard: 'プロセス安全・機器損傷警告',
    inc_lbl_device: '対象機器/弁',
    inc_lbl_medium: '流体・系統',
    inc_lbl_rating: '配管径 / 圧力',
    inc_lbl_severity: '重大度',
    inc_sev_fatal: '致命的 / 死亡リスク',
    inc_sev_hazard: '重篤損傷 / 負傷リスク',
    inc_consequence_hdr: '現場で実際に起こり得る結果',
    inc_sequence_hdr: '正しい安全隔離手順',
    inc_btn_restart: '↺ 確認してレベルをやり直す',
    inc_btn_continue: '確認して続行（安全スコア -{pen}%）',

    med_process: '加圧プロセス流体',
    med_steam: '高温高圧蒸気・熱媒',
    med_water: '冷却水',
    med_gas: '高圧ガス・炭化水素',
    med_gravity: '重力水頭薬液',
    med_electrical: '稼働中の電気駆動機',

    inc_live_vent_steam_title: '致死的な過熱蒸気噴出事故',
    inc_live_vent_steam_body: '{psi} PSI・{size} の稼働中蒸気ライン（{temp}）で {tag} を開けると、目に見えない超音速の過熱蒸気が噴出し、作業員は即座に致死的な重度熱傷を負います。',
    inc_live_vent_steam_seq: '1. 先に上下流すべての手動遮断弁を施錠する。2. 配管が黄色ハイライトであることを確認。3. その後 {tag} を開けて 0 PSI へ脱圧する。',

    inc_live_vent_gas_title: '高圧ガス噴出・蒸気雲爆発事故',
    inc_live_vent_gas_body: '{psi} PSI・{size} の稼働中ガスラインで {tag} を開けると高圧ジェット噴出が発生し、致死的な衝撃・酸欠および瞬時の蒸気雲爆発を引き起こします。',
    inc_live_vent_gas_seq: '1. 上下流の遮断弁（DBB 含む）をすべて施錠。2. 隔離を確認。3. {tag} を開けて 0 PSI まで脱圧。',

    inc_live_vent_process_title: '致死的な加圧流体噴出事故',
    inc_live_vent_process_body: '{size} ラインが {psi} PSI で加圧中に {tag} を開けると、危険流体が作業員へ直撃し、重篤な化学熱傷・高圧注入障害・死亡事故に至ります。',
    inc_live_vent_process_seq: '1. まずモーターを停止・施錠。2. バイパスを含む全遮断弁を施錠。3. 隔離後にのみ {tag} を開放。',

    inc_live_blind_title: '加圧下フランジ開放による重大噴出事故',
    inc_live_blind_body: '{psi} PSI・{size} の稼働中ラインでブラインド {tag} のフランジを緩めると、ガスケットが全周吹き飛び、高温・腐食流体が作業員に直撃して死亡災害となります。',
    inc_live_blind_seq: '1. 手動遮断弁をすべて施錠。2. ベント・ドレンで 0 PSI（緑ハイライト）へ完全脱圧。3. 0 PSI 確認後に {tag} を反転。',

    inc_psv_title: '過圧保護喪失 — 容器破裂事故',
    inc_psv_body: '圧力源が接続されたまま安全弁下の {tag} を閉じると過圧逃がし機能を失い、閉塞や熱膨張で容器が致命的に破裂・爆発します。',
    inc_psv_seq: '加圧源が繋がっている間は PSV 弁を絶対に閉めないでください。{tag} を開いたまま他ノズルを隔離します。',

    inc_cavitation_title: 'ポンプ キャビテーション・空運転リスク',
    inc_cavitation_body: '{equip} が稼働中（{breaker} 通電中）に吸込弁 {tag} を閉じると NPSH 不足で激しいキャビテーションと空運転が起き、軸封破損や火災を招きます。',
    inc_cavitation_seq: '1. まず MCC ブレーカー {breaker} を遮断・施錠。2. ポンプ停止後に吸込弁 {tag} 等を閉止・施錠。',

    inc_deadhead_title: 'ポンプ締切運転（デッドヘッド）・過圧リスク',
    inc_deadhead_body: '{equip} 稼働中（{breaker} 通電中）に吐出/バイパス弁 {tag} を閉じると締切運転となり、圧力急上昇と内部液沸騰により軸封やケーシングが破損します。',
    inc_deadhead_seq: '1. まず MCC ブレーカー {breaker} を遮断・施錠。2. 回転機停止後に {tag} を閉止・施錠。',

    inc_comp_surge_title: '圧縮機サージング・急激過圧リスク',
    inc_comp_surge_body: '圧縮機 {equip} が稼働中（{breaker} 通電中）にガス弁 {tag} を閉じると激しいサージングと過圧が発生し、シリンダーや配管破損につながります。',
    inc_comp_surge_seq: '1. 主駆動機 {breaker} を最初に施錠。2. 次に潤滑油ポンプ。3. その後ガス弁・冷却水弁を隔離。',

    inc_lube_title: '潤滑油喪失 — 軸受焼付き事故',
    inc_lube_body: '主駆動機 {breaker} が稼働中に潤滑油ポンプ {tag} を止めると油膜が瞬時に切れ、軸受焼付き・機械破壊・火災を引き起こします。',
    inc_lube_seq: '1. 必ず主駆動機 {breaker} を先に停止・施錠。2. 停止後に潤滑油ポンプ {tag} を施錠。',

    inc_cooler_cw_title: '熱交胴側沸騰・熱過圧リスク',
    inc_cooler_cw_body: '高温流体が {equip} に流れたまま冷却水 ({tag}) を止めると、滞留水が沸騰・蒸気化して胴側が熱過圧破損する危険があります。',
    inc_cooler_cw_seq: '1. 先に高温プロセス側 ({req}) を隔離。2. その後、冷却水弁 {tag} を閉止。',

    inc_heater_proc_title: '滞留液の沸騰・熱膨張過圧リスク',
    inc_heater_proc_body: '高圧加熱蒸気が {equip} に入ったままプロセス側 ({tag}) を閉じ込めると、滞留液が急激に熱膨張・沸騰し破裂する恐れがあります。',
    inc_heater_proc_seq: '1. 先に加熱蒸気側 ({req}) を隔離。2. その後プロセス弁 {tag} を閉止。',

    inc_comp_cw_title: '圧縮機冷却喪失・過熱リスク',
    inc_comp_cw_body: '圧縮機 {equip} 稼働中（{breaker} 通電中）に冷却水 ({tag}) を止めるとシリンダーが急激に過熱し、ガス自然発火の危険が生じます。',
    inc_comp_cw_seq: '1. 主駆動機 {breaker} を最初に施錠。2. 停止後に冷却水弁 {tag} を隔離。',

    inc_trapped_blind_title: '残圧によるフランジ噴出リスク',
    inc_trapped_blind_body: '残圧が残ったまま {tag} のフランジを開くと、隙間から危険流体が作業員の手や顔へ噴き出します。',
    inc_trapped_blind_seq: '1. 遮断弁は施錠のまま維持。2. ベント/ドレンで 0 PSI（緑）に脱圧。3. その後 {tag} を反転。',

    inc_tryout_elec_title: '電気 Tryout 不合格 — 予期せぬ起動',
    inc_tryout_elec_body: '{tag} を押すと機器が起動しました！電源が活きています——整備中であれば回転体による致命的な巻き込まれ事故となります。',
    inc_tryout_elec_seq: '1. 先に MCC 遮断器を開放・施錠。2. その後 {tag} で起動しないことを検証。',

    inc_trap_cv_title: '無効な隔離 — 空気圧調節弁',
    inc_trap_cv_body: '調節弁 {tag} は内部リークや計装空気喪失による急開リスクがあり、LOTO 遮断境界として依存すると死亡災害の原因になります。',
    inc_trap_cv_seq: '調節弁は LOTO に使わず、上下流の手動遮断弁を施錠してください。',

    inc_trap_check_title: '無効な隔離 — 逆止弁',
    inc_trap_check_body: '逆止弁 {tag} は施錠できず異物噛み込みで漏れやすいため、開放機器へ高圧背圧が逆流します。',
    inc_trap_check_seq: '逆止弁に頼らず、下流の手動遮断弁を施錠してください。',

    log_seq_block: '{tag} 手順違反：{title}',
    guide_seq_rule_html: '<strong>安全な運転停止・隔離手順：</strong>ポンプや圧縮機の弁を閉じる<em>前に</em>必ず電源を施錠し（キャビテーション・締切防止）、熱交換器では冷却側より<em>先に</em>高温熱源を遮断してください！'
  });
})(window);
