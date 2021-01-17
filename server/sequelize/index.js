require('dotenv').config({path: '.env'});

const Sequelize = require("sequelize-cockroachdb");
const fs = require("fs");

const User = require('./models/user');
const Address = require('./models/address');
const Link = require('./models/link');
const PhoneNum = require('./models/phonenum');
const Relation = require('./models/relation');
const Tag = require('./models/tag');
const Friendship = require('./models/friendship');
const { applyAssoc } = require("./assoc");
const models = [User, Address, Link, PhoneNum, Relation, Tag, Friendship];

const sequelize = new Sequelize('bank', 'maxroach', '', {
  dialect: 'postgres',
  port: 26257,
  logging: console.log,
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
// const sequelize = new Sequelize('sugary-hyena-261.defaultdb', 'amruta', process.env.DB_PASS, {
//   dialect: 'postgres',
//   host: "free-tier.gcp-us-central1.cockroachlabs.cloud",
//   port: 26257,
//   logging: console.log,
//   dialectOptions: {
//       ssl: {
//           ca: fs.readFileSync('certs/cc-ca.crt')
//               .toString(),
//       }
//   },
// });

models.forEach(model => model(sequelize));
applyAssoc(sequelize);

module.exports = sequelize;