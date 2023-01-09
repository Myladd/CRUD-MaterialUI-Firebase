import React from 'react'
import WelcomeToast from "../Components/Toast/WelcomeToast";
import Navbar from "../Layout/Navbar";
import Table from "../Components/Table/Table";
import Footer from "../Layout/Footer";

const Dashboard = () => {

    return (
        <>
            <Navbar />
            <Table/>
            <WelcomeToast message={"welcome"} />
            <Footer/>
        </>
    )

}
export default Dashboard