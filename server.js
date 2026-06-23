const fs = require("fs");
const http = require("http");
const path = require("path");

const port = process.env.PORT || 3000;
const distDir = path.join(__dirname, "dist");
const basePath = normalizeBasePath(process.env.BASE_PATH || "/lp");
const siteUrl = normalizeSiteUrl(process.env.SITE_URL || "https://principiamedicina.com.br/lp");

const seoRoutes = [
  {
    path: "/",
    title: "Clínica Principia | Especialistas em articulações",
    description:
      "Clínica Principia: especialistas em articulações, ortopedia, reumatologia, neurocirurgia, medicina da dor e atendimento humanizado em São Paulo, Brasília e Salvador.",
  },
  {
    path: "/sao-paulo",
    title: "Clínica Principia em São Paulo | Butantã e Itaim Bibi",
    description:
      "Atendimento médico especializado em articulações, coluna, ortopedia, reumatologia e medicina da dor nas unidades Butantã e Itaim Bibi, em São Paulo.",
  },
  {
    path: "/brasilia",
    title: "Clínica Principia em Brasília | Asa Sul",
    description:
      "Consulta com especialistas em articulações, coluna, ortopedia, reumatologia e medicina da dor na unidade da Clínica Principia em Brasília, na Asa Sul.",
  },
  {
    path: "/salvador",
    title: "Clínica Principia em Salvador | Shopping Bela Vista",
    description:
      "Atendimento especializado para articulações, coluna, ortopedia, reumatologia e medicina da dor na Clínica Principia em Salvador, no Shopping Bela Vista.",
  },
];

const contentTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function normalizeBasePath(value) {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "";
}

function normalizeSiteUrl(value) {
  return value.trim().replace(/\/+$/g, "");
}

function publicUrl(routePath = "/") {
  if (routePath === "/") {
    return `${siteUrl}/`;
  }

  const normalizedRoute = routePath.startsWith("/") ? routePath : `/${routePath}`;
  const shouldAddTrailingSlash = !path.extname(normalizedRoute);
  return `${siteUrl}${normalizedRoute}${shouldAddTrailingSlash ? "/" : ""}`.replace(/([^:]\/)\/+/g, "$1");
}

function sendText(res, statusCode, body, contentType) {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=3600",
  });
  res.end(body);
}

function sendSitemap(res) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = seoRoutes
    .map(
      (route) => `  <url>
    <loc>${publicUrl(route.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n");

  sendText(
    res,
    200,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
    "application/xml; charset=utf-8"
  );
}

function sendRobots(res) {
  sendText(
    res,
    200,
    `User-agent: *
Allow: /

Sitemap: ${publicUrl("/sitemap.xml")}`,
    "text/plain; charset=utf-8"
  );
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stream = fs.createReadStream(filePath);

  res.writeHead(200, {
    "Content-Type": contentTypes[ext] || "application/octet-stream",
  });

  stream.pipe(res);
  stream.on("error", () => {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal server error");
  });
}

function sendIndex(res, routePath = "/") {
  const route = seoRoutes.find((item) => item.path === routePath) || seoRoutes[0];
  const canonicalUrl = publicUrl(route.path);
  const indexPath = path.join(distDir, "index.html");

  fs.readFile(indexPath, "utf8", (error, html) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal server error");
      return;
    }

    const pageHtml = html
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${route.description}" />`)
      .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
      .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`)
      .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${route.description}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${route.title}" />`)
      .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${route.description}" />`);

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    });
    res.end(pageHtml);
  });
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

  if (basePath && (urlPath === basePath || urlPath.startsWith(`${basePath}/`))) {
    urlPath = urlPath.slice(basePath.length) || "/";
  }

  if (urlPath === "/robots.txt") {
    sendRobots(res);
    return;
  }

  if (urlPath === "/sitemap.xml") {
    sendSitemap(res);
    return;
  }

  const requestedPath = path.normalize(path.join(distDir, urlPath));

  if (!requestedPath.startsWith(distDir)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(requestedPath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(res, requestedPath);
      return;
    }

    if (!error && stats.isDirectory()) {
      const directoryIndexPath = path.join(requestedPath, "index.html");
      if (directoryIndexPath.startsWith(distDir) && fs.existsSync(directoryIndexPath)) {
        sendFile(res, directoryIndexPath);
        return;
      }
    }

    const normalizedRoutePath = urlPath.replace(/\/+$/g, "") || "/";
    const routePath = seoRoutes.some((route) => route.path === normalizedRoutePath) ? normalizedRoutePath : "/";
    sendIndex(res, routePath);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
