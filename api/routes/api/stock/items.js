import { Router } from 'express'
import { createStockItem, findStockItem } from '../../../database/controller/stock-item'
import { error, Flaw } from '../../../logic/error'

let router = Router()

router.route('/')
.get(async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      list: await findStockItem({})
    })
  } catch(e) {
    error(e, res)
  }
})

router.route('/create-new-item')
.post(async (req, res) => {
  try {
    let { name } = req.body

    let item = await findStockItem({ name })
    if (item[0]) throw new Flaw(406, 'existing_name')

    res.status(200).json({
      success: await createStockItem({ name })
    })
  } catch(e) {
    error(e, res)
  }
})

router.route('/input-log')
.post(async (req, res) => {
  try {
    // let { quantity, single, total }
  } catch(e) {
    error(e, res)
  }
})

router.route('/output-log')
.post(async (req, res) => {
  try {
  } catch(e) {
    error(e, res)
  }
})

export default router