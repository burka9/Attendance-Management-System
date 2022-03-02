import mongoose from 'mongoose'
const { Schema, model } = mongoose

let scheme = new Schema({
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
})

export default model('AdminUser', scheme)