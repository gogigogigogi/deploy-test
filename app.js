const dotenv = require("dotenv");
const express = require("express");
const db = require("./models/index");
const app = express();

dotenv.config();
const PORT = process.env.PORT;

// node에서 폴더에서 기본적으로 index를 찾기 때문에 /index 생략 가능
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", "./views");

// 미들웨어 처리
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/static", express.static(__dirname + "/static"));

// 라우터
app.use("/", indexRouter);

// 404 에러처리
app.get("*", (req, res) => {
  res.render("404.ejs");
});

db.sequelize.sync({ force: false }).then((result) => {
  // console.log("result", result);
  console.log("db 연결 성공!");
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
