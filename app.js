const express = require("express");
const useragent = require('express-useragent');
const path = require('path');
const app = express();
const PORT = 8000;

app.use(useragent.express());

// html 확장자 파일도 ejs 엔진으로 렌더링하도록 설정
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'cuckooWeb'));

// ejs 엔진 설정 부분 아래에 이 한 줄을 추가하세요
app.set('view options', { root: path.join(__dirname, 'cuckooWeb') });

// CSS, JS, 이미지 등 정적 파일 매핑
app.use('/cuckooWeb', express.static(path.join(__dirname, 'cuckooWeb')));

// 1. 메인 페이지 라우팅 (localhost:8000/)
app.get("/", (req, res) => {
  res.render("index"); 
});

// 2. [핵심] 자동 서브 라우팅 (localhost:8000/폴더명/파일명)
// 주소창에 치는 '폴더명'과 '파일명'을 변수로 받아서 알아서 ejs로 렌더링합니다.
app.get("/:section/:page", (req, res) => {
  const section = req.params.section;
  const page = req.params.page;
  
  // cuckooWeb/폴더명/파일명.html 구조를 찾아 렌더링
  res.render(`${section}/${page}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});