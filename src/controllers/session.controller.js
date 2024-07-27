import { verifyToken } from '../utils/jwt.js';


const userRegister = async(req, res) => {
    try {
        res.status(201).json({ status: "success", msg: "Usuario Creado" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
      }
}

const userLogin = async(req, res) => {
    try {
        const user = req.user;
        const token = createToken(user);
        res.cookie("token", token, { httpOnly: true });
        const userDto = userResponseDto(user);
        return res.status(200).json({ status: "success", payload: userDto, token });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
      }
}

const current = (req, res) => {
    try {
        return res.status(200).json({ status: "success", payload: req.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
};

const userCheckToken = async(req, res) => {
    try {
        const token = req.cookies.token;
        const checkToken = verifyToken(token);
        if(!checkToken){
            return res.status(403).json({status: "error",  msg: "Invalid token"});
        }

        return res.status(200).json({status: "success", payload: checkToken});
    } catch (error) {
        res.status(500).json({status: "Error", msg: "Internal Server Errror"});
    }
}

const userGithubLogin = async(req, res) => {
    try {
        res.status(201).json({status: "success", payload: newUser});
    } catch (error) {
        res.status(500).json({status: "error", msg: "Error interno del servidor!"});
    }
}

const userLogout = async(req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ status: "success", msg: "Sesión cerrada con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
}

export default {
    userRegister,
    userLogin,
    current,
    userCheckToken,
    userGithubLogin,
    userLogout
}