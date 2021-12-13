import { Request, Response } from 'express'

import { skins } from '../svg/layers/skins'
import { eyes } from '../svg/layers/eyes'
import { hats } from '../svg/layers/hats'
import { backgrounds } from '../svg/layers/backgrounds'
import { Accessory } from '../svg/types'
import { mouths } from '../svg/layers/mouths'
import { clothes } from '../svg/layers/clothes'
import { arms } from '../svg/layers/arms'
import { specials } from '../svg/layers/specials'

const getName = (a: Accessory): string => a.name

export function getStats(req: Request, res: Response) {
  res.json({
    backgrounds: backgrounds.map(getName),
    skins: skins.map(getName),
    hats: hats.map(getName),
    eyes: eyes.map(getName),
    mouths: mouths.map(getName),
    clothes: clothes.map(getName),
    arms: arms.map(getName),
    specials: specials.map(getName)
  })
}