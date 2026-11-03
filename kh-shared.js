// Shared helpers for indexkh.html (map dashboard) and supplierkh.html (supplier detail page).
// Keeping the order-color rule here means both pages always agree.
(function () {
  var D = window.LAUREL_RIDGE;
  var TODAY = D.asOf; // "today" is the date our data is current to
  var DAY = 86400000;
  var BEHIND_DAYS = 3, DELAYED_DAYS = 15;
  var RANK = { green: 0, yellow: 1, red: 2 };
  var LABEL = { green: "On time", yellow: "Behind", red: "Delayed" };
  var COLOR = { green: "#2e8b57", yellow: "#f2b705", red: "#c62828" };

  function t(s) { return Date.parse(s + "T00:00:00Z"); }
  function fmt(s) { return new Date(t(s)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }); }
  function money(n) { return "$" + Number(n).toLocaleString("en-US"); }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  // Turn one order into red / yellow / green. Our data has shipping status but no
  // "late" flag, so we work it out from the dates.
  function grade(o, sup) {
    var normal = t(o.order_date) + sup.lead_time_days * DAY;
    var late = Math.round((t(o.promised_arrival_date) - normal) / DAY);
    var level = "green", why = [];
    if (late >= DELAYED_DAYS) level = "red";
    else if (late >= BEHIND_DAYS) level = "yellow";
    if (late >= BEHIND_DAYS) why.push("Promised arrival is " + late + " days later than the normal " + sup.lead_time_days + "-day lead time.");
    if (o.status === "Awaiting shipment") {
      if (t(o.promised_ship_date) < t(TODAY)) { level = "red"; why.push("Should have shipped " + fmt(o.promised_ship_date) + " but has not."); }
      else if (t(o.promised_ship_date) === t(TODAY) && RANK[level] < 1) { level = "yellow"; why.push("Due to ship today and has not shipped yet."); }
    }
    if (!why.length) why.push("Promised arrival matches the normal lead time.");
    return { level: level, why: why.join(" ") };
  }

  // One entry per supplier: { sup, orders:[{o,g}], level }, only suppliers with an open order, A to Z.
  function entries() {
    var by = {};
    D.suppliers.forEach(function (s) { by[s.supplier_id] = { sup: s, orders: [], level: "green" }; });
    D.openOrders.forEach(function (o) {
      var e = by[o.supplier_id]; if (!e) return;
      var g = grade(o, e.sup);
      e.orders.push({ o: o, g: g });
      if (RANK[g.level] > RANK[e.level]) e.level = g.level;
    });
    return Object.keys(by).map(function (k) { return by[k]; })
      .filter(function (e) { return e.orders.length; })
      .sort(function (a, b) { return a.sup.supplier_name.localeCompare(b.sup.supplier_name); });
  }

  function ruleText() {
    return "<b>How we color an order:</b> we compare the promised arrival date with the supplier's normal lead time (order date + lead time). " +
      "Green = within 2 days. Yellow (behind) = " + BEHIND_DAYS + "–" + (DELAYED_DAYS - 1) + " days later than normal, or still awaiting shipment on its ship date. " +
      "Red (delayed) = " + DELAYED_DAYS + "+ days later than normal, or still awaiting shipment after its promised ship date. " +
      "A supplier's color is its worst order.";
  }

  window.KH = { D: D, TODAY: TODAY, LABEL: LABEL, COLOR: COLOR, t: t, fmt: fmt, money: money, el: el, grade: grade, entries: entries, ruleText: ruleText };
})();
