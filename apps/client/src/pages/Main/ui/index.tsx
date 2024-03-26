import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"

export function Main() {
  return (
    <div className="flex h-screen min-h-[32rem]">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export { Chat } from "./Chat"
export { NoSelected } from "./NoSelected"
