import express from 'express';
import { connectDB } from './config/mongo.config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import sessionRouter from './routes/session.routes.js';
import otherRouter from './routes/other.routes.js';
import userRouter from './routes/user.routes.js';
import { isLogin } from './middlewares/isLogin.middleware.js';
import cookieParser from "cookie-parser";
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import env from "./config/env.config.js";
import swaggerUiExpress from 'swagger-ui-express';
import { specs } from './config/swagger.config.js';
import { errorHandler } from './errors/errorHandler.js';
import { logger } from "./utils/logger.js";

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: env.MONGO_URL,
            ttl: 15
        }),
        secret: env.SECRET_CODE,
        resave: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use('/api/other', otherRouter );
app.use('/api/products', isLogin,  productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/session', sessionRouter);
app.use('/api/user', userRouter);

app.use(errorHandler);

app.listen(env.PORT, ()=>{
    console.log(`Servidor levantado en http://localhost:${env.PORT}`);
    logger.log("info", `Servidor levantado en http://localhost:${env.PORT}`);
});