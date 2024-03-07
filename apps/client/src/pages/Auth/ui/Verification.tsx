import { Title, Text } from "shared/ui/Typography"

export function Verification() {
  return (
    <div className="flex h-[28rem] flex-col items-center justify-center p-4 text-center shadow-md">
      <div className="text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-current bg-[#E8F7FE] text-2xl font-bold">
        i
      </div>
      <Title className="mb-3">Verify your account</Title>
      <Text className="max-w-72 tracking-wide">Verification letter with the code was sent to your e-mail</Text>
    </div>
  )
}
