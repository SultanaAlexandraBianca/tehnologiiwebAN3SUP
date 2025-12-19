const axios = require("axios");

async function bingSearch(query) {
  const key = process.env.BING_KEY;
  const endpoint = process.env.BING_ENDPOINT;

  // Fallback dacă nu ai key (ca să poți demonstra)
  if (!key || key === "PASTE_YOUR_KEY_HERE") {
    return [
      { title: `Demo result for: ${query}`, url: "https://example.com", snippet: "Setează BING_KEY ca să vezi rezultate reale." }
    ];
  }

  const resp = await axios.get(endpoint, {
    params: { q: query, count: 5 },
    headers: { "Ocp-Apim-Subscription-Key": key }
  });

  const items = resp.data?.webPages?.value || [];
  return items.map(x => ({
    title: x.name,
    url: x.url,
    snippet: x.snippet
  }));
}

module.exports = { bingSearch };
