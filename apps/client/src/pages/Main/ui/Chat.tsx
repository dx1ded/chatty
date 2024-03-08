import { Message } from "shared/ui/Message"
import { ChatHeader } from "./ChatHeader"
import { ChatFooter } from "./ChatFooter"

const messages = [
  {
    text: "Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻",
    timeStamp: 1709879267114,
    profilePhotoURL:
      "https://mars.nasa.gov/people/images/profile/2x2/mwsmith-23258-profile-hi_20BFFA1F-F1AD-414F-8550C9E61A6CB3B6.jpg",
    sentByYou: false,
  },
  {
    text: "Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝",
    timeStamp: 1709879267114,
    profilePhotoURL:
      "https://mars.nasa.gov/people/images/profile/2x2/mwsmith-23258-profile-hi_20BFFA1F-F1AD-414F-8550C9E61A6CB3B6.jpg",
    sentByYou: false,
  },
  {
    text: "Салам, брат Цезарь!",
    timeStamp: 1709879267114,
    profilePhotoURL:
      "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg",
    sentByYou: true,
    isRead: true,
  },
  {
    text: "Всё норм! Флот построили на Лауре. Галлов добили после вашего нападения. Спс! 🔥",
    timeStamp: 1709879267114,
    profilePhotoURL:
      "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg",
    sentByYou: true,
    isRead: true,
  },
  {
    text: "Да нзч! Ок, держи в курсе.",
    timeStamp: 1709879267114,
    profilePhotoURL:
      "https://mars.nasa.gov/people/images/profile/2x2/mwsmith-23258-profile-hi_20BFFA1F-F1AD-414F-8550C9E61A6CB3B6.jpg",
    sentByYou: false,
  },
  {
    text: "Ave Caesar! Morituri te salutant! ☝️",
    timeStamp: 1709879267114,
    profilePhotoURL:
      "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg",
    sentByYou: true,
    isRead: false,
  },
]

export function Chat() {
  return (
    <section className="flex flex-1 flex-col gap-3">
      <ChatHeader />
      <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-9 py-8">
        {messages.map((message, i) => (
          <Message data={message} key={i} />
        ))}
      </div>
      <ChatFooter />
    </section>
  )
}
