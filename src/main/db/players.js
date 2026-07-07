const { getDb } = require('./index');

const SELECT_ALL_PLAYERS = `
  SELECT
    LOWER(TRIM(pr.player_name)) AS name_key,
    pr.player_name              AS display_name,
    pr.player_color             AS last_color,
    COUNT(DISTINCT pr.match_id) AS matches_played,
    SUM(pr.cards_resolved)      AS total_cards,
    SUM(pr.cards_by_30)         AS cards_30_total,
    MAX(pr.score)               AS best_score,
    AVG(pr.score)               AS avg_score,
    SUM(CASE WHEN pr.final_position = 1 THEN 1 ELSE 0 END) AS wins,
    MIN(pr.fastest_card_seconds) AS fastest_card,
    MAX(m.played_at)            AS last_played
  FROM player_results pr
  JOIN matches m ON m.id = pr.match_id
  GROUP BY LOWER(TRIM(pr.player_name))
  ORDER BY best_score DESC, matches_played DESC
`;

const SELECT_PROFILE = `
  SELECT
    LOWER(TRIM(pr.player_name)) AS name_key,
    pr.player_name              AS display_name,
    pr.player_color             AS last_color,
    COUNT(DISTINCT pr.match_id) AS matches_played,
    SUM(pr.cards_resolved)      AS total_cards,
    SUM(pr.cards_by_30)         AS cards_30_total,
    MAX(pr.score)               AS best_score,
    AVG(pr.score)               AS avg_score,
    SUM(CASE WHEN pr.final_position = 1 THEN 1 ELSE 0 END) AS wins,
    MIN(pr.fastest_card_seconds) AS fastest_card,
    MAX(m.played_at)            AS last_played
  FROM player_results pr
  JOIN matches m ON m.id = pr.match_id
  WHERE LOWER(TRIM(pr.player_name)) = LOWER(TRIM(?))
  GROUP BY LOWER(TRIM(pr.player_name))
`;

const SELECT_RECENT_FOR_PLAYER = `
  SELECT
    m.id AS match_id, m.level, m.mode, m.played_at,
    pr.score, pr.cards_resolved, pr.final_position
  FROM player_results pr
  JOIN matches m ON m.id = pr.match_id
  WHERE LOWER(TRIM(pr.player_name)) = LOWER(TRIM(?))
  ORDER BY m.played_at DESC, m.id DESC
  LIMIT 10
`;

function getAllPlayers() {
  const db = getDb();
  return db.prepare(SELECT_ALL_PLAYERS).all();
}

function getPlayerProfile(name) {
  if (!name) return null;
  const db = getDb();
  const profile = db.prepare(SELECT_PROFILE).get(name);
  if (!profile) return null;
  const recent = db.prepare(SELECT_RECENT_FOR_PLAYER).all(name);
  return { ...profile, avg_score: profile.avg_score || 0, recent_matches: recent };
}

module.exports = { getAllPlayers, getPlayerProfile };
