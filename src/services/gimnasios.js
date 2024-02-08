import http from './api.js'
import { useGymStore } from '@/stores/gym.js'

async function getMyGyms() {
  return await http.get("gimnasios")
}

async function createGym(newGym) {
  return await http.post("gimnasios", newGym)
}

async function getInvitedUsers() {
  return await http.get("gimnasios/"+useGymStore().gymSelected.id+"/usuarios-invitados")
}

async function inviteUserToGym(userToInvite) {
  return await http.post("gimnasios/"+useGymStore().gymSelected.id+"/invitar-usuario",
    userToInvite)
}
export default {
  getMyGyms,
  createGym,
  getInvitedUsers,
  inviteUserToGym
}