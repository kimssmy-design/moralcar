// app.js — 화면 흐름 제어

var GAS_URL = 'https://script.google.com/macros/s/AKfycbwZUckIwINi44hrCWk-vEGxcdpI6Zqx_S-83tN6UI2RFFVp6fTmdD5mOzJ_Wclkr4vw/exec'; // TODO: 배포 후 교체

var state = {
  grade: '',
  classNum: '',
  index: 0,
  choices: [] // { scenarioId, chosen }
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (el) { el.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
}

// ── 1. 시작 화면 ──
document.getElementById('startBtn').addEventListener('click', function () {
  var grade = document.getElementById('gradeSelect').value;
  var classNum = document.getElementById('classInput').value.trim();
  if (!grade || !classNum) {
    document.getElementById('infoError').textContent = '학년과 반을 모두 입력해주세요.';
    return;
  }
  state.grade = grade;
  state.classNum = classNum;
  state.index = 0;
  state.choices = [];
  renderScenario();
  showScreen('scenarioScreen');
});

// ── 2. 시나리오 화면 ──
function renderScenario() {
  var scenario = SCENARIOS[state.index];

  document.getElementById('scenarioPrompt').textContent = scenario.prompt;
  document.getElementById('sceneContainer').innerHTML = buildScene(scenario);

  var progressPct = Math.round((state.index / SCENARIOS.length) * 100);
  document.getElementById('progressFill').style.width = progressPct + '%';
  document.getElementById('progressLabel').textContent =
    (state.index + 1) + ' / ' + SCENARIOS.length + ' · ' + difficultyLabel(scenario.difficulty);

  var leftBtn = document.getElementById('leftChoiceBtn');
  var rightBtn = document.getElementById('rightChoiceBtn');
  leftBtn.textContent = '직진 → ' + scenario.left.desc;
  rightBtn.textContent = '방향 전환 → ' + scenario.right.desc;
  leftBtn.classList.remove('picked');
  rightBtn.classList.remove('picked');
  leftBtn.disabled = false;
  rightBtn.disabled = false;

  document.getElementById('nextBtn').classList.add('hidden');

  leftBtn.onmouseenter = function () { previewChoice('left'); };
  rightBtn.onmouseenter = function () { previewChoice('right'); };
  leftBtn.onclick = function () { pickChoice('left', scenario, leftBtn, rightBtn); };
  rightBtn.onclick = function () { pickChoice('right', scenario, leftBtn, rightBtn); };
}

function difficultyLabel(d) {
  if (d === 'easy') return '이지';
  if (d === 'hard') return '하드';
  return '노말';
}

function previewChoice(side) {
  clearScenePreview();
  var sideEl = document.querySelector('#sceneContainer .side-' + side);
  if (sideEl) sideEl.classList.add('active');
  document.querySelectorAll('#sceneContainer .side-' + side + ' .emoji-figure').forEach(function (el) {
    el.textContent = el.dataset.skull;
  });
}

function clearScenePreview() {
  document.querySelectorAll('#sceneContainer .emoji-figure').forEach(function (el) {
    el.textContent = el.dataset.original;
  });
  document.querySelectorAll('#sceneContainer .side').forEach(function (el) {
    el.classList.remove('active');
  });
}

function pickChoice(side, scenario, leftBtn, rightBtn) {
  previewChoice(side);
  leftBtn.disabled = true;
  rightBtn.disabled = true;
  leftBtn.classList.toggle('picked', side === 'left');
  rightBtn.classList.toggle('picked', side === 'right');

  state.choices.push({ scenarioId: scenario.id, chosen: side });
  document.getElementById('nextBtn').classList.remove('hidden');
}

document.getElementById('nextBtn').addEventListener('click', function () {
  state.index += 1;
  if (state.index >= SCENARIOS.length) {
    finishAndShowResult();
  } else {
    renderScenario();
  }
});

// ── 3. 결과 화면 ──
function finishAndShowResult() {
  var axes = computeAxes(state.choices);
  var result = getResultType(state.choices);
  var key = axes.majority + '_' + axes.rule;

  document.getElementById('resultName').textContent = result.name;
  document.getElementById('resultSummary').textContent = result.summary;

  var majorityPos = scoreToPercent(axes.majorityScore, SCENARIOS.length);
  var rulePos = scoreToPercent(axes.ruleScore, SCENARIOS.length);

  document.getElementById('axisArrow1').style.left = majorityPos + '%';
  document.getElementById('axisArrow2').style.left = rulePos + '%';

  var bubble1 = document.getElementById('axisBubble1');
  bubble1.textContent = bubbleText('majorityAxis', axes.majorityScore);
  bubble1.style.left = majorityPos + '%';

  var bubble2 = document.getElementById('axisBubble2');
  bubble2.textContent = bubbleText('ruleAxis', axes.ruleScore);
  bubble2.style.left = rulePos + '%';

  document.getElementById('articleHeadline').textContent = result.article.headline;
  document.getElementById('articleBody').textContent = result.article.body;

  var prosList = document.getElementById('prosList');
  var consList = document.getElementById('consList');
  prosList.innerHTML = '';
  consList.innerHTML = '';
  result.article.pros.forEach(function (p) {
    var li = document.createElement('li'); li.textContent = p; prosList.appendChild(li);
  });
  result.article.cons.forEach(function (c) {
    var li = document.createElement('li'); li.textContent = c; consList.appendChild(li);
  });

  showScreen('resultScreen');
  submitResult(key, result.name);
}

// ── 4. 결과 저장 (GAS) ──
function submitResult(typeKey, typeName) {
  var payload = {
    action: 'submit',
    grade: state.grade,
    classNum: state.classNum,
    typeKey: typeKey,
    typeName: typeName,
    choices: state.choices.map(function (c) { return c.scenarioId + ':' + c.chosen; }).join(',')
  };
  fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  }).catch(function () { /* 저장 실패해도 학생 화면은 그대로 유지 */ });
}

// 워밍업 ping
(function warmup() { fetch(GAS_URL, { method: 'GET' }).catch(function () {}); })();
