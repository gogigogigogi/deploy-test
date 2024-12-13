const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: "localhost",
  user: "sesac",
  password: "9748",
  database: "sesac",
});

// 1. 전체 목록 조회
exports.getVisitors = (cb) => {
  //   // [DB 연결 전]
  //   // return [
  //   //   { id: 1, name: "홍길동", comment: "내가 왔다" },
  //   //   { id: 2, name: "이찬혁", comment: "으라차차" },
  //   // ];

  // [DB 연결 후]
  conn.query("SELECT * FROM visitor", (err, rows) => {
    if (err) throw err;
    console.log("쿼리 결과:", rows);
    // select 문의 결과 rows!
    // 배열 형태로 들어옴
    cb(rows);
  });
};

// conn.connect((err) => {
//   if (err) {
//     console.error("데이터베이스 연결 실패:", err);
//     return;
//   }
//   console.log("데이터베이스에 성공적으로 연결되었습니다.");
// });

// 2. 특정 데이터 조회
exports.getVisitor = (id, cb) => {
  conn.query(`SELECT * FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("visitor 테이블 한 개 조회", rows);
    cb(rows[0]);
  });
};

// 3. 데이터 등록
// visitor 테이블에 데이터 삽입
exports.postVisitor = (data, cb) => {
  // data = req.body (comment, name 정보가 있는 객체 형태)
  conn.query(
    // 문자열은 따옴표 안에 둘러싸야 한다
    `INSERT INTO visitor VALUE(null, "${data.name}","${data.comment}")`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log("model post", rows);
      /*
      model post ResultSetHeader {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 7,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 0
      }
       */

      cb(rows.insertId);
    }
  );
};

// 4. 데이터 삭제
exports.deleteVisitor = (id, cb) => {
  conn.query(`DELETE FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("model / visitor.js 특정 데이터 삭제", rows);
    /*
    ResultSetHeader {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0
    }
    */
    cb();
  });
};

// 5. 데이터 수정
exports.patchVisitor = (data, cb) => {
  console.log("model data", data);
  conn.query(
    `UPDATE visitor SET comment="${data.comment}", name="${data.name}" WHERE id=${data.id}`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log("visitor.js 수정", rows);
      /* 
      ResultSetHeader {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: 'Rows matched: 1  Changed: 0  Warnings: 0',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 0
      }
      */
      cb();
    }
  );
};
