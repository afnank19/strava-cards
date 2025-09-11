
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

let themes: Themes[] = []

themes.push({
    name: "Rose Pine",
    theme: RosePine
})

themes.push({
    name: "Gruvbox",
    theme: GruvBox
})

export default themes;