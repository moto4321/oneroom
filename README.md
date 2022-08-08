# oneroom
React + express + Mysql 로 만든 개인 프로젝트입니다.

기능 소개
1. 회원가입 및 로그인 기능(jwt + local storage 저장)

2. 게시물 업로드(+ 이미지 여러장 추가) 수정 및 삭제 (본인이 작성한 게시물에 한하여)

3. 댓글 기능, 수정 및 삭제 (본인이 작성한 댓글에 한하여)

# Front-End
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

## 인증구현
백에서 넘어온 토큰은 브라우저의 localStorage에 저장합니다.
로그인 상태관리는 Context API를 사용했습니다.

# Back-End
<p>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=black">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=black">
</p>

## 인증구현
jwt를 localstorage에 저장하기 위해서 프론트로 JSON형식으로 토큰을 전달합니다.

## 이미지 업로드
multer라는 라이브러리를 사용했습니다.

## puppeteer
직방 로그인 후 북마크 정보 가져오기

# Database
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">


# Git Message
- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 포맷, 세미콜론 빠졌을 때, 코드 변경이 없는 수정
- refactor: 리팩토링
- test: 테스트 코드 추가, 테스트코드 리팩토링
- chore: 빌드관련 수정, 패키지 매니저 수정