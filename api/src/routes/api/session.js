import { Router } from 'express'
import { findAdminUser } from '../../database/controller/admin-user'
import { error, Flaw } from '../../logic/error'
import { encrypt } from '../../logic/crypt'

let router = Router()


router.route('/')
  .post(async (req, res) => {
    try {
      let { username, password } = req.body
      username = username.toLowerCase()
      password = encrypt(password)

      let user = await findAdminUser({ username, password })
      if (!user[0]) throw new Flaw(403, 'Incorrect username and password')
      user = user[0]

      console.log('loggedin user type is', user.type)
      
      res.status(200).json({
        type: user.type
      })
    } catch(e) {
      error(e, res)
    }
  })

export default router