
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

let themes: Themes[] = []

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