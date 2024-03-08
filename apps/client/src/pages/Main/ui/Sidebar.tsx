import { GroupOutlined, LaunchOutlined } from "@mui/icons-material"
import { Text } from "shared/ui/Typography"
import { ProfileCard } from "shared/ui/ProfileCard"
import { Search } from "./Search"

const data = [
  {
    profileURL:
      "https://ui-avatars.com/api/?name=John+Doe&background=00B3FF&color=fff&rounded=true&format=svg",
    fullName: "Jack the Ripper",
    sentAt: 1709871094877,
    sentByYou: false,
    online: true,
    lastMessage:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit ea consequuntur, praesentium ducimus nobis minima amet aliquam ex deleniti, libero quasi labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: false,
    newMessages: 3,
  },
  {
    profileURL:
      "https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg",
    fullName: "Yan Borislovskiy",
    sentAt: 1709871074877,
    sentByYou: false,
    online: false,
    lastMessage:
      "Labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: false,
    newMessages: 1,
  },
  {
    profileURL:
      "https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg",
    fullName: "Fedor Dostoyevskiy",
    sentAt: 1709871054877,
    sentByYou: true,
    online: false,
    lastMessage:
      "Labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: true,
    newMessages: 0,
  },
  {
    profileURL:
      "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg",
    fullName: "Gaius Julius Caesar",
    sentAt: 170987004877,
    sentByYou: false,
    online: true,
    lastMessage:
      "Labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: true,
    newMessages: 0,
  },
  {
    profileURL:
      "https://mars.nasa.gov/people/images/profile/2x2/mwsmith-23258-profile-hi_20BFFA1F-F1AD-414F-8550C9E61A6CB3B6.jpg",
    fullName: "Alan Turing",
    sentAt: 170287004877,
    sentByYou: true,
    online: true,
    lastMessage:
      "Labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: false,
    newMessages: 0,
  },
  {
    profileURL:
      "https://ui-avatars.com/api/?name=John+Doe&background=00B3FF&color=fff&rounded=true&format=svg",
    fullName: "Jack the Ripper",
    sentAt: 1709871094877,
    sentByYou: false,
    online: true,
    lastMessage:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit ea consequuntur, praesentium ducimus nobis minima amet aliquam ex deleniti, libero quasi labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: false,
    newMessages: 3,
  },
  {
    profileURL:
      "https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg",
    fullName: "Yan Borislovskiy",
    sentAt: 1709871074877,
    sentByYou: false,
    online: false,
    lastMessage:
      "Labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: false,
    newMessages: 1,
  },
  {
    profileURL:
      "https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg",
    fullName: "Fedor Dostoyevskiy",
    sentAt: 1709701852897,
    sentByYou: true,
    online: false,
    lastMessage:
      "Labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: true,
    newMessages: 0,
  },
  {
    profileURL:
      "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg",
    fullName: "Gaius Julius Caesar",
    sentAt: 1709744978488,
    sentByYou: false,
    online: true,
    lastMessage:
      "Labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: true,
    newMessages: 0,
  },
  {
    profileURL:
      "https://mars.nasa.gov/people/images/profile/2x2/mwsmith-23258-profile-hi_20BFFA1F-F1AD-414F-8550C9E61A6CB3B6.jpg",
    fullName: "Alan Turing",
    sentAt: 1709183698049,
    sentByYou: true,
    online: true,
    lastMessage:
      "Labore consequatur quas provident quidem ipsum. Doloribus, debitis. Voluptate atque fugiat eius rem.",
    lastMessageRead: false,
    newMessages: 0,
  },
]

export function Sidebar() {
  return (
    <aside className="flex basis-96 flex-col border-r border-[#F7F7F7]">
      <div className="mb-5 flex h-14 items-center justify-between border-b border-[#F7F7F7] px-5">
        <div className="flex items-center gap-2">
          <GroupOutlined className="text-dark" />
          <Text className="font-normal tracking-wide">Chats List</Text>
        </div>
        <button type="button" className="flex h-5 w-5 items-center">
          <LaunchOutlined className="text-dark" sx={{ width: "100%", height: "100%" }} />
        </button>
      </div>
      <Search />
      <div className="flex-1 overflow-y-auto">
        {data.map((msg, i) => (
          <ProfileCard key={i} data={msg} />
        ))}
      </div>
    </aside>
  )
}
