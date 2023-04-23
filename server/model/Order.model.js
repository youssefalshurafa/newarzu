import mongoose from 'mongoose';
import moment from 'moment';

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
  shipped: {
    type: Boolean,
    default: false,
  },
  items: [
    {
      title: { type: String },
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
  date: {
    type: Date,
    default: Date.now,
  },
  invoiceNumber: {
    type: String,
    default: generateInvoiceNumber,
  },
});

function generateInvoiceNumber() {
  const prefix = 'INV';
  const random = Math.floor(Math.random() * 1000000);
  return `${prefix}-${random}`;
}

export default mongoose.model.Orders || mongoose.model('Order', OrderSchema);
