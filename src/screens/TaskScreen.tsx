import React, {FC, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {Appbar, List, TextInput, RadioButton, Text} from "react-native-paper";
import {mainTheme} from "../theme";
import {State} from "../types";
import {Todos, CategoryClass} from "../classTransformer/classes";

interface Props{
    todo: Todos,
    openTask: (todo: Todos | null) => void
}

const TaskScreen: FC<Props> = ({openTask, todo}) => {
    const [category, setCategory] = useState<string>(todo.listId.toString());
    const [text, setText] = useState(todo.text);

    const dispatch = useDispatch();
    const data = useSelector((state: State) => state.data);

    return (
        <View>
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.Action icon="arrow-left" onPress={() => openTask(null)}/>
                    <Appbar.Action icon="check" color={mainTheme.colors.accent} onPress={() => console.log("back")}/>
                </Appbar.Header>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Название задачи"
                    style={styles.textInput}
                    autoFocus
                />
                <View style={styles.listWrap}>
                    <List.Subheader style={styles.listHeader}>Категория</List.Subheader>
                    <RadioButton.Group onValueChange={newValue => setCategory(newValue)} value={category}>
                        {data.map((list: CategoryClass) => {
                            return (
                                <TouchableOpacity key={list.id.toString()} activeOpacity={0.8} onPress={() => setCategory(list.id.toString())}>
                                    <View style={styles.radio}>
                                        <Text style={styles.radioLabel}>{list.title}</Text>
                                        <RadioButton.Android value={list.id.toString()} />
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                </RadioButton.Group>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    header: {
        elevation: 0,
        shadowRadius: 0,
        height: 90,
        justifyContent: "space-between"
    },
    textInput: {
        marginHorizontal: 25,
        backgroundColor: mainTheme.colors.background,
        fontSize: 20
    },
    listWrap: {
        marginHorizontal: 20
    },
    listHeader: {
        textTransform: "uppercase",
        fontSize: 14
    },
    radio: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
        paddingVertical: 10
    },
    radioLabel: {
        fontSize: 16
    }
})

export default TaskScreen;