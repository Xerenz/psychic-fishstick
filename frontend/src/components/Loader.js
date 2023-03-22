import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
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
