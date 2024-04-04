import React from "react";
import Navbar from "./navbar";
function Home(){
    return(
        <>
        <Navbar />
        <div className="vh-100 d-flex justify-content-center align-items-center Home-page">
            <h1>Welcome Blogger </h1>
        </div>
        </>
    )
}
export default Home;