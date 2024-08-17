import jwt from "jsonwebtoken";
import Manager from "../models/manager.model.mjs";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const loginManger = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }
  const user = await Manager.findOne({ where: { username } });
  if (!user) {
    return res.status(400).json({ msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
  }
  const result = await user.toJSON();

  const isPasswordCorrect = await bcrypt.compare(password, result.password);
  
  if (!isPasswordCorrect) {
    return res.status(400).json({ msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
  }
  const accessToken = await jwt.sign(
    { manager: username },
    process.env.SECRET_KEY
  );

  res.status(200).json({ accessToken });
};

export { loginManger };
