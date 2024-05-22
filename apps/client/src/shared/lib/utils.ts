import dayjs from "dayjs"
import type { KeyboardEvent } from "react"

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const generateAvatarByFullName = (fullName: string) => {
  const bgColors = ["00B3FF", "C04C46", "D36E21", "7461C7", "43AA2E"]
  const stringifiedName = fullName.split(" ").join("+")
  const randomBg = getRandomArbitrary(0, bgColors.length)

  return `https://ui-avatars.com/api/?name=${stringifiedName}&background=${bgColors[randomBg]}&color=fff&rounded=true&format=svg`
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

export const convertToDataUrlBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => resolve(fileReader.result!.toString())
    fileReader.onerror = (error) => reject(error)
  })
}

export const dataURLToBase64 = (dataUrl: string) => {
  const [_, base64] = dataUrl.split(",")

  return base64
}

export const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = new Array(slice.length)

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: mimeType })
}
