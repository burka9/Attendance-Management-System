import { Router } from 'express'
import session from './session'
import attendance from './attendance'
import stock from './stock'
import admin from './admin'

let router = Router()

router.use('/session', session)
router.use('/attendance', attendance)
router.use('/stock', stock)
router.use('/admin', admin)


export default router