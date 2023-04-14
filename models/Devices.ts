import mongoose from 'mongoose'
const { Schema } = mongoose

const Devices = new Schema({
  Node_ID: {
    type: String,
    required: true,
    unique: true,
  },
  Location: {
    type: String,
  },
  Connection: {
    type: Boolean,
    required: true,
  },
  TimeLastLogined: {
    type: Date,
    default: Date.now
  },
})

const Nodes = mongoose.model('devices', Devices)
export default Nodes