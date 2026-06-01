# Wuttke in der Heide – Neue Website

**Freizeitanlage Wuttke in der Heide · Marl · Redesign 2024**

---

## Projektübersicht

Vollständig neue, statische HTML/CSS/JS-Website für die Freizeitanlage „Wuttke in der Heide" in Marl.
Design-Konzept: **Modern-Rustikal** – zeitgemäßes Layout mit rustikalen Elementen (Holztöne, Vintage-Typografie, Naturfarben).

Alle Inhalte und Bilder wurden von der bestehenden Website übernommen und in das neue Design integriert.
Keine externen CDN-Abhängigkeiten – alles lokal im Repository.

---

## Seitenstruktur

```
wuttke-website/
├── index.html                    ← Startseite
├── pages/
│   ├── neuigkeiten.html          ← Neuigkeiten
│   ├── biergarten.html           ← Unser Biergarten
│   ├── firmenveranstaltung.html  ← Firmenveranstaltungen
│   ├── grillplaetze.html         ← Grillplätze
│   ├── minigolf.html             ← Minigolf
│   ├── pit-pat.html              ← Pit Pat
│   ├── planwagen-fahrten.html    ← Planwagenfahrten
│   ├── spielplatz-initiative.html← Spielplatz-Initiative
│   ├── feuerstelle.html          ← Feuerstelle
│   ├── ueber-uns.html            ← Über uns / Geschichte
│   ├── presse.html               ← Presse-Chronik
│   ├── speisen.html              ← Speisekarte
│   ├── ihr-weg-zu-uns.html       ← Anfahrt & Öffnungszeiten
│   ├── sonstiges.html            ← Sonstiges
│   └── impressum.html            ← Impressum & Datenschutz
├── assets/
│   ├── css/
│   │   └── style.css             ← Haupt-Stylesheet (modern-rustikal)
│   ├── js/
│   │   └── main.js               ← JavaScript (Navigation, Lightbox, Animationen)
│   ├── fonts/
│   │   ├── *.ttf                 ← Lokal gespeicherte Schriften
│   │   └── fonts_local.css       ← @font-face Definitionen
│   └── images/
│       ├── biergarten_00-14.jpg  ← Biergarten-Fotos
│       ├── minigolf_00-02.jpg    ← Minigolf-Fotos
│       ├── neuigkeiten_00-17.jpg ← Neuigkeiten-Fotos
│       ├── planwagen-fahrten_*.jpg
│       ├── presse_00-10.jpg      ← Presseartikel-Scans
│       ├── sonstiges_*.jpg
│       └── stauder_logo.webp
└── README.md
```

---

## Design-System

### Farben (Rustikal-Palette)

| Variable              | Farbe       | Verwendung                        |
|-----------------------|-------------|-----------------------------------|
| `--color-forest`      | `#2d5016`   | Primärfarbe (Wald-Grün)           |
| `--color-forest-dark` | `#1a3009`   | Dunkles Grün (Header, Footer)     |
| `--color-bark`        | `#5c3d1e`   | Holzbraun (Überschriften)         |
| `--color-rust`        | `#8b3a0f`   | Rost-Rot (Akzente)                |
| `--color-gold`        | `#c8952a`   | Gold (Highlights, Preise)         |
| `--color-earth`       | `#8b6914`   | Erde-Ton (Borders)                |
| `--color-parchment`   | `#f5f0e8`   | Pergament (Hintergründe)          |
| `--color-sand`        | `#d4b896`   | Sand (Sekundärtext)               |

### Typografie

- **Display/Überschriften:** Playfair Display (Serif, lokal)
- **Rustikal/Preise:** Rye (Western-Stil, lokal)
- **Fließtext:** Lato (Sans-Serif, lokal)

---

## Technische Details

- **Typ:** Statische HTML/CSS/JS-Website (kein Framework, kein Build-Tool)
- **Responsive:** Vollständig responsive (Mobile-First)
- **Bilder:** Alle lokal gespeichert unter `assets/images/`
- **Schriften:** Alle lokal gespeichert unter `assets/fonts/`
- **JavaScript:** Vanilla JS (keine Abhängigkeiten)
  - Mobile Navigation (Hamburger-Menü)
  - Scroll-Animationen (Fade-In)
  - Lightbox für Galerien
  - Back-to-Top Button
  - Cookie-Banner
  - Sticky Header

---

## Deployment

### Option 1: GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit: Wuttke in der Heide – neue Website"
git branch -M main
git remote add origin https://github.com/[username]/wuttke-website.git
git push -u origin main
```

Dann in den GitHub-Repository-Einstellungen unter **Pages** den Branch `main` aktivieren.

### Option 2: Webserver (Apache/Nginx)

Einfach den gesamten Ordner `wuttke-website/` in das Webroot-Verzeichnis kopieren:

```bash
rsync -avz ./wuttke-website/ user@server:/var/www/html/
```

### Option 3: Netlify / Vercel

Direkt das Repository verbinden – automatisches Deployment bei jedem Push.

---

## Kontakt / Inhaber

**Wuttke in der Heide**  
Marcell Rost  
Hervester Str. 204  
45768 Marl  
Tel.: 02365 13953  
Web: [wuttke-marl.de](http://wuttke-marl.de)

---

*Erstellt 2024 – Redesign der bestehenden Website wuttke-marl.de*
