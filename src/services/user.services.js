import userDao from "../dao/controllers/user.controller.js";

const registerUser = async(userData) => {
    return await userDao.create(userData);
};

const getOnUser = async(query) => {
    return await userDao.getOne(query);
};

export default { registerUser, getOnUser};