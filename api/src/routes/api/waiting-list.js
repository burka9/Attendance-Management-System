import { Router } from "express";
import { createSeeker, findSeeker, updateSeeker } from "../../database/controller/seeker";
import { error, Flaw } from '../../logic/error'
import extended from './waiting-list-extended'

let router = Router()

router.use('/', extended)

router.route('/')
  .get(async (req, res) => {
    try {
      res.status(200).json({
        list: await findSeeker({ visited: false, accepted: null })
      })
    } catch(e) {
      error(e, res)
    }
  })
  .post(async (req, res) => {
    try {
      let { name, address, phone, sex } = req.body

      let now = new Date().getTime()
      let success = await createSeeker({
        name, address, phone, sex,
        registrationDate: now,
        lastModified: now,
        visited: false,
        accepted: null,
      })

      res.status(200).json({ success })
    } catch(e) {
      error(e, res)
    }
  })
  .put(async (req, res) => {
    try {
      let { name, address, phone, sex, id } = req.body

      let item = await findSeeker({ _id: id })
      if (!item[0]) throw new Flaw(406, 'Invalid item')

      item = { name, address, phone, sex, lastModified: new Date().getTime()}

      let success = await updateSeeker({ _id: id }, item)

      res.status(200).json({ success })
    } catch(e) {
      error(e, res)
    }
  })


export default router