//import userDao from "../dao/controllers/user.controller.js";
import customErrors from "../errors/customErrors.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js";
import { isValidPassword } from "../utils/hashPassword.js";
import { sendMail } from "../utils/sendMail.js";

const getAll = async (query, options) => {
  const users = await userRepository.getAll(query, options);

  const usersPublicData = users.map((user) => {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      email: user.email,
      role: user.role,
      last_connection: user.last_connection,
    };
  });

  return usersPublicData;
};

const deleteAllInactive = async (user) => {
  try {
    const today = new Date();
    const limidDate = new Date(today.setDate(today.getDate() - 2));
    const users = await userRepository.getAll();

    if (user.role === "admin") {
      throw customErrors.unauthorizedError("User not authorized");
    }

    const inactiveUsers = users.filter(
      (user) => user.last_connection < limidDate
    );

    const inactiveUsersIds = inactiveUsers.map((user) => user._id);

    const result = await userRepository.deleteMany(inactiveUsersIds);

    for (const user of inactiveUsers) {
      //Comente este codigo porque no me siento comodo agregando las credenciales de mi email
      //   const message =
      //     "Tu cuenta ha sido eliminada por más de 2 días de inactividad";
      //   await sendMail(user.email, "Cuenta Eliminada - eCommerce", message);
    }
    return { result };
  } catch (error) {
    throw error;
  }
};

const sendEmailResetPassword = async (email) => {
  const message = "Debe restablecer su password en el siguiente link ...";
  await sendMail(email, "Restablecer password", message);

  return "Email enviado!";
};
const resetPassword = async (email, password) => {
  const user = await userRepository.getByEmail(email);
  if (!user) throw customErrors.notFoundError("User not found");

  const passwordIsEqual = isValidPassword(user, password);
  if (passwordIsEqual)
    throw customErrors.badRequestError("Password already exists");

  return await userRepository.update(user._id, {
    password: createHash(password),
  });
};

const changeUserRole = async (uid) => {
  const user = await userRepository.getById(uid);
  if (!user) throw customErrors.notFoundError("User not found");

  if (user.role === "user" && user.document.length > 3)
    throw customErrors.badRequestError("You must all required documentation");

  const userRole = user.role === "premium" ? "user" : "premium";
  return await userRepository.update(uid, { role: userRole });
};

const addDocuments = async (uid, reqFiles) => {
  const files = reqFiles.document;
  const userDocuments = files.map((file) => {
    return {
      name: file.filename,
      reference: file.path,
    };
  });

  const user = await userRepository.update(uid, { document: userDocuments });

  return user;
};

const updateLastConnection = async (email) => {
  const user = await userRepository.getByEmail(email);
  if (!user) throw customErrors.notFoundError("User not found");
  return await userRepository.update(user._id, { last_connection: Date.now() });
};
export default {
  sendEmailResetPassword,
  resetPassword,
  changeUserRole,
  addDocuments,
  updateLastConnection,
  getAll,
  deleteAllInactive,
};
