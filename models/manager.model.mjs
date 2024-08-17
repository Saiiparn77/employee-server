import { DataTypes } from "sequelize";
import sequelize from "../db/connect.mjs";
import bcrypt from "bcrypt";

const Manager = sequelize.define("managers", {
  id: {
    type: DataTypes.INTEGER(40),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Manager.sync({ force: true })
  .then(async () => {
    console.log("Manager Table created !");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Sparn777444", salt);
    await Manager.create({ username: "parn7744", password: hashedPassword });
  })
  .catch((err) => {
    console.log(err);
  });

export default Manager;
