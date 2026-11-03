# Workshop house rules

- We are business people, not programmers. Explain what you're doing in plain English.
- These are real companies. Never invent an event or show sample alerts about them.
  Every warning needs a real source link and date. For test data, use only
  Cataloochee Cell Works.
- Never write our API key into any file. This repository is public.
- Everything must work with a double-click on index.html and also at our live link.
- When we say "save to GitHub", commit and push with a short note.
  When we say "get the latest", pull first.

## How our dashboard fits together

Our team builds ONE dashboard together. Each person owns one section of it.

- index.html is the dashboard: the page frame, the layout and an empty box for each
  section. Only the dashboard owner edits it.
- Each section lives in its own file in the sections folder, such as
  sections/weather.js. Only that section's owner edits it.
- A section file draws its content into the box on index.html with the same name.
  For example, sections/weather.js fills <div id="weather">. index.html loads every
  section with a line like <script src="sections/weather.js"></script>.
- If a section's box isn't on index.html yet, the section should still load
  without errors; it simply shows up once the dashboard owner adds the box.
- Our purchasing data is in data/laurel-ridge-data.js, available as
  window.LAUREL_RIDGE. index.html loads it before any section. Use it instead of
  reading the CSV files, so everything works with a double-click.
- Keep each section's styles inside its own file, with names that start with the
  section's name, so sections don't change each other's look.

## Our team's plan

### Early-warning detection plan

For each risk type, the source we watch, how we check it, and who it affects.

**Auto** = a public feed our JavaScript can fetch directly, no key needed.
**Manual** = no fetchable feed; a teammate opens the link, confirms the date,
and enters what they find (still with a real link and date, per house rules).

| # | Risk type | Best source | Detect how | Affects |
|---|---|---|---|---|
| 1 | Weather & natural disasters | USGS earthquake feed (earthquake.usgs.gov); Taiwan Central Weather Administration; NOAA National Hurricane Center (nhc.noaa.gov); NWS flood warnings for western NC | **Auto** for USGS (public GeoJSON feed). **Manual** for NHC/Taiwan CWA/NWS. | Giant, Fox, Tektro, KMC (Taiwan); Shimano (Malaysia monsoon); Cataloochee (NC flooding); Savannah/Charleston (hurricane) |
| 2 | Port and shipping disruptions | Georgia Ports Authority status page (gaports.com); SC Ports Authority (scspa.com); US Coast Guard port conditions | **Manual** — no public API; check the status page, note date and finding. | Nearly every overseas supplier (10 of 13 ship through Savannah or Charleston) |
| 3 | Labor actions | ILA press releases; supplier investor/press pages (Bosch, Shimano, Continental); local news search for each factory city | **Manual** — saved news-search links per city, checked each round. | Single-source suppliers: Giant, Bosch, Shimano, Cataloochee |
| 4 | Geopolitical & trade issues | USTR tariff actions (ustr.gov); Bureau of Industry and Security export controls (bis.doc.gov); wire service search for "Taiwan Strait" | **Manual** — notices/articles, not structured feeds. | Bafang, Giant, Fox, Tektro, KMC (greater China/Taiwan exposure); Cataloochee (Korean cell imports) |
| 5 | Factory-specific incidents (fire, explosion, cyberattack) | Local news near each plant; supplier investor/press pages; Bicycle Retailer and Industry News (bicycleretailer.com) | **Manual** — saved news-search link per supplier city. | Any single-sourced supplier, especially Giant, Bosch, Shimano, Cataloochee, Tektro |
| 6 | Financial trouble | SEC EDGAR filings/press releases for public parents (Shimano, Continental, Bosch); business press for private suppliers | **Auto** possible for EDGAR full-text search (public API). **Manual** for private suppliers. | Any supplier, but earliest signal only for publicly traded parents |
| 7 | Raw material shortages | Samsung SDI investor announcements (battery cells feeding Cataloochee); London Metal Exchange aluminum pricing (affects Giant's frames) | **Manual** — check and cite. | Cataloochee (battery cells); Giant (aluminum) |
| 8 | Regulatory & compliance changes | European Chemicals Agency REACH updates (echa.europa.eu); US CPSC e-bike battery rules (cpsc.gov) | **Manual** — check and cite date. | Bosch, Continental (EU rules); Cataloochee (US battery import rules) |
| 9 | Public health events | WHO disease outbreak news (who.int); Taiwan CDC; Malaysia Ministry of Health | **Manual** — check and cite. | Any overseas supplier, especially Taiwan cluster and Shimano (Malaysia) |
| 10 | Energy shortages | Taiwan Power Company grid alerts (taipower.com.tw); ENTSO-E European grid transparency platform (entsoe.eu) | **Manual** for Taipower. ENTSO-E API needs a registration token, so manual for now. | Giant, Fox, Tektro, KMC (Taiwan grid); Bosch, Continental, DT Swiss, Busch & Muller, Selle Royal (European grid) |

**What this means for the build:**
- Only #1 (USGS earthquakes) and #6 (SEC EDGAR) have public, no-key feeds we
  can fetch live from `sections/*.js`. These are our baseline "real, current,
  automatically-checked" warning signs.
- Everything else is a manual check: a teammate opens the linked source,
  confirms what it says and the date, and records that in the section file.
  Still a real source link and date — just not polled by code.
- Rhythm: automated sources refresh every time the dashboard loads; manual
  sources get checked once per work block and the date updated by hand.

(Sections, owners, and alert rules to be filled in as the team decides.)
