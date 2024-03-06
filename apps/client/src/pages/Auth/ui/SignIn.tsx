import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Heading, Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import { SignInSchema, type AuthFormProps } from "../lib"
import { ErrorMessage } from "./ErrorMessage"

type SignInFields = z.infer<typeof SignInSchema>

export function SignIn({ setHasAccount }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFields>({
    resolver: zodResolver(SignInSchema),
  })

  const submitHandler = (data: SignInFields) => {
    console.log(data)
    console.log("submit!")
  }

  return (
    <div className="absolute left-1/2 top-1/2 w-full max-w-[26.875rem] -translate-x-1/2 -translate-y-1/2">
      <div className="mb-12 text-center">
        <Heading className="mb-1.5">Sign in to account</Heading>
        <Subheading>Please, sign in to your account</Subheading>
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
              type="password"
              className="p-4"
              placeholder="Password"
              isCorrect={errors.password ? false : undefined}
              {...register("password")}
            />
            {errors.password && <ErrorMessage message={errors.password.message!} />}
          </div>
        </div>
        <div className="flex flex-col items-center gap-7">
          <Button type="submit" className="w-full py-4 uppercase">
            Sign in
          </Button>
          <button type="button" onClick={() => setHasAccount(false)} className="text-center font-light text-[#ADADAD]">
            Don&apos;t have an account?
          </button>
        </div>
      </form>
    </div>
  )
}
