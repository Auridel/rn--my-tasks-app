import React, {FC} from "react";
import {View, StyleSheet} from "react-native";
// @ts-ignore
import Icon from 'react-native-vector-icons/Feather'


type Props = {
    icon: string,
    color: string,
}

const SwipeIcon: FC<Props> = ({icon, color}) => {

    return (
        <View style={styles.wrapper}>
            <Icon name={icon}
                  size={25}
                  color={color}/>
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

export default SwipeIcon;