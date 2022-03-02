import mongoose from 'mongoose'
import { create, find, update } from "./main";

export async function findSeeker(filter) {
  return await find(mongoose.models.Seeker, filter)
}

export async function createSeeker(data) {
  return await create(mongoose.models.Seeker, data)
}

export async function updateSeeker(filter, data, options) {
  return await update(mongoose.models.Seeker, filter, data, options)
}