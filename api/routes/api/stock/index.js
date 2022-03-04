import { Router } from 'express'
import items from './items'

let router = Router()

router.use('/items', items)


export default router