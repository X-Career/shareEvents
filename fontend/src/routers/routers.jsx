import { Route, Router, Routes, useNavigate } from "react-router-dom"
import React from 'react'
import AdminLayout from "../layouts/AdminLayout"
import { CreateSeat, Dashboard, ManageEvent, ManageUser } from "../pages/Admin"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Events from '../pages/Events/Events';
import Event from '../pages/Event/Event';
import SuccessPage from '../pages/Users/SuccessPage';
import EventRegistrationForm from '../pages/CreateAnEvent/Create';
import SignUp from '../pages/SignUp/SignUp';


const routers = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route path="/" element={<Home/>} />
                <Route path="/events/:_id" element={<Events/>} />
                <Route path="/event/:_id" element={<Event/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/createAnEvent" element={<EventRegistrationForm />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />} >
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/manage-user" element={<ManageUser />} />
                <Route path="/admin/manage-events" element={<ManageEvent />} />
                <Route path="/admin/create-seat" element={<CreateSeat />} />
            </Route>
        </Routes>
    )
}

export default routers
