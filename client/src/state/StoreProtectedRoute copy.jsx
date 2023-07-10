import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const StoreProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.user);
    let location = useLocation();
    if(!user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    if(!user.isOwner) {
        return <Navigate to="/creaNegozio" state={{ from: location}} replace />
    }
 return children

};

export default StoreProtectedRoute;