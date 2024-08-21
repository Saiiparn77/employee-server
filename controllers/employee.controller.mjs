import Employee from "../models/employee.model.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function getRandomNineDigitNumber() {
  // Generate the first digit separately to ensure it is not zero
  const firstDigit = Math.floor(Math.random() * 9) + 1; // Generates a number between 1 and 9
  // Generate the remaining 8 digits
  const remainingDigits = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, "0"); // Generates a number between 00000000 and 99999999
  // Combine the first digit with the remaining 8 digits
  const randomNumber = firstDigit.toString() + remainingDigits;
  return parseInt(randomNumber, 10); // Convert to integer
}

const createEmployee = async (req, res) => {
  const { fname, lname, nick_name, password } = req.body;
  if (!fname || !lname || !nick_name || !password) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  const isEmployeeExists = await Employee.findOne({ where : { fname , lname}});
  if (isEmployeeExists) {
    return res.status(409).json({ msg: "พนักงานคนนี้มีอยู่ในฐานข้อมูลแล้ว" });
  }
  try {
    //เพิ่มข้อมูลลงฐานข้อมูล
    await Employee.create({
      id: getRandomNineDigitNumber(),
      fname,
      lname,
      nick_name,
      password,
    });
    return res.status(201).json({ msg: "เพิ่มพนักงานของคุณเรียบร้อยแล้ว" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong , Please try again" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    //ดึงข้อมูลพนักงานทั้งหมด
    const employees = await Employee.findAll();
    //ส่งข้อมูลกลับไปยังผู้ใช้
    return res.status(200).json({ employees });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Something went wrong , Please try again" });
  }
};
//เรียกดูข้อมูลพนักงานเพียงคนเดียว สำหรับผู้จัดการ
const getEmployeeByIdManager = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findOne({
      where: { id },
    });
    return res.status(200).json(employee);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong , Please try again" });
  }
};
//เรียกดูพนักงานด้วย id
const getEmployeeById = async (req, res) => {
  const token = req.params.token;
  try {
    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    const employee = await Employee.findOne({
      where: { id: payload.employee },
    });
    return res.status(200).json(employee);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong , Please try again" });
  }
};

const updateEmployee = async (req, res) => {
  const { employeeId } = req.params;

  const isEmployeeExists = await Employee.findOne({ id: employeeId });

  if (!isEmployeeExists) {
    return res.status(404).json({ msg: "ไม่พบบัญชีของพนักงานของคุณ" });
  }
  console.log("req.body", req.body);
  const {
    // ชื่อจริง
    fname,
    // นามสกุล
    lname,
    // ชื่อเล่น
    nick_name,
    // ค่าแรงต่อวัน
    wage_per_date,
    // จำนวนวันที่ทำงาน
    num_of_work_date,
    // จำนวนชั่วโมงที่ทำ OT
    num_of_ot_hours,
    // จำนวนเงิน OT ต่อชั่วโมง
    ot_per_hour,
    //ค่ากะ
    shift_fee,
    //เบอร์ติดต่อ
    phone_number,
    //อีเมลล์
    email,
    line,
  } = req.body;
  if (!fname) {
    return res.status(400).json({ msg: "กรุณากรอก ชื่อจริง พนักงาน" });
  } else if (!lname) {
    return res.status(400).json({ msg: "กรุณากรอก นามสกุล พนักงาน" });
  } else if (!nick_name) {
    return res.status(400).json({ msg: "กรุณากรอก ชื่อเล่น พนักงาน" });
  }
  console.log("employeeId", employeeId);
//อัพเดตข้อมูลพนักงานด้วยข้อมูลใหม่ที่ส่งมา
  await Employee.update(
    {
      fname,
      lname,
      nick_name,
      wage_per_date,
      num_of_work_date,
      num_of_ot_hours,
      ot_per_hour,
      shift_fee,
      ot_summary: ot_per_hour * num_of_ot_hours,
      phone_number,
      line,
      email,
      total_salary:
        (wage_per_date * num_of_work_date) +
        (ot_per_hour * num_of_ot_hours) +
        Number(shift_fee)
    },
    { where: { id: employeeId } }
  );
//ส่งข้อความสำเร็จไปยังผู้ใช้
  res.status(200).json({ msg: "updated your employee successfully" });
};

const loginEmployee = async (req, res) => {
  const { employeeId, password } = req.body;

  console.log(req.body);
  if (!employeeId || !password) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  const employee = await Employee.findOne({
    where: { id: employeeId },
  });

  if (!employee) {
    return res.status(400).json({ msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
  }

  if (employee.password !== password) {
    return res.status(400).json({ msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
  }

  const accessToken = await jwt.sign(
    { employee: employeeId },
    process.env.SECRET_KEY
  );

  res.status(200).json({ accessToken });
};

const deleteEmployeeId = async (req, res) => {
  const id = req.params.id;
  //ลบข้อมูลพนักงานด้วย id ในฐานข้อมูล
  await Employee.destroy({
    where: { id },
  });
  //ส่งข้อความกลับไปว่าลบข้อมูลสำเร็จแล้ว
  return res.status(200).json({ msg: "ลบข้อมูลพนักงานเรียบร้อย" });
};

export {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  loginEmployee,
  getEmployeeById,
  getEmployeeByIdManager,
  deleteEmployeeId,
};
