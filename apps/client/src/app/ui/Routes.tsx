import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "shared/model"

export function PrivateRoutes() {
  const { isLoading, user } = useAppSelector((state) => state.firebase)

  if (isLoading) return <Outlet />

  return user ? <Outlet /> : <Navigate to="/auth" />
}

export function PublicRoutes() {
  const { isLoading, user } = useAppSelector((state) => state.firebase)
  const location = useLocation()

  if (isLoading) return <Outlet />

  return user && location.pathname === "/auth" ? <Navigate to="/" /> : <Outlet />
}
