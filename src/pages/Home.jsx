import React from "react";
import Navbar from "../component/navbar";
import {Outlet}from'react-router-dom';
function Home(){
    return(
        <>
        <Navbar />
        <Outlet/>
        <div className="vh-100 d-flex justify-content-center align-items-center flex-column Home-page1">
            <h1>Welcome to ...Spread</h1>
            <h4>Lets Spread ideas knowlage thoughts </h4>
        </div>
        </>
    )
}
export default Home;