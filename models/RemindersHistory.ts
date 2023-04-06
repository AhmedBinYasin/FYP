import mongoose from 'mongoose'
const { Schema } = mongoose

const HistorySchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Message: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
})

const History = mongoose.model('History', HistorySchema)
export default History