# LOTOTO Master — Interactive P&ID Isolation Training Game

An interactive, browser-based gamified training simulator for **LOTOTO (Lockout, Tagout, Tryout)** built around live **P&ID (Piping & Instrumentation Diagram)** isolation markups.

Players isolate pumps, strainers, heat exchangers, pressure vessels, reactors, compressors, and storage tanks across **15 progressively challenging levels**—watching isolated flow paths dynamically highlight just like marking up a real P&ID before issuing a Safe Work Permit.

---

## Key Features

- **Dynamic P&ID Markup Highlighter**: Powered by a real graph-based energy propagation solver. As you close, lock, and tag isolation points:
  - **Live / Energized Lines** animate in color-coded stream styles (Process, Steam/Hot, Cooling Water, Gas/N₂, Gravity, Electrical).
  - **Highlighter Yellow** marks newly isolated piping envelopes that still hold trapped/stored pressure.
  - **Highlighter Emerald Green** marks isolated envelopes that have been safely vented/drained to `0 PSI` (zero energy).
- **Full 3-Step LOTOTO Workflow**:
  1. **Lock & Tag:** Close and apply locks/tags to manual block valves, electrical MCC breakers, and spectacle blinds.
  2. **Vent & Drain:** Safely depressurize isolated envelopes (opening a vent or drain on a live pressurized line triggers a realistic hazard warning!).
  3. **Tryout & Verify:** Bump-test local Start/Stop (HOA) switches, verify live pressure gauges (`PI`) read `0 PSI`, prove Double Block & Bleed tightness, and run atmospheric gas tests (`0% LEL`) for confined space entry.
- **Realistic Industrial Traps**:
  - **Control Valves (`FV`)** and **Check Valves (`CV`)** cannot be relied upon as valid positive isolation boundaries.
  - **Pressure Safety Valves (`PSV`)** must never be isolated while live pressure sources remain connected.
  - **Keep-Live Operations** require isolating a duty unit without starving a running standby pump or shared header.
  - **Line-Break Sequencing** requires isolating and depressurizing to `0 PSI` before swinging a **Spectacle Blind (`SB`)**.
- **Gamification & Instructor Tools**:
  - 1–3 Star ratings per level, Safety Compliance Score, Clean Streak combos, XP & Safety Ranks, synthesized sound effects (with mute toggle), context-aware hints, and an **Instructor Mode (Unlock All 15)** toggle for classroom demos.
- **100% Client-Side & Zero Dependencies**: Pure HTML5, CSS3, SVG, and vanilla JavaScript. No backend, no build tools, no API keys, and no tracking—player progress is stored locally in the browser (`localStorage`).

---

## 15-Level Curriculum

| Tier | Level | Scenario | Target Equipment | Core LOTOTO Concept |
| :---: | :---: | :--- | :--- | :--- |
| **Tier 1**<br>*Apprentice* | 1 | **Pump Seal Swap** | `P-101` Centrifugal Pump | Basic LOTOTO: Lock, Drain & Tryout |
| | 2 | **Basket Strainer Cleanout** | `S-102` Inline Strainer | High-point venting & low-point draining |
| | 3 | **The Bypass Trap** | `P-103` Transfer Pump | Tracing hidden warmup/recirculation bypasses |
| | 4 | **Don't Trust Control Valves** | `E-401` Inline Heater | Control valves (`FV`) ≠ valid LOTO isolation |
| | 5 | **Check Valve Illusion** | `P-105` Booster Pump | Check valves (`CV`) ≠ isolation boundaries |
| **Tier 2**<br>*Journeyman* | 6 | **Twin Parallel Pumps** | `P-201A` *(Keep `P-201B` Live!)* | Selective train isolation without tripping standby |
| | 7 | **Shell & Tube Exchanger** | `E-301` Process Cooler | Isolating two independent fluid chambers |
| | 8 | **Gravity Head & Overhead Feed** | `V-302` Blending Drum | Controlling stored gravitational energy |
| | 9 | **Agitated Jacketed Reactor** | `R-401` Chemical Reactor | Multi-energy: Process + Steam Jacket + 480V Agitator |
| | 10 | **Double Block & Bleed** | `M-501` 600 PSI Gas Meter | High-pressure DBB valve pairs & inter-valve bleeds |
| **Tier 3**<br>*Master Lead* | 11 | **Positive Isolation — Line Break** | `E-502` Acid Reboiler | Depressurize first → swing Spectacle Blinds (`SB`) |
| | 12 | **Separator Drum & PSV Protection** | `V-601` 2-Phase Separator | Multi-nozzle vessel, N₂ check valve & PSV protection |
| | 13 | **Multi-Energy Gas Compressor** | `K-701` Compressor Skid | Gas, recycle loop, cooling water & dual MCC motors |
| | 14 | **Confined Space — Storage Tank** | `T-801` Storage Tank | Full nozzle blinding, steam coil, mixer & gas testing |
| | 15 | **Master Turnaround — Charge Unit** | `P-901A` + `E-901` *(Keep `P-901B` Live!)* | Grand Finale combining all LOTOTO disciplines |

---

## Running Locally

No installation or build step is required:

1. Download or clone this repository.
2. Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox, or Safari).

---

## Hosting on GitHub Pages

1. Create a new public GitHub repository and upload/push all files from this folder to the `main` branch.
2. In your repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
5. After a minute, GitHub will publish your live link at `https://<your-username>.github.io/<repo-name>/`, which you can share with anyone to play directly in their browser.

---

## Project Structure

```text
LOTOTO-PID-Game/
├── index.html       # App shell, Campaign Map, HUD, and modals
├── styles.css       # Modern bright training schematic UI & SVG animations
├── js/
│   ├── engine.js    # Graph-based flow solver, highlighter states & LOTOTO rules
│   ├── levels.js    # 15 handcrafted P&ID levels & educational takeaways
│   ├── renderer.js  # Interactive SVG P&ID renderer, padlocks, blinds & gauges
│   ├── audio.js     # Zero-asset Web Audio API tactile sound synthesizer
│   └── app.js       # Game loop, star/XP progression, tooltips & confetti
└── README.md
```

---

## Safety & Training Disclaimer

> **For Educational & Gamified Training Use Only:** This application is a simplified interactive learning aid designed to build familiarity with P&ID isolation concepts and Lockout, Tagout, Tryout (LOTOTO) principles. It is **not** a substitute for formal training, qualified supervision, applicable regulations (such as OSHA 29 CFR 1910.147), or your facility's site-specific written energy control and permitting procedures. Always follow approved plant procedures and verify actual field conditions before performing work on industrial equipment.
