import { useLazyQuery } from "@apollo/client"
import { Close, FormatColorText, Info, Image, KeyboardVoice } from "@mui/icons-material"
import { MenuItem, Modal } from "@mui/material"
import { useState } from "react"
import dayjs from "dayjs"
import type { ChatInfoQuery, ChatInfoQueryVariables } from "__generated__/graphql"
import { Subheading, Text } from "shared/ui/Typography"
import { useAppSelector } from "shared/model"
import { GET_CHAT_INFO } from "../model/queries/chat"

export function ChatInfo() {
  const { chat } = useAppSelector((state) => state.chat)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sendGetChatInfo, { data, loading }] = useLazyQuery<ChatInfoQuery, ChatInfoQueryVariables>(
    GET_CHAT_INFO,
    {
      fetchPolicy: "no-cache",
      variables: { chatInfoId: chat.id },
    },
  )

  const getChatInfo = () => {
    setIsModalOpen(true)
    sendGetChatInfo()
  }

  return (
    <>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="info-modal-title">
        <div className="absolute left-1/2 top-1/2 w-full max-w-96 -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4">
          <div className="mb-5 flex items-center justify-between">
            <Subheading id="info-modal-title" className="font-medium">
              Chat Info
            </Subheading>
            <button type="button" className="h-6 w-6" onClick={() => setIsModalOpen(false)}>
              <Close sx={{ width: "100%", height: "100%" }} />
            </button>
          </div>
          <div className="mb-7 grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center text-gray-800">
                  <FormatColorText sx={{ width: "100%", height: "100%" }} />
                </div>
                <Text>Text messages</Text>
              </div>
              {loading ? <p>Loading</p> : <Text className="font-medium">{data?.chatInfo?.text}</Text>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center text-gray-800">
                  <Image sx={{ width: "100%", height: "100%" }} />
                </div>
                <Text>Pictures</Text>
              </div>
              {loading ? <p>Loading</p> : <Text className="font-medium">{data?.chatInfo?.pictures}</Text>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center text-gray-800">
                  <KeyboardVoice sx={{ width: "100%", height: "100%" }} />
                </div>
                <Text>Voice messages</Text>
              </div>
              {loading ? <p>Loading</p> : <Text className="font-medium">{data?.chatInfo?.voices}</Text>}
            </div>
          </div>
          {loading ? (
            <p>Loading</p>
          ) : (
            <p className="text-xs text-gray-400">
              Created at {dayjs(data?.chatInfo?.createdAt).format("YYYY-MM-DD hh:mm A")}
            </p>
          )}
        </div>
      </Modal>
      <MenuItem
        className="flex items-center gap-2.5 !px-3 !py-1.5 !text-sm !text-yellow-400"
        onClick={getChatInfo}>
        <span className="flex h-4 w-4 items-center" aria-hidden>
          <Info sx={{ width: "100%", height: "100%" }} />
        </span>
        Info
      </MenuItem>
    </>
  )
}
