import http from './api.js'

async function registerUser(newUser) {
  return await http.post("registrarse", newUser)
}

export default {
  registerUser
}