import mongoose from 'mongoose';

async function connect() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
}

export default connect;
