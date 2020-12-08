import {DefaultTheme} from "react-native-paper";

export const mainTheme: ReactNativePaper.Theme = {
    ...DefaultTheme,
    colors: {
        primary: '#fff',
        accent: '#1779ff',
        background: '#fff',
        surface: "white",
        error: '#b56073',
        text: "black",
        onBackground: '#000000',
        onSurface: '#000000',
        disabled: "rgba(0, 0, 0, .46)",
        placeholder: "rgba(0, 0, 0, .54)",
        backdrop: "rgba(0, 0, 0, .5)",
        notification: "pink",
    }
}