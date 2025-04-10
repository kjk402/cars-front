# 🚗 cars-ai Frontend

중고차 가격을 예측해주는 cars-ai 프로젝트의 React 기반 프론트엔드입니다.  
백엔드로부터 차량 가격 예측 결과와 그래프를 받아 사용자에게 시각적으로 보여줍니다.

---
- React (with Vite)
- Tailwind CSS
- Chart.js 
- Axios (API 통신)
- Docker (serve 배포)
- etc
---

## 📦 프로젝트 실행

### 개발 모드
```
npm install
npm run dev
```

### Docker 이미지 빌드 및 배포
Dockerfile 기반 빌드
```
docker build -t cars-frontend \
  --build-arg REACT_APP_API_BASE_URL=주소 .
```
docker 실행 예시
```
docker run --restart unless-stopped -p 3000:3000 --name cars-frontend cars-frontend
```
---

## ⚙️ 주요 기능

- 차량 검색 필터
  - 브랜드, 모델, 연식, 주행거리, 연료 타입으로 필터링 가능
  - Elasticsearch + Django 백엔드와 연동

- 차량 가격 예측
  - 예측 서버 서버 미가동 시 대응 (안내페이지)
  - 입력한 차량 정보 기반으로 AI 모델이 가격 예측
  - 예측 가격과 시각화 이미지 제공 (Kafka 기반 응답)

- 대시보드 시각화
  - 브랜드별 평균 가격 Top 5 차트를 Chart.js로 시각화
  - 연식별 평균 가격 추이 시각화

---
## 📸 예시 화면

- 차량 검색 결과 필터 UI

![Image](https://github.com/user-attachments/assets/0abb5ff5-4a34-45a3-bfd1-43f02260b06c)

- 차량 상세 정보 (검색결과에서 차량 클릭 시 모달창)

![Image](https://github.com/user-attachments/assets/ce5b377d-ebcc-4186-aa1f-c4d53718e098)
- 브랜드별 평균 가격 차트

![Image](https://github.com/user-attachments/assets/e8bb57b5-fefd-4413-8845-41ce9fefb026)
- 연식별 가격 추이 그래프

![Image](https://github.com/user-attachments/assets/936bb3c6-b78b-42e4-8ca3-a8dd54f24d77)
- 차량 가격 예측 결과 + 시각화 이미지

![Image](https://github.com/user-attachments/assets/f934a0be-bb1c-451a-9623-16c76590e543)
- 예측 서버 미가동시 안내문

![Image](https://github.com/user-attachments/assets/91141017-3a70-4020-94b4-5c9d96ec90ae)

---

## 배포 주소

https://cars.joon-develop.com/

---

© 2025 [cars 개인 프로젝트](https://cars.joon-develop.com/)