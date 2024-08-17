import express from "express";
import { loginManger } from "../controllers/manager.controller.mjs";
const router = express.Router();

router.route("/").post(loginManger);

export default router;
