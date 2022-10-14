import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {UserAuth} from "../Context/AuthContext";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

export default function Navbar() {
    const {user, logout} = UserAuth()

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
        }catch (e){
            console.log(e)
        }
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Panel
                    </Typography>
                    <Typography variant="body2" gutterBottom color={"white"} textAlign={"center"} display={"flex"} alignItems={"center"} marginTop={1} marginRight={10}>
                        {user.email}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
