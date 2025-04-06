# 타이핑 게임

- 장문연습과 게임을 통해 영문 타이핑 연습을 할 수 있는 웹 애플리케이션입니다.

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
- Database: MongoDB
- ORM: Prisma

### **Deployment**
- **Frontend**: Vercel
<!-- - **Backend**: AWS EC2 (서버) -->
- **Database**: MongoDB Atlas (클라우드 DB)

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
