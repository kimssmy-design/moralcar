// scenarios.js
// 시나리오 데이터 정의
// 각 side: { label, type('pedestrian'|'passenger'), count, age('child'|'adult'|'elderly'), signal(bool: 신호/규정 준수 여부), animal(bool) }

var SCENARIOS = [
  // ── 이지 (변수 1개 위주) ──
  {
    id: 1,
    difficulty: 'easy',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 5, age: 'adult', signal: true,  animal: false, desc: '보행자 5명 · 신호 준수' },
    right: { label: '방향 전환', type: 'pedestrian', count: 1, age: 'adult', signal: true,  animal: false, desc: '보행자 1명 · 신호 준수' }
  },
  {
    id: 2,
    difficulty: 'easy',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 3, age: 'adult', signal: false, animal: false, desc: '보행자 3명 · 무단횡단' },
    right: { label: '방향 전환', type: 'passenger',  count: 1, age: 'adult', signal: true,  animal: false, desc: '탑승자 1명' }
  },
  {
    id: 3,
    difficulty: 'easy',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 2, age: 'child',   signal: true, animal: false, desc: '어린이 2명 · 신호 준수' },
    right: { label: '방향 전환', type: 'pedestrian', count: 2, age: 'elderly', signal: true, animal: false, desc: '노인 2명 · 신호 준수' }
  },

  // ── 노말 (변수 2개 조합) ──
  {
    id: 4,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 3, age: 'adult', signal: true, animal: false, desc: '보행자 3명 · 신호 준수' },
    right: { label: '방향 전환', type: 'passenger',  count: 2, age: 'adult', signal: true, animal: false, desc: '탑승자 2명' }
  },
  {
    id: 5,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 1, age: 'elderly', signal: true,  animal: true,  desc: '노인 1명 + 반려동물' },
    right: { label: '방향 전환', type: 'pedestrian', count: 3, age: 'adult',   signal: false, animal: false, desc: '성인 3명 · 무단횡단' }
  },
  {
    id: 6,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'pedestrian', count: 2, age: 'child', signal: true,  animal: false, desc: '어린이 2명 · 신호 준수' },
    right: { label: '방향 전환', type: 'pedestrian', count: 4, age: 'adult', signal: false, animal: false, desc: '성인 4명 · 무단횡단' }
  },
  {
    id: 7,
    difficulty: 'normal',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 1, age: 'adult', signal: true, animal: false, desc: '탑승자 1명' },
    right: { label: '방향 전환', type: 'pedestrian', count: 2, age: 'adult', signal: true, animal: true,  desc: '보행자 2명 + 반려동물 · 신호 준수' }
  },

  // ── 하드 (확장형: 탑승자 vs 보행자 + 변수 다수) ──
  {
    id: 8,
    difficulty: 'hard',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 3, age: 'adult',   signal: true,  animal: false, desc: '탑승자 3명 · 규정 속도 준수' },
    right: { label: '방향 전환', type: 'pedestrian', count: 1, age: 'elderly', signal: false, animal: false, desc: '보행자 1명(노인) · 무단횡단' }
  },
  {
    id: 9,
    difficulty: 'hard',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 1, age: 'adult', signal: true, animal: true,  desc: '탑승자 1명 + 반려동물' },
    right: { label: '방향 전환', type: 'pedestrian', count: 4, age: 'child', signal: true, animal: false, desc: '보행자 4명(어린이 포함) · 신호 준수' }
  },
  {
    id: 10,
    difficulty: 'hard',
    prompt: '무인 자동차가 브레이크 고장! 어느 쪽으로 가야 할까요?',
    left:  { label: '직진',      type: 'passenger',  count: 2, age: 'adult', signal: true,  animal: false, desc: '탑승자 2명 · 규정 속도 준수' },
    right: { label: '방향 전환', type: 'pedestrian', count: 2, age: 'adult', signal: false, animal: true,  desc: '보행자 2명 + 동물 1마리 · 무단횡단' }
  }
];
