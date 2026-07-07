const COLS = 6;
const ROWS = 5;
const TOTAL_CELLS = 30;

const BOARD_CELLS = [
  'normal', 'normal', 'estrella', 'normal', 'normal', 'penalizacion',
  'normal', 'meta', 'normal', 'normal', 'estrella', 'normal',
  'penalizacion', 'normal', 'normal', 'meta', 'normal', 'normal',
  'normal', 'estrella', 'normal', 'penalizacion', 'normal', 'normal',
  'normal', 'normal', 'estrella', 'normal', 'penalizacion', 'meta'
];

const OPERATORS = ['+', '−', '×', '÷'];
const SPECIALS = { estrella: '⭐', penalizacion: '😟', meta: '🎯' };

const CELL_EFFECTS = {
  estrella: { points: 10, label: 'Comodín +10' },
  penalizacion: { points: -5, label: 'Penalización -5' },
  meta: { points: 20, label: 'Meta +20' }
};

function cellIndexToGridPos(index) {
  const row = Math.floor(index / COLS);
  const isReversedRow = row % 2 === 1;
  const col = isReversedRow ? (COLS - 1 - (index % COLS)) : (index % COLS);
  return { row, col };
}

function gridPosToCellIndex(row, col) {
  const isReversedRow = row % 2 === 1;
  const colInRow = isReversedRow ? (COLS - 1 - col) : col;
  return row * COLS + colInRow;
}

function generateBoard(level) {
  const grid = document.getElementById('board-grid');
  if (!grid) return;

  const levelData = LEVELS[level];
  grid.innerHTML = '';

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cellIndex = gridPosToCellIndex(row, col);
      const cellType = BOARD_CELLS[cellIndex];
      const cell = document.createElement('div');
      cell.className = 'board-cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.dataset.cellIndex = cellIndex;

      const cellNumber = document.createElement('span');
      cellNumber.className = 'cell-number';
      cellNumber.textContent = cellIndex + 1;
      cell.appendChild(cellNumber);

      if (cellType === 'estrella') {
        cell.classList.add('cell-estrella');
        const icon = document.createElement('span');
        icon.className = 'cell-icon';
        icon.textContent = SPECIALS.estrella;
        cell.appendChild(icon);
        cell.style.background = levelData.boardColors.estrella;
        cell.style.borderColor = levelData.boardColors.estrellaBorder;
      } else if (cellType === 'penalizacion') {
        cell.classList.add('cell-penalizacion');
        const icon = document.createElement('span');
        icon.className = 'cell-icon';
        icon.textContent = SPECIALS.penalizacion;
        cell.appendChild(icon);
        cell.style.background = levelData.boardColors.penalizacion;
        cell.style.borderColor = levelData.boardColors.penalizacionBorder;
      } else if (cellType === 'meta') {
        cell.classList.add('cell-meta');
        const icon = document.createElement('span');
        icon.className = 'cell-icon';
        icon.textContent = SPECIALS.meta;
        cell.appendChild(icon);
        cell.style.background = levelData.boardColors.meta;
        cell.style.borderColor = levelData.boardColors.metaBorder;
      } else {
        cell.classList.add('cell-normal');
        const op = OPERATORS[cellIndex % OPERATORS.length];
        const opSpan = document.createElement('span');
        opSpan.className = 'cell-operator';
        opSpan.textContent = op;
        cell.appendChild(opSpan);
        cell.style.color = levelData.boardColors.operador;
      }

      if (cellIndex === 0) {
        cell.classList.add('cell-start');
      }
      if (cellIndex === TOTAL_CELLS - 1) {
        cell.classList.add('cell-finish');
      }

      grid.appendChild(cell);
    }
  }
}

function initPlayerPositions() {
  document.querySelectorAll('.player-token').forEach(t => t.remove());
  const cells = document.querySelectorAll('.board-cell');
  const startCell = cells[0];
  if (!startCell) return;

  const players = getAllPlayers();
  players.forEach((player, idx) => {
    player.boardPosition = 0;
    const token = document.createElement('div');
    token.className = 'player-token';
    token.id = `token-${idx}`;
    token.style.background = player.color;
    token.textContent = player.name.charAt(0).toUpperCase();
    startCell.appendChild(token);
  });

  updateTokenPositions();
}

function updateTokenPositions() {
  const cells = document.querySelectorAll('.board-cell');
  const players = getAllPlayers();

  cells.forEach(cell => {
    cell.querySelectorAll('.player-token').forEach(t => t.remove());
  });

  const positionGroups = {};
  players.forEach((player, idx) => {
    const pos = player.boardPosition || 0;
    if (!positionGroups[pos]) positionGroups[pos] = [];
    positionGroups[pos].push({ player, idx });
  });

  Object.entries(positionGroups).forEach(([pos, group]) => {
    const cellIndex = parseInt(pos);
    const cell = cells[cellIndex];
    if (!cell) return;

    group.forEach(({ player, idx }, groupIdx) => {
      const token = document.createElement('div');
      token.className = 'player-token';
      token.id = `token-${idx}`;
      token.style.background = player.color;
      token.textContent = player.name.charAt(0).toUpperCase();

      if (group.length === 1) {
        token.style.top = '50%';
        token.style.left = '50%';
        token.style.transform = 'translate(-50%, -50%)';
      } else {
        const offsets = [
          { top: '25%', left: '25%' },
          { top: '25%', left: '75%' },
          { top: '75%', left: '25%' },
          { top: '75%', left: '75%' }
        ];
        const offset = offsets[groupIdx % offsets.length];
        token.style.top = offset.top;
        token.style.left = offset.left;
        token.style.transform = 'translate(-50%, -50%)';
      }

      const currentPlayerIdx = getCurrentPlayerIndex();
      if (idx === currentPlayerIdx) {
        token.classList.add('token-active');
      }

      cell.appendChild(token);
    });
  });
}

function movePlayerToken(playerIndex, steps) {
  const players = getAllPlayers();
  const player = players[playerIndex];
  if (!player) return;

  const currentPos = player.boardPosition || 0;
  const newPos = Math.min(currentPos + steps, TOTAL_CELLS - 1);
  player.boardPosition = newPos;

  updateTokenPositions();

  return newPos;
}

function getPlayerCellType(playerIndex) {
  const players = getAllPlayers();
  const player = players[playerIndex];
  if (!player) return 'normal';
  const pos = player.boardPosition || 0;
  return BOARD_CELLS[pos];
}

function applyCellEffect(playerIndex) {
  const cellType = getPlayerCellType(playerIndex);
  const effect = CELL_EFFECTS[cellType];
  if (!effect) return { type: 'normal', points: 0 };

  if (effect.points !== 0) {
    const players = getAllPlayers();
    const player = players[playerIndex];
    const currentScore = player.score || 0;
    const newScore = Math.max(0, currentScore + effect.points);
    player.score = newScore;
  }

  return { type: cellType, points: effect.points, label: effect.label };
}

function hasPlayerReachedFinish(playerIndex) {
  const players = getAllPlayers();
  const player = players[playerIndex];
  if (!player) return false;
  return (player.boardPosition || 0) >= TOTAL_CELLS - 1;
}

function animateCellLanding(playerIndex) {
  const players = getAllPlayers();
  const player = players[playerIndex];
  if (!player) return;

  const pos = player.boardPosition || 0;
  const cellType = BOARD_CELLS[pos];
  if (cellType === 'normal') return;

  const cells = document.querySelectorAll('.board-cell');
  const cell = cells[pos];
  if (!cell) return;

  cell.classList.add('cell-land-effect');
  setTimeout(() => {
    cell.classList.remove('cell-land-effect');
  }, 600);
}
