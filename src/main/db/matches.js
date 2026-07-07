const { getDb } = require('./index');

const INSERT_MATCH = `
  INSERT INTO matches (level, mode, played_at, total_cards, duration_seconds, winner_name)
  VALUES (@level, @mode, @played_at, @total_cards, @duration_seconds, @winner_name)
`;

const INSERT_PLAYER_RESULT = `
  INSERT INTO player_results (
    match_id, player_name, player_color, score, cards_resolved,
    cards_by_10, cards_by_20, cards_by_30, total_time_seconds,
    fastest_card_seconds, final_position
  ) VALUES (
    @match_id, @player_name, @player_color, @score, @cards_resolved,
    @cards_by_10, @cards_by_20, @cards_by_30, @total_time_seconds,
    @fastest_card_seconds, @final_position
  )
`;

const SELECT_HALL_OF_FAME = `
  SELECT
    m.id            AS match_id,
    m.played_at,
    pr.player_name  AS winner_name,
    pr.player_color AS winner_color,
    pr.score        AS winning_score
  FROM matches m
  JOIN player_results pr ON pr.match_id = m.id AND pr.final_position = 1
  WHERE m.level = @level AND m.mode = @mode
  ORDER BY pr.score DESC, m.played_at ASC
  LIMIT @limit
`;

const SELECT_HALL_OF_FAME_ALL = `
  SELECT
    m.id            AS match_id,
    m.level,
    m.mode,
    m.played_at,
    pr.player_name  AS winner_name,
    pr.player_color AS winner_color,
    pr.score        AS winning_score
  FROM matches m
  JOIN player_results pr ON pr.match_id = m.id AND pr.final_position = 1
  ORDER BY pr.score DESC, m.played_at ASC
  LIMIT @limit
`;

const SELECT_HISTORY = `
  SELECT
    m.id               AS match_id,
    m.level,
    m.mode,
    m.played_at,
    m.total_cards,
    m.duration_seconds,
    m.winner_name,
    (SELECT COUNT(*) FROM player_results WHERE match_id = m.id) AS player_count
  FROM matches m
  ORDER BY m.played_at DESC, m.id DESC
  LIMIT ?
`;

const SELECT_MATCH_RESULTS = `
  SELECT
    id, match_id, player_name, player_color, score, cards_resolved,
    cards_by_10, cards_by_20, cards_by_30, total_time_seconds,
    fastest_card_seconds, final_position
  FROM player_results
  WHERE match_id = ?
  ORDER BY final_position ASC, score DESC
`;

function saveMatch(payload) {
  const db = getDb();
  const { level, mode, played_at, total_cards, duration_seconds, winner_name, results } = payload;

  const tx = db.transaction(() => {
    const matchInfo = db.prepare(INSERT_MATCH).run({
      level,
      mode,
      played_at: played_at || new Date().toISOString(),
      total_cards,
      duration_seconds: duration_seconds || null,
      winner_name: winner_name || null
    });
    const matchId = matchInfo.lastInsertRowid;

    const insertResult = db.prepare(INSERT_PLAYER_RESULT);
    for (const r of results) {
      insertResult.run({
        match_id: matchId,
        player_name: r.player_name,
        player_color: r.player_color || null,
        score: r.score,
        cards_resolved: r.cards_resolved,
        cards_by_10: r.cards_by_10 || 0,
        cards_by_20: r.cards_by_20 || 0,
        cards_by_30: r.cards_by_30 || 0,
        total_time_seconds: r.total_time_seconds || 0,
        fastest_card_seconds: r.fastest_card_seconds || null,
        final_position: r.final_position || null
      });
    }
    return matchId;
  });

  const matchId = tx();
  const isNewRecord = checkIsTopScore(payload.level, payload.mode, payload.results, matchId);
  return { matchId, isNewRecord };
}

function checkIsTopScore(level, mode, results, matchId) {
  const winner = (results || []).find(r => r.final_position === 1);
  if (!winner) return false;
  const db = getDb();
  const row = db.prepare(`
    SELECT COUNT(*) AS n FROM player_results pr
    JOIN matches m ON m.id = pr.match_id
    WHERE m.level = ? AND m.mode = ? AND pr.final_position = 1 AND pr.score > ?
  `).get(level, mode, winner.score);
  return row.n === 0;
}

function getHallOfFame({ level, mode, limit = 10 } = {}) {
  const db = getDb();
  if (level && mode) {
    return db.prepare(SELECT_HALL_OF_FAME).all({ level, mode, limit });
  }
  return db.prepare(SELECT_HALL_OF_FAME_ALL).all({ limit });
}

function getMatchHistory(limit = 50) {
  const db = getDb();
  return db.prepare(SELECT_HISTORY).all(limit);
}

function getMatchResults(matchId) {
  const db = getDb();
  return db.prepare(SELECT_MATCH_RESULTS).all(matchId);
}

module.exports = {
  saveMatch,
  getHallOfFame,
  getMatchHistory,
  getMatchResults
};
