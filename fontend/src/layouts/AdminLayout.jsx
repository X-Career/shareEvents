import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const AdminLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current || +current.role !== 'admin') return <Navigate to="" replace="true"/>
  return (
    <div>AdminLayout</div>
  )
}

export default AdminLayout