import * as ical from "node-ical";

function toISO(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default async function handler(req, res) {
  try {
    const url = process.env.BOOKING_ICAL_URL;
    if (!url) {
      return res.status(500).json({ error: "Missing BOOKING_ICAL_URL env var" });
    }

    const data = await ical.async.fromURL(url);

    // Set zasedenih datumov (YYYY-MM-DD)
    const booked = new Set();

    for (const key of Object.keys(data)) {
      const ev = data[key];
      if (!ev || ev.type !== "VEVENT" || !ev.start || !ev.end) continue;

      const start = new Date(ev.start);
      const end = new Date(ev.end);

      // Booking iCal end je praviloma checkout dan (ta dan NI zaseden).
      const cur = new Date(start);
      cur.setHours(0, 0, 0, 0);

      const endDay = new Date(end);
      endDay.setHours(0, 0, 0, 0);

      while (cur < endDay) {
        booked.add(toISO(cur));
        cur.setDate(cur.getDate() + 1);
      }
    }

    // cache na Vercelu (15 min)
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");
    return res.status(200).json({ booked: Array.from(booked).sort() });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
