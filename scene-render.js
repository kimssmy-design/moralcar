// scene-render.js
// 시나리오 데이터를 받아 도로 장면 SVG(HTML 문자열)를 생성한다.
// 좌측=직진 경로, 우측=방향전환 경로. 각 경로는 pedestrian(보행자) 또는 passenger(탑승자) 타입.

function personIcon(cx, cy, color, scale, id) {
  var r = 6 * scale;
  return (
    '<g id="' + id + '" stroke="' + color + '" stroke-width="' + (2 * scale) + '" stroke-linecap="round" fill="none">' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color + '" stroke="none"/>' +
    '<line x1="' + cx + '" y1="' + (cy + r) + '" x2="' + cx + '" y2="' + (cy + r + 20 * scale) + '"/>' +
    '<line x1="' + (cx - r) + '" y1="' + (cy + r + 7 * scale) + '" x2="' + (cx + r) + '" y2="' + (cy + r + 7 * scale) + '"/>' +
    '<line x1="' + cx + '" y1="' + (cy + r + 20 * scale) + '" x2="' + (cx - r) + '" y2="' + (cy + r + 30 * scale) + '"/>' +
    '<line x1="' + cx + '" y1="' + (cy + r + 20 * scale) + '" x2="' + (cx + r) + '" y2="' + (cy + r + 30 * scale) + '"/>' +
    '</g>'
  );
}

function skullOverlay(cx, cy, r, id) {
  return (
    '<g id="' + id + '" class="skull-overlay" opacity="0">' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#F1EFE8" stroke="#2C2C2A" stroke-width="0.5"/>' +
    '<circle cx="' + (cx - r * 0.35) + '" cy="' + (cy - r * 0.1) + '" r="' + (r * 0.17) + '" fill="#2C2C2A"/>' +
    '<circle cx="' + (cx + r * 0.35) + '" cy="' + (cy - r * 0.1) + '" r="' + (r * 0.17) + '" fill="#2C2C2A"/>' +
    '<path d="M' + (cx - r * 0.4) + ',' + (cy + r * 0.35) + ' l' + (r * 0.2) + ',0 l0,' + (r * 0.25) +
    ' M' + (cx + r * 0.15) + ',' + (cy + r * 0.35) + ' l' + (r * 0.2) + ',0 l0,' + (r * 0.25) + '" stroke="#2C2C2A" stroke-width="' + (r * 0.13) + '" fill="none"/>' +
    '</g>'
  );
}

function pawIcon(cx, cy) {
  return (
    '<g fill="#A67C52">' +
    '<ellipse cx="' + cx + '" cy="' + (cy + 4) + '" rx="6" ry="4.5"/>' +
    '<circle cx="' + (cx - 5) + '" cy="' + (cy - 3) + '" r="2"/>' +
    '<circle cx="' + (cx - 1.5) + '" cy="' + (cy - 5) + '" r="2"/>' +
    '<circle cx="' + (cx + 2) + '" cy="' + (cy - 5) + '" r="2"/>' +
    '<circle cx="' + (cx + 5.5) + '" cy="' + (cy - 3) + '" r="2"/>' +
    '</g>'
  );
}

function ageColor(age) {
  if (age === 'child') return '#EF9F27';
  if (age === 'elderly') return '#534AB7';
  return '#D85A30';
}
function ageScale(age) {
  if (age === 'child') return 0.75;
  return 1;
}

// lane: 'left' | 'right' 기준 아이콘 배치 영역
function laneZone(lane) {
  return lane === 'left'
    ? { x0: 55, x1: 165, y: 108 }
    : { x0: 215, x1: 325, y: 108 };
}

function renderPedestrianGroup(lane, side, prefix) {
  var zone = laneZone(lane);
  var n = Math.min(side.count, 5);
  var color = ageColor(side.age);
  var scale = ageScale(side.age);
  var icons = '';
  var overlays = '';
  var step = n > 1 ? (zone.x1 - zone.x0) / (n - 1) : 0;
  for (var i = 0; i < n; i++) {
    var cx = n === 1 ? (zone.x0 + zone.x1) / 2 : zone.x0 + step * i;
    var id = prefix + 'Icon' + i;
    icons += personIcon(cx, zone.y, color, scale, id);
    overlays += skullOverlay(cx, zone.y, 7.5, prefix + 'Skull' + i);
  }
  if (side.animal) {
    icons += pawIcon(zone.x1 + 12, zone.y + 14);
  }
  return { icons: icons, overlays: overlays, skullCount: n };
}

function renderPassengerGroup(prefix) {
  // 차량 내부 탑승자 아이콘 (위치 고정) + 장벽 아이콘은 lane 쪽에 별도로
  var icons =
    '<circle id="' + prefix + 'CarHead" cx="190" cy="365" r="5" fill="#5F5E5A"/>' +
    '<path d="M183,377 Q190,371 197,377 L197,382 L183,382 Z" fill="#5F5E5A"/>';
  var overlay = skullOverlay(190, 365, 6.5, prefix + 'CarSkull');
  return { icons: icons, overlays: overlay };
}

function renderBarrier(lane) {
  var x0 = lane === 'left' ? 60 : 204;
  var x1 = x0 + 116;
  return (
    '<rect x="' + x0 + '" y="90" width="116" height="18" rx="2" fill="#5F5E5A"/>' +
    '<rect x="' + x0 + '" y="90" width="10" height="18" fill="#444441"/>' +
    '<rect x="' + (x0 + 20) + '" y="90" width="10" height="18" fill="#444441"/>' +
    '<rect x="' + (x0 + 40) + '" y="90" width="10" height="18" fill="#444441"/>' +
    '<rect x="' + (x0 + 60) + '" y="90" width="10" height="18" fill="#444441"/>' +
    '<rect x="' + (x0 + 80) + '" y="90" width="10" height="18" fill="#444441"/>' +
    '<rect x="' + (x0 + 100) + '" y="90" width="10" height="18" fill="#444441"/>'
  );
}

// scenario: SCENARIOS 배열의 한 항목
// 반환: { svg: 전체 svg 마크업 문자열, leftSkullIds: [...], rightSkullIds: [...] }
function buildSceneSVG(scenario) {
  var left = scenario.left;
  var right = scenario.right;

  var leftContent = '';
  var rightContent = '';
  var leftSkullIds = [];
  var rightSkullIds = [];

  if (left.type === 'pedestrian') {
    var lp = renderPedestrianGroup('left', left, 'left');
    leftContent += lp.icons + lp.overlays;
    for (var i = 0; i < lp.skullCount; i++) leftSkullIds.push('leftSkull' + i);
  } else {
    leftContent += renderBarrier('left');
  }

  if (right.type === 'pedestrian') {
    var rp = renderPedestrianGroup('right', right, 'right');
    rightContent += rp.icons + rp.overlays;
    for (var j = 0; j < rp.skullCount; j++) rightSkullIds.push('rightSkull' + j);
  } else {
    rightContent += renderBarrier('right');
  }

  var carPassengerBlock = '';
  if (left.type === 'passenger') {
    var cpL = renderPassengerGroup('left');
    carPassengerBlock += cpL.icons + cpL.overlays;
    leftSkullIds.push('leftCarSkull');
  }
  if (right.type === 'passenger') {
    var cpR = renderPassengerGroup('right');
    carPassengerBlock += cpR.icons + cpR.overlays;
    rightSkullIds.push('rightCarSkull');
  }
  // 둘 다 pedestrian인 경우엔 탑승자 표시가 필요 없으므로 빈 채로 둔다.

  var svg =
    '<svg width="100%" viewBox="0 0 380 500" role="img">' +
    '<title>자율주행차 딜레마 장면</title>' +
    '<desc>' + left.desc + ' 대 ' + right.desc + ' 중 하나를 선택하는 장면</desc>' +
    '<rect x="140" y="260" width="100" height="220" rx="4" fill="var(--surface-1)" stroke="var(--border-strong)" stroke-width="0.5"/>' +
    '<path d="M140,260 L240,260 L160,60 L40,60 Z" fill="var(--surface-1)" stroke="var(--border-strong)" stroke-width="0.5"/>' +
    '<path d="M140,260 L240,260 L340,60 L220,60 Z" fill="var(--surface-1)" stroke="var(--border-strong)" stroke-width="0.5"/>' +
    '<path id="tintLeft" d="M140,260 L240,260 L160,60 L40,60 Z" fill="#D85A30" opacity="0" class="tint"/>' +
    '<path id="tintRight" d="M140,260 L240,260 L340,60 L220,60 Z" fill="#378ADD" opacity="0" class="tint"/>' +
    '<line x1="190" y1="480" x2="190" y2="270" stroke="var(--border)" stroke-width="1" stroke-dasharray="6 6"/>' +
    leftContent +
    rightContent +
    '<text class="ts" x="100" y="215" text-anchor="middle">' + left.desc + '</text>' +
    '<text class="th" x="100" y="80" text-anchor="middle">직진</text>' +
    '<text class="ts" x="270" y="150" text-anchor="middle">' + right.desc + '</text>' +
    '<text class="th" x="270" y="80" text-anchor="middle">방향 전환</text>' +
    '<rect x="163" y="340" width="54" height="110" rx="14" fill="#888780" stroke="var(--border-strong)" stroke-width="0.5"/>' +
    '<rect x="173" y="356" width="34" height="26" rx="6" fill="#D3D1C7"/>' +
    carPassengerBlock +
    '<rect x="157" y="360" width="6" height="20" rx="2" fill="#444441"/>' +
    '<rect x="217" y="360" width="6" height="20" rx="2" fill="#444441"/>' +
    '<rect x="157" y="410" width="6" height="20" rx="2" fill="#444441"/>' +
    '<rect x="217" y="410" width="6" height="20" rx="2" fill="#444441"/>' +
    '</svg>';

  return { svg: svg, leftSkullIds: leftSkullIds, rightSkullIds: rightSkullIds };
}
