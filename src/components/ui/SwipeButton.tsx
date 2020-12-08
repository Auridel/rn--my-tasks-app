import React, {FC} from "react";
import {TouchableOpacity, View, StyleSheet, ViewStyle} from "react-native";
// @ts-ignore
import Icon from 'react-native-vector-icons/Feather'

type Props = {
    icon: string,
    color: string,
    onPress: (id:number) => void,
    id: number,
    buttonStyle: ViewStyle
}

const SwipeButton: FC<Props> = ({icon, color, onPress, id, buttonStyle}) => {

    return (
            <View style={{...styles.wrapper, ...buttonStyle}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(id)}>
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

export default SwipeButton;