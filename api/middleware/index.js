import path from 'path'
import cors from 'cors'
import { static as _static, json, urlencoded } from 'express'
import router from '../routes'

export default app => {
  app.use(_static(path.resolve('public')))
  app.use('/attachments/recordings', _static(path.resolve('uploads')))
  
  app.use(json())
  app.use(urlencoded({ extended: false }))

  app.use(router)
  app.use(cors())
}