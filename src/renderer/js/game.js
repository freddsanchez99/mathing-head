let gameState = {
  level: 1,
  mode: 'normal',
  playerNames: ['Juan', 'Sofía'],
  playerColors: ['#F44336', '#2196F3'],
  totalCardsPlayed: 0,
  gameStartTime: 0
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

function startGame() {
  const { names, colors } = collectPlayers();
  if (names.length < 2) {
    alert('Se necesitan al menos 2 jugadores.');
    return;
  }

  gameState.playerNames = names;
  gameState.playerColors = colors;
  gameState.totalCardsPlayed = 0;
  gameState.gameStartTime = Date.now();

  initPlayers(names, colors);
  usedQuestionIds.clear();

  updateGameUI();
  generateBoard(gameState.level);
  initPlayerPositions();
  loadNextCard(gameState.level);
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

  setTimeout(() => {
    const playerReachedFinish = hasPlayerReachedFinish(getCurrentPlayerIndex());
    if (gameState.totalCardsPlayed >= 30 || playerReachedFinish) {
      endGame();
    } else {
      nextPlayer();
      loadNextCard(gameState.level);
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

function handleTimeUp() {
  showFeedback(false, currentCard.answer);
  gameState.totalCardsPlayed++;

  setTimeout(() => {
    if (gameState.totalCardsPlayed >= 30) {
      endGame();
    } else {
      nextPlayer();
      loadNextCard(gameState.level);
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

function endGame() {
  stopCardTimer();
  stopGameTimer();

  const totalTime = getTotalGameTime();
  const avgTime = gameState.totalCardsPlayed > 0 ? Math.round(totalTime / gameState.totalCardsPlayed) : 0;

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

  renderPodium();
  showScreen('screen-results');
}

function goHome() {
  stopCardTimer();
  stopGameTimer();
  playerCount = 2;
  showScreen('screen-home');
}

document.addEventListener('keydown', (e) => {
  const gameScreen = document.getElementById('screen-game');
  if (!gameScreen.classList.contains('active')) return;

  if (e.key === 'Enter') {
    validateAnswer();
  }
});
