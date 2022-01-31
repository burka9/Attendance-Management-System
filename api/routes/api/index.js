import { Router } from 'express'
import session from './session.js'
import waitingList from './waiting-list.js'

let router = Router()

router.use('/session', session)
router.use('/waiting-list', waitingList)



export default router