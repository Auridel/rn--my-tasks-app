import React, {FC} from "react";
import {useDispatch} from "react-redux";
import {View, StyleSheet} from "react-native";
import {Text, Button} from "react-native-paper";
import {CLEAR_ERROR, GET_DATA} from "../redux/actions";
import {mainTheme} from "../theme";

const ErrorMessage: FC = () => {
    const dispatch = useDispatch();

    const reloadHandler = () => {
        dispatch(CLEAR_ERROR());
        dispatch(GET_DATA());
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Что-то пошло не так...</Text>
            <Button icon="refresh" onPress={reloadHandler} color="#f2f2f2" mode="contained">
                Обновить
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        color: mainTheme.colors.error,
        marginBottom: 20
    }
})


export default ErrorMessage;