import {Router} from 'express';
import passport from "passport";
import sessionController from '../controllers/session.controller.js';

const router = Router();

router.post("/register", passport.authenticate("register"), sessionController.userRegister);

router.post('/login', passport.authenticate("login"), sessionController.userLogin);

router.get("/current", passport.authenticate("jwt"), sessionController.userCheckToken);

router.get("/auth/github", passport.authenticate('github'), sessionController.userGithubLogin)

router.get("/logout", sessionController.userLogout);

export default router;