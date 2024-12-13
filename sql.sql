use sesac;

create table visitor(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10) NOT NULL,
  comment MEDIUMTEXT
)

show TABLES;

drop table visitor;

desc visitor;

-- data 삽입
insert INTO visitor ( name, comment) VALUES("홍길동","내가 왔다.");
insert INTO visitor (null,name, comment) VALUES(null,"이찬혁","으라차차");
insert INTO visitor VALUES(null,"삭제예정","으라차차");

-- data 조회
SELECT * from visitor;

-- data 수정
UPDATE visitor SET comment="야호" WHERE id=2;

-- date 삭제
DELETE FROM visitor WHERE id=3;


DESC visitor;

################## DCL 
-- MySQL 사용자 생성
CREATE USER "sesac"@"%" IDENTIFIED BY "9748";

-- 권한 부여
GRANT ALL PRIVILEGES ON *.* TO "sesac"@"%" WITH GRANT OPTION;

-- ALTER USER "sesac"@"%" IDENTIFIED WITH mysql_native_password BY "9748";
ALTER USER "sesac"@"%" IDENTIFIED WITH caching_sha2_password BY "9748";

FLUSH PRIVILEGES;

SELECT * FROM mysql.user;

SHOW GRANTS FOR "sesac"@"%";


SELECT Host, User, plugin FROM mysql.user;

SHOW PLUGINS;



