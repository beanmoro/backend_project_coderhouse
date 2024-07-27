import jwt from 'jsonwebtoken';
import envs from "../config/env.config.js";

export const createToken = (user) =>{
    const { _id, email } = user;

    const token = jwt.sign(
        {_id, email },
        envs.SECRET_CODE,
        {expiresIn: "1m"}
    );
    return token;
};

export const verifyToken = (token) => {
    const decode = jwt.verify(token,  envs.SECRET_CODE);
    return decode;
}