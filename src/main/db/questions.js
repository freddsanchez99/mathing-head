const { getDb } = require('./index');

const SELECT_BY_LEVEL = `
  SELECT id, level, color, points, question, answer, tolerance, time_limit
  FROM questions
  WHERE level = ?
  ORDER BY id
`;

function getQuestionsByLevel(level) {
  const db = getDb();
  return db.prepare(SELECT_BY_LEVEL).all(level);
}

function getQuestionCount() {
  const db = getDb();
  return db.prepare('SELECT COUNT(*) AS n FROM questions').get().n;
}

module.exports = { getQuestionsByLevel, getQuestionCount };
