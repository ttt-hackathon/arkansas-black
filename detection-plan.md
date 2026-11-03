# Early-warning detection plan (draft)

This is a working draft for the team to review before it goes into CLAUDE.md
as our final plan. For each risk type, it proposes a source, how fast we can
realistically check it, and whether it can be fetched automatically by our
dashboard (no backend, must still work on a double-click) or needs a person
to check a link and note the date.

Legend: **Auto** = the source has a public feed our JavaScript can fetch
directly. **Manual** = no fetchable feed; a teammate opens the link, confirms
the date, and enters what they find (with the link and date, per house rules).

| # | Risk type | Best source | Detect how | Affects |
|---|---|---|---|---|
| 1 | Weather & natural disasters | USGS earthquake feed (earthquake.usgs.gov); Taiwan Central Weather Administration; NOAA National Hurricane Center (nhc.noaa.gov); NWS flood warnings for western NC | **Auto** for USGS (public GeoJSON feed, no key needed). **Manual** for NHC/Taiwan CWA/NWS — link to the live map, cite the date checked. | Giant, Fox, Tektro, KMC (Taiwan); Shimano (Malaysia monsoon); Cataloochee (NC flooding); Savannah/Charleston (hurricane) |
| 2 | Port and shipping disruptions | Georgia Ports Authority status page (gaports.com); SC Ports Authority (scspa.com); US Coast Guard port conditions | **Manual** — these don't publish a public API; check the status page, note date and what it says. | Nearly every overseas supplier (10 of 13 ship through Savannah or Charleston) |
| 3 | Labor actions | ILA press releases; supplier investor/press pages (Bosch, Shimano, Continental); local news search for each factory city | **Manual** — news search per city. A section can hold saved search links (e.g. "Taichung factory strike") for a one-click check each round. | Single-source suppliers: Giant, Bosch, Shimano, Cataloochee |
| 4 | Geopolitical & trade issues | USTR tariff actions (ustr.gov); Bureau of Industry and Security export controls (bis.doc.gov); wire service search for "Taiwan Strait" | **Manual** — these are notices/articles, not structured feeds we can safely auto-parse. | Bafang, Giant, Fox, Tektro, KMC (greater China/Taiwan exposure); Cataloochee (Korean cell imports) |
| 5 | Factory-specific incidents (fire, explosion, cyberattack) | Local news near each plant; supplier investor/press pages; Bicycle Retailer and Industry News (bicycleretailer.com) | **Manual** — a saved news-search link per supplier city is the practical approach; no single incident feed exists. | Any single-sourced supplier, especially Giant, Bosch, Shimano, Cataloochee, Tektro |
| 6 | Financial trouble | SEC EDGAR filings/press releases for public parents (Shimano, Continental, Bosch); business press for private suppliers | **Auto** possible for EDGAR full-text search (public API, no key). **Manual** for private suppliers (Fox, Giant, Bafang, DT Swiss, Busch & Muller, Selle Royal, KMC, Uline, Cataloochee). | Any supplier, but easiest to catch early only for the publicly traded parents |
| 7 | Raw material shortages | Samsung SDI investor announcements (battery cells feeding Cataloochee); London Metal Exchange aluminum pricing (affects Giant's frames) | **Manual** — announcement pages and pricing pages don't offer a simple open fetch; check and cite. | Cataloochee (battery cells); Giant (aluminum) |
| 8 | Regulatory & compliance changes | European Chemicals Agency REACH updates (echa.europa.eu); US CPSC e-bike battery rules (cpsc.gov) | **Manual** — regulatory notices, check and cite date. | Bosch, Continental (EU rules); Cataloochee (US battery import rules) |
| 9 | Public health events | WHO disease outbreak news (who.int); Taiwan CDC; Malaysia Ministry of Health | **Manual** — outbreak notices, check and cite. | Any overseas supplier, especially Taiwan cluster and Shimano (Malaysia) |
| 10 | Energy shortages | Taiwan Power Company grid alerts (taipower.com.tw); ENTSO-E European grid transparency platform (entsoe.eu) | **Manual** for Taipower. ENTSO-E has an API but it requires a registration token, so treat as manual for now. | Giant, Fox, Tektro, KMC (Taiwan grid); Bosch, Continental, DT Swiss, Busch & Muller, Selle Royal (European grid) |

## What this means for the build

- Only **#1 (USGS earthquakes)** and **#6 (SEC EDGAR)** have public, no-key
  feeds we can fetch straight from `sections/*.js` with `fetch()` and show
  live. These should be our two "real, current, automatically-checked"
  warning signs for the minimum requirement.
- Everything else is realistically a **manual check**: a teammate opens the
  linked source, confirms what it says and the date, and records that in the
  section file — still a "real source link and date," just not polled by
  code. That satisfies the house rule without us faking live feeds we can't
  actually build in the time we have.
- Suggested rhythm: automated sources can refresh every time the dashboard
  loads; manual sources get checked once per work block (e.g., at 1:45 and
  2:45) and the date updated by hand.
- If any team wants automated Taiwan weather, port status, or news
  monitoring, the practical path is routing those fetches through a small
  proxy or feed-reader service — out of scope for a double-click HTML page,
  so flagging it as a stretch goal rather than baseline.

## Next step

Once the team agrees on which of these to build first, one person should
tell Claude: *"Write our plan into CLAUDE.md and save it to GitHub."*
