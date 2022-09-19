import mongoose from 'mongoose'
const { Schema, model } = mongoose


export default model('StockItem', new Schema({
  name: {
    type: String,
    lowercase: true
  },
  current: {},
  /*
    {
      quantity: {
        total: String,
        current: String, // how much is left in stock
      },
      price: {
        low: String, // lowest price
        total: String,
        high: String, // highest price
      },
    }
  */
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