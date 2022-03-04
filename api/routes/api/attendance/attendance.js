import { Router } from 'express'
import { Flaw, error } from '../../../logic/error'
import { findClient, updateClient } from '../../../database/controller/client'

let router = Router()


router.route('/check')
  .post(async (req, res) => {
    try {
      let { id, checked, hasReason, reason } = req.body

      let client = (await findClient({ _id: id }))[0]
      
      client.temp = { checked, hasReason, reason }
      
      let success = await updateClient({ _id: id }, client)

      res.json({ success })
    } catch(e) {
      error(e, res)
    }
  })



export default router