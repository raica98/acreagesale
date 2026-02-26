const fs = require('fs');
const path = require('path');

const slugMap = {
  'SellLandFastTexas': 'sell-land-fast-in-texas',
  'SellLandFastIowa': 'sell-land-fast-in-iowa',
  'SellLandFastOhio': 'sell-land-fast-in-ohio',
  'SellLandFastUtah': 'sell-land-fast-in-utah',
  'SellLandFastIdaho': 'sell-land-fast-in-idaho',
  'SellLandFastMaine': 'sell-land-fast-in-maine',
  'SellLandFastKansas': 'sell-land-fast-in-kansas',
  'SellLandFastNevada': 'sell-land-fast-in-nevada',
  'SellLandFastAlaska': 'sell-land-fast-in-alaska',
  'SellLandFastOregon': 'sell-land-fast-in-oregon',
  'SellLandFastGeorgia': 'sell-land-fast-in-georgia',
  'SellLandFastFlorida': 'sell-land-fast-in-florida',
  'SellLandFastArizona': 'sell-land-fast-in-arizona',
  'SellLandFastNewYork': 'sell-land-fast-in-new-york',
  'SellLandFastMontana': 'sell-land-fast-in-montana',
  'SellLandFastIndiana': 'sell-land-fast-in-indiana',
  'SellLandFastVermont': 'sell-land-fast-in-vermont',
  'SellLandFastWyoming': 'sell-land-fast-in-wyoming',
  'SellLandFastDelaware': 'sell-land-fast-in-delaware',
  'SellLandFastIllinois': 'sell-land-fast-in-illinois',
  'SellLandFastArkansas': 'sell-land-fast-in-arkansas',
  'SellLandFastColorado': 'sell-land-fast-in-colorado',
  'SellLandFastMaryland': 'sell-land-fast-in-maryland',
  'SellLandFastKentucky': 'sell-land-fast-in-kentucky',
  'SellLandFastNebraska': 'sell-land-fast-in-nebraska',
  'SellLandFastMichigan': 'sell-land-fast-in-michigan',
  'SellLandFastMissouri': 'sell-land-fast-in-missouri',
  'SellLandFastOklahoma': 'sell-land-fast-in-oklahoma',
  'SellLandFastVirginia': 'sell-land-fast-in-virginia',
  'SellLandFastMinnesota': 'sell-land-fast-in-minnesota',
  'SellLandFastLouisiana': 'sell-land-fast-in-louisiana',
  'SellLandFastNewJersey': 'sell-land-fast-in-new-jersey',
  'SellLandFastTennessee': 'sell-land-fast-in-tennessee',
  'SellLandFastNewMexico': 'sell-land-fast-in-new-mexico',
  'SellLandFastWisconsin': 'sell-land-fast-in-wisconsin',
  'SellLandFastWashington': 'sell-land-fast-in-washington',
  'SellLandFastConnecticut': 'sell-land-fast-in-connecticut',
  'SellLandFastMississippi': 'sell-land-fast-in-mississippi',
  'SellLandFastSouthDakota': 'sell-land-fast-in-south-dakota',
  'SellLandFastNewHampshire': 'sell-land-fast-in-new-hampshire',
  'SellLandFastPennsylvania': 'sell-land-fast-in-pennsylvania',
  'SellLandFastNorthDakota': 'sell-land-fast-in-north-dakota',
  'SellLandFastRhodeIsland': 'sell-land-fast-in-rhode-island',
  'SellLandFastMassachusetts': 'sell-land-fast-in-massachusetts',
  'SellLandFastSouthCarolina': 'sell-land-fast-in-south-carolina',
  'SellLandFastNorthCarolina': 'sell-land-fast-in-north-carolina',
  'SellMyLandFast': 'sell-my-land-fast',
  'AdvancedSearch': 'advanced-search',
  'Homepage': 'homepage',
  'Stats': 'stats',
  'Contact': 'contact',
  'SubmitProperty': 'submit-property',
};

const pagesDir = path.join(__dirname, 'src', 'pages');

Object.entries(slugMap).forEach(([componentName, slug]) => {
  const filePath = path.join(pagesDir, `${componentName}.tsx`);

  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${componentName} - file not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('import { SEO }') || content.includes('import {SEO}')) {
    console.log(`✅ ${componentName} already has SEO import`);
    return;
  }

  const importPattern = /import.*from 'react';/;
  if (importPattern.test(content)) {
    content = content.replace(
      importPattern,
      match => `${match}\nimport { SEO } from '../components/SEO';`
    );
  } else {
    content = `import { SEO } from '../components/SEO';\n${content}`;
  }

  const returnPattern = /return\s*\(\s*(?:<>)?\s*(?:\n\s*)?<div/;
  if (returnPattern.test(content)) {
    content = content.replace(
      returnPattern,
      match => {
        const hasFragment = match.includes('<>');
        if (hasFragment) {
          return match.replace('<>', `<>\n      <SEO slug="${slug}" />`);
        } else {
          return match.replace('return (', `return (\n    <>\n      <SEO slug="${slug}" />`).replace('<div', '\n    <div');
        }
      }
    );

    if (!/<\/>\s*\);\s*}/.test(content)) {
      content = content.replace(/(<\/div>\s*<\/div>\s*)\);\s*}/g, '$1</>\n  );\n}');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✨ Added SEO to ${componentName} with slug="${slug}"`);
});

console.log('\n✅ SEO addition complete!');
