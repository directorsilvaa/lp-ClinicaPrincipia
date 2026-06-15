import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const htmlPath = path.join(distDir, 'index.html');
let html = await readFile(htmlPath, 'utf8');

const stylesheetPattern =
  /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css)["'][^>]*>\s*/g;

const styles = [];
const cssFiles = [];
let match;

while ((match = stylesheetPattern.exec(html)) !== null) {
  const href = match[1];
  const cssPath = path.join(distDir, href.replace(/^\//, ''));
  styles.push(await readFile(cssPath, 'utf8'));
  cssFiles.push(cssPath);
}

if (styles.length > 0) {
  html = html.replace(stylesheetPattern, '');
  html = html.replace('</head>', `<style>${styles.join('\n')}</style></head>`);
  await writeFile(htmlPath, html);
  await Promise.all(cssFiles.map((file) => rm(file, { force: true })));
}
