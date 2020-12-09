import React, {FC} from "react";
import {TouchableOpacity, View, StyleSheet, ViewStyle} from "react-native";
// @ts-ignore
import Icon from 'react-native-vector-icons/Feather'

import {Todos} from "../../classTransformer/classes";

type Props = {
    icon: string,
    color: string,
    buttonStyle: ViewStyle
}

const SwipeButton: FC<Props> = ({icon, color, buttonStyle}) => {

    return (
            <View style={{...styles.wrapper, ...buttonStyle}}>
                <Icon name={icon} size={25} color={color}/>
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