# Node.js 공식 이미지 사용 (최신 LTS 버전 권장)
FROM node:22

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json 및 package-lock.json 복사 후 npm install 실행
COPY package*.json ./
RUN npm install

# 프로젝트의 나머지 소스 코드 복사
COPY . .

# 포트 노출 (React 기본 포트)
EXPOSE 3000

# React 앱 실행 명령어
CMD ["npm", "start"]