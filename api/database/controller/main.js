export async function find(model, filter) {
  try {
    return await model.find(filter).lean()
  } catch(e) {
    console.log(e)
    return []
  }
}

export async function create(model, data) {
  try {
    return await model.create(data)
  } catch(e) {
    console.log(e)
    return false
  }
}

export async function update(model, filter, data, options) {
  try {
    return await model.updateOne(filter, data, options)
  } catch(e) {
    console.log(e)
    return false
  }
}

export async function remove(model, filter) {
  try {
    return (await model.deleteOne(filter)).deletedCount
  } catch(e) {
    console.log(e)
    return false
  }
}