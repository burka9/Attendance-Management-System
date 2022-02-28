import { existsSync } from 'fs'
import path from 'path'

let uploadsFolderPath = path.resolve('uploads')

export { uploadsFolderPath }
export function uploadPath(name) {
  return path.resolve(uploadsFolderPath, name)
}
export function generateName(base) {
  let counter = 1
  let name = base

  while (existsSync(uploadPath(name))) {
    name = `${counter}_${base}`
    counter ++
  }
  return name
}