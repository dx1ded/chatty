import z from "zod"

export const SignInSchema = z.object({
  email: z.string().email("E-mail is not valid"),
  password: z
    .string()
    .min(8, "Minimum 8 letters")
    .regex(/[A-Z]/, {
      message: "At least one capital letter",
    })
    .regex(/[*@!#%&()^~{}]+/, {
      message: "At least one special letter (@,!,#,%,&, ...)",
    }),
})

export const SignUpSchema = z
  .object({
    email: z.string().email("E-mail is not valid"),
    fullName: z.string().min(1, "Name is not valid").max(100, "Name is not valid"),
    password: z
      .string()
      .min(8, "Minimum 8 letters")
      .regex(/[A-Z]/, {
        message: "At least one capital letter",
      })
      .regex(/[*@!#%&()^~{}]+/, {
        message: "At least one special letter (@,!,#,%,&, ...)",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword && data.confirmPassword !== "", {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  })
