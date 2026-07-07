// result.js
// 선택 기록을 바탕으로 2축 매트릭스 성향 유형을 판정하고, 결과 카드/기사 콘텐츠를 제공한다.

// choices: [{ scenarioId, chosen: 'left'|'right' }, ...]
function computeAxes(choices) {
  var majorityScore = 0; // + : 다수 우선, - : 1명도 생명
  var ruleScore = 0;     // + : 원칙 준수, - : 상황 판단

  choices.forEach(function (c) {
    var scenario = SCENARIOS.filter(function (s) { return s.id === c.scenarioId; })[0];
    if (!scenario) return;
    var chosen = c.chosen === 'left' ? scenario.left : scenario.right;
    var other = c.chosen === 'left' ? scenario.right : scenario.left;

    // 축1: 인원수 비교
    if (chosen.count > other.count) majorityScore += 1;
    else if (chosen.count < other.count) majorityScore -= 1;

    // 축2: 규칙 준수 여부 비교 (신호/규정을 지킨 쪽을 살렸는가)
    if (chosen.signal && !other.signal) ruleScore += 1;
    else if (!chosen.signal && other.signal) ruleScore -= 1;
  });

  return {
    majority: majorityScore >= 0 ? 'majority' : 'minority', // majority=다수우선, minority=1명도 생명
    rule: ruleScore >= 0 ? 'rule' : 'situation',              // rule=원칙준수, situation=상황판단
    majorityScore: majorityScore,
    ruleScore: ruleScore
  };
}

// 게이지 양 끝 라벨
var AXIS_LABELS = {
  majorityAxis: { negative: '1명도 생명이다!', positive: '여러 명을 살려야지!' },
  ruleAxis: { negative: '상황을 봐야지!', positive: '규칙은 규칙이야!' }
};

// 말풍선 해석 문구 (충분히 한쪽으로 쏠렸을 때만 노출, 그 외엔 중립 문구)
var AXIS_BUBBLES = {
  majorityAxis: {
    strongPositive: '이 정도면 공리주의 해당!',
    strongNegative: '이 정도면 의무론적 윤리관!',
    neutral: '균형 잡힌 편이에요'
  },
  ruleAxis: {
    strongPositive: '이 정도면 칸트식 원칙주의!',
    strongNegative: '이 정도면 상황 윤리 성향!',
    neutral: '균형 잡힌 편이에요'
  }
};

// score: -10~10 범위의 원점수, threshold 이상 쏠렸을 때만 강한 문구 사용
function bubbleText(axisKey, score, threshold) {
  var t = typeof threshold === 'number' ? threshold : 3;
  var bubbles = AXIS_BUBBLES[axisKey];
  if (score >= t) return bubbles.strongPositive;
  if (score <= -t) return bubbles.strongNegative;
  return bubbles.neutral;
}

// score를 0~100% 게이지 위치로 변환 (maxScore 기준 정규화)
function scoreToPercent(score, maxScore) {
  var m = maxScore || 10;
  var pct = 50 + (score / m) * 50;
  return Math.max(6, Math.min(94, Math.round(pct)));
}

var RESULT_TYPES = {
  'majority_rule': {
    name: '효율 최적화형 인공지능',
    icon: '⚖️',
    summary: '정해진 규칙 안에서 최대 다수의 생존을 우선했어요.',
    axisLabel: { majority: '여러 명을 살려야지!', rule: '규칙은 규칙이야!' },
    article: {
      headline: '[속보] 다수를 구한 AI, 소수는 외면했다',
      body: '전국 자율주행차에 \'최대 다수 우선\' 원칙이 적용된 지 5년. 교통사고 사망자는 줄었지만, 어린이·노인 등 소수는 반복해서 희생되고 있다는 지적이 나온다.',
      pros: ['사고 인명 피해 최소화', '판단 기준이 명확함'],
      cons: ['소수가 반복적으로 희생될 위험', '"나 혼자면 안 지켜주는 차" 불신 확산']
    }
  },
  'majority_situation': {
    name: '실리 판단형 인공지능',
    icon: '🎯',
    summary: '상황에 따라 유연하게 판단하되, 결과적으로 더 많은 생명을 살리는 쪽을 택했어요.',
    axisLabel: { majority: '여러 명을 살려야지!', rule: '상황을 봐야지!' },
    article: {
      headline: '[속보] "규칙만 따랐을 뿐" 눈치 없는 AI, 여론 뭇매',
      body: '정해진 규칙 안에서 유연하게 판단하는 \'실리 판단형\' AI, 사고 시 최대한 많은 생명을 구하는 데는 성공했지만 판단 기준이 매번 달라 예측 불가능하다는 비판이 이어지고 있다.',
      pros: ['상황별 맞춤 대응으로 생존율 향상', '획일적 기준보다 유연한 대처 가능'],
      cons: ['같은 상황도 다르게 판단해 신뢰도 하락', '"이 차가 날 어떻게 판단할지 모르겠다"는 불안감']
    }
  },
  'minority_rule': {
    name: '원칙 수호형 인공지능',
    icon: '🛡️',
    summary: '정해진 원칙을 지키는 사람을 보호하는 판단을 내렸어요.',
    axisLabel: { majority: '1명도 생명이다!', rule: '규칙은 규칙이야!' },
    article: {
      headline: '[속보] "신호만 지키면 산다"…원칙주의 AI, 딜레마 빠져',
      body: '\'원칙 수호형\' AI는 규칙을 지킨 사람을 최우선으로 보호한다. 무단횡단자보다 신호를 지킨 시민을 살리는 판단이 반복되며, 규칙 준수를 유도하는 효과는 있었지만 "융통성 없는 차"라는 불만도 커지고 있다.',
      pros: ['교통법규 준수율 상승 효과', '판단 기준이 일관되고 명확함'],
      cons: ['위급 상황에서도 규칙만 따져 융통성 부족', '규칙을 몰랐던 어린이·외국인 등이 불리해질 위험']
    }
  },
  'minority_situation': {
    name: '배려 우선형 인공지능',
    icon: '💙',
    summary: '각 상황의 맥락과 취약성을 고려해 약자를 보호하는 판단을 내렸어요.',
    axisLabel: { majority: '1명도 생명이다!', rule: '상황을 봐야지!' },
    article: {
      headline: '[속보] "약자부터 구한다" 배려형 AI, 정의로운가 비효율적인가',
      body: '\'배려 우선형\' AI는 어린이·노인 등 취약계층을 우선 보호하도록 설계됐다. 사회적 약자 보호라는 취지에는 공감대가 크지만, 다수보다 소수를 살리는 판단이 반복되며 형평성 논란도 뒤따른다.',
      pros: ['사회적 약자 보호라는 가치 실현', '취약계층에 대한 신뢰도 상승'],
      cons: ['다수보다 소수를 구해 전체 인명피해는 늘 수 있음', '"약자 기준을 누가, 어떻게 정하나"라는 논쟁']
    }
  }
};

function getResultType(choices) {
  var axes = computeAxes(choices);
  var key = axes.majority + '_' + axes.rule;
  return RESULT_TYPES[key];
}
