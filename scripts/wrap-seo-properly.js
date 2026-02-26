import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');

function wrapSEOProperly(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);

  if (!content.includes('<SEO slug=')) {
    return false;
  }

  const lines = content.split('\n');
  let modified = false;

  for (let i = 0; i < lines.length - 2; i++) {
    const currentLine = lines[i].trim();
    const nextLine = lines[i + 1].trim();
    const nextNextLine = lines[i + 2].trim();

    if (currentLine === 'return (' &&
        nextLine.startsWith('<SEO slug=') &&
        nextNextLine.startsWith('<div')) {

      const indent = lines[i].match(/^(\s*)/)[1];

      lines[i + 1] = indent + '  <>';
      lines[i + 2] = indent + '    ' + nextLine;
      lines[i + 3] = indent + '    ' + nextNextLine;

      for (let j = lines.length - 1; j > i + 3; j--) {
        if (lines[j].trim() === ');') {
          lines[j - 1] = lines[j - 1] + '\n' + indent + '  </>';
          break;
        }
      }

      modified = true;
      break;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    console.log(`✅ Wrapped SEO in ${filename}`);
    return true;
  }

  return false;
}

function processAllPages() {
  console.log('🔧 Wrapping SEO components properly...\n');

  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));
  let fixed = 0;

  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    try {
      const result = wrapSEOProperly(filePath);
      if (result) {
        fixed++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Wrapped ${fixed} files`);
}

processAllPages();
