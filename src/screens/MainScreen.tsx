import React, {FC, useState} from "react";
import {StyleSheet, View, Text, FlatList} from "react-native";
import {Appbar, FAB} from "react-native-paper";
import Category from "../components/Category";
import ModalWindow from "../components/ModalWindow";
import {data} from "../data";


const MainScreen: FC = () => {
    const [modal, setModal] = useState(true);
    const [enableScroll, setEnableScroll] = useState(true);

    const onSwipeEvent = (swiping: boolean): void => {
        if(swiping !== enableScroll) {
            setEnableScroll(swiping);
        }
    }



    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Text style={styles.title}>Задачи</Text>
                <Appbar.Action icon="shape-outline" onPress={() => setModal(!modal)}/>
            </Appbar.Header>
            <FlatList data={data}
                      scrollEnabled={enableScroll}
                      keyExtractor={(item) => `root${item.id.toString()}`}
                      renderItem={({item}) => <Category
                                                        key={`${item.id.toString()}`}
                                                        onSwipe={onSwipeEvent}
                                                        title={item.title}
                                                        todos={item.todos}
                                                        id={item.id}/>}
            />
            <FAB
                visible={!modal}
                style={styles.fab}
                icon="plus"
                onPress={() => console.log('Pressed')}
            />
            <ModalWindow modal={modal} setModal={setModal} data={data}/>
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