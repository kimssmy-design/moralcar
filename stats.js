// stats.js — 결과 화면 상단 유형별 참여 통계 + 참여 순번 표시

var TYPE_DISPLAY_ORDER = ['majority_rule', 'majority_situation', 'minority_rule', 'minority_situation'];

var TYPE_CARD_STYLE = {
  majority_rule: { bg: '#E6F1FB', text: '#0C447C' },
  majority_situation: { bg: '#FAEEDA', text: '#854F0B' },
  minority_rule: { bg: '#EEEDFE', text: '#3C3489' },
  minority_situation: { bg: '#FBEAF0', text: '#993556' }
};

function fetchStats() {
  return fetch(GAS_URL + '?action=stats', { method: 'GET' })
    .then(function (res) { return res.json(); })
    .catch(function () { return { ok: false, total: 0, counts: {} }; });
}

function renderStatCards(counts) {
  var wrap = document.getElementById('statCards');
  wrap.innerHTML = '';
  TYPE_DISPLAY_ORDER.forEach(function (key) {
    var typeInfo = RESULT_TYPES[key];
    var style = TYPE_CARD_STYLE[key];
    var count = (counts && counts[key]) || 0;
    var card = document.createElement('div');
    card.className = 'stat-card';
    card.style.background = style.bg;
    card.innerHTML =
      '<div class="stat-card-icon">' + typeInfo.icon + '</div>' +
      '<p class="stat-card-label" style="color:' + style.text + '">' + typeInfo.name + '</p>' +
      '<p class="stat-card-count" style="color:' + style.text + '">' + count + '명</p>';
    wrap.appendChild(card);
  });
}

function renderRankLine(rank, total, typeName) {
  var el = document.getElementById('rankLine');
  if (rank && total) {
    el.textContent = '참여한 ' + total + '명 중 ' + rank + '번째 ' + typeName + '이에요!';
  } else if (rank) {
    el.textContent = rank + '번째 ' + typeName + '이에요!';
  } else {
    el.textContent = '';
  }
}
