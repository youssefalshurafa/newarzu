import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

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
  material: {
    type: String,
  },
  stock: { type: String },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: [true, 'product must belong to a category'],
  },
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
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model.Products ||
  mongoose.model('Product', ProductSchema);
