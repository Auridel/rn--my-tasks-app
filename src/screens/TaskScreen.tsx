import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {StyleSheet, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView} from "react-native";
import {Appbar, List, TextInput, RadioButton, Text} from "react-native-paper";
import {mainTheme} from "../theme";
import {State} from "../types";
import {Todos, CategoryClass} from "../classTransformer/classes";
import {ADD_TODO, UPDATE_TODO} from "../redux/actions";

interface Props{
    todo?: Todos | null,
    openTask: (todo: Todos | null) => void,
    openEdit: Dispatch<SetStateAction<boolean>>
}

const TaskScreen: FC<Props> = ({openTask, todo= null, openEdit}) => {
    const data = useSelector((state: State) => state.data);
    const defaultCat = data.length? data[0].id.toString() : "";

    const [category, setCategory] = useState<string>(todo? todo.listId.toString() : defaultCat);
    const [text, setText] = useState(todo? todo.text : "");
    const dispatch = useDispatch();

    const editHandler = () => {
        if(todo){
            if(text.trim()) {
                dispatch(UPDATE_TODO(text, category, todo));
                openTask(null);
            }
        }else {
            if(text.trim()) {
                dispatch(ADD_TODO(text, category, false));
                openEdit(false);
            }
        }
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Appbar.Header style={styles.header}>
                        <Appbar.Action icon="arrow-left" onPress={() => {
                            setText("");
                            openTask(null);
                            openEdit(false);
                        }}/>
                        <Appbar.Action icon="check" color={mainTheme.colors.accent} onPress={editHandler}/>
                    </Appbar.Header>
                    <TextInput
                        underlineColor="transparent"
                        value={text}
                        onChangeText={setText}
                        placeholder="Название задачи"
                        style={styles.textInput}
                        autoFocus
                    />
                    <ScrollView style={styles.listWrap}>
                        <List.Subheader style={styles.listHeader}>Категория</List.Subheader>
                        <RadioButton.Group onValueChange={newValue => setCategory(newValue)}
                                           value={category}>
                            {data.map((list: CategoryClass): React.ReactNode => {
                                return (
                                    <TouchableOpacity key={list.id.toString()}
                                                      activeOpacity={0.8}
                                                      onPress={() => setCategory(list.id.toString())}>
                                        <View style={styles.radio}>
                                            <Text style={styles.radioLabel}>{list.title}</Text>
                                            <RadioButton.Android value={list.id.toString()} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                    </RadioButton.Group>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
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
        fontSize: 20,
        borderBottomWidth: 0
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