import { Router } from 'express'
import api from './api'
import test from './test'

let router = Router()


router.use('/api', api)
router.use('/test', test)


export default router