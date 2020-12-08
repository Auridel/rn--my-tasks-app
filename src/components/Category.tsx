import React, {FC, useState} from "react";
import {StyleSheet, View} from "react-native";
import {List} from "react-native-paper";
import Accordion from "./ui/Accordion";
import {Todo} from "../types";
import {mainTheme} from "../theme";
import ListItem from "./LIstItem";


type Props = {
    title: string,
    todos: Todo[],
    id: number,
    onSwipe: (swipe:boolean) => void
}

const Category: FC<Props> = ({title, todos, id, onSwipe}) => {
    const [expanded, setExpanded] = useState(false);

    const completedTodos = todos.filter(todo => todo.checked);
    const uncompletedTodos = todos.filter(todo => !todo.checked);

    const completedEmpty = !!completedTodos.length;
    const accordionTextStyle = completedEmpty?
        styles.completedAccordion : {...styles.completedAccordion, ...styles.emptyListLabel};


    return (
        <List.Section>
            <View style={styles.list}>
                <List.Subheader>{title}</List.Subheader>
                <ListItem data={uncompletedTodos}  id={id.toString()} icon="checkbox-blank-circle-outline" completed={false} onSwipe={onSwipe}/>
                <Accordion id={id.toString()}
                           title="Завершенные"
                           titleStyle={accordionTextStyle}
                           expanded={expanded}
                           onPress={() => {
                               if(completedEmpty) setExpanded(!expanded);
                           }}
                >
                    <ListItem data={completedTodos} icon="check" id={"completed" + id.toString()} completed={true} onSwipe={onSwipe}/>
                </Accordion>
            </View>
        </List.Section>
    )
}

const styles = StyleSheet.create({
    list: {

    },
    completedAccordion: {
        fontSize: 16,
        color: mainTheme.colors.text,
        marginLeft: 15
    },
    emptyListLabel: {
        color: mainTheme.colors.disabled
    },
    completedText: {
        textDecorationLine: "line-through",
        color: mainTheme.colors.disabled
    }
})

export default Category;