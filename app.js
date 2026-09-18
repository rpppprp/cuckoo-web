const express = require("express");
const useragent = require('express-useragent');
const path = require('path');
const app = express();
const PORT = 8000;

app.use(useragent.express());

// HTML 확장자를 EJS 엔진으로 렌더링 설정
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// 1. 템플릿(EJS/HTML) 파일 위치를 pages 폴더로 변경
const pagesPath = path.join(__dirname, 'cuckooWeb', 'pages');
app.set('views', pagesPath);
app.set('view options', { root: pagesPath });

// 2. CSS, JS, Images 등 정적 파일 위치를 static 폴더로 매핑
// HTML 내부에서 /static/css/style.css 형태로 접근 가능
app.use('/static', express.static(path.join(__dirname, 'cuckooWeb', 'static')));

// 3. 메인 페이지 라우팅 (cuckooWeb/pages/index.html 렌더링)
app.get("/", (req, res) => {
  res.render("index"); 
});

// 4. 자동 서브 라우팅 (cuckooWeb/pages/폴더명/파일명.html 렌더링)
app.get("/:section/:page", (req, res) => {
  const { section, page } = req.params;
  res.render(`${section}/${page}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});