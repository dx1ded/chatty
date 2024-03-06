import { Heading, Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import type { AuthFormProps } from "../lib"

export function SignUp({ setHasAccount }: AuthFormProps) {
  return (
    <div className="absolute left-1/2 top-1/2 w-full max-w-[26.875rem] -translate-x-1/2 -translate-y-1/2">
      <div className="mb-12 text-center">
        <Heading className="mb-1.5">Sign up</Heading>
        <Subheading>To get in the chat, you need to sign up</Subheading>
      </div>
      <form className="px-11 py-12 shadow-md">
        <div className="mb-6 grid gap-4">
          <Input type="email" className="p-4" placeholder="E-mail" />
          <Input type="text" className="p-4" placeholder="Full name" />
          <Input type="password" className="p-4" placeholder="Password" />
          <Input type="password" className="p-4" placeholder="Confirm password" />
        </div>
        <div className="flex flex-col items-center gap-7">
          <Button className="w-full py-4 uppercase">Sign up</Button>
          <button type="button" onClick={() => setHasAccount(true)} className="text-center font-light text-[#ADADAD]">
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  )
}
