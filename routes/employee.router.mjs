import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployeeId,
  loginEmployee,
  getEmployeeByIdManager,
} from "../controllers/employee.controller.mjs";

const router = express.Router();

// .post(http://localhost:3000/employee/)
// เพิ่มพนักงาน
router.route("/").post(createEmployee);

// .post(http://localhost:3000/employee/login)
// เข้าสู่ระบบสำหรับพนักงาน
router.route("/login").post(loginEmployee);

// .get(http://localhost:3000/employee/)
// เรียกดูข้อมูลพนักงานทั้งหมด
router.route("/").get(getAllEmployees);

// .get(http://localhost:3000/employee/:token)
// เรียกดูข้อมูลพนักงานเพียงคนเดียว
router.route("/:token").get(getEmployeeById);

// .get(http://localhost:3000/employee/:token)
// เรียกดูข้อมูลพนักงานเพียงคนเดียว
router.route("/:id/manager").get(getEmployeeByIdManager);

// .delete(http://localhost:3000/employee/:id)
// ลบพนักงานด้วย id
router.route("/:id").delete(deleteEmployeeId);

// .put(http://localhost:3000/employee/:id)
// อัพเดทข้อมูลพนักงานด้วย id
router.route("/:employeeId").put(updateEmployee);

export default router;
