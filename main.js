const btnSubmit = document.querySelector(".enter");
const btnMode = document.querySelector(".setting input");
const keyBoardBtn = document.querySelectorAll(".keyboard button");
const keyBoard = document.querySelector(".keyboard");
const keyUpInput = document.querySelectorAll(".input");

const modal = document.querySelector(".how-to");
const btnClose = document.querySelector(".btn-close");
const btnHowTo = document.querySelector("i.info");

let answer = "ㄱㅏㄴㄷㅣ";

// 자동완성
console.log(keyUpInput);
console.log(keyUpInput.length);
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

// 정답확인
function handleBtn() {
  const input = document.querySelectorAll(".input");
  for (let i = 0; i < 5; i++) {
    if (input[i].value === answer[i]) {
      input[i].classList.add("correct");
    } else if (answer.includes(input[i].value)) {
      input[i].classList.add("present");
    } else {
      input[i].classList.add("absent");
    }
    input[i].classList.remove("input");
    input[i].readOnly = true;
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

function handleKey(event) {
  console.log(event.target.textContent);
  const value = event.target.textContent;
  console.log(value);
  keyUpInput.value = value;
}

function modalOpen() {
  modal.classList.remove("hidden");
}
function modalClose() {
  modal.classList.add("hidden");
}

btnSubmit.addEventListener("click", handleBtn);
btnMode.addEventListener("click", handleMode);
keyBoard.addEventListener("click", handleKey);
btnHowTo.addEventListener("click", modalOpen);
btnClose.addEventListener("click", modalClose);
