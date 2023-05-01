import mongoose from 'mongoose'
const { Schema } = mongoose

const AlertHistorySchema = new Schema({
    OutputType: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now
    },
    Content: {
        type: String,
        required: true,
    },
    DeviceID: {
        type: String,
    },
    Location: {
        type: String,
    }
})

const AlertHistory = mongoose.model('AlertHistory', AlertHistorySchema)
export default AlertHistory