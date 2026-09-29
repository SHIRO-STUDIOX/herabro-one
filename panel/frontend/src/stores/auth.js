import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref({
        id: 1,
        firstName: 'مدیر',
        lastName: 'ارشد سیستم',
        mobile: '09120000001',
        role: 'SUPER_ADMIN',
    });
    function setCurrentUser(user) {
        currentUser.value = user;
    }
    return {
        currentUser,
        setCurrentUser,
    };
});
