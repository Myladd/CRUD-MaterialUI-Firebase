import React from 'react'
import Button from '@mui/material/Button';
import WelcomeToast from "../Components/Toast/WelcomeToast";
import Navbar from "../Layout/Navbar";
import Table from "../Components/Table/Table";


const Dashboard = () => {

    return (
        <>
            <Navbar/>
            <Table/>
            <WelcomeToast/>

        </>
    )

}
export default Dashboard