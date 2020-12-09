import React, {FC} from "react";
import {TextInput} from "react-native-paper";
import {TouchableOpacity, View, StyleSheet} from "react-native";
import {mainTheme} from "../theme";

// @ts-ignore
import Icon from "react-native-vector-icons/Feather";

type Props = {
    saveHandler: () => void,
    value: string,
    setValue: (text: string) => void
}

const EditField: FC<Props> = ({saveHandler, value, setValue}) => {
    return (
        <View style={styles.inputWrap}>
            <TextInput style={styles.textInput}
                       placeholder="Введите название"
                       underlineColor="transparent"
                       value={value}
                       onChangeText={setValue}
                       autoFocus
                       autoCorrect={false}

            />
            <TouchableOpacity activeOpacity={0.7} onPress={saveHandler}>
                <Icon name="check" size={25} color={mainTheme.colors.accent}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default EditField;