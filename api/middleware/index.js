import path from 'path'
import cors from 'cors'
import { static as st, json, urlencoded } from 'express'
import router from '../routes/index.js'

export default app => {
  app.use(st(path.resolve('public')))
  app.use('/attachments/recordings', st(path.resolve('uploads')))
  
  app.use(json())
  app.use(urlencoded({ extended: false }))

  app.use(router)
  app.use(cors())
}