import mongoose from 'mongoose'
const { Schema } = mongoose

const AdminLogsSchema = new Schema({
  Date: {
    type: Date,
    default: Date.now()
  },
  Type: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
  },
  Address: {
    type: String,
  },
})

const AdminLogs = mongoose.model('AdminLogs', AdminLogsSchema)
export default AdminLogs