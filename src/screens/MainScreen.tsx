import React, {FC, useEffect, useState, useContext, Dispatch, SetStateAction} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, View, VirtualizedList} from "react-native";
import {Appbar, FAB, Text, Portal} from "react-native-paper";
import Category from "../components/Category";
import ModalWindow from "../components/ModalWindow";
import {GET_DATA} from "../redux/actions";
import {State} from "../types";
import {CategoryClass, Todos} from "../classTransformer/classes";

interface Props{
    openTask: (todo: Todos | null) => void,
    openEdit: Dispatch<SetStateAction<boolean>>
}


const MainScreen: FC<Props> = ({openTask, openEdit}) => {
    const [modal, setModal] = useState(false);
    const [enableScroll, setEnableScroll] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_DATA());
    }, [])

    const onSwipeEvent = (swiping: boolean): void => {
        if(swiping !== enableScroll) {
            setEnableScroll(() => swiping);
        }
    }


    const data = useSelector((state: State) => state.data);

    const getItemCount = (items: CategoryClass[]): number => {
        return items.length;
    }
    const getItem = (items:CategoryClass[], idx:number) => {
        return items[idx];
    }


    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Text style={styles.title}>Задачи</Text>
                <Appbar.Action icon="shape-outline"
                               onPress={() => setModal(!modal)}/>
            </Appbar.Header>
            {data.length?
            <>
                <VirtualizedList data={data}
                                 getItemCount={getItemCount}
                                 getItem={getItem}
                                 scrollEnabled={enableScroll}
                                 keyExtractor={(item:CategoryClass) => `root${item.id.toString()}`}
                                 renderItem={({item}) => <Category
                                                            key={`${item.id.toString()}`}
                                                            openTask={openTask}
                                                            onSwipe={onSwipeEvent}
                                                            title={item.title}
                                                            todos={item.todos}
                                                            id={item.id}/>}
                />
                <FAB
                    visible={!modal}
                    style={styles.fab}
                    icon="plus"
                    onPress={() => openEdit(true)}
                />
            </>
            : null}
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