import { create } from 'zustand'

const useSnackStore = create((set) => ({
    open: false,
    severity: 'error',
    message: 'Something went wrong!',
    showSnackbar: (message, severity) => set(
        (state) => ({
            open: true,
            severity: severity,
            message: message || state.message
        })
    ),
    closeSnackbar: () => set({
        open: false,
        message: ''
    })
}))

export default useSnackStore
