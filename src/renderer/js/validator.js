function validateNumericAnswer(userAnswer, correctAnswer, tolerance = 0.01) {
  const user = parseFloat(userAnswer);
  const correct = parseFloat(correctAnswer);

  if (isNaN(user) || isNaN(correct)) return false;
  return Math.abs(user - correct) <= tolerance;
}

function showFeedback(isCorrect, correctAnswer) {
  const overlay = document.getElementById('feedback-overlay');
  const emoji = document.getElementById('feedback-emoji');
  const message = document.getElementById('feedback-message');

  overlay.classList.remove('correct', 'incorrect');

  if (isCorrect) {
    overlay.classList.add('correct');
    emoji.textContent = '🎉';
    message.textContent = '¡Correcto!';
  } else {
    overlay.classList.add('incorrect');
    emoji.textContent = '';
    message.textContent = `Incorrecto · Respuesta: ${correctAnswer}`;
  }

  overlay.classList.add('active');

  setTimeout(() => {
    overlay.classList.remove('active');
  }, 2000);
}
