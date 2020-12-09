import React, {FC} from "react";
import {TouchableOpacity, View, StyleSheet} from "react-native";

// @ts-ignore
import Icon from 'react-native-vector-icons/Feather'

import {CategoryClass, Todos} from "../../classTransformer/classes";

type Props = {
    icon: string,
    color: string,
    onPress: (item: CategoryClass) => void,
    item: CategoryClass
}

const ListButton: FC<Props> = ({icon, color, onPress, item}) => {

    return (
            <View style={styles.wrapper}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    if(onPress) onPress(item)
                }}>
                    <Icon name={icon} size={25} color={color}/>
                </TouchableOpacity>
            </View>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        height: 55
    }
})

export default ListButton;