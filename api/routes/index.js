import { Router } from 'express'
import api from './api/index.js'
import test from './test/index.js'

let router = Router()


router.use('/api', api)
router.use('/test', test)


export default router