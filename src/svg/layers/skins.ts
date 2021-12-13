import { Accessory } from "../types"

export const skins: Accessory[] = [
  { name: "Light blue", value: "url(#blue-to-blue-45)" },
  { name: "Chair", value: "url(#yellow-to-pink-45)" },
  { name: "Salmon", value: "url(#purple-to-salmon-45)" },
  { name: "Purple", value: "url(#pink-to-purple-45)" },
  { name: "Space green", value: "url(#pink-to-green-45)" },
  { name: "Green neon", value: "url(#cyan-to-green-45)" },
  { name: "Shades of purple", value: "url(#shades-of-purple-45)" },
  { name: "Solid blue", value: "url(#cyan-to-blue-45)" },
  { name: "Sunset", value: "url(#orange-to-red-45)" },
  { name: "Hot sun", value: "url(#orange-to-dark-red-45)" },
  { name: "Boys and girls", value: "url(#red-purple-green-45)" },
  { name: "Venice beach", value: "url(#pink-to-yellow-45)" },
  { name: "Cosmos", value: "url(#purple-to-green-45)" },
]


export function createDick(dick: Accessory): string {
  const dickColor = dick.value
  let ballsColor = dickColor

  if (dick.value === '') {
    return ''
  }

  return (
    `<g id="dick" transform="translate(96 98) rotate(180)">
      <rect width="15" height="51.915" rx="7.5" transform="translate(40.5 22)" fill="${dickColor}"/>
      <ellipse cx="9.5" cy="9" rx="9.5" ry="9" transform="translate(31 18)" fill="${ballsColor}"/>
      <ellipse cx="9.5" cy="9" rx="9.5" ry="9" transform="translate(46 18)" fill="${ballsColor}"/>
    </g>`
  )
}