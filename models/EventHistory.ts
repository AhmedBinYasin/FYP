import mongoose from 'mongoose'
const { Schema } = mongoose

const HistorySchema = new Schema({
  Date: {
    type: Date,
    required: true,
  },
  Type: {
    type: Date,
    required: true,
  },
  Message: {
    type: String,
  },
})

const Event = mongoose.model('Events', HistorySchema)
export default Event