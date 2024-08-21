import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_ROOT_USER,
  process.env.MYSQL_ROOT_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    port: process.env.MYSQL_PORT,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

sequelize.connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has be en established successfully.");
  } catch (err) {
    if (err.original.errno === -4078)
      return console.log("Please start Apache && MySQL");
    console.error("Unable to connect to the database: ", err);
  }
};

export default sequelize;
