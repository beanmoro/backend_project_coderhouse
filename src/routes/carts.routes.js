import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { passportCall, authorization } from "../middlewares/passport.middleware.js";
import { checkProductAndcart } from "../middlewares/checkProductAndCart.middleware.js";

const router = Router();

router.post('/', passportCall("jwt"), authorization("admin"), cartsController.createCart);

router.post('/:cid/product/:pid',passportCall("jwt"), authorization("user"), checkProductAndcart,  cartsController.addProductToCart)

router.put("/:cid/product/:pid",passportCall("jwt"), authorization("user"), checkProductAndcart,  cartsController.updateQuantityProductInCart);

router.delete("/:cid/product/:pid",passportCall("jwt"), authorization("user"), checkProductAndcart,  cartsController.deleteProductInCart);

router.get('/:cid',passportCall("jwt"), authorization("user"), checkProductAndcart, cartsController.getCartById);

router.delete("/:cid",passportCall("jwt"), authorization("user"),  cartsController.deleteAllProductsInCart);

router.get("/:cid/purchase", passportCall("jwt"), authorization("user"), cartsController.purchaseCart);

export default router;