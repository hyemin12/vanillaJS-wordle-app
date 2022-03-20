const board = document.getElementById("board");
const keyboard = document.querySelectorAll(".keyboard button");

const modalHowto = document.querySelector(".how-to");
const modalCorrect = document.querySelector(".correct-answer");
const gameResult = document.querySelector(".correct-answer h1");
const btnClose = document.querySelectorAll(".btn-close");
const btnHowTo = document.querySelector("i.info");
const btnMode = document.querySelector(".setting input");

let height = 6;
let width = 5;
let row = 0;
let col = 0;
const answerList = [
  { answer: ["ㅅ", "ㅏ", "ㅌ", "ㅏ", "ㅇ"], word: "사탕" },
  { answer: ["ㄹ", "ㅏ", "ㅁ", "ㅕ", "ㄴ"], word: "라면" },
  { answer: ["ㄴ", "ㅗ", "ㄹ", "ㅕ", "ㄱ"], word: "노력" },
  { answer: ["ㅁ", "ㅏ", "ㄴ", "ㅅ", "ㅔ"], word: "만세" },
  { answer: ["ㄱ", "ㅜ", "ㄱ", "ㅡ", "ㅂ"], word: "구급" },
  { answer: ["ㅅ", "ㅗ", "ㅁ", "ㅏ", "ㅇ"], word: "소망" },
  { answer: ["ㄱ", "ㅏ", "ㅁ", "ㅅ", "ㅏ"], word: "감사" },
  { answer: ["ㅅ", "ㅏ", "ㄹ", "ㅏ", "ㅇ"], word: "사랑" },
  { answer: ["ㅅ", "ㅑ", "ㅁ", "ㅍ", "ㅜ"], word: "샴푸" },
];
const index = Math.floor(Math.random() * answerList.length);
let answer = answerList[index].answer;
let word = answerList[index].word;

// 페이지가 로드되면 init 함수 불러오기
window.onload = function () {
  init();
};

// init 함수 = 보드판
// 6 x 5 타일을 만들고, board에 append
// 각각 타일을 구분할 수 있는 index를 고유한 아이디로 부여
function init() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      board.appendChild(tile);
    }
  }
}

// 키보드 array
const keyboardArr = [];
for (let k = 0; k < keyboard.length; k++) {
  keyboardArr.push(keyboard[k].dataset.key);
}

// 정답확인
function handleMark() {
  let correctTile = 0;
  for (let i = 0; i < 5; i++) {
    let currentTile = document.getElementById(
      row.toString() + "-" + i.toString()
    );
    let userAnswer = currentTile.innerText;
    let userPick = keyboardArr.indexOf(userAnswer, 0);
    if (userAnswer === answer[i]) {
      currentTile.classList.add("correct");
      keyboard[userPick].classList.add("correct");
      correctTile += 1;
    } else if (answer.join("").includes(userAnswer)) {
      currentTile.classList.add("present");
      keyboard[userPick].classList.add("present");
    } else {
      currentTile.classList.add("absent");
      keyboard[userPick].classList.add("absent");
    }
  }
  if (correctTile === width) {
    keyboard.forEach((button) => {
      button.removeEventListener("click", insertKey);
    });
    modalCorrect.classList.remove("hidden");
    gameResult.innerText = "정답입니다!";
  } else if (correctTile !== width && row === 5) {
    keyboard.forEach((button) => {
      button.removeEventListener("click", insertKey);
    });
    modalCorrect.classList.remove("hidden");
    gameResult.innerText = `실패! 정답은 ${word}입니다.`;
  }
}

// 입력하기 (keyboard 클릭)

function insertKey(event) {
  let keyvalue = event.target.innerText;
  let currentTile = document.getElementById(
    row.toString() + "-" + col.toString()
  );
  if (col < width) {
    if (keyvalue != null && keyvalue !== "DELETE" && keyvalue !== "ENTER") {
      currentTile.innerText = keyvalue;
      col += 1;
    } else if (keyvalue === "DELETE" && col >= 0) {
      currentTile.innerText = "";
      if (col > 0) {
        col -= 1;
      } else if (col === 0) {
        col = 0;
      }
    } else if (keyvalue === "ENTER") {
      alert("5글자를 입력해주세요");
    }
  } else if (keyvalue === "ENTER" && col === width) {
    handleMark();
    row += 1;
    col = 0;
  }
}
keyboard.forEach((button) => {
  button.addEventListener("click", insertKey);
});

// 모달창

function modalOpen() {
  modalHowto.classList.remove("hidden");
}
function modalClose() {
  for (let i = 0; i < btnClose.length; i++) {
    if (btnClose[i].classList.contains("btn-howto")) {
      modalHowto.classList.add("hidden");
    } else if (btnClose[i].classList.contains("btn-correct")) {
      modalCorrect.classList.add("hidden");
    }
  }
}

btnHowTo.addEventListener("click", modalOpen);
btnClose.forEach((button) => {
  button.addEventListener("click", modalClose);
});

// 모드변경
function handleMode() {
  const container = document.querySelector(".container");
  if (btnMode.checked) {
    container.classList.add("dark-mode");
  } else {
    container.classList.remove("dark-mode");
  }
}

btnMode.addEventListener("click", handleMode);
