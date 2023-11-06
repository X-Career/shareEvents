import React from 'react';
import AppHeader from '../components/Header/Header';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
        <AppHeader/>
        <Outlet />
    </div>
  )
}

export default MainLayout