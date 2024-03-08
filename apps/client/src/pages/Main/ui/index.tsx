import { Chat } from "./Chat"
import { Sidebar } from "./Sidebar"

export function Main() {
  return (
    <div className="flex h-screen min-h-[32rem]">
      <Sidebar />
      <Chat />
    </div>
  )
}
