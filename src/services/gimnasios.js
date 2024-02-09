import http from './api.js'
import { useGymStore } from '@/stores/gym.js'
import { getSelectedGymId } from '@/helpers/Helpers.js'

async function getMyGyms() {
  return await http.get("gimnasios")
}

async function createGym(newGym) {
  return await http.post("gimnasios", newGym)
}

async function getInvitedUsers() {
  return await http.get("gimnasios/"+ getSelectedGymId() +"/usuarios-invitados")
}

export default {
  getMyGyms,
  createGym,
  getInvitedUsers,
}