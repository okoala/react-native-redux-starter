import mongoose from 'mongoose'

export const todoSchema  = new mongoose.Schema({
  text: {
    type: String
  },
  createAt: {
    type: Date
  }
})

export default mongoose.model('todo'. todoSchema)
