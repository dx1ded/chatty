import { useLazyQuery } from "@apollo/client"
import { Close, FormatColorText, Image, KeyboardVoice } from "@mui/icons-material"
import { Modal } from "@mui/material"
import { useMemo, useState } from "react"
import Skeleton from "react-loading-skeleton"
import dayjs from "dayjs"
import type { ChatInfoQuery, ChatInfoQueryVariables } from "__generated__/graphql"
import { Subheading, Text } from "shared/ui/Typography"
import { useAppSelector } from "shared/model"
import { GET_CHAT_INFO } from "../model/queries/chat"

export function useChatInfo() {
  const { chat } = useAppSelector((state) => state.chat)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sendGetChatInfo, { data, loading }] = useLazyQuery<ChatInfoQuery, ChatInfoQueryVariables>(
    GET_CHAT_INFO,
    {
      fetchPolicy: "no-cache",
      variables: { chatInfoId: chat.id },
    },
  )

  const openChatInfoModal = () => {
    sendGetChatInfo()
    setIsModalOpen(true)
  }

  const ChatInfoModal = useMemo(
    () => (
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="info-modal-title">
        <div className="animate-appear absolute left-1/2 top-1/2 w-full max-w-96 -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4">
          <div className="mb-5 flex items-center justify-between">
            <Subheading id="info-modal-title" className="font-medium">
              Chat Info
            </Subheading>
            <button type="button" className="flex h-5 w-5 items-center" onClick={() => setIsModalOpen(false)}>
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
              {loading ? (
                <Skeleton containerClassName="w-8 h-5" />
              ) : (
                <Text className="font-medium">{data?.chatInfo?.text}</Text>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center text-gray-800">
                  <Image sx={{ width: "100%", height: "100%" }} />
                </div>
                <Text>Pictures</Text>
              </div>
              {loading ? (
                <Skeleton containerClassName="w-8 h-5" />
              ) : (
                <Text className="font-medium">{data?.chatInfo?.pictures}</Text>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center text-gray-800">
                  <KeyboardVoice sx={{ width: "100%", height: "100%" }} />
                </div>
                <Text>Voice messages</Text>
              </div>
              {loading ? (
                <Skeleton containerClassName="w-8 h-5" />
              ) : (
                <Text className="font-medium">{data?.chatInfo?.voices}</Text>
              )}
            </div>
          </div>
          {loading ? (
            <div className="h-4 w-40">
              <Skeleton />
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              Created at {dayjs(data?.chatInfo?.createdAt).format("YYYY-MM-DD hh:mm A")}
            </p>
          )}
        </div>
      </Modal>
    ),
    [data?.chatInfo, isModalOpen, loading],
  )

  return {
    openChatInfoModal,
    ChatInfoModal,
  }
}
