document.getElementById('btn-instructions').addEventListener('click', () => {
  document.getElementById('instructions-modal').classList.add('active');
});

function closeInstructions() {
  document.getElementById('instructions-modal').classList.remove('active');
}

document.getElementById('instructions-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeInstructions();
});
