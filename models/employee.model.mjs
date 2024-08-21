import { DataTypes } from "sequelize";
import sequelize from "../db/connect.mjs";
import { v4 as uuidv4 } from "uuid";

const Employee = sequelize.define("employee", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    required: true,
  },
  fname: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  nick_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  line: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wage_per_date: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  num_of_work_date: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  num_of_ot_hours: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  ot_per_hour: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  ot_summary: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  shift_fee:{
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  total_salary: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  password: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
});

Employee.sync({ force: false })
  .then(() => {
    console.log("Employee Table created !");
  })
  .catch((err) => {
    console.log(err);
  });

export default Employee;
