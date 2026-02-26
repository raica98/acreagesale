import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');

function slugify(filename) {
  const name = filename.replace('.tsx', '');

  return name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

function addSEOToPage(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);
  const slug = slugify(filename);

  if (content.includes("import { SEO }") || content.includes('from \'../components/SEO\'')) {
    console.log(`✅ ${filename} already has SEO`);
    return false;
  }

  const lines = content.split('\n');
  let importIndex = -1;
  let returnIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('import') && importIndex === -1) {
      importIndex = i;
    }

    if (lines[i].trim().match(/^return\s*[(<]/)) {
      returnIndex = i;
      break;
    }
  }

  if (importIndex === -1 || returnIndex === -1) {
    console.log(`⚠️  ${filename} - Could not find injection points`);
    return false;
  }

  let lastImportIndex = importIndex;
  for (let i = importIndex; i < lines.length; i++) {
    if (lines[i].trim() === '' || !lines[i].includes('import')) {
      lastImportIndex = i - 1;
      break;
    }
    lastImportIndex = i;
  }

  const seoImport = "import { SEO } from '../components/SEO';";
  lines.splice(lastImportIndex + 1, 0, seoImport);

  const seoComponent = `    <SEO slug="${slug}" />`;

  let insertIndex = returnIndex + 1;
  for (let i = returnIndex; i < Math.min(returnIndex + 20, lines.length); i++) {
    if (lines[i].includes('(') || lines[i].includes('<>') || lines[i].includes('<div') || lines[i].includes('<main')) {
      insertIndex = i + 1;
      break;
    }
  }

  lines.splice(insertIndex, 0, seoComponent);

  const updatedContent = lines.join('\n');
  fs.writeFileSync(filePath, updatedContent, 'utf-8');

  console.log(`✅ Added SEO to ${filename} (slug: ${slug})`);
  return true;
}

function processAllPages() {
  console.log('🚀 Adding SEO components to all pages...\n');

  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    try {
      const result = addSEOToPage(filePath);
      if (result) {
        updated++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      failed++;
    }
  }

  console.log(`\n✨ Complete!`);
  console.log(`📊 Updated: ${updated}, Skipped: ${skipped}, Failed: ${failed}`);
  console.log(`📁 Total files: ${files.length}`);
}

processAllPages();
