const SITES = {
  "brickulubu.com": "main",
  "www.brickulubu.com": "main",
  "atakum.brickulubu.com": "atakum",
  "sekans.brickulubu.com": "sekans",
  "kup.brickulubu.com": "kup",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const site = SITES[url.hostname];
    if (!site) return new Response("Site bulunamadı", { status: 404 });

    url.pathname = `/${site}${url.pathname}`;
    const res = await env.ASSETS.fetch(new Request(url, request));

    // Yönlendirmelerdeki iç klasör önekini (/sekans) at
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("Location");
      if (loc) {
        const hedef = new URL(loc, request.url);
        if (hedef.pathname.startsWith(`/${site}/`)) {
          hedef.pathname = hedef.pathname.slice(site.length + 1);
        }
        const h = new Headers(res.headers);
        h.set("Location", hedef.toString());
        return new Response(null, { status: res.status, headers: h });
      }
    }
    return res;
  },
};