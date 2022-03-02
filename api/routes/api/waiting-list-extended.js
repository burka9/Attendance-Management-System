import { Router } from 'express'
import fileUpload from 'express-fileupload'
import { createClient, findClient } from '../../database/controller/client'
import { findSeeker, updateSeeker } from '../../database/controller/seeker'
import { error, Flaw } from '../../logic/error'
import { generateName, uploadPath } from '../../config/files'
import generateMuntahaID from '../../logic/generateMuntahaID'

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
      let attachment = req.files
      let { id, birthday, maritalStatus, children, spouse, jobStatus, rent, health, remark } = req.body

      let user = await findSeeker({ _id: id })
      if (!user[0]) throw new Flaw(406, 'No user found')
      user = user[0]


      let attachments = []
      let name = ''
      if (attachment != null) {
        attachment = attachment.attachment
        name = generateName(attachment.name)
        attachments = [
          {
            name,
            size: attachment.size,
            type: attachment.mimetype
          }
        ]
      }

      try {
        spouse = JSON.parse(spouse)
      } catch {}

      try {
        children = JSON.parse(children)
      } catch {}

      user.visited = true
      user.lastModified = new Date().getTime()
      user['form'] = {
        birthday, maritalStatus, children, spouse, jobStatus, rent, health, remark,
        formDate: new Date().getTime(),
        attachments
      }

      if (attachment == null) {
        let success = await updateSeeker({ _id: id }, user)
        res.status(200).json({ success })
      }
      else {
        attachment.mv(uploadPath(name), async err => {
          if (err) throw new Flaw(500, 'Failed to upload attachment')
  
          let success = await updateSeeker({ _id: id }, user)
          res.status(200).json({ success })
        })
      }
    } catch(e) {
      error(e, res)
    }
  })


router.route('/accept')
  .get(async (req, res) => {
    try {
      res.status(200).json({
        list: await findClient(req.query.filter)
      })
    } catch(e) {
      error(e, res)
    }
  })
  .put(async (req, res) => {
    try {
      let { id } = req.body
      let user = await findSeeker({ _id: id })
      if (!user[0]) throw new Flaw(406, 'No user found')
      user = user[0]

      user.accepted = true

      let success = await updateSeeker({ _id: id }, user)
      
      let { name, phone, sex, address, registrationDate, form } = user
      let { birthday, maritalStatus, children, spouse, jobStatus, rent, health, remark, formDate, attachments } = form

      success = await createClient({
        muntahaID: await generateMuntahaID(),
        name,
        phone,
        sex,
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
        acceptedDate: new Date().getTime(),
        formDate,
        attachments,
        temp: {
          checked: false,
          hasReason: false,
          reason: ''
        },
        attendance: {},
      })
      
      res.status(200).json({ success })
    } catch(e) {
      error(e, res)
    }
  })

export default router