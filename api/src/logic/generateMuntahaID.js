import { findClient } from "../database/controller/client";

export default async function generateMuntahaID() {
  let clients = await findClient()
  let ids = []

  clients.forEach(client => ids.push(client.muntahaID))

  let counter = clients.length
  let id

  do {
    counter ++
    id = `Mun-${counter}`
  } while(clients.findIndex(c => c.muntahaID == id) != -1)

  return id
}