import React, {FC} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Appbar, FAB} from "react-native-paper";
import Category from "../components/Category";
import {data} from "../data";

const MainScreen: FC = () => {
    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Text style={styles.title}>Задачи</Text>
                <Appbar.Action icon="shape-outline" onPress={() => console.log("shape")}/>
            </Appbar.Header>
            <ScrollView>
                {data.map(item => <Category key={item.id}
                                            title={item.title}
                                            todos={item.todos}
                                            id={item.id}/>)}
            </ScrollView>
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