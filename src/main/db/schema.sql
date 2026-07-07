-- ============================================================
--  Mathing Head · SQLite schema
--  Version: 1
-- ============================================================

CREATE TABLE IF NOT EXISTS schema_version (
  version     INTEGER PRIMARY KEY,
  applied_at  TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id            INTEGER PRIMARY KEY,
  level         INTEGER NOT NULL,
  color         TEXT    NOT NULL,
  points        INTEGER NOT NULL,
  question      TEXT    NOT NULL,
  answer        REAL    NOT NULL,
  tolerance     REAL    DEFAULT 0.01,
  time_limit    INTEGER DEFAULT 120
);

CREATE INDEX IF NOT EXISTS idx_questions_level ON questions(level);

CREATE TABLE IF NOT EXISTS matches (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  level            INTEGER NOT NULL,
  mode             TEXT    NOT NULL,
  played_at        TEXT    NOT NULL,
  total_cards      INTEGER NOT NULL,
  duration_seconds INTEGER,
  winner_name      TEXT
);

CREATE INDEX IF NOT EXISTS idx_matches_played_at ON matches(played_at);
CREATE INDEX IF NOT EXISTS idx_matches_level_mode ON matches(level, mode);

CREATE TABLE IF NOT EXISTS player_results (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id             INTEGER NOT NULL,
  player_name          TEXT    NOT NULL,
  player_color         TEXT,
  score                INTEGER NOT NULL,
  cards_resolved       INTEGER NOT NULL,
  cards_by_10          INTEGER DEFAULT 0,
  cards_by_20          INTEGER DEFAULT 0,
  cards_by_30          INTEGER DEFAULT 0,
  total_time_seconds   INTEGER,
  fastest_card_seconds INTEGER,
  final_position       INTEGER,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pr_name  ON player_results(player_name);
CREATE INDEX IF NOT EXISTS idx_pr_match ON player_results(match_id);
