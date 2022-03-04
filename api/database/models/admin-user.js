import mongoose from 'mongoose'
const { Schema, model } = mongoose


export default model('AdminUser', new Schema({
  name: String,
  username: {
    type: String,
    lowercase: true
  },
  password: String,
  type: {
    type: String,
    uppercase: true
  }
}))