import { Router } from "express";
import {
  authorization,
  passportCall,
} from "../middlewares/passport.middleware.js";
import usersController from "../controllers/users.controller.js";

const router = Router();

router.get("/", usersController.getAllUsers);
router.delete(
  "/",
  passportCall("jwt"),
  authorization(["admin"]),
  usersController.deleteInactiveUsers
);

export default router;
