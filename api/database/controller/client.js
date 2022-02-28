import mongoose from 'mongoose'
import { create, find, update } from "./main";

export async function findClient(filter) {
  return await find(mongoose.models.Client, filter)
}

export async function createClient(data) {
  return await create(mongoose.models.Client, data)
}

export async function updateClient(filter, data, options) {
  return await update(mongoose.models.Client, filter, data, options)
}