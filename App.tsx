import React from 'react';
import {Provider} from "react-redux";
import {Provider as PaperProvider} from "react-native-paper";
import {mainTheme} from "./src/theme";
import MainScreen from "./src/screens/MainScreen";
import store from "./src/redux/store";


export default function App() {

    return (
        <Provider store={store}>
            <PaperProvider theme={mainTheme}>
                <MainScreen/>
            </PaperProvider>
        </Provider>
    );
}

