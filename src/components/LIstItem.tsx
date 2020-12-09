import React, {FC} from "react";
import {useDispatch} from "react-redux";
import {List} from "react-native-paper";
import {StyleSheet, View, Dimensions} from "react-native";
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import SwipeButton from "./ui/SwipeButton";
import {Todos} from "../classTransformer/classes";
import {mainTheme} from "../theme";
import {CHECK_TODO} from "../redux/actions";

type Props = {
    data: Todos[],
    icon: string,
    completed: boolean,
    id: string,
    onSwipe: (swipe:boolean) => void,
    openTask: (todo: Todos | null) => void
}
interface swipeObj {
    key: string,
    value: number,
    direction: string
}

const actionWidth = Dimensions.get("window").width / 2;


const ItemList: FC<Props> = ({data, icon, completed,id, onSwipe, openTask}) => {
    const dispatch = useDispatch();

    const editTodo = (key: string): void => {
        const todo = data.find(el => el.id.toString() === key);
        if(todo) openTask(todo);
    }

    const deleteHandler = (id: number): void => {
        console.log(id)
    }

    const onSwipeValueChange = ({key, value, direction}: swipeObj) => {
        if(direction === "left" && value < -actionWidth) console.log("del " + key);
        if(direction === "right" && value > actionWidth) editTodo(key);
    }

    return (
        <View>
        <SwipeListView
            data={data}
            onSwipeValueChange={onSwipeValueChange}
            closeOnRowPress={true}
            closeOnScroll={false}
            onScrollEnabled={(isEnabled) => onSwipe(isEnabled)}
            keyExtractor={item => `${item.id}`}
            listKey={id}
            renderItem={ (data, rowMap) => (
                <List.Item title={data.item.text}
                           key={`nest${data.item.id.toString()}`}
                           style={styles.listItem}
                           onPress={() => {
                               if(!rowMap[data.item.id.toString()].isOpen){
                                   dispatch(CHECK_TODO({item: data.item, checked: !data.item.checked}));
                               }
                           }}
                           titleStyle={completed? styles.completedText : {}}
                           left={props => <List.Icon {...props} color={completed? mainTheme.colors.accent : ""} icon={icon}/>}
                />
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View
                    style={styles.rowBack}>
                    <SwipeButton color={mainTheme.colors.disabled}
                                 icon="edit-3"
                                 buttonStyle={styles.buttonLeft}/>
                    <SwipeButton color={mainTheme.colors.error}
                                 icon="trash-2"
                                 buttonStyle={styles.buttonRight}/>
                </View>
            )}


        />
        </View>
    )
}

const styles = StyleSheet.create({

    rowBack: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    listItem:{
        backgroundColor: "#fff",
        alignItems: "center",
    },
    completedText: {
        textDecorationLine: "line-through",
        color: mainTheme.colors.disabled
    },
    buttonLeft: {
        borderRightWidth: 1,
        borderColor: mainTheme.colors.disabled,
        borderStyle: "solid",
    },
    buttonRight: {
        borderLeftWidth: 1,
        borderColor: mainTheme.colors.disabled,
        borderStyle: "solid",
    }
})

export default ItemList;