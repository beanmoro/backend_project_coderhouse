import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { upload } from "../utils/uploadFiles.js";
import usersController from "../controllers/users.controller.js";

const router = Router();

router.post("/email/reset-password", usersController.sendEmailResetPassword);
router.post("/reset-password", usersController.resetPassword); 
router.get("/premium/:uid", usersController.changeUserRole);
router.post(
    "/:uid/documents",
    passportCall("jwt"),
    authorization(["user", "premium"]),
    upload.fields([
        {name: "profile", maxCount: 1},
        {name: "imgProduct", maxCount: 1},
        {name: "document", maxCount: 3},
    ]),
    usersController.addDocuments
);

export default router;