import { Router } from 'express'
import { createStockItem, findStockItem, removeStockItem, updateStockItem } from '../../../database/controller/stock-item'
import { error, Flaw } from '../../../logic/error'
import { input, output } from '../../../logic/stock-item-log'

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
.delete(async (req, res) => {
  try {
    let { name } = req.body

    let item = await findStockItem({ name })
    if (!item[0]) throw new Flaw(406, 'no_item_found')

    res.status(200).json({
      success: await removeStockItem({ name })
    })
  } catch(e) {
    error(e, res)
  }
})

router.route('/input-log')
.post(async (req, res) => {
  try {
    let { name, quantity, single, total, date } = req.body

    let item = await findStockItem({ name })
    if (!item[0]) throw new Flaw(406, 'no_item_found')
    item = item[0]

    if (!quantity || (!single && !total))
      throw new Flaw(406, 'not_enough_data')

    if (single) total = single * quantity

    date = date ? new Date(date) : new Date()

    item.input = {...item.input, ...{
      [date.toString()]: {
        quantity,
        price: { single, total }
      }
    }}

    input(item, quantity, single)

    res.status(200).json({
      success: await updateStockItem({ name }, item)
    })
  } catch(e) {
    error(e, res)
  }
})

router.route('/output-log')
.post(async (req, res) => {
  try {
    let { name, quantity, date } = req.body
    
    let item = await findStockItem({ name })
    if (!item[0]) throw new Flaw(406, 'no_item_found')
    item = item[0]

    if (!quantity)
      throw new Flaw(406, 'not_enough_data')

    if (item.current.quantity.current < quantity && quantity < 0)
      throw new Flaw(406, 'not_enough_quantity')
    
    date = date ? new Date(date) : new Date()
    
    item.output = {...item.output, ...{
      [date.toString()]: { quantity }
    }}

    output(item, quantity)

    res.status(200).json({
      success: await updateStockItem({ name }, item)
    })
  } catch(e) {
    error(e, res)
  }
})

export default router