import React, {FC} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Appbar, FAB} from "react-native-paper";


const MainScreen: FC = () => {
    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Text style={styles.title}>Задачи</Text>
                <Appbar.Action icon="shape-outline" onPress={() => console.log("shape")}/>
            </Appbar.Header>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        elevation: 0,
        shadowRadius: 0,
        height: 90,
        justifyContent: "space-between"
    },
    title: {
        alignItems: "flex-start",
        fontSize: 20,
        marginLeft: 70
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})

export default MainScreen;