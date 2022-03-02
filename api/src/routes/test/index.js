import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { Router } from 'express'
import path from 'path'
import { findClient, updateClient } from '../../database/controller/client'
import { error } from '../../logic/error'


let router = Router()


router.get('/admin', (req, res) => res.sendFile(path.resolve('public', 'index.html')))

router.get('/faker', (req, res) => {
  let item = ''
  switch (req.query.type) {
    case 'name':
      item = faker.name.findName()
      break
    case 'phone':
      item = faker.phone.phoneNumber()
      break
    case 'address':
      item = `${faker.address.city()}, ${faker.address.country()}`
      break
    case 'birthday':
      let date = new Date(faker.date.past()).toISOString().slice(0, 10)
      item = date
      break
    case 'maritalStatus':
      // item = faker.
      break
    case 'jobStatus':
      item = faker.word.noun()
      break
    case 'rent':
      item = faker.commerce.price()
      break
    case 'health':
      item = faker.lorem.sentence()
      break
    case 'remark':
      item = faker.lorem.sentences(4, '.')
      break
    case 'schooling':
      item = faker.random.word()
      break
    default:
  }

  res.json({ item })
})

router.post('/reset-client-timestamp', async (req, res) => {
  try {
    let clients = await findClient()

    clients.forEach(async client => {
      client.temp = {}
      client.attendance = {}
      await updateClient({ _id: client._id }, client)
    })

    res.sendStatus(200)
  } catch(e) {
    error(e, res)
  }
})

router.post('/drop-collection', async (req, res) => {
  try {
    let { seeker, client } = req.body

    if (seeker) seeker = mongoose.models.Seeker.collection.drop()
    if (client) client = mongoose.models.Client.collection.drop()

    res.json({ seeker, client })
  } catch(e) {
    error(e, res)
  }
})



export default router