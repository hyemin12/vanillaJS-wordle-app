# 바닐라 JS로 만든 wordle game app

[<img src="https://github.com/hyemin12/react-dashboard-app/blob/master/public/img/portfolio/wordleJS.png?raw=true" alt="wordle" />](https://hyemin12.github.io/vanillaJS-wordle-app/)

이미지를 누르면 사이트로 넘어갑니다.
<br>
<br>

<hr>

## #게임방법

<br>
단어를 6번만에 맞춰보세요!<br />
Enter 버튼을 눌러 제출하면 각 타일의 색상이 변경되어 단어에 얼마나
가까웠는지를 보여줍니다.
<br>
<br>
<hr>

## #페이지 로드되었을 때 game tile 생성하기

<br>
6 x 5 타일을 만들고, board에 append  
각각 타일을 구분할 수 있는 index를 고유한 아이디로 부여
  - toString() : 문자열을 반환
<br>
<br>

```js
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
```

<br>
<br>
<hr>

## #키보드를 눌러 값을 입력하기

<br>
클릭된 키보드의 innerText 값을 변수로 설정하여, 활성화된 타일에 값을 대입
<br>
- delete 버튼을 눌렀을 때 활성화된 타일의 값을 지우고, 앞 칸으로 이동시키기<br>
- 5칸이 입력되지 않은 상태에서 enter 버튼을 누르면, alert 창을 띄우기 <br>
- 5칸이 입력되었을 경우 채점함수 실행 및 다음 줄로 이동
<br>
<br>

```js
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
```

<br>
<br>
<hr>

## #채점하기

<br>

키보드의 innerText로 만들어진 배열을 만들고, 활성화된 타일의 값을 변수로 저장
<br>
조건에 맞는 클래스를 span 태그에 추가하여 채점하기<br>
정답 문자를 가지고 있는 인덱스를 찾아서 해당 버튼에도 클래스 추가하여 채점하기
<br>
<br>

- 정답인 칸이 5개면 정답 모달 출력<br>
- row값이 5지만 정답인 칸이 5개 미만이면 실패 모달 출력

```js
const keyboardArr = [];
for (let k = 0; k < keyboard.length; k++) {
  keyboardArr.push(keyboard[k].dataset.key);
}

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
```

<br>
<br>
<hr>

## #참고사이트

https://velog.io/@lillynextdoor/Wordle-%EB%A7%8C%EB%93%A4%EA%B8%B0
<br><br>
https://nakosung.github.io/wordle/
