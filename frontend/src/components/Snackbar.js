import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useSnackStore from '../store/SnackStore';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function CustomSnackbar() {
    const {message, severity, open, closeSnackbar} = useSnackStore((state) => state)

    const handleClose = ( event, reason ) => {
        if ( reason === 'clickaway' ) {
            return
        }
        closeSnackbar()
    }
  
    return (
        <Snackbar open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}>
            <Alert severity={severity}
            onClose={handleClose}>
                { message }
            </Alert>
        </Snackbar>
    )
}

