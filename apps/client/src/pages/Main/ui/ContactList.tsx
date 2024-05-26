import { useLazyQuery, useMutation } from "@apollo/client"
import { HighlightOff, Send } from "@mui/icons-material"
import { Modal } from "@mui/material"
import { useCallback, useMemo, useState, type ChangeEvent } from "react"
import Skeleton from "react-loading-skeleton"
import { Checkbox } from "shared/ui/Checkbox"
import { Input } from "shared/ui/Input"
import { Text } from "shared/ui/Typography"
import type {
  CreateManyTextMessagesMutation,
  CreateManyTextMessagesMutationVariables,
  FindContactsQuery,
  FindContactsQueryVariables,
} from "__generated__/graphql"
import type { UserID } from "shared/lib"
import { Spinner } from "shared/ui/Spinner"
import { useAppSelector } from "shared/model"
import { SEND_MANY_TEXT_MESSAGES } from "../model/queries/message"
import { FIND_CONTACTS } from "../model/queries/user"

export function useContactList() {
  const { user } = useAppSelector((state) => state.firebase)
  const [isOpen, setIsOpen] = useState(false)
  // Used `useState` for this because I need the elements to update when it changes (for send button)
  const [textValue, setTextValue] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<UserID[]>([])
  const [findContacts, { data, loading: contactsLoading }] = useLazyQuery<
    FindContactsQuery,
    FindContactsQueryVariables
  >(FIND_CONTACTS, { fetchPolicy: "no-cache" })
  const [sendManyTextMessages, { loading: sendingLoading }] = useMutation<
    CreateManyTextMessagesMutation,
    CreateManyTextMessagesMutationVariables
  >(SEND_MANY_TEXT_MESSAGES, {
    variables: {
      message: {
        text: textValue,
        meta: {
          chats: selectedContacts,
        },
      },
    },
  })

  const sendClickHandler = useCallback(async () => {
    await sendManyTextMessages()
    setTextValue("")
    setIsOpen(false)
  }, [sendManyTextMessages])

  const checkboxChangeHandler = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      chats: NonNullable<FindContactsQuery["findContacts"]>[number]["chats"],
    ) => {
      const chat = chats.find((chat) => chat.members.some((member) => member.firebaseId === user?.uid))

      if (!chat) return

      setSelectedContacts((prev) =>
        e.target.checked ? [...prev, chat.id] : prev.filter((id) => id !== chat.id),
      )
    },
    [user?.uid],
  )

  const openContactList = useCallback(() => {
    setIsOpen(true)
    findContacts()
  }, [findContacts])

  const ContactListModal = useMemo(
    () => (
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="absolute left-1/2 top-1/2 w-full max-w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white">
          <div className="grid grid-cols-3 items-center border-b border-gray-200 p-3">
            <button
              type="button"
              className="text-cornflower-blue flex h-6 w-6 items-center"
              onClick={() => setIsOpen(false)}>
              <HighlightOff sx={{ width: "100%", height: "100%" }} />
            </button>
            <Text className="text-center font-medium">Send message</Text>
          </div>
          <div className="relative px-3 py-2.5">
            <Input
              variant="secondary"
              className="rounded-lg py-1.5 pl-2.5 pr-10 text-sm"
              placeholder="Type message"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <div className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2">
              {sendingLoading ? (
                <Spinner type="round" size={1.25} />
              ) : (
                <button
                  type="button"
                  className={`text-cornflower-blue flex h-full w-full items-center transition duration-300 ${textValue && selectedContacts.length ? "visible opacity-100" : "invisible opacity-0"}`}
                  onClick={sendClickHandler}>
                  <Send sx={{ width: "100%", height: "100%" }} />
                </button>
              )}
            </div>
          </div>
          <p className="text-grayish bg-[#F7F8F9] px-3 py-1 text-xs uppercase">Your Contacts</p>
          <div className="max-h-[19rem] overflow-y-auto py-2">
            {contactsLoading ? (
              <Skeleton count={5} height={32} containerClassName="px-3 grid gap-2" inline />
            ) : (
              data?.findContacts?.map((contact) => (
                <label
                  key={contact.firebaseId}
                  className="flex cursor-pointer items-start gap-2.5 px-3 py-1"
                  htmlFor={`contact-${contact.firebaseId}`}>
                  <img src={contact.photoURL} alt="User's profile pic" className="h-8 w-8" />
                  <div className="flex flex-1 items-center justify-between border-b border-gray-100 pb-0.5">
                    <div>
                      <p className="mb-0.5 text-sm font-medium">{contact.displayName}</p>
                      <p className="text-grayish text-xs tracking-wide">
                        {contact.online ? "Online" : "Offline"}
                      </p>
                    </div>
                    <Checkbox
                      id={`contact-${contact.firebaseId}`}
                      onChange={(e) => checkboxChangeHandler(e, contact.chats)}
                    />
                  </div>
                </label>
              ))
            )}
          </div>
        </div>
      </Modal>
    ),
    [
      contactsLoading,
      data?.findContacts,
      isOpen,
      sendClickHandler,
      sendingLoading,
      textValue,
      selectedContacts,
      checkboxChangeHandler,
    ],
  )

  return {
    openContactList,
    ContactListModal,
  }
}
