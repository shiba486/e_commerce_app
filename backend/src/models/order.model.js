import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  user:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 },
  items:[
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice:{
    type: Number,
    required: true
 },
  isPaid:{
    type: Boolean,
    default: false
},
  paidAt: Date

}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
