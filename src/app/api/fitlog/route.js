export async function GET() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 60 }, // 60 sec cache — barbar call korbe na
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("Upstream status:", res.status, text.slice(0, 300));
      return Response.json({ error: "Upstream failed", status: res.status }, { status: 502 });
    }

    const data = JSON.parse(text);
    return Response.json(data);
  } catch (err) {
    console.error("Fetch error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}