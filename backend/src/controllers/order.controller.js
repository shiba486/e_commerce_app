import {Order} from "./../models/order.model.js"
import {Product} from "./../models/product.model.js"
import {Cart} from "./../models/cart.model.js"

// Create a new order (pulling items from cart)
export const createOrder = async (req, res, next) => {
  try {
    // Find user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'price');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // Calculate total price
    let totalPrice = 0;
    cart.items.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalPrice
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name price');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Mark order as paid
export const markAsPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Mark as paid
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();

    res.json({ message: 'Order marked as paid', order });
  } catch (error) {
    next(error);
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Mark order as delivered (Admin only)
export const markAsDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    
    res.json({ message: 'Order marked as delivered', order });
  } catch (error) {
    next(error);
  }
};
