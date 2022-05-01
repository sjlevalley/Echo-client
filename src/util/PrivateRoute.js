import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute ({ user, redirectPath, children }) {
  if (!user) {
    return <Navigate exact to={redirectPath} replace />
  }
  return children ? children : <Outlet />
}
export default PrivateRoute
