import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Heading, Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import { useAppSelector } from "shared/model"
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth"
import { SignInSchema, type AuthFormProps } from "../lib"
import { ErrorMessage } from "./ErrorMessage"

type SignInFields = z.infer<typeof SignInSchema>

export function SignIn({ setHasAccount }: AuthFormProps) {
  const { auth } = useAppSelector((state) => state.firebase)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFields>({
    resolver: zodResolver(SignInSchema),
  })

  const submitHandler = async (data: SignInFields) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (_e) {
      const error = _e as AuthError

      if (error.code === "auth/invalid-credential") {
        setError("email", { message: "Credentials are invalid" })
      }
    }
  }

  return (
    <div className="absolute left-1/2 top-1/2 max-h-full w-full max-w-[26.875rem] -translate-x-1/2 -translate-y-1/2 p-2.5 md:max-w-96">
      <div className="mb-12 text-center md:mb-4 lg:mb-6">
        <Heading className="mb-1.5 lg:mb-1">Sign in to account</Heading>
        <Subheading>Please, sign in to your account</Subheading>
      </div>
      <form
        className="px-11 py-12 shadow-md sm:px-4 sm:py-5 md:px-6 md:py-7 lg:px-8 lg:py-9"
        noValidate
        onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-6 grid gap-4 md:mb-3 md:gap-2 lg:mb-4 lg:gap-3">
          <div>
            <Input
              type="email"
              className="p-4 lg:p-3"
              placeholder="E-mail"
              autoComplete="off"
              isCorrect={errors.email ? false : undefined}
              {...register("email")}
            />
            {errors.email && <ErrorMessage message={errors.email.message!} />}
          </div>
          <div>
            <Input
              type="password"
              className="p-4 lg:p-3"
              placeholder="Password"
              autoComplete="off"
              isCorrect={errors.password ? false : undefined}
              {...register("password")}
            />
            {errors.password && <ErrorMessage message={errors.password.message!} />}
          </div>
        </div>
        <div className="flex flex-col items-center gap-7 md:gap-4 lg:gap-5">
          <Button type="submit" className="w-full py-4 uppercase md:text-xs lg:p-3" disabled={isSubmitting}>
            Sign in
          </Button>
          <button
            type="button"
            className="text-center font-light text-[#ADADAD] md:text-xs lg:text-sm"
            onClick={() => setHasAccount(false)}>
            Don&apos;t have an account?
          </button>
        </div>
      </form>
    </div>
  )
}
