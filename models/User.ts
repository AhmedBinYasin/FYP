import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  UserName: {
    type: String,
    required: true,
    unique: true,
  },
  NickName: {
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
  TimeLastLogined: {
    type: Date,
    default: Date.now
  },
  Role: {
    type: String,
    default: 'user'
  },
})

const User = mongoose.model('user', userSchema)
export default User
