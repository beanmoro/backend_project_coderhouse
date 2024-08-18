import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

router.post("/email/reset-password", usersController.sendEmailResetPassword);
router.post("/reset-password", usersController.resetPassword); 
router.get("/premium/:uid", usersController.changeUserRole);

export default router;