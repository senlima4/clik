import {
  gray,
  mauve,
  slate,
  sage,
  olive,
  sand,
  tomato,
  red,
  crimson,
  pink,
  plum,
  purple,
  violet,
  indigo,
  blue,
  sky,
  mint,
  cyan,
  teal,
  green,
  grass,
  lime,
  yellow,
  amber,
  orange,
  brown,
  bronze,
  gold,
  grayA,
  mauveA,
  slateA,
  sageA,
  oliveA,
  sandA,
  tomatoA,
  redA,
  crimsonA,
  pinkA,
  plumA,
  purpleA,
  violetA,
  indigoA,
  blueA,
  skyA,
  mintA,
  cyanA,
  tealA,
  greenA,
  grassA,
  limeA,
  yellowA,
  amberA,
  orangeA,
  brownA,
  bronzeA,
  goldA,
  whiteA,
  blackA,
  grayDark,
  mauveDark,
  slateDark,
  sageDark,
  oliveDark,
  sandDark,
  tomatoDark,
  redDark,
  crimsonDark,
  pinkDark,
  plumDark,
  purpleDark,
  violetDark,
  indigoDark,
  blueDark,
  skyDark,
  mintDark,
  cyanDark,
  tealDark,
  greenDark,
  grassDark,
  limeDark,
  yellowDark,
  amberDark,
  orangeDark,
  brownDark,
  bronzeDark,
  goldDark,
  grayDarkA,
  mauveDarkA,
  slateDarkA,
  sageDarkA,
  oliveDarkA,
  sandDarkA,
  tomatoDarkA,
  redDarkA,
  crimsonDarkA,
  pinkDarkA,
  plumDarkA,
  purpleDarkA,
  violetDarkA,
  indigoDarkA,
  blueDarkA,
  skyDarkA,
  mintDarkA,
  cyanDarkA,
  tealDarkA,
  greenDarkA,
  grassDarkA,
  limeDarkA,
  yellowDarkA,
  amberDarkA,
  orangeDarkA,
  brownDarkA,
  bronzeDarkA,
  goldDarkA,
} from "@radix-ui/colors"
import type { Theme } from "theme-ui"

export const theme: Theme = {
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Georgia, serif",
    monospace: "Source Code Pro, monospace",
  },
  config: {
    useCustomProperties: false,
  },
  breakpoints: [
    "@media (min-width: 0px)",
    "@media (min-width: 576px)",
    "@media (min-width: 768px)",
    "@media (min-width: 1024px)",
    "@media (min-width: 1280px)",
  ],
  space: {
    1: "5px",
    2: "10px",
    3: "15px",
    4: "20px",
    5: "25px",
    6: "35px",
    7: "45px",
    8: "65px",
    9: "80px",
  },
  sizes: {
    1: "5px",
    2: "10px",
    3: "15px",
    4: "20px",
    5: "25px",
    6: "35px",
    7: "45px",
    8: "65px",
    9: "80px",
  },
  fontSizes: {
    1: "12px",
    2: "13px",
    3: "15px",
    4: "17px",
    5: "19px",
    6: "21px",
    7: "27px",
    8: "35px",
    9: "59px",
  },
  radii: {
    1: "4px",
    2: "6px",
    3: "8px",
    4: "12px",
    round: "50%",
    pill: "9999px",
  },
  colors: {
    ...gray,
    ...mauve,
    ...slate,
    ...sage,
    ...olive,
    ...sand,
    ...tomato,
    ...red,
    ...crimson,
    ...pink,
    ...plum,
    ...purple,
    ...violet,
    ...indigo,
    ...blue,
    ...sky,
    ...mint,
    ...cyan,
    ...teal,
    ...green,
    ...grass,
    ...lime,
    ...yellow,
    ...amber,
    ...orange,
    ...brown,
    ...bronze,
    ...gold,

    ...grayA,
    ...mauveA,
    ...slateA,
    ...sageA,
    ...oliveA,
    ...sandA,
    ...tomatoA,
    ...redA,
    ...crimsonA,
    ...pinkA,
    ...plumA,
    ...purpleA,
    ...violetA,
    ...indigoA,
    ...blueA,
    ...skyA,
    ...mintA,
    ...cyanA,
    ...tealA,
    ...greenA,
    ...grassA,
    ...limeA,
    ...yellowA,
    ...amberA,
    ...orangeA,
    ...brownA,
    ...bronzeA,
    ...goldA,

    ...whiteA,
    ...blackA,

    text: blackA.blackA11,
    background: whiteA.whiteA1,
    primary: indigo.indigo5,

    modes: {
      dark: {
        ...grayDark,
        ...mauveDark,
        ...slateDark,
        ...sageDark,
        ...oliveDark,
        ...sandDark,
        ...tomatoDark,
        ...redDark,
        ...crimsonDark,
        ...pinkDark,
        ...plumDark,
        ...purpleDark,
        ...violetDark,
        ...indigoDark,
        ...blueDark,
        ...skyDark,
        ...mintDark,
        ...cyanDark,
        ...tealDark,
        ...greenDark,
        ...grassDark,
        ...limeDark,
        ...yellowDark,
        ...amberDark,
        ...orangeDark,
        ...brownDark,
        ...bronzeDark,
        ...goldDark,

        ...grayDarkA,
        ...mauveDarkA,
        ...slateDarkA,
        ...sageDarkA,
        ...oliveDarkA,
        ...sandDarkA,
        ...tomatoDarkA,
        ...redDarkA,
        ...crimsonDarkA,
        ...pinkDarkA,
        ...plumDarkA,
        ...purpleDarkA,
        ...violetDarkA,
        ...indigoDarkA,
        ...blueDarkA,
        ...skyDarkA,
        ...mintDarkA,
        ...cyanDarkA,
        ...tealDarkA,
        ...greenDarkA,
        ...grassDarkA,
        ...limeDarkA,
        ...yellowDarkA,
        ...amberDarkA,
        ...orangeDarkA,
        ...brownDarkA,
        ...bronzeDarkA,
        ...goldDarkA,

        text: whiteA.whiteA11,
        background: blackA.blackA1,
        primary: indigoDark.indigo5,
      },
    },
  },
}
