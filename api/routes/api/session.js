import { Router } from 'express'
import { findAdminUser } from '../../database/controller/admin-user.js'
import { error, Flaw } from '../../logic/error.js'
import { encrypt } from '../../logic/crypt.js'

let router = Router()


router.route('/')
  .post(async (req, res) => {
    try {
      let { username, password } = req.body
      username = username.toLowerCase()
      password = encrypt(password)

      let user = await findAdminUser({ username, password })
      if (!user[0]) throw new Flaw(403, 'Incorrect credentials')
      user = user[0]
      
      res.status(200).json({
        type: user.type
      })
    } catch(e) {
      error(e, res)
    }
  })

export default router