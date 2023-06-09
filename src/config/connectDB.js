const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('doantn', 'ragawbn8i3zv8n1gwbdd', 'pscale_pw_3YtGWWkow1LOtVX96PYbdLoKzczBQ7QsEgAgsFyRhKU', {
  host: 'aws.connect.psdb.cloud',
  dialect: 'mysql',
  logging: false,
  timezone: "+07:00",
  dialectOptions:{
    "ssl":{
      "require":true,
      "rejectUnauthorized": true
    }
  },
  dialectModule: require('mysql2'),
  sync: { force: false },
  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

let connectDB =async ()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = connectDB