import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface AuthUser {
  id?: number
  firstName?: string
  lastName?: string
  mobile?: string
  role?: string
}

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<AuthUser>({
    id: 1,
    firstName: 'مدیر',
    lastName: 'ارشد سیستم',
    mobile: '09120000001',
    role: 'SUPER_ADMIN',
  })

  function setCurrentUser(user: AuthUser) {
    currentUser.value = user
  }

  return {
    currentUser,
    setCurrentUser,
  }
})
