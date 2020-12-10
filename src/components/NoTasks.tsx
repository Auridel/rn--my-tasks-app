import React, {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {View, StyleSheet} from "react-native";
import {Text, Button} from "react-native-paper";
import {mainTheme} from "../theme";
import EditField from "./EditField";
import {ADD_LIST} from "../redux/actions";

const NoTasks: FC = () => {
    const [title, setTitle] = useState("");
    const [input, setInput] = useState(false);
    const dispatch = useDispatch();

    const saveHandler = () => {
        if(title.trim()){
            dispatch(ADD_LIST(title))
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>У вас пока нет списков задач</Text>
            {input && <EditField saveHandler={saveHandler} value={title} setValue={setTitle}/>}
            <Button icon="plus"
                    onPress={() => setInput(!input)}
                    mode="contained"
                    color="#f2f2f2">Создать новый</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40
    },
    text: {
        fontSize: 20,
        color: mainTheme.colors.disabled,
        marginBottom: 20
    }
})

export default NoTasks;