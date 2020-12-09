import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {useDispatch} from "react-redux";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from "react-native";
import {List, Modal, Portal} from "react-native-paper";
import ListButton from "./ui/ListButton";
import {mainTheme} from "../theme";
import {CategoryClass} from "../classTransformer/classes";
import {ADD_LIST, DELETE_LIST, EDIT_LIST} from "../redux/actions";

// @ts-ignore
import Icon from "react-native-vector-icons/Feather";
import EditField from "./EditField";


type Props = {
    modal: boolean,
    setModal: Dispatch<SetStateAction<boolean>>,
    data: CategoryClass[] | []
}

const ModalWindow: FC<Props> = ({modal, setModal, data}) => {
    const [banner, setBanner] = useState(false);
    const [text, setText] = useState("");

    const [edit, setEdit] = useState<null | number>(null);
    const [title, setTitle] = useState("");

    const dispatch = useDispatch();


    const saveHandler = () => {
        if(text.trim()) {
            dispatch(ADD_LIST(text));
            setText("");
            setBanner(false);
        }
    }
    const deleteHandler = (id: number) => {
        dispatch(DELETE_LIST(id));
    }
    const editHandler = () => {
        if(title.trim() && edit){
            dispatch(EDIT_LIST(title, edit));
            setEdit(null);
        }
    }

    return (
        <Portal>
        <Modal visible={modal}
               contentContainerStyle={styles.modal}
               onDismiss={() => {
                   setModal(!modal);
                   setBanner(false);
               }}
               dismissable>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === "ios"? 350 : 0}

            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ScrollView style={styles.modalWrap} keyboardShouldPersistTaps="handled" keyboardDismissMode="none">
                        <View style={{flex: 1, paddingBottom: 50}}>
                        {data.length?
                            data.map((el: CategoryClass): React.ReactNode => <TouchableOpacity key={el.id.toString()} onLongPress={() => {
                                setEdit(el.id);
                                setTitle(el.title);
                            }}>
                                {(edit && el.id === edit)? <EditField saveHandler={editHandler} value={title} setValue={setTitle}/>
                                    :
                                    <List.Item
                                          title={el.title}
                                          right={() => <ListButton icon="trash-2"
                                                                   color={mainTheme.colors.error}
                                                                   item={el}
                                                                   onPress={() => deleteHandler(el.id)}/>}
                                    /> }
                                    </TouchableOpacity>)
                            : null}

                        {banner &&
                            <EditField saveHandler={saveHandler} value={text} setValue={setText}/>
                        }

                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            setText("");
                            setBanner(!banner);
                        }}>
                            <View style={styles.addCategory}>
                                <Text style={styles.addText}>Новая категория</Text>
                                <Icon name="plus" size={25} color={mainTheme.colors.disabled}/>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
        </Portal>
    )
}


const styles = StyleSheet.create({
    modal: {
        position: "absolute",

        width: "100%",
        height: 300,
        bottom: 0
    },
    modalWrap: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 40,
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
    }
})

export default ModalWindow;