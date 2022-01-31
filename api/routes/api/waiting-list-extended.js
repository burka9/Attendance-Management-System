import path from 'path'
import { Router } from 'express'
import fileUpload from 'express-fileupload'
import { createClient } from '../../database/controller/client.js'
import { findSeeker, updateSeeker } from '../../database/controller/seeker.js'
import { error, Flaw } from '../../logic/error.js'
import { generateName, uploadPath } from '../../config/files.js'

let router = Router()


router.route('/visit')
  .get(async (req, res) => {
    try {
      res.status(200).json({
        list: await findSeeker({ visited: true, accepted: null })
      })
    } catch(e) {
      error(e, res)
    }
  })
  .put(fileUpload(), async (req, res) => {
    try {
      let attachment = req.files.attachment
      let { id, birthday, maritalStatus, children, spouse, jobStatus, rent, health, remark } = req.body

      let user = await findSeeker({ _id: id })
      if (!user[0]) throw new Flaw(406, 'No user found')
      user = user[0]

      user.visited = true
      user.lastModified = new Date()
      user['form'] = {
        birthday, maritalStatus, children, spouse, jobStatus, rent, health, remark,
        formDate: new Date(),
        attachments: [
          {
            name: attachment.name,
            size: attachment.size,
            type: attachment.mimetype
          }
        ]
      }

      let name = generateName(attachment.name)

      attachment.mv(uploadPath(name), async err => {
        if (err) throw new Flaw(500, 'Failed to upload attachment')

        let success = await updateSeeker({ _id: id }, user)

        res.status(200).json({ success })
      })
    } catch(e) {
      error(e, res)
    }
  })


router.route('/accept')
  .put(async (req, res) => {
    try {
      let { id } = req.body
      let user = await findSeeker({ _id: id })
      if (!user[0]) throw new Flaw(406, 'No user found')
      user = user[0]

      user.accepted = true

      let success = await updateSeeker({ _id: id }, user)
      
      let { name, phone, address, registrationDate, form } = user
      let { birthday, maritalStatus, children, spouse, jobStatus, rent, health, remark, formDate, attachments } = form

      success = await createClient({
        name,
        phone,
        address,
        registrationDate,
        birthday,
        maritalStatus,
        children,
        spouse,
        jobStatus,
        rent,
        health,
        remark,
        acceptedDate: new Date(),
        formDate,
        attachments
      })
      
      res.status(200).json({ success })
    } catch(e) {
      error(e, res)
    }
  })

export default router