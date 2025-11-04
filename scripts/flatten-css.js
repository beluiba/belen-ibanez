import fs from "fs";
import path from "path";

const OUT = path.resolve(process.cwd(), "out");
const ASSETS_DIR = path.join(OUT, "assets");
const BUNDLE_CSS = path.join(ASSETS_DIR, "styles.css");

function walk(dir, cb) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p, cb);
    else cb(p);
  }
}

function gatherCssFiles() {
  const cssFiles = [];
  if (!fs.existsSync(OUT)) {
    console.error("out/ directory not found. Run npm run build first.");
    process.exit(1);
  }
  walk(OUT, (p) => {
    if (p === BUNDLE_CSS) return;
    if (p.endsWith(".css")) cssFiles.push(p);
  });
  return cssFiles;
}

function concatCss(files) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  let out = "";
  for (const f of files) {
    try {
      out += `/* ---- ${path.relative(OUT, f)} ---- */\n`;
      out += fs.readFileSync(f, "utf8") + "\n\n";
    } catch (e) {
      console.warn("Failed reading", f, e.message);
    }
  }
  fs.writeFileSync(BUNDLE_CSS, out, "utf8");
  console.log("Wrote bundle:", path.relative(process.cwd(), BUNDLE_CSS));
}

function rewriteHtml() {
  const htmlFiles = [];
  walk(OUT, (p) => {
    if (p.endsWith(".html")) htmlFiles.push(p);
  });

  for (const file of htmlFiles) {
    let html = fs.readFileSync(file, "utf8");
    // remove existing stylesheet <link ... rel="stylesheet" ...>
    html = html.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, "");
    // inject bundled css link before </head>
    html = html.replace(/<\/head>/i, `  <link rel="stylesheet" href="/assets/styles.css">\n</head>`);
    fs.writeFileSync(file, html, "utf8");
    console.log("Rewrote:", path.relative(process.cwd(), file));
  }
}

(function main() {
  const cssFiles = gatherCssFiles();
  if (cssFiles.length === 0) {
    console.warn("No CSS files found in out/. There may be no generated CSS or build failed.");
  } else {
    concatCss(cssFiles);
    rewriteHtml();
    console.log("Done. Static files in ./out (index.html and /work/index.html if those pages exist).");
  }
})();