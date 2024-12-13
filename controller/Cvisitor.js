const models = require("../models");
const { errorlogs } = require("../utils/common");
// "/" GET
exports.main = (req, res) => {
  res.render("index.ejs");
};

// "/visitors" GET
exports.getVisitors = (req, res) => {
  // [DB 연결 전]
  // res.render("visitors", { data: Visitor.getVisitors() });

  // [DB 연결 후]
  //  시퀄라이즈 전
  // Visitor.getVisitors((result) => {
  //   console.log("전체목록 Cvisitor.js", result);
  //   res.render("visitors", { data: result });
  // });

  // [시퀄라이즈 이후]
  // "SELECT * FROM visitor"
  models.visitor
    .findAll()
    .then((result) => {
      // findAll의 결과는 배열
      console.log("findAll", result);
      // res.send(result);
      res.render("visitors", { data: result });
    })
    .catch((err) => {
      errorlogs(err, "patch controller 내부", "수정 에러가 났음", 500);
      console.error("getVisitors err", err);
      res.status(500).send("server err!");
    });
};

// "/visitor/:id" GET
exports.getVisitor = async (req, res) => {
  const { id } = req.params;

  // 시퀄라이즈 전
  // Visitor.getVisitor(id, (result) => {
  //   console.log("한 개의 데이터 Cvisitor.js", result);
  //   res.send(result);
  // });

  // 시퀄라이즈 이후
  // `SELECT * FROM visitor WHERE id=${id}`

  try {
    const result = await models.visitor.findOne({ where: { id: id } });
    console.log("findOne", result);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("internal sever error");
  }
  // res.send("response");
};

// "/visitor" POST
// INSERT INTO => create()
exports.postVisitor = (req, res) => {
  console.log(req.body);

  // 시퀄라이즈 이전
  // Visitor.postVisitor(req.body, (result) => {
  //   console.log("Cvisitor.js", result);
  //   res.send({ id: result, comment: req.body.comment, name: req.body.name });
  // });

  // 시퀄라이즈 이후
  // `INSERT INTO visitor VALUE(null, "${data.name}","${data.comment}")`

  models.visitor
    .create({ name: req.body.name, comment: req.body.comment })
    .then((result) => {
      console.log("result", result);
      res.send(result);
    })
    .catch((err) => {
      console.error("err", err);
      res.status(500).send("server error");
    });
};

// "/visitor" DELETE
// DELETE => destroy()
exports.deleteVisitor = async (req, res) => {
  console.log(req.body);
  console.log(req.body.id);

  // 시퀄라이즈 이전
  // Visitor.deleteVisitor(req.body.id, () => {
  //   res.send(req.body.id + "번 id 삭제 완료");
  // });

  // 시퀄라이즈 이후
  // `DELETE FROM visitor WHERE id=${id}`

  try {
    const result = await models.visitor.destroy({
      where: {
        id: req.body.id,
      },
    });
    console.log("result", result); // 1(삭제 성공), 0(삭제 실패 - 없는 데이터를 삭제하려고 할때)
    if (Boolean(result)) {
      res.send(req.body.id + "번 id 삭제 완료");
    } else {
      res.send("잘못된 접근입니다!!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error!");
  }
};

// "/visitor" PATCH
// UPDATE => update()
exports.patchVisitor = async (req, res) => {
  console.log(req.body);

  // 시퀄라이즈 전
  // Visitor.patchVisitor(req.body, () => {
  //   res.send("수정 완료");
  // });

  // 시퀄라이즈 후
  // `UPDATE visitor SET comment="${data.comment}", name="${data.name}" WHERE id=${data.id}`
  try {
    const [result] = await models.visitor.update(
      { name: req.body.name, comment: req.body.comment },
      {
        where: { id: req.body.id },
      }
    );
    console.log("result", result); //[1],[0]
    // const [number] = result;
    if (Boolean(result)) {
      res.send("수정 완료");
    } else {
      res.send("잘못된 접근입니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error!");
  }
};
