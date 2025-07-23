import { Router } from 'express';
import { Authenticated, admin } from "./../middlewares/auth.middleware.js"
import { getProducts, createProduct, updateProduct, deleteProduct } from "./../controllers/product.controller.js"

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/',Authenticated,admin, createProduct);
productRouter.put('/:id',Authenticated,admin, updateProduct);
productRouter.delete('/:id',Authenticated,admin, deleteProduct);

export default productRouter
