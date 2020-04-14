// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "student",
//     DB: "engcenter",
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };
module.exports = {
    HOST: process.env.MYSQL_HOST || '172.18.0.2',
    USER: process.env.MYSQL_USER || 'root',
    PASSWORD: process.env.MYSQL_PASSWORD || 'student',
    DB: process.env.MYSQL_DATABASE || 'engcenter',
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  // host: process.env.MYSQL_HOST || '172.18.0.2',
	// user: process.env.MYSQL_USER || 'root',
	// password: process.env.MYSQL_PASSWORD || 'student',
	// database: process.env.MYSQL_DATABASE || 'student'