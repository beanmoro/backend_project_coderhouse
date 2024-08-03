import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { generateProductsMocks } from "../mocks/product.mock.js";

const router = Router();

router.get('/mockingproducts',  passportCall("jwt"), authorization("admin"), (req, res) => {
    try {
      const products = generateProductsMocks(100);
      res.status(200).json({ status: "success", products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  });



export default router;