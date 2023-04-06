import mongoose from 'mongoose'
const { Schema } = mongoose

const DateSchema = new Schema({
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
  Enable: {
    type: Boolean,
    required: true,
  },
})

const Alarms = mongoose.model('Alarms', DateSchema)
export default Alarms