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
    return env.ASSETS.fetch(new Request(url, request));
  },
};