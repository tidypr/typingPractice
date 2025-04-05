# typing Game

## 1차 진행

- HTML, CSS를 이용하여 기본적인 화면 구성

## 2차 진행

- JavaScript를 이용하여 기능 구현
  - 사용자가 입력한 문장을 예문과 비교하여 정확도를 측정
  - 문장입력 완료시 결과를 보여줌
- typing game 추가
  - raindrop game
  - ~~card game~~
  - Resource mining(vs computer)

## 3차 진행

- ~~API를 이용하여 문장을 랜덤으로 받아옴~~ => 2차
- ~~Server와 연동하여 사용자의 점수를 저장~~ => 2차
- socket 통신: 실시간 대결

## API

<!-- https://korean-advice-open-api.vercel.app/api/advice -->
<!-- https://random-word-api.herokuapp.com/home -->
<!-- https://random-word-api.vercel.app/ -->

# typing Game

## 산성비

- username 입력 후 시작
- input box에 단어 입력

- ITEM
  <!-- - ⏸️ 단어 정지 -->

  - 💣 단어 전부 삭제
  - 💖 목숨 1개 증가

  - ⏱️ 드롭 속도 감소(미구현)
  - 💎 점수 2배(미구현)
  - 💰 점수 1.5배(미구현)
  - 🚫 타이핑 금지 단어(미구현)
  - ❔ 랜덤효과(미구현)

- calScore: 점수계산
  - 기본점수: 100
  - 단어 길이: n \* 10
  - 레벨: n \* 10
  - 콤보점수: ?

## 자원캐기

- 단어별 광석 표현
  - bronze
  - silver
  - gold
  - diamond
  - ruby
  - emerald
  - platinum
