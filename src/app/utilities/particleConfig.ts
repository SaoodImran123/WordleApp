import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";

//particle configuration options
export const ParticleOptions: ISourceOptions = {
  fpsLimit: 15,
  particles: {
    color: {
      value: "#ffffff",
    },
    move: {
      direction: MoveDirection.none,
      enable: true,
      outModes: {
        default: OutMode.out,
      },
      random: false,
      speed: 0.5,
      straight: false,
    },
    number: {
      value: 40,
    },
    opacity: {
      value: 1,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
};
