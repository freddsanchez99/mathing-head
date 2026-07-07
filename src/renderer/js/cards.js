const questionsCache = { 1: null, 2: null, 3: null };
let currentCard = null;
const usedQuestionIds = new Set();

async function loadQuestionsForLevel(level) {
  if (questionsCache[level]) return questionsCache[level];
  const list = await window.mathingHead.getQuestions(level);
  questionsCache[level] = list;
  return list;
}

function getRandomQuestion(level) {
  const questions = questionsCache[level] || [];
  if (questions.length === 0) {
    return {
      id: 0,
      color: 'blanco',
      points: 10,
      question: 'Cargando preguntas…',
      answer: 0,
      tolerance: 0.01,
      time_limit: 120
    };
  }

  const available = questions.filter(q => !usedQuestionIds.has(q.id));
  const pool = available.length > 0 ? available : questions;

  if (available.length === 0) usedQuestionIds.clear();

  const question = pool[Math.floor(Math.random() * pool.length)];
  usedQuestionIds.add(question.id);
  return question;
}

function getCurrentCard() {
  return currentCard;
}

async function loadNextCard(level) {
  await loadQuestionsForLevel(level);
  currentCard = getRandomQuestion(level);
  return currentCard;
}

function renderCard(card, level) {
  const colorClass = `card-badge-${card.color === 'blanco' ? 'rojo' : card.color}`;

  document.getElementById('card-points').textContent = `${card.points} PTS`;
  document.getElementById('card-meta').textContent = `NIVEL ${level} · ${(card.color || '').toUpperCase()}`;
  document.getElementById('card-question').textContent = card.question;

  const badge = document.getElementById('card-points-badge');
  badge.className = `card-badge ${colorClass}`;
}
