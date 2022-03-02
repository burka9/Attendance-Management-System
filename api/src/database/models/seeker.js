import mongoose from 'mongoose'
const { Schema, model } = mongoose


let scheme = new Schema({
  name: String,
  phone: String,
  sex: String,
  address: String,
  registrationDate: Date,
  lastModified: Date,
  visited: Boolean,
  accepted: String,
  form: Object,
})


export default model('Seeker', scheme)