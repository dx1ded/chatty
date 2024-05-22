import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useMutation, useSubscription } from "@apollo/client"
import type {
  ChangeOnlineStatusMutation,
  ChangeOnlineStatusMutationVariables,
  OnlineStatusSubscription,
  OnlineStatusSubscriptionVariables,
} from "__generated__/graphql"
import { updateChatListOnlineStatus } from "shared/slices/chatList"
import { updateChatOnlineStatus } from "shared/slices/chat"
import { useAppDispatch, useAppSelector } from "shared/model"
import { Sidebar } from "./Sidebar"
import { CHANGE_ONLINE_STATUS, ONLINE_STATUS_SUBSCRIPTION } from "../model/queries/user"

export function Main() {
  const { user } = useAppSelector((state) => state.firebase)
  const dispatch = useAppDispatch()
  const [changeOnlineStatus] = useMutation<ChangeOnlineStatusMutation, ChangeOnlineStatusMutationVariables>(
    CHANGE_ONLINE_STATUS,
  )

  useEffect(() => {
    // Setting online status
    changeOnlineStatus({
      variables: { status: true },
    })

    const setOffline = () => {
      changeOnlineStatus({
        variables: { status: false },
      })
    }

    window.addEventListener("beforeunload", setOffline)

    return () => {
      window.removeEventListener("beforeunload", setOffline)
    }
  }, [changeOnlineStatus])

  useSubscription<OnlineStatusSubscription, OnlineStatusSubscriptionVariables>(ONLINE_STATUS_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const data = options.data.data?.onlineStatus
      if (!data || data.firebaseId === user?.uid) return
      dispatch(updateChatListOnlineStatus(data))
      dispatch(updateChatOnlineStatus(data))
    },
  })

  return (
    <div className="flex h-screen min-h-[32rem]">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export { Chat } from "./Chat"
export { NoSelected } from "./NoSelected"
