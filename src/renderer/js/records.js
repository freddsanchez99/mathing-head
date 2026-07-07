let currentRecordsTab = 'hof';
let cachedPlayers = [];

function showRecordsTabContent(tab) {
  document.querySelectorAll('.records-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.records-tab-content').forEach(c => c.classList.remove('active'));

  const tabBtn = document.querySelector(`.records-tab[data-tab="${tab}"]`);
  const content = document.getElementById(`tab-${tab}`);
  if (tabBtn) tabBtn.classList.add('active');
  if (content) content.classList.add('active');
  currentRecordsTab = tab;
}

function loadRecordsTab(tab, tabEl) {
  if (tabEl) {
    document.querySelectorAll('.records-tab').forEach(t => t.classList.remove('active'));
    tabEl.classList.add('active');
  }
  showRecordsTabContent(tab);

  if (tab === 'hof') refreshHof();
  if (tab === 'history') refreshHistory();
  if (tab === 'players') refreshPlayers();
}

/* ===================== HALL OF FAME ===================== */
async function refreshHof() {
  const levelEl = document.getElementById('hof-level');
  const modeEl = document.getElementById('hof-mode');
  if (!levelEl || !modeEl) return;

  const level = parseInt(levelEl.value, 10);
  const mode = modeEl.value;
  const list = document.getElementById('hof-list');
  list.innerHTML = '<p class="empty-msg">Cargando…</p>';

  try {
    const entries = await window.mathingHead.getHallOfFame({ level, mode, limit: 10 });
    renderHof(entries);
  } catch (err) {
    console.error('Error cargando Hall of Fame:', err);
    list.innerHTML = '<p class="empty-msg">⚠ No se pudo cargar el ranking.</p>';
  }
}

function renderHof(entries) {
  const list = document.getElementById('hof-list');
  if (!entries || entries.length === 0) {
    list.innerHTML = '<p class="empty-msg">Aún no hay récords para este nivel y modo.<br>¡Sé el primero en aparecer!</p>';
    return;
  }

  const medals = ['🥇', '🥈', '🥉'];
  list.innerHTML = entries.map((e, i) => {
    const initial = (e.winner_name || '?').charAt(0).toUpperCase();
    const color = e.winner_color || '#9E9E9E';
    const dateStr = formatDate(e.played_at);
    return `
      <div class="hof-entry rank-${i + 1}">
        <div class="hof-rank">${i + 1}${medals[i] ? `<span class="hof-medal">${medals[i]}</span>` : ''}</div>
        <div class="hof-name">
          <span class="hof-avatar" style="background:${color};">${initial}</span>
          ${escapeHtml(e.winner_name || '—')}
        </div>
        <div class="hof-date">${dateStr}</div>
        <div class="hof-score">${e.winning_score}<small>pts</small></div>
      </div>
    `;
  }).join('');
}

/* ===================== HISTORIAL ===================== */
async function refreshHistory() {
  const list = document.getElementById('history-list');
  list.innerHTML = '<p class="empty-msg">Cargando…</p>';

  try {
    const matches = await window.mathingHead.getMatchHistory(50);
    renderHistory(matches);
  } catch (err) {
    console.error('Error cargando historial:', err);
    list.innerHTML = '<p class="empty-msg">⚠ No se pudo cargar el historial.</p>';
  }
}

function renderHistory(matches) {
  const list = document.getElementById('history-list');
  if (!matches || matches.length === 0) {
    list.innerHTML = '<p class="empty-msg">Aún no hay partidas registradas.<br>¡Juega tu primera partida!</p>';
    return;
  }

  const levelNames = { 1: 'EGB', 2: 'Básica Sup.', 3: 'Bach.' };
  list.innerHTML = matches.map(m => {
    const lvl = levelNames[m.level] || `Nivel ${m.level}`;
    const isWin = !!m.winner_name;
    return `
      <div class="history-entry level-${m.level} ${m.mode === 'concurso' ? 'mode-concurso' : ''}">
        <div class="history-row-1">
          <span class="level-pill">Nivel ${m.level} · ${lvl}</span>
          <span class="mode-pill ${m.mode}">${m.mode}</span>
          <span>${m.player_count} jugador${m.player_count !== 1 ? 'es' : ''}</span>
        </div>
        <div class="history-row-2">${formatDate(m.played_at)} · ${m.total_cards} cartas · ${formatDuration(m.duration_seconds)}</div>
        <div class="history-row-3">
          ${isWin ? `<span class="history-trophy">🏆</span> ${escapeHtml(m.winner_name)}` : '—'}
        </div>
      </div>
    `;
  }).join('');
}

/* ===================== JUGADORES ===================== */
async function refreshPlayers() {
  const grid = document.getElementById('players-grid');
  grid.innerHTML = '<p class="empty-msg">Cargando…</p>';

  try {
    const players = await window.mathingHead.getAllPlayers();
    cachedPlayers = players || [];
    renderPlayersGrid(cachedPlayers);
  } catch (err) {
    console.error('Error cargando jugadores:', err);
    grid.innerHTML = '<p class="empty-msg">⚠ No se pudo cargar la lista de jugadores.</p>';
  }
}

function renderPlayersGrid(players) {
  const grid = document.getElementById('players-grid');
  if (!players || players.length === 0) {
    grid.innerHTML = '<p class="empty-msg">Aún no hay jugadores registrados.</p>';
    return;
  }

  grid.innerHTML = players.map(p => {
    const initial = (p.display_name || '?').charAt(0).toUpperCase();
    const color = p.last_color || '#9E9E9E';
    return `
      <div class="player-card" onclick="openPlayerProfile('${escapeAttr(p.display_name)}')">
        <div class="player-card-header">
          <span class="player-card-avatar" style="background:${color};">${initial}</span>
          <span class="player-card-name">${escapeHtml(p.display_name)}</span>
        </div>
        <div class="player-card-stats">
          <span>${p.matches_played} partida${p.matches_played !== 1 ? 's' : ''}</span>
          <span>🏆 ${p.wins}</span>
        </div>
        <div class="player-card-best">${p.best_score}<small>pts</small></div>
      </div>
    `;
  }).join('');
}

function handlePlayerSearch(e) {
  if (e.key === 'Enter') searchPlayer();
}

function searchPlayer() {
  const q = (document.getElementById('player-search').value || '').trim().toLowerCase();
  if (!q) {
    renderPlayersGrid(cachedPlayers);
    return;
  }
  const filtered = cachedPlayers.filter(p => (p.display_name || '').toLowerCase().includes(q));
  renderPlayersGrid(filtered);
}

async function openPlayerProfile(name) {
  const profileEl = document.getElementById('player-profile');
  profileEl.style.display = 'block';
  profileEl.innerHTML = '<p class="empty-msg">Cargando perfil…</p>';
  profileEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  try {
    const profile = await window.mathingHead.getPlayerProfile(name);
    renderPlayerProfile(profile);
  } catch (err) {
    console.error('Error cargando perfil:', err);
    profileEl.innerHTML = '<p class="empty-msg">⚠ No se pudo cargar el perfil.</p>';
  }
}

function renderPlayerProfile(p) {
  const profileEl = document.getElementById('player-profile');
  if (!p) {
    profileEl.innerHTML = '<p class="empty-msg">Jugador sin partidas registradas.</p>';
    return;
  }

  const initial = (p.display_name || '?').charAt(0).toUpperCase();
  const color = p.last_color || '#9E9E9E';
  const winRate = p.matches_played > 0 ? Math.round((p.wins / p.matches_played) * 100) : 0;
  const avg = Math.round(p.avg_score || 0);
  const fastest = p.fastest_card != null ? `${p.fastest_card} s` : '—';
  const recent = (p.recent_matches || []);

  const recentHtml = recent.length === 0
    ? '<p class="empty-msg">Sin partidas recientes.</p>'
    : recent.map(m => {
        const medal = m.final_position === 1 ? '🥇' : m.final_position === 2 ? '🥈' : m.final_position === 3 ? '🥉' : '·';
        return `
          <div class="profile-recent-row">
            <span>${medal}</span>
            <span class="lvl-tag lvl-${m.level}">N${m.level} · ${m.mode}</span>
            <span>${m.score} pts · ${m.cards_resolved} cartas</span>
            <span class="when">${formatDate(m.played_at)}</span>
          </div>
        `;
      }).join('');

  profileEl.innerHTML = `
    <div class="profile-header">
      <span class="profile-avatar" style="background:${color};">${initial}</span>
      <div>
        <div class="profile-name">${escapeHtml(p.display_name)}</div>
        <div class="profile-subtitle">Última partida: ${formatDate(p.last_played)}</div>
      </div>
      <button class="profile-close" onclick="closePlayerProfile()">Cerrar</button>
    </div>
    <div class="profile-stats">
      <div class="profile-stat">
        <div class="profile-stat-value">${p.matches_played}</div>
        <div class="profile-stat-label">Partidas</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-value">${p.wins}</div>
        <div class="profile-stat-label">Victorias · ${winRate}%</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-value">${p.best_score}</div>
        <div class="profile-stat-label">Mejor puntaje</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-value">${avg}</div>
        <div class="profile-stat-label">Promedio</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-value">${p.total_cards}</div>
        <div class="profile-stat-label">Cartas resueltas</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-value">${p.cards_30_total}</div>
        <div class="profile-stat-label">Cartas de 30 pts</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-value">${fastest}</div>
        <div class="profile-stat-label">Carta más rápida</div>
      </div>
    </div>
    <div class="profile-recent">
      <div class="profile-recent-title">Últimas 10 partidas</div>
      ${recentHtml}
    </div>
  `;
}

function closePlayerProfile() {
  const profileEl = document.getElementById('player-profile');
  profileEl.style.display = 'none';
  profileEl.innerHTML = '';
}

/* ===================== HELPERS ===================== */
function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
}

function formatDuration(seconds) {
  if (seconds == null) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  if (str == null) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
