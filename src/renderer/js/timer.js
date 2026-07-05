let cardTimerInterval = null;
let gameTimerInterval = null;
let cardTimeRemaining = CARD_TIME;
let gameTimeRemaining = 0;
let cardStartTime = 0;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startCardTimer(onTick, onTimeUp) {
  stopCardTimer();
  cardTimeRemaining = CARD_TIME;
  cardStartTime = Date.now();
  updateCardTimerDisplay();

  cardTimerInterval = setInterval(() => {
    cardTimeRemaining--;
    updateCardTimerDisplay();
    if (onTick) onTick(cardTimeRemaining);

    if (cardTimeRemaining <= 0) {
      stopCardTimer();
      if (onTimeUp) onTimeUp();
    }
  }, 1000);
}

function stopCardTimer() {
  if (cardTimerInterval) {
    clearInterval(cardTimerInterval);
    cardTimerInterval = null;
  }
}

function getCardTimeSpent() {
  return CARD_TIME - cardTimeRemaining;
}

function updateCardTimerDisplay() {
  const texts = document.querySelectorAll('#card-timer-text, #challenge-timer-text');
  texts.forEach(el => { el.textContent = formatTime(cardTimeRemaining); });

  const chips = document.querySelectorAll('#card-timer, #challenge-timer');
  chips.forEach(chip => {
    chip.classList.remove('warning', 'danger');
    if (cardTimeRemaining <= 30) {
      chip.classList.add('danger');
    } else if (cardTimeRemaining <= 60) {
      chip.classList.add('warning');
    }
  });
}

function startGameTimer(onTick, onTimeUp) {
  stopGameTimer();
  gameTimeRemaining = GAME_TIME_CONCURSO;
  updateGameTimerDisplay();

  gameTimerInterval = setInterval(() => {
    gameTimeRemaining--;
    updateGameTimerDisplay();
    if (onTick) onTick(gameTimeRemaining);

    if (gameTimeRemaining <= 0) {
      stopGameTimer();
      if (onTimeUp) onTimeUp();
    }
  }, 1000);
}

function stopGameTimer() {
  if (gameTimerInterval) {
    clearInterval(gameTimerInterval);
    gameTimerInterval = null;
  }
}

function updateGameTimerDisplay() {
  const el = document.getElementById('game-timer-text');
  if (el) el.textContent = formatTime(gameTimeRemaining);

  const chip = document.getElementById('game-timer');
  if (chip) {
    chip.classList.remove('warning', 'danger');
    if (gameTimeRemaining <= 30) {
      chip.classList.add('danger');
    } else if (gameTimeRemaining <= 60) {
      chip.classList.add('warning');
    }
  }
}

function getTotalGameTime() {
  if (gameTimerInterval) {
    return GAME_TIME_CONCURSO - gameTimeRemaining;
  }
  return 0;
}
