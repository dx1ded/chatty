import NoSelectedImage from "assets/no-selected.jpg"
import { Text } from "shared/ui/Typography"

export function NoSelected() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <img src={NoSelectedImage} className="mb-3 max-w-[16rem]" alt="Chat is not selected" />
      <Text className="!font-bold">No chat selected</Text>
    </div>
  )
}
