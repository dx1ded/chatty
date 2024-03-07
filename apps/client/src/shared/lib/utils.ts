export const generateAvatarByFullName = (fullName: string) => {
  const stringifiedName = fullName.split(" ").join("+")

  return `https://ui-avatars.com/api/?name=${stringifiedName}&background=00B3FF&color=fff&rounded=true&format=svg`
}
