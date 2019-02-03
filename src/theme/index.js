let theme1 = {
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
    headerBg: "#F4F4F4",
    sidebarBg: "#FFFFFF",
    sidebarColor: "#000000",
    sidebarBorderColor: "#e3e3e3",
    selectedColor: "#F4F4F4",
    buttonBg: "#FFFFFF",
    buttonColor: "#000000",
    uploaderColor: "#000000",
    uploaderBorderColor: "#a7a7a7",
    secondaryColor: "#286552",
    secondaryColorBg: "#60EEC2"
};

let theme2 = {
    textColor: "#313131",
    backgroundColor: "#F5F5F5",
    headerBg: "#585858",
    sidebarBg: "#FFFFFF",
    sidebarColor: "#313131",
    sidebarBorderColor: "#313131",
    selectedColor: "#e8e8e8",
    buttonBg: "#FFFFFF",
    buttonColor: "#313131",
    uploaderColor: "#313131",
    uploaderBorderColor: "#a7a7a7",
    secondaryColor: "#60EEC2",
    secondaryColorBg: "#286552"
}

const configTheme = {
    headerHeight: "70px"
}

theme1.configTheme = configTheme;
theme2.configTheme = configTheme;

export const theme = {
    theme1,
    theme2
}