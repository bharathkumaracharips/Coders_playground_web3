"use client"

import { ScrollVelocity } from "../ui/our-partners"

const partners = [
  {
    name: "Jane Doe",
    role: "CTO",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "John Smith",
    role: "COO",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "Jane Smith",
    role: "Tech Lead",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "Richard Doe",
    role: "Designer",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "Gordon Doe",
    role: "Developer",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    review:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "John Doe",
    role: "CEO & Founder",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    review:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
]

const velocity = [3, -3]

function PartnerCard({ name, role, avatar, review }: { name: string; role: string; avatar: string; review: string }) {
  return (
    <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-900 rounded-xl shadow-md p-4 m-2 w-[14rem] md:w-[16rem] xl:w-[20rem] h-[20rem] justify-between border border-neutral-200 dark:border-neutral-800">
      <img
        src={avatar}
        alt={name}
        className="h-20 w-20 rounded-full object-cover object-center border-2 border-neutral-300 dark:border-neutral-700 mb-2"
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{name}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{role}</p>
        <p className="text-xs text-neutral-700 dark:text-neutral-300 italic break-words whitespace-normal text-center w-full max-w-[90%] mx-auto px-2 leading-tight overflow-hidden max-h-[5rem] overflow-y-auto">"{review}"</p>
      </div>
    </div>
  )
}

function Partners() {
  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5 py-10">
        {velocity.map((v, index) => (
          <ScrollVelocity key={index} velocity={v}>
            {partners.map((partner) => (
              <PartnerCard key={partner.name} {...partner} />
            ))}
          </ScrollVelocity>
        ))}
      </div>
    </div>
  )
}

export { Partners }