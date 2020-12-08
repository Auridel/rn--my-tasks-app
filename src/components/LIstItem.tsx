import React, {FC} from "react";
import {List} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {SwipeListView} from 'react-native-swipe-list-view';
import SwipeButton from "./ui/SwipeButton";
import {Todo} from "../types";
import {mainTheme} from "../theme";

type Props = {
    data: Todo[],
    icon: string,
    completed: boolean,
    id: string,
    onSwipe: (swipe:boolean) => void
}



const ItemList: FC<Props> = ({data, icon, completed,id, onSwipe}) => {

    const editHandler = (id: number): void => {
        console.log(id)
    }

    const deleteHandler = (id: number): void => {
        console.log(id)
    }

    return (
        <View>
        <SwipeListView
            data={data}
            swipeToOpenPercent={15}

            onScrollEnabled={(isEnabled) => onSwipe(isEnabled)}
            keyExtractor={item => `${item.id}`}
            listKey={id}
            renderItem={ (data, rowMap) => (
                <List.Item title={data.item.text}
                           key={`nest${data.item.id.toString()}`}
                           style={styles.listItem}
                           titleStyle={completed? styles.completedText : {}}
                           left={props => <List.Icon {...props} color={completed? mainTheme.colors.accent : ""} icon={icon}/>}
                />
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <SwipeButton color={mainTheme.colors.disabled}
                                 icon="edit-3" onPress={editHandler}
                                 id={data.item.id}
                                 buttonStyle={styles.buttonLeft}/>
                    <SwipeButton color={mainTheme.colors.error}
                                 icon="trash-2" onPress={deleteHandler}
                                 id={data.item.id}
                                 buttonStyle={styles.buttonRight}/>
                </View>
            )}
            leftOpenValue={70}
            rightOpenValue={-70}

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