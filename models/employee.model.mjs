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
  //ค่าแรงรายวัน ให้เป็นค่าว่างได้
  wage_per_date: {
    type: DataTypes.INTEGER(11),
    allowNull: true, 
    defaultValue: null,
  },
  //จำนวนวันที่ทำงาน
  num_of_work_date: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  //ชั่วโมงโอที
  num_of_ot_hours: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  //เงินโอทีต่อชั่วโมง
  ot_per_hour: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  //ยอดรวมเงินโอที
  ot_summary: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
  },
  //ยอดรวมทั้งหมด
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
