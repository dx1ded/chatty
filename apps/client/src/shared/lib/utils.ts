import dayjs from "dayjs"
import type { KeyboardEvent } from "react"

export const generateAvatarByFullName = (fullName: string) => {
  const stringifiedName = fullName.split(" ").join("+")

  return `https://ui-avatars.com/api/?name=${stringifiedName}&background=00B3FF&color=fff&rounded=true&format=svg`
}

export const formatChatListDate = (timeStamp: number) => {
  const dateNow = Date.now()
  const dayjsInstance = dayjs(timeStamp)

  return dateNow - 2000 < timeStamp
    ? "Now"
    : dateNow - 1000 * 60 * 60 * 24 < timeStamp
      ? dayjsInstance.format("hh:mm A")
      : dateNow - 1000 * 60 * 60 * 48 < timeStamp
        ? "Yesterday"
        : dateNow - 1000 * 60 * 60 * 24 * 7 < timeStamp
          ? dayjsInstance.format("ddd")
          : dayjsInstance.format("MM/DD/YYYY")
}

export const formatMessageDate = (timeStamp: number) => {
  const dateNow = Date.now()
  const dayjsInstance = dayjs(timeStamp)

  return dateNow - 2000 < timeStamp
    ? "Now"
    : dateNow - 1000 * 60 * 60 * 24 < timeStamp
      ? dayjsInstance.format("hh:mm A")
      : dateNow - 1000 * 60 * 60 * 48 < timeStamp
        ? `Yesterday, ${dayjsInstance.format("hh:mm A")}`
        : dateNow - 1000 * 60 * 60 * 24 * 7 < timeStamp
          ? dayjsInstance.format("dddd, h:mm A")
          : dayjsInstance.format("MM/DD/YYYY, hh:mm A")
}

export const handleEnter = (fn: () => void) => {
  return (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fn()
  }
}
