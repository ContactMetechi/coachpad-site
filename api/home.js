const fs = require("fs");
const path = require("path");

const discoveryLink =
  '<https://www.metechi.dev/llms.txt>; rel="service-doc"; type="text/plain", ' +
  '<https://www.metechi.dev/llms-full.txt>; rel="service-doc"; type="text/plain", ' +
  '<https://www.metechi.dev/sitemap.xml>; rel="sitemap"; type="application/xml", ' +
  '<https://www.metechi.dev/.well-known/ai.txt>; rel="service-meta"; type="text/plain", ' +
  '<https://www.metechi.dev/.well-known/agent-card.json>; rel="service-meta"; type="application/json", ' +
  '<https://www.metechi.dev/.well-known/agent-skills/index.json>; rel="service-meta"; type="application/json"';

function readSiteFile(...parts) {
  return fs.readFileSync(path.join(process.cwd(), ...parts), "utf8");
}

module.exports = function handler(req, res) {
  const accept = String(req.headers.accept || "");
  const wantsMarkdown = accept.toLowerCase().includes("text/markdown");

  res.setHeader("Link", discoveryLink);
  res.setHeader("Vary", "Accept");
  res.setHeader("Cache-Control", "no-store");

  if (wantsMarkdown) {
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.status(200).send(readSiteFile("markdown", "home.md"));
    return;
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(readSiteFile("index.html"));
};
