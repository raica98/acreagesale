import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');

function fixSEOJSX(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);

  if (!content.includes('<SEO slug=')) {
    return false;
  }

  const regex = /(\s*return \(\s*\n\s*)<SEO slug="([^"]+)" \/>\s*\n(\s*<div)/g;

  if (regex.test(content)) {
    content = content.replace(
      /(\s*return \(\s*\n\s*)<SEO slug="([^"]+)" \/>\s*\n(\s*<div)/g,
      '$1<>\n      <SEO slug="$2" />\n$3'
    );

    content = content.replace(
      /(\s*<\/div>\s*\n\s*\);)/g,
      '$1\n    </>'
    );

    const lastClosingDiv = content.lastIndexOf('</div>\n    );');
    if (lastClosingDiv !== -1) {
      content = content.substring(0, lastClosingDiv) +
                '</div>\n    </>\n    );' +
                content.substring(lastClosingDiv + '</div>\n    );'.length);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed ${filename}`);
    return true;
  }

  return false;
}

function processAllPages() {
  console.log('🔧 Fixing SEO JSX syntax...\n');

  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));
  let fixed = 0;

  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    try {
      const result = fixSEOJSX(filePath);
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
