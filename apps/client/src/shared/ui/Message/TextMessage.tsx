import { Text } from "shared/ui/Typography"

interface TextMessageProps {
  text: string
  sentByYou: boolean
}

export function TextMessage({ text, sentByYou }: TextMessageProps) {
  return <Text className={`font-normal ${sentByYou ? "text-dark" : "text-white"}`}>{text}</Text>
}
