import mongoose from 'mongoose'
const { Schema, model } = mongoose


export default model('Seeker', new Schema({
  name: String,
  phone: String,
  sex: String,
  address: String,
  registrationDate: Date,
  lastModified: Date,
  visited: Boolean,
  accepted: String,
  form: Object,
}))