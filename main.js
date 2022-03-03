const btnSubmit = document.querySelector(".enter");
const btnMode = document.querySelector(".setting input");
const keyBoard = document.querySelector(".keyboard");
const btnKeyboard = document.querySelectorAll(".keyboard button");

const keyUpInput = document.querySelectorAll(".input");

const modalHowto = document.querySelector(".how-to");
const modalCorrect = document.querySelector(".correct-answer");
const btnClose = document.querySelectorAll(".btn-close");
const btnHowTo = document.querySelector("i.info");
const game = document.querySelector(".game");

let answer = "ㅅㅏㅌㅏㅇ";

// 탭 넘어가기
for (let a = 0; a < keyUpInput.length - 1; a++) {
  keyUpInput[0].readOnly = false;
  keyUpInput[a].readOnly = true;
  keyUpInput[a].addEventListener("keyup", function () {
    if (keyUpInput[a].value.length == 1) {
      keyUpInput[a + 1].readOnly = false;
      keyUpInput[a + 1].focus();
    }
  });
}
console.log(keyUpInput[0].value);

// 입력된 값과 keyboard 키 비교
const arrKey = [...btnKeyboard];
const keyCopy = [];
for (let p = 0; p < arrKey.length - 1; p++) {
  // console.log(btnKeyboard[p].dataset.key);
  let array = btnKeyboard[p].dataset.key;
  keyCopy.push(array);
}

// 정답확인
function handleBtn() {
  const input = document.querySelectorAll(".input");
  let arrInputValue = [];
  for (let i = 0; i < 5; i++) {
    const picked2 = keyCopy.indexOf(input[i].value, 0);
    if (input[i].value === "") {
      alert("값을입력하세요");
      return null;
    }
    if (input[i].value === answer[i]) {
      input[i].classList.add("correct");
      btnKeyboard[picked2].classList.add("correct");
    } else if (answer.includes(input[i].value)) {
      input[i].classList.add("present");
      btnKeyboard[picked2].classList.add("present");
    } else {
      input[i].classList.add("absent");
      btnKeyboard[picked2].classList.add("absent");
    }
    input[i].classList.remove("input");
    input[i].readOnly = true;
    arrInputValue.push(input[i].value);
    let inputValue = arrInputValue.join("");
    console.log(arrInputValue);
    console.log(inputValue);
    if (inputValue == answer) {
      modalCorrect.classList.remove("hidden");
    }
  }
}

// dark mode
function handleMode() {
  const container = document.querySelector(".container");
  if (btnMode.checked) {
    container.classList.add("dark-mode");
  } else {
    container.classList.remove("dark-mode");
  }
}

// console.log(btnClose.parentNode.offsetParent);
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

btnSubmit.addEventListener("click", handleBtn);
btnMode.addEventListener("click", handleMode);
btnHowTo.addEventListener("click", modalOpen);
btnClose.forEach((button) => {
  button.addEventListener("click", modalClose);
});

// 키보드 버튼 누르면 값 입력하기...
const 키보드캡 = document.querySelectorAll(".keyboard button");
const 전체타일 = document.querySelector(".game-tiles");
const 게임타일 = document.querySelectorAll(".game-tile");

function insertKey(event) {
  let keyvalue = event.target.textContent;

  for (let i = 0; i < 5; i++) {
    게임타일[i].innerText = keyvalue;
  }
}
키보드캡.forEach((button) => {
  button.addEventListener("click", insertKey);
});

// 키보드 이벤트 확인방법
// KeyboardEvent {isTrusted: true, key: 'w', code: 'KeyW', location: 0,등등}
// window.onkeydown = (e) => console.log(e);
// window.addEventListener("keydown", (e) => console.log(e));

// 키보드 입력값을 input value로 저장하고 출력...?
