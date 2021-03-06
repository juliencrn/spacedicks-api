import { TraitName } from "../svg";

export function isNumeric(str: unknown): boolean {
  return typeof str === "string" && !isNaN(parseFloat(str))
}

export function validateAttributes(data: any): Record<TraitName, number> {
  const { background, skin, hat, eye, mouth, clothe, arm, special } = data

  // Required fields
  if (
    !isNumeric(background) ||
    !isNumeric(skin) ||
    !isNumeric(hat) ||
    !isNumeric(eye) ||
    !isNumeric(mouth) ||
    !isNumeric(clothe) ||
    !isNumeric(arm) ||
    !isNumeric(special)
  ) {
    throw new Error("Wrong or missing properties");
  }

  return {
    background: Number(background),
    skin: Number(skin),
    hat: Number(hat),
    eye: Number(eye),
    mouth: Number(mouth),
    clothe: Number(clothe),
    arm: Number(arm),
    special: Number(special),
  }
}