import mongoose from 'mongoose'
import { decrypt } from '../logic/crypt.js'
import { initAdmin } from './controller/admin-user.js'

// models
import models from './models/index.js'

let database = decrypt('9506,11611610111010097,11099,10197xxx')
let password = decrypt('102,11711410797,10997,1102xxxx')

let uriObject = {
  online: `mongodb+srv://burka:${password}@cluster0.ja273.mongodb.net/${database}?retryWrites=true&w=majority`,
  local: `mongodb://localhost/${database}`
}

const URI = uriObject['online']


export function connect(func = err => {
  if (err) return console.log(`failed to connect ${err}`)
  console.log(`connected to ${database}`)
  
  mongoose.models = models
  
  initAdmin()
}) {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, func)
}