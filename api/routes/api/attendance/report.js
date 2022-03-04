import { Router } from 'express'
import { error } from '../../../logic/error'
import { findClient } from '../../../database/controller/client'


let router = Router()


router.route('/registration')
.get(async (req, res) => {
  try {
    let clients = await findClient()

    res.status(200).json(clients)
  } catch(e) {
    error(e, res)
  }
})


router.route('/attendance')
.get((req, res) => {})


export default router