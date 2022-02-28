import mongoose from 'mongoose'
import { encrypt } from '../../logic/crypt';
import { create, find } from "./main";

export async function initAdmin() {
  try {
    let admin = await find(mongoose.models.AdminUser, { type: 'ADMIN' })
    let regOff = await find(mongoose.models.AdminUser, { type: 'REG_OFF' })

    if (!admin[0]) {
      if (await create(mongoose.models.AdminUser, {
        name: 'Administrator',
        username: 'admin',
        password: encrypt('admin'),
        type: 'admin'
      })) console.log('admin account initialized')
    }

    if (!regOff[0])
     if (await create(mongoose.models.AdminUser, {
       name: 'Registration Officer',
       username: 'reg',
       password: encrypt('reg'),
       type: 'reg_off'
     })) console.log('registration officer account initialized')
  } catch(e) {
    console.log('admin creation failed: ', e)
  }
}

export async function findAdminUser(filter) {
  return await find(mongoose.models.AdminUser, filter)
}