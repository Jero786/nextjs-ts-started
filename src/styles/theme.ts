const breakpointsValues = ["40em", "52em", "64em", "80em"]

export const breakpoints = {
  sm: breakpointsValues[0],
  md: breakpointsValues[1],
  lg: breakpointsValues[2],
  xl: breakpointsValues[3]
}

export default {
  colors: {
    black: "#000e1a",
    white: "#fff",
    blue: "#007ce0",
    navy: "#004175",
    primary: "#fce4ec",
    primaryDark: "#c9b2ba",
    secondary: "#e3f2fd",
    secondaryDark: "#b1bfca",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints: breakpointsValues,
  fontSizes: ["1rem", "1.5rem", "2rem"]
}
