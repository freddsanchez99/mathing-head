const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const { app } = require('electron');
const SEED = require('../seed/questions-seed');

const SCHEMA_VERSION = 1;
let dbInstance = null;

function getDbPath() {
  const userDataDir = app.getPath('userData');
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }
  return path.join(userDataDir, 'mathing-head.db');
}

function loadSchema() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  return fs.readFileSync(schemaPath, 'utf8');
}

function applySchema(db) {
  db.exec(loadSchema());

  const current = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='schema_version'")
    .get();

  if (!current) return;

  const row = db.prepare('SELECT version FROM schema_version ORDER BY version DESC LIMIT 1').get();
  if (!row) {
    db.prepare('INSERT INTO schema_version (version, applied_at) VALUES (?, ?)')
      .run(SCHEMA_VERSION, new Date().toISOString());
  }
}

function seedIfEmpty(db) {
  const count = db.prepare('SELECT COUNT(*) AS n FROM questions').get().n;
  if (count > 0) return;

  const insert = db.prepare(`
    INSERT OR IGNORE INTO questions (id, level, color, points, question, answer, tolerance, time_limit)
    VALUES (@id, @level, @color, @points, @question, @answer, @tolerance, @time_limit)
  `);

  const insertMany = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });

  const all = [].concat(SEED[1] || [], SEED[2] || [], SEED[3] || []);
  insertMany(all);
}

function init() {
  if (dbInstance) return dbInstance;

  const dbPath = getDbPath();
  dbInstance = new Database(dbPath);
  dbInstance.pragma('journal_mode = WAL');
  dbInstance.pragma('foreign_keys = ON');

  applySchema(dbInstance);
  seedIfEmpty(dbInstance);

  return dbInstance;
}

function getDb() {
  if (!dbInstance) init();
  return dbInstance;
}

function close() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

module.exports = { init, getDb, close, getDbPath };
