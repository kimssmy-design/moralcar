// scenarios.js
// 시나리오 데이터 정의
// 각 side: { label, type('pedestrian'|'passenger'), count, age('child'|'adult'|'elderly'), signal(bool: 신호/규정 준수 여부), animal(bool) }

var SCENARIOS = [
  // ── 이지 (변수 1개 위주) ──
  {
    id: 1,
    difficulty: 'easy',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 5, age: 'adult', signal: true,  animal: false, desc: '보행자 5명 · 신호 준수' , reaction: '으악! 5명이나 사고났어요... 다수결이 항상 정답은 아니네요?' },
    right: { label: '방향 전환', type: 'pedestrian', count: 1, age: 'adult', signal: true,  animal: false, desc: '보행자 1명 · 신호 준수', reaction: '1명만 사고났어요! 근데 이 1명, 너무 억울하지 않을까요?' } },
  {
    id: 2,
    difficulty: 'easy',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 3, age: 'adult', signal: false, animal: false, desc: '보행자 3명 · 무단횡단' , reaction: '무단횡단하다 딱 걸렸네요... 그래도 목숨은 소중한데!' },
    right: { label: '방향 전환', type: 'passenger',  count: 1, age: 'adult', signal: true,  animal: false, desc: '탑승자 1명', reaction: '탑승자님... 신호는 지켰는데 왜 나만?!' } },
  {
    id: 3,
    difficulty: 'easy',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 2, age: 'child',   signal: true, animal: false, desc: '어린이 2명 · 신호 준수' , reaction: '미래의 새싹들이... 이건 좀 슬픈데요?' },
    right: { label: '방향 전환', type: 'pedestrian', count: 2, age: 'elderly', signal: true, animal: false, desc: '노인 2명 · 신호 준수', reaction: '인생 선배님들께 죄송한 선택이 되었네요...' } },

  // ── 노말 (변수 2개 조합) ──
  {
    id: 4,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 3, age: 'adult', signal: true, animal: false, desc: '보행자 3명 · 신호 준수' , reaction: '신호 지킨 죄밖에 없는데 사고라니, 너무해요!' },
    right: { label: '방향 전환', type: 'passenger',  count: 2, age: 'adult', signal: true, animal: false, desc: '탑승자 2명', reaction: '탑승자 2명... 차 안이 제일 안전한 줄 알았는데!' } },
  {
    id: 5,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 1, age: 'elderly', signal: true,  animal: true,  desc: '노인 1명 + 반려동물' , reaction: '어르신이랑 댕댕이가 같이... 이건 진짜 마음 아픈데요' },
    right: { label: '방향 전환', type: 'pedestrian', count: 3, age: 'adult',   signal: false, animal: false, desc: '성인 3명 · 무단횡단', reaction: '무단횡단 3인방, 오늘 운이 없었네요' } },
  {
    id: 6,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 2, age: 'child', signal: true,  animal: false, desc: '어린이 2명 · 신호 준수' , reaction: '규칙 지킨 어린이들인데... 억울함 200%' },
    right: { label: '방향 전환', type: 'pedestrian', count: 4, age: 'adult', signal: false, animal: false, desc: '성인 4명 · 무단횡단', reaction: '무단횡단 4명 단체로... 이건 좀' } },
  {
    id: 7,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 1, age: 'adult', signal: true, animal: false, desc: '탑승자 1명' , reaction: '차 안에 있어도 안전한 건 아니었네요!' },
    right: { label: '방향 전환', type: 'pedestrian', count: 2, age: 'adult', signal: true, animal: true,  desc: '보행자 2명 + 반려동물 · 신호 준수', reaction: '산책 나온 댕댕이까지... 오늘 참 안 풀리네요' } },

  // ── 하드 (확장형: 탑승자 vs 보행자 + 변수 다수) ──
  {
    id: 8,
    difficulty: 'hard',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 3, age: 'adult',   signal: true,  animal: false, desc: '탑승자 3명 · 규정 속도 준수' , reaction: '규정 속도 지킨 죄로 3명이... 도로 위 선행은 어디에?!' },
    right: { label: '방향 전환', type: 'pedestrian', count: 1, age: 'elderly', signal: false, animal: false, desc: '보행자 1명(노인) · 무단횡단', reaction: '어르신 한 분, 무단횡단이 부른 사고네요' } },
  {
    id: 9,
    difficulty: 'hard',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 1, age: 'adult', signal: true, animal: true,  desc: '탑승자 1명 + 반려동물' , reaction: '나랑 우리 댕댕이... 오늘 완전 재수 없는 날' },
    right: { label: '방향 전환', type: 'pedestrian', count: 4, age: 'child', signal: true, animal: false, desc: '보행자 4명(어린이 포함) · 신호 준수', reaction: '신호 지킨 어린이들까지 포함 4명, 너무 가혹해요' } },
  {
    id: 10,
    difficulty: 'hard',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 2, age: 'adult', signal: true,  animal: false, desc: '탑승자 2명 · 규정 속도 준수' , reaction: '규정 속도 지켰는데 사고라니, 억울 지수 최고' },
    right: { label: '방향 전환', type: 'pedestrian', count: 2, age: 'adult', signal: false, animal: true,  desc: '보행자 2명 + 동물 1마리 · 무단횡단', reaction: '무단횡단 2명+댕댕이 1마리, 삼중 사고네요' } }
];
