import { useState } from "react"
import { SignIn } from "./SignIn"
import { SignUp } from "./SignUp"

export function Auth() {
  const [hasAccount, setHasAccount] = useState(true)

  return hasAccount ? <SignIn setHasAccount={setHasAccount} /> : <SignUp setHasAccount={setHasAccount} />
}
