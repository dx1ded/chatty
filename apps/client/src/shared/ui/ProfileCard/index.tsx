import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import type { CreateChatMutation, CreateChatMutationVariables } from "__generated__/graphql"
import { CHAT_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { setIsLoading, setChat } from "shared/slices/chat"
import { getFragment } from "__generated__"
import { Text } from "../Typography"
import { CREATE_CHAT } from "./model"

interface ProfileCardProps {
  id: string
  name: string
  profilePic: string
}

export function ProfileCard({ id, name, profilePic }: ProfileCardProps) {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.firebase)
  const dispatch = useAppDispatch()
  const [createChat] = useMutation<CreateChatMutation, CreateChatMutationVariables>(CREATE_CHAT)

  const clickHandler = async () => {
    if (!user) return

    dispatch(setIsLoading(true))

    const query = await createChat({
      variables: {
        members: [id, user.uid],
      },
    })

    const result = getFragment(CHAT_FIELDS, query.data?.createChat)
    if (!result) return

    dispatch(setChat(result))
    dispatch(setIsLoading(false))

    navigate(`/chat/${result.id}`)
  }

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-2.5 px-5 py-3 transition-colors duration-500 hover:bg-[#F3F7FF]"
      onClick={clickHandler}>
      <img src={profilePic} alt="User" className="h-10 w-10" />
      <Text className="font-medium">{name}</Text>
    </button>
  )
}
