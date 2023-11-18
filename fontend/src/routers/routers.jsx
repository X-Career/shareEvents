import { Route, Router, Routes, useNavigate } from "react-router-dom"
import React, { useEffect } from 'react'
import AdminLayout from "../layouts/AdminLayout"
import { ManageSeat, Dashboard, ManageEvent, ManageUser } from "../pages/Admin"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Events from '../pages/Events/Events';
import Event from '../pages/Event/Event';
import SuccessPage from '../pages/Users/SuccessPage';
import EventRegistrationForm from '../pages/CreateAnEvent/Create';
import SignUp from '../pages/SignUp/SignUp';
import Booking from "../pages/Booking/Booking"
import EditUserPage from "../pages/Users/EditUserPage";
import { getValueFromLocalStorage } from "../utils"
import { useDispatch, useSelector } from "react-redux";

const routers = () => {

    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/events/:_id" element={<Events />} />
                <Route path="/event/:_id" element={<Event />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/createAnEvent" element={<EventRegistrationForm />} />
                <Route path="/event/:_id/booking" element={<Booking />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />} >
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/manage-users" element={<ManageUser />} />
                <Route path="/admin/profile/:id" element={<EditUserPage />} />
                <Route path="/admin/manage-events" element={<ManageEvent />} />
                <Route path="/admin/manage-seats" element={<ManageSeat />} />

            </Route>
        </Routes>
    )
}

export default routers
