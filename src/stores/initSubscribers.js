import { useGymStore } from '@/stores/gym.js'
import { useUserStore } from '@/stores/user.js'

const initSubscribiers = () => {
  useGymStore().$subscribe((mutation, state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('myGyms', JSON.stringify(state.myGyms))
    localStorage.setItem('gymSelected', JSON.stringify(state.gymSelected))
  })

  useUserStore().$subscribe((mutation, state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('user', JSON.stringify(state.user))
  })
}
export default initSubscribiers
