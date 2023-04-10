import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Provide a category name'],
  },
});

export default mongoose.model.Categories ||
  mongoose.model('Category', CategorySchema);
