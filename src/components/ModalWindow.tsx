import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {FlatList, Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from "react-native";
import {List, Modal, TextInput} from "react-native-paper";
import SwipeButton from "./ui/SwipeButton";
import {mainTheme} from "../theme";
import {Data} from "../types";
// @ts-ignore
import Icon from "react-native-vector-icons/Feather";



type Props = {
    modal: boolean,
    setModal: Dispatch<SetStateAction<boolean>>,
    data: Data[]
}

const ModalWindow: FC<Props> = ({modal, setModal, data}) => {
    const [banner, setBanner] = useState(false);
    const [text, setText] = useState("");

    return (
        <Modal visible={modal}
               contentContainerStyle={styles.modal}
               onDismiss={() => {
                   setModal(!modal);
                   setBanner(false);
               }}
               dismissable>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === "ios"? 300 : 0}

            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.modalWrap}>
                        <FlatList data={data} keyExtractor={(item) => `modal${item.id}`}
                                  renderItem={({item}) => <List.Item
                                      title={item.title}
                                      right={() => <SwipeButton icon="trash-2"
                                                                color={mainTheme.colors.error}
                                                                onPress={() => console.log("delete" + item.id)}
                                                                id={item.id}
                                                                buttonStyle={{}}/>}
                                  />}
                        />

                        {banner &&
                            <View style={styles.inputWrap}>
                                <TextInput style={styles.textInput}
                                           placeholder="Введите название"
                                           value={text}
                                           onChangeText={setText}
                                           autoFocus
                                />
                                <TouchableOpacity activeOpacity={0.7} onPress={() => console.log(text)}>
                                    <Icon name="check" size={25} color={mainTheme.colors.accent}/>
                                </TouchableOpacity>
                            </View>
                        }

                        <TouchableOpacity activeOpacity={0.7} onPress={() => setBanner(!banner)}>
                            <View style={styles.addCategory}>
                                <Text style={styles.addText}>Новая категория</Text>
                                <Icon name="plus" size={25} color={mainTheme.colors.disabled}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        zIndex: 2,
        width: "100%",

        bottom: 0
    },
    modalWrap: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: mainTheme.colors.background
    },
    addCategory: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 30,
        paddingVertical: 10
    },
    addText: {
        fontSize: 16,
        color: mainTheme.colors.disabled
    },
    inputWrap: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingLeft: 15,
        paddingRight: 30,
    },
    textInput: {
        flex: 1,
        marginRight: 20,
        backgroundColor: mainTheme.colors.background,
        borderBottomWidth: 0
    }
})

export default ModalWindow;