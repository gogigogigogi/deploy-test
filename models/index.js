"use strict";
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
let config = require(__dirname + "/../config/config.js")[env];
// "development" or "production" or "undefined"
console.log("env", env);
console.log("NODE_ENV", process.env.NODE_ENV);
config = config[env];
console.log("config", config);

const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
// console.log("sequelize", sequelize);

// 설정 정보를 sequelize 라는 key 안에 넣어주는 중
db.sequelize = sequelize;

// 시퀄라이즈 모듈을 Sequelize 라는 key 안에 넣어주는 중
db.Sequelize = Sequelize;

db.visitor = require("./Visitor")(sequelize, Sequelize);

module.exports = db;
