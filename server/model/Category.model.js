import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  catName: {
    type: String,
    required: [true, 'Please Provide a name'],
  },
});

export default mongoose.model.Categories ||
  mongoose.model('Category', CategorySchema);
