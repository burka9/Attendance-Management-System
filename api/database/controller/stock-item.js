import mongoose from 'mongoose'
import { create, find, remove, update } from './main'


export async function createStockItem(item) {
  return await create(mongoose.models.StockItem, item)
}

export async function findStockItem(filter) {
  return await find(mongoose.models.StockItem, filter)
}

export async function updateStockItem(filter, item, options) {
  return await update(mongoose.models.StockItem, filter, item, options)
}

export async function removeStockItem(filter) {
  return await remove(mongoose.models.StockItem, filter)
}