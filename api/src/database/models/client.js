import mongoose from 'mongoose'
const { Schema, model } = mongoose


let schema = new Schema({
  muntahaID: String,
  name: String,
  phone: String,
  sex: String,
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

  temp: {
    checked: Boolean,
    hasReason: Boolean,
    reason: String,
  },
  attendance: {},
  /*
    {
      "yyyy-mm-dd": {
        checked: Boolean,
        hasReason: Boolean,
        reason: String
      }
    }
  */
})


export default new model('Client', schema)