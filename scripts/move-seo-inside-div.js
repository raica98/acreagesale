import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');

function moveSEOInsideDiv(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);

  if (!content.includes('<SEO slug=')) {
    return false;
  }

  content = content.replace(
    /(return \(\s*\n\s*)<>\s*\n\s*<SEO slug="([^"]+)" \/>\s*\n\s*(<div[^>]*>)/g,
    '$1$3\n      <SEO slug="$2" />'
  );

  content = content.replace(
    /(\s*<\/div>\s*\n\s*)<>\s*\n\s*\);/g,
    '$1);'
  );

  content = content.replace(
    /(\s*<\/div>\s*\n\s*)<\/>\s*\n\s*\);/g,
    '$1);'
  );

  if (content !== fs.readFileSync(filePath, 'utf-8')) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Moved SEO inside div in ${filename}`);
    return true;
  }

  return false;
}

function processAllPages() {
  console.log('🔧 Moving SEO components inside divs...\n');

  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));
  let fixed = 0;

  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    try {
      const result = moveSEOInsideDiv(filePath);
      if (result) {
        fixed++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Moved ${fixed} SEO components`);
}

processAllPages();
