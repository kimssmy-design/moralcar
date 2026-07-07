// scene-render.js
// 시나리오 데이터를 받아 카드형 장면(HTML 문자열)을 생성한다.
// 좌측=직진(빨강 카드), 우측=방향전환(파랑 카드). 이모지 아이콘 사용.
// 선택 시 app.js가 .emoji-figure의 텍스트를 data-skull로 교체해 해골 표시를 만든다.

function personEmoji(age) {
  if (age === 'child') return '🧒';
  if (age === 'elderly') return '👴';
  return '🚶';
}

function iconRow(side) {
  var emoji = side.type === 'passenger' ? '🚗' : personEmoji(side.age);
  var n = Math.min(side.count, 5);
  var html = '';
  for (var i = 0; i < n; i++) {
    html += '<span class="emoji-figure" data-original="' + emoji + '" data-skull="💀">' + emoji + '</span>';
  }
  if (side.animal) {
    html += '<span class="emoji-figure" data-original="🐶" data-skull="🐶">🐶</span>';
  }
  return html;
}

function signalEmoji(side) {
  return side.signal ? '🟢' : '🔴';
}

// scenario: SCENARIOS 배열의 한 항목
// 반환: 카드형 장면 HTML 문자열
function buildScene(scenario) {
  var left = scenario.left;
  var right = scenario.right;

  return (
    '<div class="scene-row">' +
      '<div class="side side-left">' +
        '<p class="side-label">직진</p>' +
        '<div class="signal-row">' + signalEmoji(left) + '</div>' +
        '<div class="icon-row">' + iconRow(left) + '</div>' +
        '<p class="side-desc">' + left.desc + '</p>' +
      '</div>' +
      '<div class="side side-right">' +
        '<p class="side-label">방향 전환</p>' +
        '<div class="signal-row">' + signalEmoji(right) + '</div>' +
        '<div class="icon-row">' + iconRow(right) + '</div>' +
        '<p class="side-desc">' + right.desc + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="car-hood">' +
      '<div class="headlight headlight-left"></div>' +
      '<div class="headlight headlight-right"></div>' +
    '</div>'
  );
}
