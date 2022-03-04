import mongoose from 'mongoose'
const { Schema, model } = mongoose


export default model('StockItem', new Schema({
  name: {
    type: String,
    lowercase: true
  },
  input: {},
  /*
    {
      "yyyy-MM-dd": {
        quantity: String,
        price: {
          single: String,
          total: String
        }
      }
    }
  */
  output: {},
  /*
    {
      "yyyy-MM-dd": {
        quantity: String
      }
    }
  */
}))