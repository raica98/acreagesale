import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src', 'pages');

const filesToUpdate = [
  'SellLandFast.tsx',
  'SellMyLandFast.tsx',
  'ContactPage.tsx',
  'Blogs.tsx',
  'BlogDetail.tsx',
  'Contact.tsx',
  'LandForSaleInDallas.tsx',
  'LandForSaleInFlorida.tsx',
  'LandForSaleInDelaware.tsx',
  'LandForSaleInIndiana.tsx',
  'LandForSaleInHouston.tsx',
  'LandForSaleInIowa.tsx',
  'LandForSaleInJacksonville.tsx',
  'LandForSaleInJamaica.tsx',
  'LandForSaleInJoshuaTree.tsx',
  'LandForSaleInKansas.tsx',
  'LandForSaleInKnoxville.tsx',
  'LandForSaleInLosAngeles.tsx',
  'LandForSaleInLouisiana.tsx',
  'LandForSaleInMaryland.tsx',
  'LandForSaleInNewHampshire.tsx',
  'LandForSaleInNewJersey.tsx',
  'LandForSaleInNewMexico.tsx',
  'LandForSaleInNewMexicoHyphenated.tsx',
  'LandForSaleInPennsylvania.tsx',
  'LandForSaleInPhelan.tsx',
  'LandForSaleInSacramento.tsx',
  'LandForSaleInSouthCarolina.tsx',
  'LandForSaleInSanAntonio.tsx',
  'LandForSaleInSouthDakota.tsx',
  'LandForSaleInTemecula.tsx',
  'LandForSaleInUtah.tsx',
  'LandForSaleInVermont.tsx',
  'LandForSaleInVirginia.tsx',
  'LandForSaleInWashington.tsx',
  'LandForSaleWashington.tsx',
  'LandInPhelan.tsx',
  'Phelan2.tsx',
  'PhelanCaLandForSale.tsx',
  'SellLandFastAlabama.tsx',
  'SellLandFastAlaska.tsx',
  'SellLandFastArizona.tsx',
  'SellLandFastArkansas.tsx',
  'SellLandFastCalifornia.tsx',
  'SellLandFastColorado.tsx',
  'SellLandFastConnecticut.tsx',
  'SellLandFastDelaware.tsx',
  'SellLandFastFlorida.tsx',
  'SellLandFastGeorgia.tsx',
  'SellLandFastIdaho.tsx',
  'SellLandFastIllinois.tsx',
  'SellLandFastIndiana.tsx',
  'SellLandFastIowa.tsx',
  'SellLandFastKansas.tsx',
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
  'SellLandFastWyoming.tsx',
];

function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if already has SharedNavigation
    if (content.includes('SharedNavigation')) {
      console.log(`⏭️  Skipping ${path.basename(filePath)} - already has SharedNavigation`);
      return;
    }

    // Check if it has AcreageSaleLogo or header tag
    if (!content.includes('AcreageSaleLogo') && !content.includes('<header')) {
      console.log(`⏭️  Skipping ${path.basename(filePath)} - no header found`);
      return;
    }

    let modified = false;

    // Add import for SharedNavigation if not present
    if (!content.includes("import { SharedNavigation }")) {
      // Find the import section and add SharedNavigation import
      const importMatch = content.match(/import.*from ['"]\.\.\/components.*['"];?\n/);
      if (importMatch) {
        const lastImportIndex = content.lastIndexOf(importMatch[0]) + importMatch[0].length;
        content = content.slice(0, lastImportIndex) +
                  "import { SharedNavigation } from '../components/ui/SharedNavigation';\n" +
                  content.slice(lastImportIndex);
        modified = true;
      }
    }

    // Remove AcreageSaleLogo import if present
    content = content.replace(/import \{ AcreageSaleLogo \} from ['"]\.\.\/components\/ui\/logo['"];\n?/g, '');
    content = content.replace(/import \{ ArrowLeft[^}]*\} from ['"]lucide-react['"];/g,
                             (match) => match.replace(/,?\s*ArrowLeft,?\s*/g, (m) => m.includes(',') ? ', ' : ''));

    // Replace header section with SharedNavigation
    // Pattern 1: Full header with ArrowLeft and buttons
    content = content.replace(
      /<header[^>]*>[\s\S]*?<\/header>/g,
      '<SharedNavigation />'
    );

    // Save only if modified
    if (modified || content !== fs.readFileSync(filePath, 'utf-8')) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Updated ${path.basename(filePath)}`);
    } else {
      console.log(`⏭️  No changes needed for ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${path.basename(filePath)}:`, error.message);
  }
}

console.log('🚀 Starting navigation update...\n');

let updated = 0;
let skipped = 0;
let errors = 0;

for (const file of filesToUpdate) {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    try {
      updateFile(filePath);
      updated++;
    } catch (error) {
      errors++;
    }
  } else {
    console.log(`⚠️  File not found: ${file}`);
    skipped++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Updated: ${updated}`);
console.log(`   ⏭️  Skipped: ${skipped}`);
console.log(`   ❌ Errors: ${errors}`);
console.log(`\n✨ Navigation update complete!`);
