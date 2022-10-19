import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const accessToken=localStorage.getItem('accessToken')
  if(accessToken){
    return true
  } else {
    return false
  }
}

const PublicRoutes=(props) =>{
  const auth=useAuth()
  return auth?<Navigate to="/"/>: <Outlet/>
}

export default PublicRoutes;