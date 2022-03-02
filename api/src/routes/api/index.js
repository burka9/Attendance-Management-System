import { Router } from 'express'
import session from './session'
import waitingList from './waiting-list'
import attendance from './attendance'
import report from './report'

let router = Router()

router.use('/session', session)
router.use('/waiting-list', waitingList)
router.use('/attendance', attendance)
router.use('/report', report)



export default router