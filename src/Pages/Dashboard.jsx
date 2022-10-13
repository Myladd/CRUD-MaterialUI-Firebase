import React from 'react'
import {UserAuth} from "../Context/AuthContext";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import WelcomeToast from "../Components/Toast/WelcomeToast";


const Dashboard = () => {
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
        <>
            <WelcomeToast message={user.email}/>
            <p>email: {user && user.email}</p>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </>
    )

}
export default Dashboard