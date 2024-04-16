import { Heading, Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { useAppSelector } from "shared/model"
import { generateAvatarByFullName } from "shared/lib"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { useLazyQuery, useMutation } from "@apollo/client"
import type { CreateUserMutation, CreateUserMutationVariables, IsEmailUsedQuery } from "__generated__/graphql"
import { AuthFormProps, SignUpSchema } from "../lib"
import { ErrorMessage } from "./ErrorMessage"
import { Verification } from "./Verification"
import { CREATE_USER, IS_EMAIL_USED } from "../model/chat.queries"

type SignUpFields = z.infer<typeof SignUpSchema>

export function SignUp({ setHasAccount }: AuthFormProps) {
  const { auth } = useAppSelector((state) => state.firebase)
  const [sendIsEmailUsed, { loading, called, data }] = useLazyQuery<IsEmailUsedQuery>(IS_EMAIL_USED)
  const [createUser] = useMutation<CreateUserMutation, CreateUserMutationVariables>(CREATE_USER)
  const [isVerification, setIsVerification] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    trigger,
  } = useForm<SignUpFields>({
    resolver: zodResolver(SignUpSchema),
  })

  // Check if email is already used
  const debouncedCheckEmail = useDebouncedCallback(async (email: string) => {
    const isValid = await trigger("email")

    if (!isValid) return

    const isUsed = await sendIsEmailUsed({ variables: { email } })
    if (!isUsed.data?.isEmailUsed) return

    setError("email", { message: "E-mail is already used" })
  }, 1000)

  const submitHandler = async (data: SignUpFields) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const photoURL = generateAvatarByFullName(data.fullName)

      await updateProfile(user, {
        displayName: data.fullName,
        photoURL,
      })

      await sendEmailVerification(user)
      await createUser({
        variables: {
          user: {
            uid: user.uid,
            displayName: data.fullName,
            email: data.email,
            photoURL,
          },
        },
      })

      setIsVerification(true)
    } catch (e) {
      /* Catch */
    }
  }

  return (
    <div className="absolute left-1/2 top-1/2 max-h-full w-full max-w-[26.875rem] -translate-x-1/2 -translate-y-1/2 p-2.5">
      <div>
        <div className="mb-12 text-center">
          <Heading className="mb-1.5">Sign up</Heading>
          <Subheading>To get in the chat, you need to sign up</Subheading>
        </div>
        {isVerification ? (
          <Verification />
        ) : (
          <form className="px-11 py-12 shadow-md" noValidate onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-6 grid gap-4">
              <div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      ref={field.ref}
                      type="email"
                      className="p-4"
                      placeholder="E-mail"
                      autoComplete="off"
                      isCorrect={errors.email ? false : called ? !data?.isEmailUsed : undefined}
                      isLoading={loading}
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e)
                        debouncedCheckEmail(e.target.value)
                      }}
                    />
                  )}
                />
                {errors.email && <ErrorMessage message={errors.email.message!} />}
              </div>
              <div>
                <Input
                  type="text"
                  className="p-4"
                  placeholder="Full name"
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
                  isCorrect={errors.confirmPassword ? false : undefined}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message!} />}
              </div>
            </div>
            <div className="flex flex-col items-center gap-7">
              <Button type="submit" className="w-full py-4 uppercase" disabled={isSubmitting}>
                Sign up
              </Button>
              <button
                type="button"
                className="text-center font-light text-[#ADADAD]"
                onClick={() => setHasAccount(true)}>
                Already have an account?
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
