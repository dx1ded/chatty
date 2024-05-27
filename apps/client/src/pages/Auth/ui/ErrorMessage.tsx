interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="mt-2.5 text-sm text-red-500 sm:mt-1.5 sm:text-xs">{message}</p>
}
