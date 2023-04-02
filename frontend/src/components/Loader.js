import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useLoaderStore from '../store/LoaderStore';

export default function Loader(props) {
    const {loading} = useLoaderStore((state) => state)

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                marginTop: '17%'
            }}>
                <CircularProgress size={65} 
                color='secondary'/>
            </Box>
        );
    }

    return <>{props.children}</>
}
