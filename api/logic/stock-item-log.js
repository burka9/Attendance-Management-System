export function input(item, quantity, price) {
  let sumPrice = price * quantity
  
  if (item.current) { // item is already initialized
    let { quantity: q, price: p } = item.current
    let { total: tQ, current } = q
    let { low, high, total: tP } = p
    
    item.current = {
      quantity: {
        total: quantity + tQ,
        current: quantity + current,
      },
      price: {
        low: low < price ? low : price,
        total: sumPrice + tP,
        high: high > price ? high : price
      }
    }
  } else {
    item.current = {
      quantity: {
        total: quantity,
        current: quantity
      },
      price: {
        low: price,
        total: sumPrice,
        high: price
      }
    }
  }
}

export function output(item, quantity) {
  item.current.quantity.current -= quantity
}