import React, {useContext } from "react";
import Usercontext from "../context/UserContext";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

function ProtectedRoutes() {
    const outContext =useOutletContext()
    const { isLogin } = useContext(Usercontext)
    console.log('pro',isLogin)
    if (!isLogin) {
        console.log('navigating...')
        return <Navigate to={'/Login'} replace/>
    }
    return (
        <Outlet context={outContext}/>
  )
}

export default ProtectedRoutes