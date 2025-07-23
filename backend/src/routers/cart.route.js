import { Router } from 'express';
import { getCart, addToCart, updateCartItem, clearCart } from "./../controllers/cart.controller.js"
import { Authenticated } from "./../middlewares/auth.middleware.js"

const cartRouter = Router();

cartRouter.get('/', Authenticated, getCart);
cartRouter.post('/add', Authenticated, addToCart);
cartRouter.put('/update', Authenticated, updateCartItem);
cartRouter.delete('/clear', Authenticated, clearCart);

export default cartRouter
