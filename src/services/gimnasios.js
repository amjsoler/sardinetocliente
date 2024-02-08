import http from './api.js'

async function getMyGyms() {
  return await http.get("gimnasios")
}

export default {
  getMyGyms
}