const Sequelize = require("sequelize-cockroachdb");
const fs = require("fs");

const sequelize = new Sequelize('onebook', 'maxroach', '', {
  dialect: 'postgres',
  port: 26257,
  logging: false,
  dialectOptions: {
      ssl: {
          ca: fs.readFileSync('certs/ca.crt')
              .toString(),
          key: fs.readFileSync('certs/client.maxroach.key')
              .toString(),
          cert: fs.readFileSync('certs/client.maxroach.crt')
              .toString()
      }
  },
});