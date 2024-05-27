import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "shared/model"

export function PrivateRoutes() {
  const { user } = useAppSelector((state) => state.firebase)

  return user ? <Outlet /> : <Navigate to="/auth" />
}

export function PublicRoutes() {
  const { user } = useAppSelector((state) => state.firebase)
  const location = useLocation()

  return user?.emailVerified && location.pathname === "/auth" ? <Navigate to="/" /> : <Outlet />
}
