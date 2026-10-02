// Dev-friendly persistence using SQLite (file on disk). Fine for staging and
// low volume; swap for Postgres/MySQL before scaling up production, but the
// query shapes below should translate directly.
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', '..', 'data.sqlite');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_session_id TEXT UNIQUE,
    stripe_payment_intent TEXT,
    email TEXT NOT NULL,
    amount_gbp_pence INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'gbp',
    review_code TEXT UNIQUE NOT NULL,
    review_status TEXT NOT NULL DEFAULT 'unused', -- unused | used | refunded
    download_token TEXT,
    download_expires_at TEXT,
    download_uses_remaining INTEGER DEFAULT 0,
    refunded INTEGER NOT NULL DEFAULT 0,
    utm_json TEXT,
    fulfilled INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS processed_webhook_events (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    tag TEXT NOT NULL DEFAULT 'checklist',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

module.exports = db;
