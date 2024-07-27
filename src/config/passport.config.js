import passport from "passport";
import local from "passport-local";
import github from "passport-github";
import jwt from "passport-jwt";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const GithubStrategy = github.Strategy;

const initializePassport = () => {

    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email"},
            async (req, username, password, done) =>{
                try {
                    const {first_name, last_name, email, age } = req.body;
                    const user = await userRepository.getByEmail(username);
                    if(user)
                        return done(null, false, { message: "El usuario ya existe!"});
    
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                    };
    
                    const createUser = await userRepository.create(newUser);
                    return done(null, createUser);
                } catch (error) {
                    return done(error);
                }

            }
        )
    );


    passport.use(
      "login",
      new LocalStrategy({usernameField: "email"}, async(username, password, done)=>{
        try {
            const user = await userRepository.getByEmail(username);
            if(!user || !isValidPassword(user, password)){
                return done(null, false, {message: "Email o password ingresado es invalido!"});
            }

            return done(null, user);

        } catch (error) {
            done(error);
        }
      })  
    );


    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: "codigoSecreto",
            },
            async (jwt_payload, done) =>{
                try {
                    return done(null, jwt_payload);
                } catch (error) {
                    return done(error);
                }
            }
        )
    )


    passport.use(
        "github",
        new GithubStrategy(
            {
                clientID: "Ov23liX28awSQT9rUvlS",
                clientSecret: "676a89ea9901cacd2a386c21cf564ceb5cea97eb",
                callbackURL: "http://localhost:3000/auth/github/callback"
            },
            async (accessToken, refreshToken, profile, cb) =>{

                try {
                    
                    const { name, emails} = profile;
                    
                    const user = {
                        first_name: name.givenName,
                        last_name: name.familyName,
                        email: emails[0].value
                    };
    
                    const existingUser = await userRepository.getByEmail(emails[0].value);
                    if(existingUser){
                        return cb(null, existingUser);
                    }
    
                    const newUser = await userRepository.create(user);
                    cb(null, newUser);
                } catch (error) {
                    return cb(error);
                }

            }
        )
    );

    passport.serializeUser((user, done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) =>{
        const user = await userRepository.getById(id);
        done(null, user);
    });

};

export default initializePassport;