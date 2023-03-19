import { create } from 'zustand'

const useSnackStore = create((set) => ({
    open: false,
    severity: 'success',
    message: '',
    showSnackbar: (message, severity) => set({
        open: true,
        severity: severity,
        message: message
    }),
    closeSnackbar: () => set({
        open: false,
        message: ''
    })
}))

export default useSnackStore
