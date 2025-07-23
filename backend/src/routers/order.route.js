import { Router } from "express"
import { createOrder,getMyOrders,markAsPaid,getAllOrders, markAsDelivered } from "../controllers/order.controller.js";
import { Authenticated,admin } from "./../middlewares/auth.middleware.js"

const orderRouter = Router();

orderRouter.post('/', Authenticated, createOrder);      
orderRouter.get('/myorders', Authenticated, getMyOrders);
orderRouter.put('/:id/pay', Authenticated, markAsPaid);

// Admin routes
orderRouter.get('/', Authenticated, admin, getAllOrders);
orderRouter.put('/:id/pay', Authenticated, markAsPaid); // Users can mark paid (simulate payment)
orderRouter.put('/:id/deliver', Authenticated, admin, markAsDelivered);

export default orderRouter;
