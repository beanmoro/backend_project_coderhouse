import userServices from "../services/user.services.js";
import customErrors from "../errors/customErrors.js";

const getAllUsers = async (req, res, next) => {
  try {
    const { limit, page, sort } = req.query;
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        email: sort === "asc" ? 1 : -1,
      },
      lean: true,
    };

    const users = await userServices.getAll({}, options);

    res.status(200).json({ status: "success", users });
  } catch (error) {
    error.path = "[GET] /api/users/";
    next(error);
  }
};

const deleteInactiveUsers = async (req, res, next) => {
  try {
    const response = await userServices.deleteAllInactive(req.user);
    res.status(200).json({ status: "ok", response });
  } catch (error) {
    error.path = "[DELETE] /api/users/";
    next(error);
  }
};

const sendEmailResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    res.cookie("resetPassword", email, { httpOnly: true, maxAge: 10000 });
    const response = await userServices.sendEmailResetPassword(email);
    res.status(200).json({ status: "ok", response });
  } catch (error) {
    error.path = "[POST] /api/user/email/reset-password";
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailCookie = req.cookies.resetPassword;
    if (!emailCookie) throw customErrors.badRequestError("Email link expired!");
    const response = await userServices.resetPassword(email, password);
    await userServices.resetPassword(email, password);
    res.status(200).json({ status: "ok", message: "Password updated!" });
  } catch (error) {
    error.path = "[POST] /api/user/reset-password";
    next(error);
  }
};

const changeUserRole = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await userServices.changeUserRole(uid);
    res.status(200).json({ status: "ok", response });
  } catch (error) {
    error.path = "[GET] /api/user/premium/:uid";
    next(error);
  }
};

const addDocuments = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const files = req.files;
    const response = await userServices.addDocuments(uid, files);
    res.status(200).json({ status: "ok", response });
  } catch (error) {
    error.path = "[GET] /api/user/:uid/documents";
    next(error);
  }
};

export default {
  sendEmailResetPassword,
  resetPassword,
  changeUserRole,
  addDocuments,
  getAllUsers,
  deleteInactiveUsers,
};
