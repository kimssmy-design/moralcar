// code.gs — 무인 자동차 딜레마 결과 저장 백엔드
// 구글시트에 '제출데이터' 시트가 있어야 함 (헤더는 자동 생성됨)

function doPost(e) {
  var params = {};
  try { params = JSON.parse(e.postData.contents); } catch (err) {}
  var result;

  try {
    if (params.action === 'submit') {
      result = handleSubmit(params);
    } else {
      result = { ok: false, msg: '알 수 없는 요청' };
    }
  } catch (err) {
    result = { ok: false, msg: '서버 오류: ' + err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleSubmit(params) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(15000); }
  catch (e) { return { ok: false, msg: '지금 많은 친구들이 동시에 제출 중이에요. 잠시 후 다시 시도해주세요.' }; }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('제출데이터');
    if (!sheet) {
      sheet = ss.insertSheet('제출데이터');
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['제출일시', '학년', '반', '성향유형키', '성향유형명', '선택기록']);
    }

    sheet.appendRow([
      new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      params.grade || '',
      params.classNum || '',
      params.typeKey || '',
      params.typeName || '',
      params.choices || ''
    ]);
    SpreadsheetApp.flush();
    return { ok: true };

  } finally {
    lock.releaseLock();
  }
}

function testSubmit() {
  var result = handleSubmit({
    grade: '3',
    classNum: '2',
    typeKey: 'majority_rule',
    typeName: '효율 최적화형 인공지능',
    choices: '1:left,2:right'
  });
  Logger.log(JSON.stringify(result));
}
