import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');

function fixSEOComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);

  if (!content.includes('<SEO slug=')) {
    return false;
  }

  const lines = content.split('\n');
  let fixed = false;

  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].trim().startsWith('<SEO slug=') &&
        lines[i+1].trim().startsWith('<div') &&
        !lines[i].trim().endsWith('/>')) {

      lines[i] = lines[i].replace('<SEO slug=', '      <>\n        <SEO slug=');
      lines[i] = lines[i].replace('/>', '/>');

      const closingIndex = lines.findLastIndex((line, idx) => idx > i && line.trim() === ');');
      if (closingIndex !== -1 && lines[closingIndex - 1].trim() === '</div>') {
        lines[closingIndex - 1] = lines[closingIndex - 1] + '\n      </>';
      }

      fixed = true;
      break;
    }
  }

  if (fixed) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    console.log(`✅ Fixed ${filename}`);
    return true;
  }

  return false;
}

function processAllPages() {
  console.log('🔧 Fixing SEO component syntax...\n');

  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));
  let fixed = 0;

  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    try {
      const result = fixSEOComponent(filePath);
      if (result) {
        fixed++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Fixed ${fixed} files`);
}

processAllPages();
