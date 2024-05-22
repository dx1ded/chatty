interface PictureMessageProps {
  imageUrl: string
  className?: string
}

export function PictureMessage({ imageUrl, className }: PictureMessageProps) {
  return <img src={imageUrl} className={`h-full w-full object-cover ${className || ""}`} alt="Attachment" />
}
