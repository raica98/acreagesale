const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = 'https://ewucowczaovcqpdipton.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const migrations = [
  '20251020070000_fix_user_signup_trigger_v2.sql',
  '20251020070100_backfill_missing_subscriptions.sql',
  '20251020070200_temporary_allow_property_insert.sql'
];

async function runMigration(filename) {
  const filepath = path.join(__dirname, 'supabase', 'migrations', filename);
  const sql = fs.readFileSync(filepath, 'utf8');

  console.log(`\n🔄 Running migration: ${filename}`);

  const data = JSON.stringify({ query: sql });

  const options = {
    hostname: 'ewucowczaovcqpdipton.supabase.co',
    port: 443,
    path: '/rest/v1/rpc/exec_sql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ Migration ${filename} completed successfully`);
          resolve(body);
        } else {
          console.error(`❌ Migration ${filename} failed: ${res.statusCode} ${body}`);
          reject(new Error(`Migration failed: ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error for ${filename}:`, error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('🚀 Running pending migrations...\n');

  for (const migration of migrations) {
    try {
      await runMigration(migration);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to run ${migration}:`, error.message);
    }
  }

  console.log('\n✅ All migrations completed!');
}

main().catch(console.error);
