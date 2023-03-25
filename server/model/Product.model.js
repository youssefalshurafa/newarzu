import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Provide a title'],
  },
  code: { type: String },
  description: { type: String },
  price: {
    type: String,
    required: [true, 'Please provide a price'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  material: {
    type: String,
  },
  stock: { type: String },

  thumbnail: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
});

export default mongoose.model.Products ||
  mongoose.model('Product', ProductSchema);
