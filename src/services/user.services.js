//import userDao from "../dao/controllers/user.controller.js";
import customErrors from "../errors/customErrors.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js";
import { isValidPassword} from "../utils/hashPassword.js"
import { sendMail } from "../utils/sendMail.js";

/* const registerUser = async(userData) => {
    return await userDao.create(userData);
};

const getOnUser = async(query) => {
    return await userDao.getOne(query);
}; */

const sendEmailResetPassword = async(email)=>{
    const message = "Debe restablecer su password en el siguiente link ...";
    await sendMail(email, "Restablecer password", message);

    return "Email enviado!";
};
const resetPassword = async(email, password)=>{
    const user = await userRepository.getByEmail(email);
    if(!user) throw customErrors.notFoundError("User not found");

    const passwordIsEqual = isValidPassword(user, password);
    if(passwordIsEqual) throw customErrors.badRequestError("Password already exists");

    return await userRepository.update(user._id, { password: createHash(password)});

};

const changeUserRole = async(uid) => {
    const user = await userRepository.getById(uid);
    if(!user) throw customErrors.notFoundError("User not found");
    const userRole = user.role === "premium" ? "user" : "premium";
    return await userRepository.update(uid, { role: userRole});
}

export default { /*registerUser, getOnUser,*/ sendEmailResetPassword, resetPassword, changeUserRole};