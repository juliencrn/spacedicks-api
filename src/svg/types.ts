export interface Accessory {
  name: string // Used as an id
  value: string | ((props?: any) => string) // like #HEX or <svg/>
  defs?: string[] // For linear gradients
  children?: Accessory[]
  belowDick?: boolean
}
