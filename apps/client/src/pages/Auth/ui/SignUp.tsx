import { Heading, Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AuthFormProps, SignUpSchema } from "../lib"
import { ErrorMessage } from "./ErrorMessage"

type SignUpFields = z.infer<typeof SignUpSchema>

export function SignUp({ setHasAccount }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>({
    resolver: zodResolver(SignUpSchema),
  })

  const submitHandler = (data: SignUpFields) => {
    console.log(data)
  }

  return (
    <div className="absolute left-1/2 top-1/2 w-full max-w-[26.875rem] -translate-x-1/2 -translate-y-1/2">
      <div className="mb-12 text-center">
        <Heading className="mb-1.5">Sign up</Heading>
        <Subheading>To get in the chat, you need to sign up</Subheading>
      </div>
      <form className="px-11 py-12 shadow-md" noValidate onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-6 grid gap-4">
          <div>
            <Input
              type="email"
              className="p-4"
              placeholder="E-mail"
              isCorrect={errors.email ? false : undefined}
              {...register("email")}
            />
            {errors.email && <ErrorMessage message={errors.email.message!} />}
          </div>
          <div>
            <Input
              type="text"
              className="p-4"
              placeholder="Full name"
              isCorrect={errors.fullName ? false : undefined}
              {...register("fullName")}
            />
            {errors.fullName && <ErrorMessage message={errors.fullName.message!} />}
          </div>
          <div>
            <Input
              type="password"
              className="p-4"
              placeholder="Password"
              isCorrect={errors.password ? false : undefined}
              {...register("password")}
            />
            {errors.password && <ErrorMessage message={errors.password.message!} />}
          </div>
          <div>
            <Input
              type="password"
              className="p-4"
              placeholder="Confirm password"
              isCorrect={errors.confirmPassword ? false : undefined}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message!} />}
          </div>
        </div>
        <div className="flex flex-col items-center gap-7">
          <Button type="submit" className="w-full py-4 uppercase">
            Sign up
          </Button>
          <button type="button" onClick={() => setHasAccount(true)} className="text-center font-light text-[#ADADAD]">
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  )
}
