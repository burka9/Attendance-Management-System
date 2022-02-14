import { Router } from 'express'
import session from './session.js'
import waitingList from './waiting-list.js'
import attendance from './attendance.js'

let router = Router()

router.use('/session', session)
router.use('/waiting-list', waitingList)
router.use('/attendance', attendance)



export default router