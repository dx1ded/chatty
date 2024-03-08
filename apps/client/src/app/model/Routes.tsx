import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useFirebase } from "shared/model"

export function PrivateRoutes() {
  const { user, isLoading } = useFirebase()

  if (isLoading) return <Outlet />

  return user ? <Outlet /> : <Navigate to="/auth" />
}

export function PublicRoutes() {
  const { user, isLoading } = useFirebase()
  const location = useLocation()

  if (isLoading) return <Outlet />

  return user && location.pathname === "/auth" ? <Navigate to="/" /> : <Outlet />
}
