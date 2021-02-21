var _points = 0;
var _averageTime = 0;
var _bestTIme = 0;
var _strQuest;
var _questNum1;
var _questNum2;
var _quest = 20;
var _answer = "";
var _lvlScale = 20;
var _lvlCount = 20;
var _lvlMax = 360;
var _lvl = _lvlScale / _lvlCount;
var _questType;
var _allResult = [];

var _time = 1500;
var _timer = setInterval(answerTime, 10);

$(function () {
  $(document).ready(function () {
    $("p.ez-math__best-res").text(_bestTIme / 100 + "s");
    nextQuest();
    $("#num1").click(function () {
      writeAnswer("1");
    });
    $("#num2").click(function () {
      writeAnswer("2");
    });
    $("#num3").click(function () {
      writeAnswer("3");
    });
    $("#num4").click(function () {
      writeAnswer("4");
    });
    $("#num5").click(function () {
      writeAnswer("5");
    });
    $("#num6").click(function () {
      writeAnswer("6");
    });
    $("#num7").click(function () {
      writeAnswer("7");
    });
    $("#num8").click(function () {
      writeAnswer("8");
    });
    $("#num9").click(function () {
      writeAnswer("9");
    });
    $("#next").click(function () {
      //code
      nextQuest();
    });
    $("#num0").click(function () {
      writeAnswer("0");
    });
    $("#delete").click(function () {
      deleteAnswer();
    });
  });
});

//проверка ответа игрока
function checkAnswer() {
  if (Number(_answer) == _quest) {
    _allResult.push(_time);
    _averageTime = Math.floor(averageСost(_allResult));
    _points += Math.floor(_time / 100);
    $("p.ez-math__average-res").text(_averageTime / 100 + "s");
    $("p.ez-math__points").text(_points);
    $("p.ez-math__best-res").text(_bestTIme / 100 + "s");
    if (_time > 1000) {
      lvlUp();
    }
    if (_bestTIme < _time) {
      _bestTIme = _time;
    }
    timerStop();
    nextQuest();
  }
}

//игровой процесс
function nextQuest() {
  //создает новое задание
  clearAnswer();
  generateQuest();
}

function generateQuest() {
  // генерит новый пример/задание я хз как назвать думай как знаешь
  _quest = getRandomInt(10, Math.pow(_lvl, 2) * 20);
  _questType = getRandomInt(1, 5);
  switch (_questType) {
    case 1:
      differenceQuest();
      break;
    case 2:
      sumQuest();
      break;
    case 3:
      multiplyQuest();
      break;
    case 4:
      splitQuest();
      break;
  }
}

function differenceQuest() {
  _questNum1 = _quest + getRandomInt(1, _quest);
  _questNum2 = _questNum1 - _quest;
  writeQuest(_questNum1, _questNum2);
}

function sumQuest() {
  _questNum1 = _quest - getRandomInt(1, _quest / 2);
  _questNum2 = _quest - _questNum1;
  writeQuest(_questNum1, _questNum2);
}

function multiplyQuest() {
  //я сам уже не понимаю как это работает, не спрашивай...
  //просто знай что этот метод создает задание с умножением
  let temp = getRandomInt(1, Math.floor(_quest / 2)); //грубо говоря тут можно регулировать сложность :))
  _questNum1 = Math.floor(_quest / temp);
  _questNum2 = Math.floor(_quest / _questNum1);
  _quest = _questNum1 * _questNum2;
  writeQuest(_questNum1, _questNum2);
}

function splitQuest() {
  let temp = getRandomInt(2, Math.floor(_quest / 3)); //грубо говоря тут можно регулировать сложность :))
  _questNum1 = Math.floor(_quest * temp);
  _questNum2 = Math.floor(_questNum1 / _quest);
  writeQuest(_questNum1, _questNum2);
}

function writeQuest(num1, num2) {
  let temp;
  switch (_questType) {
    case 1:
      temp = " - ";
      break;
    case 2:
      temp = " + ";
      break;
    case 3:
      temp = " * ";
      break;
    case 4:
      temp = " / ";
      break;
    default:
      temp = " + ";
      break;
  }
  $("p.ez-math__quest-text").text(num1 + temp + num2);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Все что связанно с написание ответа игрока
function writeAnswer(text) {
  //пишет ответ игрока и проверяет его тут же
  _answer += text;
  $("p.ez-math__answer-text").text(_answer);
  checkAnswer(); // проверка тут
}

function clearAnswer() {
  _answer = "";
  $("p.ez-math__answer-text").text(_answer);
}

function deleteAnswer() {
  _answer = _answer.slice(0, -1);
  $("p.ez-math__answer-text").text(_answer);
}

//все что связанно с боковыми барами
function lvlUp() {
  if (_lvlScale <= _lvlMax) {
    _lvlScale += _lvlCount;
    _lvl = _lvlScale / _lvlCount;
  }
  $("#lvl").height(_lvlScale);
}

function lvlDown() {
  if (_lvlScale >= _lvlCount) _lvlScale -= _lvlCount;
  $("#lvl").height(_lvlScale);
}

function answerTime() {
  --_time;
  $("p.ez-math__timer").text(_time / 100 + "s");
  if (_time == 0) {
    gameOver();
    timerStop();
  }
}

function timerStop() {
  clearInterval(_timer);
  nextQuest();
  _time = 1500;
  _timer = setInterval(answerTime, 10);
}

function averageСost(arr) {
  return arr.reduce((partial_sum, a) => partial_sum + a, 0) / arr.length;
}

function gameOver() {
  _allResult = [];
  _bestTIme = 0;
  _averageTime = 0;
  _points = 0;
  _lvlScale = 20;
  $("p.ez-math__best-res").text(_bestTIme / 100 + "s");
  $("p.ez-math__average-res").text(_averageTime / 100 + "s");
  $("p.ez-math__points").text(_points);
}
