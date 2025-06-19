## 📌 타자 연습 (Typing Practice)

### 🧩 프로젝트 개요

- 영문 타이핑 실력 향상을 위한 웹 기반 타자 연습 게임입니다.
- 장문연습 및 단어게임, 통계 기능을 제공합니다.
- 서버에 기록을 저장하여 경쟁하며, 재미 요소(점수, 콤보, 생명)로 학습 동기를 부여합니다.

### 🖼️ 주요 화면

![Image](https://raw.githubusercontent.com/tidypr/tidypr/main/project_source/typingPractice_main.gif)

![Image](https://raw.githubusercontent.com/tidypr/tidypr/main/project_source/typingPractice_typing.gif)

![Image](https://raw.githubusercontent.com/tidypr/tidypr/main/project_source/typingPractice_raindrop.gif)

### 📅 개발 기간

- 2025.03.09 ~ 2025.04.09(1개월)

### 👥 팀구성

- 개인프로젝트

### 🔍 주요 기능 및 구현 내용

- 랜덤 문장/단어 제공(OpenAPI)
- 실시간 점수, 콤보, 생명 시스템
- 플레이어 기록 저장
- 랭킹 시스템, 미니게임(산성비)

### 🛠️ 기술 스택

- language: TypeScript
- Frontend: Vite, HTML, Tailwind CSS
- Backend: Express, PostgreSQL, Prisma

### 📁 프로젝트 구조

```md
/client
　 ├── public
　 ├── pages
　 └── src
/server
　 ├── prisma
　 └── src
　　　 ├── controllers
　　　 ├── models
　　　 ├── routes
　　　 └── utils
```

### 📄 API 문서

- **GET `/api/sentences/:id`**: n개의 랜덤 문장 데이터를 JSON 객체로 반환
- **GET `/api/words`**: 랜덤 단어 데이터를 JSON 배열로 반환
- **GET `/api/rank`**: 사용자 타이핑 게임 기록 조회
- **POST `/api/rank`**: 사용자 타이핑 게임 기록 저장
