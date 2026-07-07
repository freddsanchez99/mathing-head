function validateNumericAnswer(userAnswer, correctAnswer, tolerance = 0.01) {
  const user = parseFloat(userAnswer);
  const correct = parseFloat(correctAnswer);

  if (isNaN(user) || isNaN(correct)) return false;
  return Math.abs(user - correct) <= tolerance;
}

function showFeedback(isCorrect, correctAnswer, cellEffect = null) {
  const overlay = document.getElementById('feedback-overlay');
  const emoji = document.getElementById('feedback-emoji');
  const message = document.getElementById('feedback-message');
  const effectEl = document.getElementById('feedback-effect');

  overlay.classList.remove('correct', 'incorrect');

  if (isCorrect) {
    overlay.classList.add('correct');
    emoji.textContent = '🎉';
    let msg = `¡Correcto! +${currentCard.points} pts`;
    if (cellEffect && cellEffect.points > 0) {
      msg += ` · ${cellEffect.label}`;
    }
    message.textContent = msg;
    effectEl.textContent = '';
    effectEl.style.display = 'none';
  } else {
    overlay.classList.add('incorrect');
    emoji.textContent = '';
    let msg = `Incorrecto · Respuesta: ${correctAnswer}`;
    if (cellEffect && cellEffect.points < 0) {
      msg += ` · ${cellEffect.label}`;
    }
    message.textContent = msg;
    effectEl.textContent = '';
    effectEl.style.display = 'none';
  }

  overlay.classList.add('active');

  setTimeout(() => {
    overlay.classList.remove('active');
  }, 2000);
}
