import { useMutation } from "@apollo/client"
import type { CreateChatMutation, CreateChatMutationVariables } from "graphql/graphql"
import { useAppDispatch, useAppSelector } from "shared/model"
import { setIsLoading, setResult } from "shared/slices/chat"
import { Text } from "../Typography"
import { CREATE_CHAT } from "./model"

interface ProfileCardProps {
  id: string
  name: string
  profilePic: string
}

export function ProfileCard({ id, name, profilePic }: ProfileCardProps) {
  const { user } = useAppSelector((state) => state.firebase)
  const dispatch = useAppDispatch()
  const [createChat, { data }] = useMutation<CreateChatMutation, CreateChatMutationVariables>(CREATE_CHAT)

  const clickHandler = async () => {
    if (!user) return

    dispatch(setIsLoading(true))

    await createChat({
      variables: {
        members: [id, user.uid],
      },
    })

    if (!data?.createChat) return

    dispatch(setResult(data.createChat))
    dispatch(setIsLoading(false))
  }

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2.5 px-5 py-3 transition-colors duration-500 hover:bg-[#F3F7FF]"
      onClick={clickHandler}>
      <img src={profilePic} alt="User" className="h-10 w-10" />
      <Text className="font-medium">{name}</Text>
    </button>
  )
}
