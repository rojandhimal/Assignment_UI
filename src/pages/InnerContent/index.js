import React from 'react';
import { Outlet } from 'react-router-dom'
import { NavBar } from '../../components/NavBar';

const InnerContent = () => {
    return <div className='inner-content'>
        <NavBar />
        <Outlet />

    </div>;
}

export default InnerContent;