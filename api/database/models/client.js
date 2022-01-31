import mongoose from 'mongoose'
const { Schema, model } = mongoose


let schema = new Schema({
  name: String,
  phone: String,
  address: String,
  registrationDate: Date,
  
  birthday: Date,
  maritalStatus: String,
  children: [
    { name: String, age: String, schooling: String }
  ],

  spouse: [
    { name: String, jobType: String }
  ],

  jobStatus: String,
  rent: String,
  health: String,
  remark: String,

  acceptedDate: Date,
  formDate: Date,
  attachments: Array,
})


export default new model('Client', schema)