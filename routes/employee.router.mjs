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

router.route("/").post(createEmployee);
router.route("/login").post(loginEmployee);
router.route("/").get(getAllEmployees);
router.route("/:token").get(getEmployeeById);
router.route("/:id/manager").get(getEmployeeByIdManager);
router.route("/:id").delete(deleteEmployeeId);
router.route("/:employeeId").put(updateEmployee);

export default router;
