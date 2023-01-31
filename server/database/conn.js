import mongoose from 'mongoose';

const MONGO_URI =
  'mongodb+srv://youssef:youssef171990@products.0hcuaoc.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
  try {
    mongoose.set('strictQuery', true);
    const { connection } = await mongoose.connect(MONGO_URI);
    if (connection.readyState == 1) {
      console.log('Database connected');
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export default connect;
