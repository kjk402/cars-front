FROM node:22.14.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# 앱 소스 복사
COPY . ./

# 백엔드 주소를 ARG로 받아서 ENV로 전달
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# React 빌드
RUN npm run build

# serve 설치
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
