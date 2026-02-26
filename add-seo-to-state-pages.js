const fs = require('fs');
const path = require('path');

// State mapping for proper names
const stateNames = {
  'Alabama': 'Alabama', 'Alaska': 'Alaska', 'Arizona': 'Arizona', 'Arkansas': 'Arkansas',
  'California': 'California', 'Colorado': 'Colorado', 'Connecticut': 'Connecticut',
  'Delaware': 'Delaware', 'Florida': 'Florida', 'Georgia': 'Georgia', 'Idaho': 'Idaho',
  'Illinois': 'Illinois', 'Indiana': 'Indiana', 'Iowa': 'Iowa', 'Kansas': 'Kansas',
  'Kentucky': 'Kentucky', 'Louisiana': 'Louisiana', 'Maine': 'Maine', 'Maryland': 'Maryland',
  'Massachusetts': 'Massachusetts', 'Michigan': 'Michigan', 'Minnesota': 'Minnesota',
  'Mississippi': 'Mississippi', 'Missouri': 'Missouri', 'Montana': 'Montana',
  'Nebraska': 'Nebraska', 'Nevada': 'Nevada', 'NewHampshire': 'New Hampshire',
  'NewJersey': 'New Jersey', 'NewMexico': 'New Mexico', 'NewYork': 'New York',
  'NorthCarolina': 'North Carolina', 'NorthDakota': 'North Dakota', 'Ohio': 'Ohio',
  'Oklahoma': 'Oklahoma', 'Oregon': 'Oregon', 'Pennsylvania': 'Pennsylvania',
  'RhodeIsland': 'Rhode Island', 'SouthCarolina': 'South Carolina',
  'SouthDakota': 'South Dakota', 'Tennessee': 'Tennessee', 'Texas': 'Texas',
  'Utah': 'Utah', 'Vermont': 'Vermont', 'Virginia': 'Virginia', 'Washington': 'Washington',
  'Wisconsin': 'Wisconsin', 'Wyoming': 'Wyoming'
};

const pagesDir = path.join(__dirname, 'src', 'pages');

// Process SellLandFast pages
Object.keys(stateNames).forEach(state => {
  const fileName = `SellLandFast${state}.tsx`;
  const filePath = path.join(pagesDir, fileName);

  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if SEO already imported
    if (content.includes("import { SEO }")) {
      console.log(`SEO already in ${fileName}, skipping`);
      return;
    }

    const stateName = stateNames[state];
    const slug = stateName.toLowerCase().replace(/\s+/g, '-');

    // Add SEO import after other imports
    const importPattern = /(import.*from.*['"].*ui\/logo['"];?\n)/;
    if (importPattern.test(content)) {
      content = content.replace(importPattern, `$1import { SEO } from '../components/SEO';\n`);
    }

    // Add SEO component after return statement
    const returnPattern = /(return \(\s*\n)/;
    if (returnPattern.test(content)) {
      const seoComponent = `  return (
    <>
      <SEO
        title="Sell Land Fast in ${stateName} - Quick Cash Offers | AcreageSale.com"
        description="Sell your land fast in ${stateName}. Get competitive cash offers, close quickly, and avoid the hassle of traditional real estate sales. Start your free evaluation today!"
        keywords="sell land fast ${stateName.toLowerCase()}, sell land ${stateName.toLowerCase()}, cash for land ${stateName.toLowerCase()}, land buyers ${stateName.toLowerCase()}"
        canonical="https://acreagesale.com/sell-land-fast-${slug}"
      />
`;
      content = content.replace(returnPattern, seoComponent);

      // Find the closing div and add fragment close
      const lines = content.split('\n');
      let divCount = 0;
      let returnLineIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('return (') && returnLineIndex === -1) {
          returnLineIndex = i;
        }
        if (returnLineIndex !== -1) {
          divCount += (lines[i].match(/<div/g) || []).length;
          divCount -= (lines[i].match(/<\/div>/g) || []).length;
        }
      }

      // Add closing fragment before the closing return
      const closingPattern = /(\s*<\/div>\s*\n\s*\);[\s\n]*})/;
      if (closingPattern.test(content)) {
        content = content.replace(closingPattern, `$1`.replace('</div>\n  );', '</div>\n    </>\n  );'));
      }

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${fileName}`);
    } else {
      console.log(`Could not find return pattern in ${fileName}`);
    }
  }
});

console.log('SellLandFast pages updated successfully!');
