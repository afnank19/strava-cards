
export type CardStyles = {
  bgColor: string;
  labelColor: string;
  textColor: string;
  borderColor: string;
};

type Themes = {
    name: string,
    theme: CardStyles
}


export const RosePine: CardStyles = {
    bgColor: "#191724",
    labelColor: "#c4a7e7",
    textColor: "#e0def4",
    borderColor: "#9ccfd8",
}

export const GruvBox: CardStyles = {
    bgColor: "#282828",
    labelColor: "#ebdbb2",
    textColor: "#ebdbb2",
    borderColor: "#fabd2f",
}

export const Nord: CardStyles = {
    bgColor: "#2e3440",
    labelColor: "#d8dee9",
    textColor: "#eceff4",
    borderColor: "#88c0d0"
}

export const EverForest: CardStyles = {
    bgColor: "#1E2326",
    labelColor: "#D3C6AA",
    textColor: "#D3C6AA",
    borderColor: "#A7C080"
}

export const PastelGreen: CardStyles = {
    bgColor: "#e9f5db",
    textColor: "#352208",
    borderColor: "#cfe1b9",
    labelColor: "#352208"
}

export const JetBlack: CardStyles = {
    bgColor: "#000",
    textColor: "#fff",
    borderColor: "#111",
    labelColor: "#fff"
}

export const Blood: CardStyles = {
    bgColor: "#670303",
    textColor: "#fff",
    labelColor: "#fff",
    borderColor: "#800505"
}

export const SereneBlue: CardStyles = {
    bgColor: "#edf2fb",
    borderColor: "#e2eafc",
    textColor: "#13293d",
    labelColor: "#13293d"
}

export const Volt: CardStyles = {
    bgColor: "#d7f53a",
    borderColor: "#d7f53a",
    textColor: "#405e00",
    labelColor: "#405e00"
}

let themes: Themes[] = []

themes.push({
    name: "JET BLACK",
    theme: JetBlack
})

themes.push({
    name: "PASTEL GREEN",
    theme: PastelGreen
})

themes.push({
    name: "VOLT",
    theme: Volt
})

themes.push({
    name: "BLOOD",
    theme: Blood
})

themes.push({
    name: "SERENE BLUE",
    theme: SereneBlue
})

themes.push({
    name: "ROSE PINE",
    theme: RosePine
})

themes.push({
    name: "GRUVBOX",
    theme: GruvBox
})

themes.push({
    name: "NORD",
    theme: Nord
})

themes.push({
    name: "EVERFOREST",
    theme: EverForest
})

export default themes;