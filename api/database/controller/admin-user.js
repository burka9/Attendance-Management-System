import mongoose from 'mongoose'
import { encrypt } from '../../logic/crypt.js';
import { create, find } from "./main.js";

export async function initAdmin() {
  try {
    let admin = await find(mongoose.models.AdminUser, { type: 'ADMIN' })

    if (!admin[0]) {
      if (await create(mongoose.models.AdminUser, {
        name: 'Administrator',
        username: 'admin',
        password: encrypt('admin'),
        type: 'admin'
      })) console.log('admin account initialized')
    }
  } catch(e) {
    console.log('admin creation failed: ', e)
  }
}

export async function findAdminUser(filter) {
  return await find(mongoose.models.AdminUser, filter)
}