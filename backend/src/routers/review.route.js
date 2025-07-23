import { Router } from 'express';
import {addReview} from "./../controllers/review.controller.js"
import {Authenticated} from "./../middlewares/auth.middleware.js"

const reviewRouter = Router();

// Add a review for a product
reviewRouter.post('/:id', Authenticated, addReview);

export default reviewRouter;
