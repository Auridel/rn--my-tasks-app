import React, {FC} from "react";
import {View, StyleSheet} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import {mainTheme} from "../../theme";

const Loader: FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={mainTheme.colors.accent}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Loader;