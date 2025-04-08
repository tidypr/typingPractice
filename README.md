# [타이핑 게임(1차 진행)](https://meteor-town-307.notion.site/HTML-CSS-1b2cd6f5c61c80709bb2f767ffd54eed?pvs=74)

# 타이핑 게임(2차 진행)

## 프로젝트 소개

- 이 프로젝트는 영문 타이핑 실력을 향상시키기 위해 개발되었습니다.
- 장문연습 및 게임을 통해 다양한 방식으로 영문 타이핑을 연습 할 수 있습니다.
- 게임 요소(생명·점수·콤보)를 통해 흥미를 유지하며, 효율적인 학습을 경험할 수 있습니다.
- 사용자별 타이핑 기록을 저장하고, 통계를 제공하여 실력 향상을 도와줍니다.

## 주요 기능 요약

- **랜덤 문장/단어 API 연동**: OpenAPI를 활용해 매번 다른 문장과 단어를 제공
- **통계/분석**: 입력 정확도, 분당 타자수(WPM), 오탈자 기록 등 다양한 수치를 시각화
- **점수 계산**: 입력 정확도, 콤보 유지, 타이핑 속도를 종합해 점수가 부여됨
- **사용자 기록 저장**: DB와 연동해 개인별 통계 및 발전 추이를 확인 가능
<!-- - 사용자 타이핑 기록 저장 및 통계 제공 -->

## 기능

- OpenAPI를 통해 랜덤으로 문장과 단어를 생성하여 타이핑 연습을 할 수 있습니다.
- 사용자별 타이핑 기록을 저장하고, 통계를 제공하여 실력 향상을 도와줍니다.

## 기술 스택

### **Frontend**

- Bundler: Vite
- Language: TypeScript
- CSS: Tailwind CSS

### **Backend**

- Language: TypeScript
- Framework: Express
- Database: PostgreSQL
- ORM: Prisma

<!-- ### **Deployment**
- **Frontend**: Vercel
- **Backend**: AWS EC2 (서버)
- **Database**: MongoDB Atlas (클라우드 DB) -->

## API 문서

- **GET /api/sentences**: 랜덤 문장 데이터를 반환합니다.
- **GET /api/words**: 랜덤 단어 데이터를 반환합니다.

- **GET /api/records**: 사용자 타이핑 게임 기록을 반환합니다.
- **POST /api/records**: 사용자 타이핑 게임 기록을 저장합니다.

## 프로젝트 구조

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

## API 문서

- **GET `/api/sentences`**: 랜덤 문장 데이터를 JSON 객체로 반환
- **GET `/api/words`**: 랜덤 단어 데이터를 JSON 배열로 반환
- **GET `/api/rank`**: 사용자 타이핑 게임 기록 조회
- **POST `/api/rank`**: 사용자 타이핑 게임 기록 저장

<!-- ## 상세 API 문서 (추가)

아래 표는 각 API의 요청/응답 예시를 보여줍니다.

| 메서드 |      경로      |          설명           |        요청 파라미터        |                                 응답 예시                                 |
| -----: | :------------: | :---------------------: | :-------------------------: | :-----------------------------------------------------------------------: |
|    GET | /api/sentences |     랜덤 문장 목록      |            없음             |                  `[{"id": 1,"sentence":"Hello world"}]`                   |
|    GET |   /api/words   |     랜덤 단어 목록      |            없음             |                        `[{"id": 3,"word":"Type"}]`                        |
|    GET |  /api/records  | 사용자 타이핑 기록 조회 |          `userId`           |               `[{"id": 9,"score":120,"accuracy":95, ...}]`                |
|   POST |  /api/records  | 사용자 타이핑 기록 저장 | `userId`,`score`,`accuracy` | `{"message":"Record saved","record":{"id":10,"score":240,"accuracy":98}}` | -->


# 타이핑 게임(3차 진행)
- **코드 리팩토링**: 코드 가독성 및 유지보수성 향상
- **멀티플레이 모드**: 실시간 대결 기능 확장
- **학습 분석**: 그래프, 차트로 단계별 성장 추적
- **추가 미니게임**: 자원캐기, 카드게임 등 구상 중
- **파일 




<!-- ## 산성비

- ITEM
  - 💣 단어 전부 삭제
  - 💖 목숨 1개 증가

  - ⏸️ 단어 정지(미구현)
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
  - platinum -->
