import { Router } from 'express'
import { createAdminUser, findAdminUser, removeAdminUser, updateAdminUser } from '../../database/controller/admin-user'
import { error, Flaw } from '../../logic/error'
import { encrypt, decrypt } from '../../logic/crypt'

let router = Router()


router.route('/')
.get(async (req, res) => {
  try {
    let users = await findAdminUser()
    let list = users.filter(item => {
      item.password = decrypt(item.password)
      return true
    })

    res.status(200).json(list)
  } catch(e) {
    error(e, res)
  }
})
.post(async (req, res) => {
  try {
    let { username, password, name, type } = req.body

    let user = await findAdminUser({ username })
    if (user[0]) throw new Flaw(406, 'existing_username')

    res.status(200).json({
      success: await createAdminUser({ name, username, password: encrypt(password), type })
    })
  } catch(e) {
    error(e, res)
  }
})
.put(async (req, res) => {
  try {
    let { username, password, name, type, old_username } = req.body

    let user = await findAdminUser({ username: old_username })
    if (!user[0]) throw new Flaw(406, 'no_user_found')

    if (username != old_username) {
      user = await findAdminUser({ username })
      if (user[0]) throw new Flaw(406, 'existing_username')
    }

    res.status(200).json({
      success: await updateAdminUser({ username: old_username }, {
        username,
        password: encrypt(password),
        name,
        type
      })
    })
  } catch(e) {
    error(e, res)
  }
})
.delete(async (req, res) => {
  try {
    let { username } = req.body

    let user = await findAdminUser({ username })
    if (!user[0]) throw new Flaw(406, 'no_user_found')

    res.status(200).json({
      success: await removeAdminUser({ username })
    })
  } catch(e) {
    error(e, res)
  }
})


export default router