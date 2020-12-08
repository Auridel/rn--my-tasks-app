import React, {FC, useState} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Appbar, List, TextInput, RadioButton} from "react-native-paper";
import {mainTheme} from "../theme";

const TaskScreen: FC = () => {
    const [text, setText] = useState("");
    const [category, setCategory] = useState<string>("");

    return (
        <View>
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.Action icon="arrow-left" onPress={() => console.log("back")}/>
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
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setCategory("first")}>
                            <View style={styles.radio}>
                                <Text style={styles.radioLabel}>First</Text>
                                <RadioButton.Android value="first" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setCategory("second")}>
                            <View style={styles.radio}>
                                <Text style={styles.radioLabel}>second</Text>
                                <RadioButton.Android value="second" />
                            </View>
                        </TouchableOpacity>
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