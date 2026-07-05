const PLAYER_COLORS = ['#F44336', '#2196F3', '#4CAF50', '#9C27B0'];

let players = [];
let currentPlayerIndex = 0;

function initPlayers(names, colors) {
  players = names.map((name, i) => ({
    id: i + 1,
    name: name,
    color: colors[i] || PLAYER_COLORS[i],
    score: 0,
    cardsResolved: 0,
    cardsByPoints: { 10: 0, 20: 0, 30: 0 },
    totalTime: 0,
    fastestCard: null
  }));
  currentPlayerIndex = 0;
}

function getCurrentPlayer() {
  return players[currentPlayerIndex];
}

function nextPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  return getCurrentPlayer();
}

function addScore(points, timeSpent) {
  const player = getCurrentPlayer();
  player.score += points;
  player.cardsResolved++;
  player.totalTime += timeSpent;

  if (points === 10) player.cardsByPoints[10]++;
  else if (points === 20) player.cardsByPoints[20]++;
  else if (points === 30) player.cardsByPoints[30]++;

  if (player.fastestCard === null || timeSpent < player.fastestCard) {
    player.fastestCard = timeSpent;
  }
}

function getSortedPlayers() {
  return [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.cardsResolved !== a.cardsResolved) return b.cardsResolved - a.cardsResolved;
    const bHigh = b.cardsByPoints[30];
    const aHigh = a.cardsByPoints[30];
    if (bHigh !== aHigh) return bHigh - aHigh;
    return a.totalTime - b.totalTime;
  });
}

function renderScoreboard() {
  const list = document.getElementById('scoreboard-list');
  if (!list) return;

  const sorted = getSortedPlayers();
  list.innerHTML = sorted.map((p, i) => `
    <div class="scoreboard-item ${i === 0 && p.id === getCurrentPlayer().id ? 'active' : ''}" data-player-id="${p.id}">
      <div class="avatar avatar-sm" style="background:${p.color};">${p.name.charAt(0).toUpperCase()}</div>
      <div>
        <div class="player-name">${p.name}</div>
        <div class="player-cards">${p.cardsResolved} cartas resueltas</div>
      </div>
      <div class="player-score">${p.score}</div>
    </div>
  `).join('');
}

function renderPodium() {
  const podium = document.getElementById('podium');
  if (!podium) return;

  const sorted = getSortedPlayers();
  const positions = [
    { place: 2, player: sorted[1], cls: 'second' },
    { place: 1, player: sorted[0], cls: 'first' },
    { place: 3, player: sorted[2], cls: 'third' }
  ].filter(p => p.player);

  podium.innerHTML = positions.map(pos => `
    <div class="podium-place ${pos.cls}">
      ${pos.place === 1 ? '<svg class="podium-crown" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-amarillo)" stroke-width="2"><path d="M2 20h20M4 16l2-10 4 4 2-6 2 6 4-4 2 10"/></svg>' : ''}
      <div class="avatar ${pos.place === 1 ? 'avatar-xl' : 'avatar-lg'}" style="background:${pos.player.color};">${pos.player.name.charAt(0).toUpperCase()}</div>
      <div class="podium-player-name">${pos.player.name}</div>
      <div class="podium-score">
        <span class="score-num">${pos.player.score}</span>
        <span class="score-pts">pts</span>
      </div>
      <div class="podium-block">${pos.place}</div>
    </div>
  `).join('');
}
