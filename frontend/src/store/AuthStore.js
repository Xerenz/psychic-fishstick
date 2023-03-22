import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            token: null,
            authenticate: (token) => set({
                isAuthenticated: true,
                token: token
            }),
            unauthenticate: () => set({
                isAuthenticated: false,
                token: null
            })
        }),
        {
            name: 'auth',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useAuthStore
