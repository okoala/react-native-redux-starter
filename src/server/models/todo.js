import mongoose from 'mongoose'

export const todoSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

export default mongoose.model('Todo', todoSchema);
