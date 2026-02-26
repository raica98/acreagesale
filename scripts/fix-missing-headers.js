import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../src/pages');

const filesToFix = [
  'SellLandFastColorado.tsx',
  'SellLandFastKentucky.tsx',
  'SellLandFastLouisiana.tsx',
  'SellLandFastMaine.tsx',
  'SellLandFastMaryland.tsx',
  'SellLandFastMassachusetts.tsx',
  'SellLandFastMichigan.tsx',
  'SellLandFastMinnesota.tsx',
  'SellLandFastMississippi.tsx',
  'SellLandFastMissouri.tsx',
  'SellLandFastMontana.tsx',
  'SellLandFastNebraska.tsx',
  'SellLandFastNevada.tsx',
  'SellLandFastNewHampshire.tsx',
  'SellLandFastNewJersey.tsx',
  'SellLandFastNewMexico.tsx',
  'SellLandFastNewYork.tsx',
  'SellLandFastNorthCarolina.tsx',
  'SellLandFastNorthDakota.tsx',
  'SellLandFastOhio.tsx',
  'SellLandFastOklahoma.tsx',
  'SellLandFastOregon.tsx',
  'SellLandFastPennsylvania.tsx',
  'SellLandFastRhodeIsland.tsx',
  'SellLandFastSouthCarolina.tsx',
  'SellLandFastSouthDakota.tsx',
  'SellLandFastTennessee.tsx',
  'SellLandFastTexas.tsx',
  'SellLandFastUtah.tsx',
  'SellLandFastVermont.tsx',
  'SellLandFastVirginia.tsx',
  'SellLandFastWashington.tsx',
  'SellLandFastWisconsin.tsx',
  'SellLandFastWyoming.tsx'
];

function fixMissingHeader(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);

  if (!content.includes('<SEO slug=')) {
    return false;
  }

  if (content.includes('<header className=')) {
    return false;
  }

  const pattern = /(\s*<SEO slug="[^"]+" \/>\s*\n)(\s*<div className="max-w-7xl)/;

  if (pattern.test(content)) {
    content = content.replace(
      pattern,
      '$1      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">\n$2'
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed missing header in ${filename}`);
    return true;
  }

  return false;
}

function processFiles() {
  console.log('🔧 Fixing missing header tags...\n');

  let fixed = 0;

  for (const file of filesToFix) {
    const filePath = path.join(PAGES_DIR, file);
    if (fs.existsSync(filePath)) {
      try {
        const result = fixMissingHeader(filePath);
        if (result) {
          fixed++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }
  }

  console.log(`\n✨ Fixed ${fixed} files`);
}

processFiles();
