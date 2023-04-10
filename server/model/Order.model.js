import mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  phoneTwo: {
    type: String,
  },
  items: [
    {
      cartQuantity: { type: String },
      category: { type: String },
      price: { type: String },
      size: { type: String },
      thumbnail: {
        url: {
          type: String,
        },
      },
    },
  ],
  subtotal: { type: String },
});

export default mongoose.model.Orders || mongoose.model('Order', OrderSchema);
