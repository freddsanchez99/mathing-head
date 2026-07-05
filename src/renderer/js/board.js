const BOARD_LAYOUT = [
  ['estrella', '+', 'penalizacion', '×'],
  ['÷', 'meta', '−', '+'],
  ['×', 'estrella', '÷', 'penalizacion'],
  ['−', '+', '×', 'meta']
];

const OPERATORS = ['+', '−', '×', '÷'];
const SPECIALS = { estrella: '⭐', penalizacion: '😟', meta: '🎯' };

function generateBoard(level) {
  const grid = document.getElementById('board-grid');
  if (!grid) return;

  const levelData = LEVELS[level];
  grid.innerHTML = '';

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const cellType = BOARD_LAYOUT[row][col];
      const cell = document.createElement('div');
      cell.className = 'board-cell';
      cell.dataset.row = row;
      cell.dataset.col = col;

      if (cellType === 'estrella') {
        cell.classList.add('cell-estrella');
        cell.textContent = SPECIALS.estrella;
        cell.style.background = levelData.boardColors.estrella;
        cell.style.borderColor = levelData.boardColors.estrellaBorder;
      } else if (cellType === 'penalizacion') {
        cell.classList.add('cell-penalizacion');
        cell.textContent = SPECIALS.penalizacion;
        cell.style.background = levelData.boardColors.penalizacion;
        cell.style.borderColor = levelData.boardColors.penalizacionBorder;
      } else if (cellType === 'meta') {
        cell.classList.add('cell-meta');
        cell.textContent = SPECIALS.meta;
        cell.style.background = levelData.boardColors.meta;
        cell.style.borderColor = levelData.boardColors.metaBorder;
      } else {
        cell.classList.add('cell-operador');
        cell.textContent = cellType;
        cell.style.color = levelData.boardColors.operador;
      }

      grid.appendChild(cell);
    }
  }
}

function placePlayerToken(player, row, col) {
  document.querySelectorAll('.player-token').forEach(t => t.remove());

  const cells = document.querySelectorAll('.board-cell');
  const index = row * 4 + col;
  const cell = cells[index];
  if (!cell) return;

  const token = document.createElement('div');
  token.className = `avatar avatar-sm player-token`;
  token.style.background = player.color;
  token.textContent = player.name.charAt(0).toUpperCase();
  cell.appendChild(token);
}
