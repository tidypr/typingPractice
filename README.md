# 타이핑 게임

- 장문연습과 게임을 통해 영문 타이핑 연습을 할 수 있는 웹 애플리케이션입니다.

## 기능

- OpenAPI를 통해 랜덤으로 문장과 단어를 생성하여 타이핑 연습을 할 수 있습니다.
- 사용자별 타이핑 기록을 저장하고, 통계를 제공하여 실력 향상을 도와줍니다.
- 다양한 난이도의 게임 모드를 통해 재미있게 타이핑 실력을 키울 수 있습니다.
- 반응형 디자인으로 다양한 디바이스에서 최적화된 경험을 제공합니다.

## 기술 스택

- **Frontend**: TypeScript, JavaScript, Tailwind CSS
- **Backend**: TypeScript, Express, MongoDB, Prisma
- **API**: OpenAPI를 활용한 문장 및 단어 데이터 제공
<!-- - **배포**: Vercel (Frontend) / AWS EC2 (Backend) / MongoDB Atlas (Cloud DB)  -->

## API 문서

- **GET /api/sentences**: 랜덤 문장 데이터를 반환합니다.
- **GET /api/words**: 랜덤 단어 데이터를 반환합니다.

- **GET /api/records**: 사용자 타이핑 게임 기록을 반환합니다.
- **POST /api/records**: 사용자 타이핑 게임 기록을 저장합니다.

## 프로젝트 구조

```md
/client
  ├── public
  │   ├── images
  │   └── styles
  ├── src
  │   ├── pages
  │   └── api
/server
  ├── prisma
  ├── src
  │   ├── controllers
  │   ├── models
  │   ├── routes
  │   └── services
```
