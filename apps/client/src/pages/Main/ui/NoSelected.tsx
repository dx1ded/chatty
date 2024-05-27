import { Menu } from "@mui/icons-material"
import NoSelectedImage from "assets/no-selected.jpg"
import { useAppDispatch } from "shared/model"
import { setIsOpen } from "shared/slices/sidebar"
import { Text } from "shared/ui/Typography"

export function NoSelected() {
  const dispatch = useAppDispatch()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <button
        type="button"
        className="absolute left-4 top-4 hidden h-6 w-6 md:block"
        onClick={() => dispatch(setIsOpen(true))}>
        <Menu sx={{ width: "100%", height: "100%" }} />
      </button>
      <img src={NoSelectedImage} className="mb-3 max-w-[16rem] md:max-w-52" alt="Chat is not selected" />
      <Text className="!font-bold">No chat selected</Text>
    </div>
  )
}
