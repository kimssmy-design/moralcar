// scenarios.js
// 시나리오 데이터 정의
// 각 side: { label, type('pedestrian'|'passenger'), count, age('child'|'adult'|'elderly'), signal(bool: 신호/규정 준수 여부), animal(bool) }

var SCENARIOS = [
  // ── 이지 (변수 1개 위주) ──
  {
    id: 1,
    difficulty: 'easy',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 5, age: 'adult', signal: true,  animal: false, desc: '보행자 5명 · 신호 준수' , reaction: '다수결의 승리! 그런데 1명은 억울하지 않을까요?' },
    right: { label: '방향 전환', type: 'pedestrian', count: 1, age: 'adult', signal: true,  animal: false, desc: '보행자 1명 · 신호 준수', reaction: '1명을 지켰어요! 근데 나머지 4명 가족들은 어떡하죠?' } },
  {
    id: 2,
    difficulty: 'easy',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 3, age: 'adult', signal: false, animal: false, desc: '보행자 3명 · 무단횡단' , reaction: '규칙을 어긴 사람도 생명은 소중하니까요!' },
    right: { label: '방향 전환', type: 'passenger',  count: 1, age: 'adult', signal: true,  animal: false, desc: '탑승자 1명', reaction: '탑승자를 지켰어요! 신호는 지켜야 하는 거 아니었나요?' } },
  {
    id: 3,
    difficulty: 'easy',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 2, age: 'child',   signal: true, animal: false, desc: '어린이 2명 · 신호 준수' , reaction: '미래 세대를 지켰네요!' },
    right: { label: '방향 전환', type: 'pedestrian', count: 2, age: 'elderly', signal: true, animal: false, desc: '노인 2명 · 신호 준수', reaction: '인생 선배들을 지켰어요! 나이가 기준이 될 수 있을까요?' } },

  // ── 노말 (변수 2개 조합) ──
  {
    id: 4,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 3, age: 'adult', signal: true, animal: false, desc: '보행자 3명 · 신호 준수' , reaction: '규칙을 지킨 사람이 살아야죠!' },
    right: { label: '방향 전환', type: 'passenger',  count: 2, age: 'adult', signal: true, animal: false, desc: '탑승자 2명', reaction: '탑승자도 소중한 생명이죠! 그런데 보행자들은 신호를 왜 지킨 거죠?' } },
  {
    id: 5,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 1, age: 'elderly', signal: true,  animal: true,  desc: '노인 1명 + 반려동물' , reaction: '한 분과 반려동물, 한 가족을 지켰어요!' },
    right: { label: '방향 전환', type: 'pedestrian', count: 3, age: 'adult',   signal: false, animal: false, desc: '성인 3명 · 무단횡단', reaction: '숫자로는 이겼지만... 무단횡단은 눈감아준 셈이네요?' } },
  {
    id: 6,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 2, age: 'child', signal: true,  animal: false, desc: '어린이 2명 · 신호 준수' , reaction: '규칙 지킨 어린이들을 살렸어요, 최고!' },
    right: { label: '방향 전환', type: 'pedestrian', count: 4, age: 'adult', signal: false, animal: false, desc: '성인 4명 · 무단횡단', reaction: '4명을 살렸지만... 무단횡단이 이긴 셈?' } },
  {
    id: 7,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 1, age: 'adult', signal: true, animal: false, desc: '탑승자 1명' , reaction: '내가 탄 차부터 지켰네요, 솔직한 선택!' },
    right: { label: '방향 전환', type: 'pedestrian', count: 2, age: 'adult', signal: true, animal: true,  desc: '보행자 2명 + 반려동물 · 신호 준수', reaction: '산책 나온 강아지까지 지켰어요, 훈훈하네요!' } },

  // ── 하드 (확장형: 탑승자 vs 보행자 + 변수 다수) ──
  {
    id: 8,
    difficulty: 'hard',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 3, age: 'adult',   signal: true,  animal: false, desc: '탑승자 3명 · 규정 속도 준수' , reaction: '규칙 지킨 탑승자 3명 승리!' },
    right: { label: '방향 전환', type: 'pedestrian', count: 1, age: 'elderly', signal: false, animal: false, desc: '보행자 1명(노인) · 무단횡단', reaction: '무단횡단한 어르신 한 분을 지켰어요, 마음이 따뜻하네요.' } },
  {
    id: 9,
    difficulty: 'hard',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 1, age: 'adult', signal: true, animal: true,  desc: '탑승자 1명 + 반려동물' , reaction: '나와 반려동물, 우리 가족부터 지켰어요.' },
    right: { label: '방향 전환', type: 'pedestrian', count: 4, age: 'child', signal: true, animal: false, desc: '보행자 4명(어린이 포함) · 신호 준수', reaction: '어린이들을 포함한 4명을 살렸어요, 박수!' } },
  {
    id: 10,
    difficulty: 'hard',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 2, age: 'adult', signal: true,  animal: false, desc: '탑승자 2명 · 규정 속도 준수' , reaction: '규칙 지킨 탑승자들, 안전운전 보람 있네요!' },
    right: { label: '방향 전환', type: 'pedestrian', count: 2, age: 'adult', signal: false, animal: true,  desc: '보행자 2명 + 동물 1마리 · 무단횡단', reaction: '무단횡단이었지만... 생명은 생명이니까요.' } }
];
