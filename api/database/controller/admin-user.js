import mongoose from 'mongoose'
import { encrypt } from '../../logic/crypt';
import { create, find, remove } from "./main";

export async function initAdmin() {
  try {
    let admin = await find(mongoose.models.AdminUser, { type: 'ADMIN' })
    let regOff = await find(mongoose.models.AdminUser, { type: 'REG_OFF' })
    let dEnc = await find(mongoose.models.AdminUser, { type: 'DATA_ENC' })

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

     if (!dEnc[0])
      if (await create(mongoose.models.AdminUser, {
        name: 'Data Encoder',
        username: 'encoder',
        password: encrypt('encoder'),
        type: 'data_enc'
      })) console.log('data encoder account initialized')
  } catch(e) {
    console.log('admin creation failed: ', e)
  }
}

export async function findAdminUser(filter) {
  return await find(mongoose.models.AdminUser, filter)
}

export async function createAdminUser(item) {
  return await create(mongoose.models.AdminUser, item)
}

export async function updateAdminUser(filter, data, options) {
  return await update(mongoose.models.AdminUser, filter, data, options)
}

export async function removeAdminUser(filter) {
  return await remove(mongoose.models.AdminUser, filter)
}