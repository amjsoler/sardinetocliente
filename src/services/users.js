import http from './api.js'
import { useGymStore } from '@/stores/gym.js'
import { getSelectedGymId } from '@/helpers/Helpers.js'

async function registerUser(newUser) {
  return await http.post("registrarse", newUser)
}

async function loginUser(theUser) {
  return await http.post('iniciar-sesion', theUser)
}

async function accountRecover(account) {
  return await http.post("recuperar-cuenta", account)
}

async function accountVerify() {
  return await http.get("verificar-cuenta")
}

async function inviteUserToGym(userToInvite) {
  return await http.post("gimnasios/"+ getSelectedGymId() +"/invitar-usuario",
    userToInvite)
}
export default {
  registerUser,
  loginUser,
  accountRecover,
  accountVerify,
  inviteUserToGym
}