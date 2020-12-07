import React, {FC, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {List, useTheme} from "react-native-paper";
import Accordion from "./ui/Accordion";
import {Todo} from "../types";
import {mainTheme} from "../theme";

type Props = {
    title: string,
    todos: Todo[],
    id: number
}

const Category: FC<Props> = ({title, todos, id}) => {
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
                {uncompletedTodos.map(item => {
                    return <List.Item title={item.text}
                                      key={item.id}
                                      left={props => <List.Icon {...props} icon="checkbox-blank-circle-outline"/>}
                                      />
                })}
                <Accordion left={() => <Text style={accordionTextStyle}>Завершенные</Text>}
                           id={id}
                           title=""
                           expanded={expanded}
                           onPress={() => {
                               if(completedEmpty) setExpanded(!expanded);
                           }}
                >
                    {completedTodos.map(item => <List.Item key={item.id}
                                                           title={item.text}
                                                           titleStyle={styles.completedText}
                                                           left={props => <List.Icon {...props} color={mainTheme.colors.accent} icon="check" />}
                    />)}
                </Accordion>
            </View>
        </List.Section>
    )
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20
    },
    completedAccordion: {
        fontSize: 16,
        color: mainTheme.colors.text
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