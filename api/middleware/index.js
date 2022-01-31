import { json, urlencoded } from 'express'
import router from '../routes/index.js'

export default app => {
  app.use(json())
  app.use(urlencoded({ extended: false }))

  app.use(router)
}