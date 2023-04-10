import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import DialogActions from '@mui/material/DialogActions'
import FilledInput from '@mui/material/FilledInput';
import Grid from '@mui/material/Grid'
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { authAxios, createLinkUrl } from '../api';


const HOST_NAME = window.location.hostname

let PROTOCOL = 'http'
let PORT = ''
if (process.env.NODE_ENV === 'development') {
    PROTOCOL = 'http'
    PORT = ':3000'
}

const BASE_URL = `${PROTOCOL}://${HOST_NAME}${PORT}/dashboard/invite`

const menuItems = [
    '48 hrs',
    '24 hrs',
    '12 hrs',
    '6 hrs'
]

const menuValues = [
    48,
    24,
    12,
    6
]

const getExpiryTime = (h) => {
    const dt = new Date()
    return new Date(dt.setTime(
        dt.getTime() + h*3600*1000
    ))
}

export default function LinkDialog(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [link, setLink] = useState(null)
    const open = Boolean(anchorEl);
    const { id } = useParams()
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index)
        setAnchorEl(null)
    }
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleCreateLink = () => {
        const h = menuValues[selectedIndex]
        const expiryTime = getExpiryTime(h)

        const data = {
            hobby: id,
            expires_on: expiryTime
        }

        authAxios.post(createLinkUrl, data)
        .then((response) => {
            const { data } = response
            const link = `${BASE_URL}/${data.id}`
            setLink(link)
        })
        .catch((error) => {
            console.log('Error', error)
        })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(link)
    }

    return (
        <Dialog onClose={props.handleClose} 
        open={props.open}>
            <DialogTitle>
                Create a shareable link
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please select when should the link expire
                </DialogContentText>
                <br />
                <Button onClick={handleClick}>
                    { menuItems[selectedIndex] }
                </Button>
                <Menu anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose} >
                    {menuItems.map((option, index) => 
                    <MenuItem 
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}>
                        { option }
                    </MenuItem>)}
                </Menu>
                { link && 
                <Grid>
                    <TextField
                    size='small'
                    value={link} 
                    readOnly />
                    {/* <IconButton onClick={handleCopy}>
                        <ContentCopyIcon />
                    </IconButton> */}
                </Grid>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreateLink}>Create</Button>
                <Button onClick={props.handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
