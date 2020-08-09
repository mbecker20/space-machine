import audioCtx from '../../audioCtx'
import { VALUE, ControlData, BaseAM } from '../moduleTypes';

export interface DistortionModule extends BaseAM {
  audioNode: WaveShaperNode,
}

export function makeDistortionControlData(): ControlData {
  return {
    'amount': {
      controlType: VALUE,
      value: 0,
      range: [0, 20000],
    },
    'oversample': {
      controlType: VALUE,
      value: 0,
      range: [0, 4],
      maxRange: [0, 4],
    }
  }
}

function makeDistortionCurve(amount: number) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for (; i < n_samples; ++i) {
    x = i * 2 / n_samples - 1;
    curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
  }
  return curve
}

function makeDistortion(prevControlData?: ControlData): DistortionModule {
  const distortion = audioCtx.createWaveShaper()
  distortion.curve = makeDistortionCurve(prevControlData ? prevControlData['amount'].value as number : 0)

  const controlSetFuncs = {
    'amount': (newAmount: string) => {
      distortion.curve = makeDistortionCurve(Number(newAmount))
    },
    'oversample': (newAmount: string) => {
      const newOversample = Math.floor(Number(newAmount))
      if (newOversample < 2) {
        distortion.oversample = 'none'
      } else if (newOversample < 4) {
        distortion.oversample = '2x'
      } else {
        distortion.oversample = '4x'
      }
    }
  }
  return {
    audioNode: distortion,
    connectingParamIDs: [],
    controlSetFuncs,
  }
}

export default makeDistortion