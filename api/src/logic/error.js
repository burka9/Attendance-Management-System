export class Flaw extends Error {
  constructor(code, message) {
    super()

    this.code = code
    this.name = 'CustomError'
    this.message = message
  }
}

export function error(flaw, res) {
  console.log(flaw.message)
  try {
    let { code, message } = flaw

    if (res)
      res.status(isNaN(code) ? 500 : Number(code)).json({
        description: message
      })
  } catch {
    if (res) res.sendStatus(500)
  }
}