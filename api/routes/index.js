import { Router } from 'express'
import api from './api/index.js'

let router = Router()


router.use('/api', api)


export default router