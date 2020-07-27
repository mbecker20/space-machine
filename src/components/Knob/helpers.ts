import { sizes } from '../../theme/theme'

export function getRotation(val: number, range: [number, number]) {
  return ((val - range[0]) / (range[1] - range[0])) * (sizes.knob.rotRange[1] - sizes.knob.rotRange[0]) + sizes.knob.rotRange[0]
}

export function makeValString(val: number) {
  const roundedNumString = (Math.floor(val * 10) / 10).toString()
  return roundedNumString.length > 2 ? roundedNumString : roundedNumString + '.0'
}