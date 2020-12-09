import React from 'react';
import {Provider} from "react-redux";
import {Provider as PaperProvider} from "react-native-paper";
import {mainTheme} from "./src/theme";
import store from "./src/redux/store";
import MainLayout from "./src/components/MainLayout";

export default function App() {

    return (
        <Provider store={store}>
            <PaperProvider theme={mainTheme}>
                <MainLayout/>
            </PaperProvider>
        </Provider>
    );
}

