let gameState = {
  level: 1,
  mode: 'normal',
  playerNames: ['Juan', 'Sofía'],
  playerColors: ['#F44336', '#2196F3'],
  totalCardsPlayed: 0,
  gameStartTime: 0,
  lastIsNewRecord: false
};

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function selectLevel(el) {
  document.querySelectorAll('.level-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  gameState.level = parseInt(el.dataset.level);
}

function selectMode(el) {
  document.querySelectorAll('.mode-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  gameState.mode = el.dataset.mode;
}

function cyclePlayerColor(avatarEl) {
  const colors = ['#F44336', '#2196F3', '#4CAF50', '#9C27B0'];
  const currentBg = avatarEl.style.background;
  let currentIndex = colors.indexOf(currentBg);
  let nextIndex = (currentIndex + 1) % colors.length;
  avatarEl.style.background = colors[nextIndex];

  const dots = avatarEl.parentElement.querySelectorAll('.player-color-dot');
  dots.forEach(d => d.classList.remove('active'));
  if (dots[nextIndex]) dots[nextIndex].classList.add('active');
}

function setPlayerColor(dotEl, color) {
  const playerInput = dotEl.closest('.player-input');
  const avatar = playerInput.querySelector('.avatar');
  avatar.style.background = color;

  playerInput.querySelectorAll('.player-color-dot').forEach(d => d.classList.remove('active'));
  dotEl.classList.add('active');
}

let playerCount = 2;

function addPlayer() {
  if (playerCount >= 4) return;
  playerCount++;

  const colors = ['#F44336', '#2196F3', '#4CAF50', '#9C27B0'];
  const names = ['Juan', 'Sofía', 'Mateo', 'Valentina'];

  const playerDiv = document.querySelector(`.player-input[data-player="${playerCount}"]`);
  if (playerDiv) {
    playerDiv.style.display = 'flex';
    playerDiv.querySelector('input').value = names[playerCount - 1];
  }

  const addBtn = document.querySelector('.player-input[data-player="add"]');
  if (playerCount >= 4 && addBtn) {
    addBtn.style.display = 'none';
  }
}

function collectPlayers() {
  const inputs = document.querySelectorAll('.player-input');
  const names = [];
  const colors = [];

  inputs.forEach(input => {
    if (input.style.display === 'none') return;
    if (input.dataset.player === 'add') return;
    const nameInput = input.querySelector('input');
    const avatar = input.querySelector('.avatar');
    if (nameInput && nameInput.value.trim()) {
      names.push(nameInput.value.trim());
      colors.push(avatar.style.background || '#F44336');
    }
  });

  return { names, colors };
}

async function startGame() {
  const { names, colors } = collectPlayers();
  if (names.length < 2) {
    alert('Se necesitan al menos 2 jugadores.');
    return;
  }

  gameState.playerNames = names;
  gameState.playerColors = colors;
  gameState.totalCardsPlayed = 0;
  gameState.lastIsNewRecord = false;
  gameState.gameStartTime = Date.now();

  initPlayers(names, colors);
  usedQuestionIds.clear();

  try {
    await loadQuestionsForLevel(gameState.level);
  } catch (err) {
    console.error('No se pudieron cargar las preguntas:', err);
    alert('Error cargando el banco de preguntas. Revisa la base de datos.');
    return;
  }

  updateGameUI();
  generateBoard(gameState.level);
  initPlayerPositions();
  await loadNextCard(gameState.level);
  renderCard(currentCard, gameState.level);
  renderScoreboard();
  updateTurnDisplay();
  updateCardCounter();

  showScreen('screen-game');

  if (gameState.mode === 'concurso') {
    startGameTimer(
      () => {},
      () => endGame()
    );
  } else {
    startNormalGameTimer();
  }

  startCardTimer(
    () => {},
    () => handleTimeUp()
  );
}

function updateGameUI() {
  const levelData = LEVELS[gameState.level];
  document.getElementById('game-level-text').textContent = levelData.fullName;
  document.getElementById('game-level-chip').style.background = levelData.accentColor;

  document.documentElement.style.setProperty('--acento-nivel', levelData.accentColor);
}

function updateCardCounter() {
  const counter = document.getElementById('card-counter');
  if (counter) {
    counter.textContent = `Carta ${gameState.totalCardsPlayed + 1}/30`;
  }
}

function updateTurnDisplay() {
  const player = getCurrentPlayer();
  document.getElementById('turn-player-name').textContent = player.name;
  const avatar = document.getElementById('turn-player-avatar');
  avatar.textContent = player.name.charAt(0).toUpperCase();
  avatar.style.background = player.color;
}

function validateAnswer() {
  const input = document.getElementById('card-answer-input');
  const userAnswer = input.value.trim();
  if (!userAnswer) return;

  stopCardTimer();
  const timeSpent = getCardTimeSpent();
  const isCorrect = validateNumericAnswer(userAnswer, currentCard.answer);

  const playerIdx = getCurrentPlayerIndex();

  if (isCorrect) {
    addScore(currentCard.points, timeSpent);
    movePlayerToken(playerIdx, 1);
    const effect = applyCellEffect(playerIdx);
    animateCellLanding(playerIdx);
    showFeedback(isCorrect, currentCard.answer, effect);
  } else {
    showFeedback(isCorrect, currentCard.answer);
  }

  gameState.totalCardsPlayed++;
  renderScoreboard();
  input.value = '';

  setTimeout(async () => {
    const playerReachedFinish = hasPlayerReachedFinish(getCurrentPlayerIndex());
    if (gameState.totalCardsPlayed >= 30 || playerReachedFinish) {
      await endGame();
    } else {
      nextPlayer();
      await loadNextCard(gameState.level);
      renderCard(currentCard, gameState.level);
      updateTurnDisplay();
      updateCardCounter();
      updateTokenPositions();
      showScreen('screen-game');

      startCardTimer(
        () => {},
        () => handleTimeUp()
      );
    }
  }, 2500);
}

async function handleTimeUp() {
  showFeedback(false, currentCard.answer);
  gameState.totalCardsPlayed++;

  setTimeout(async () => {
    if (gameState.totalCardsPlayed >= 30) {
      await endGame();
    } else {
      nextPlayer();
      await loadNextCard(gameState.level);
      renderCard(currentCard, gameState.level);
      updateTurnDisplay();
      updateCardCounter();
      updateTokenPositions();
      showScreen('screen-game');

      startCardTimer(
        () => {},
        () => handleTimeUp()
      );
    }
  }, 2500);
}

function buildMatchPayload() {
  const allPlayers = getAllPlayers();
  const sorted = getSortedPlayers();
  const positionById = {};
  sorted.forEach((p, i) => { positionById[p.id] = i + 1; });

  const totalTime = getTotalGameTime();

  return {
    level: gameState.level,
    mode: gameState.mode,
    played_at: new Date().toISOString(),
    total_cards: gameState.totalCardsPlayed,
    duration_seconds: totalTime,
    winner_name: sorted.length > 0 ? sorted[0].name : null,
    results: allPlayers.map(p => ({
      player_name: p.name,
      player_color: p.color,
      score: p.score,
      cards_resolved: p.cardsResolved,
      cards_by_10: p.cardsByPoints[10] || 0,
      cards_by_20: p.cardsByPoints[20] || 0,
      cards_by_30: p.cardsByPoints[30] || 0,
      total_time_seconds: p.totalTime,
      fastest_card_seconds: p.fastestCard,
      final_position: positionById[p.id] || null
    }))
  };
}

async function endGame() {
  stopCardTimer();
  stopGameTimer();

  const payload = buildMatchPayload();

  let savedOk = true;
  let isNewRecord = false;
  try {
    const result = await window.mathingHead.saveMatch(payload);
    isNewRecord = !!result?.isNewRecord;
  } catch (err) {
    console.error('No se pudo guardar la partida:', err);
    savedOk = false;
  }

  gameState.lastIsNewRecord = isNewRecord;

  const totalTime = payload.duration_seconds;
  const avgTime = payload.total_cards > 0 ? Math.round(totalTime / payload.total_cards) : 0;

  document.getElementById('results-subtitle').textContent =
    `Resultados finales · ${LEVELS[gameState.level].fullName} · Modo ${gameState.mode === 'normal' ? 'Normal' : 'Concurso'}`;

  document.getElementById('stat-total-time').textContent = formatTime(totalTime);
  document.getElementById('stat-avg-time').textContent = formatTime(avgTime);

  const allPlayers = getSortedPlayers();
  const fastest = allPlayers.reduce((min, p) => {
    if (p.fastestCard === null) return min;
    return min === null || p.fastestCard < min ? p.fastestCard : min;
  }, null);
  document.getElementById('stat-fastest').textContent = fastest !== null ? `${fastest} s` : '--';

  const totalResolved = allPlayers.reduce((sum, p) => sum + p.cardsResolved, 0);
  document.getElementById('stat-cards').textContent = `${totalResolved} / 30`;

  const newRecordEl = document.getElementById('results-new-record');
  if (newRecordEl) {
    newRecordEl.style.display = isNewRecord ? 'inline-flex' : 'none';
  }

  const saveStatus = document.getElementById('results-save-status');
  if (saveStatus) {
    saveStatus.textContent = savedOk ? 'Partida guardada' : '⚠ No se pudo guardar la partida';
    saveStatus.className = savedOk ? 'save-status ok' : 'save-status err';
  }

  renderPodium();
  showScreen('screen-results');
}

function goHome() {
  stopCardTimer();
  stopGameTimer();
  playerCount = 2;
  showScreen('screen-home');
}

function goRecords() {
  showScreen('screen-records');
  if (typeof loadRecordsTab === 'function') {
    loadRecordsTab('hof');
  }
}

document.addEventListener('keydown', (e) => {
  const gameScreen = document.getElementById('screen-game');
  if (!gameScreen.classList.contains('active')) return;

  if (e.key === 'Enter') {
    validateAnswer();
  }
});
