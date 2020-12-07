import * as React from 'react';
import color from 'color'
import {
    View,
    ViewStyle,
    StyleSheet,
    StyleProp,
    TextStyle,
    I18nManager,
} from 'react-native';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple/TouchableRipple';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import Text from 'react-native-paper/src/components/Typography/Text';
import { withTheme } from 'react-native-paper/src/core/theming'

import { ListAccordionGroupContext } from 'react-native-paper/src/components/List/ListAccordionGroup';


type Props = {
    title: React.ReactNode;
    description?: React.ReactNode;
    left?: (props: { color: string }) => React.ReactNode;
    expanded?: boolean;
    onPress?: () => void;
    children: React.ReactNode;
    theme: ReactNativePaper.Theme;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
    titleNumberOfLines?: number;
    descriptionNumberOfLines?: number;
    id?: string | number;
    testID?: string;
};

const Accordion = ({
                           left,
                           title,
                           description,
                           children,
                           theme,
                           titleStyle,
                           descriptionStyle,
                           titleNumberOfLines = 1,
                           descriptionNumberOfLines = 2,
                           style,
                           id,
                           testID,
                           onPress,
                           expanded: expandedProp,
                       }: Props) => {
    const [expanded, setExpanded] = React.useState<boolean>(
        expandedProp || false
    );

    const handlePressAction = () => {
        onPress?.();

        if (expandedProp === undefined) {
            // Only update state of the `expanded` prop was not passed
            // If it was passed, the component will act as a controlled component
            setExpanded((expanded) => !expanded);
        }
    };

    const titleColor = color(theme.colors.text).alpha(0.87).rgb().string();
    const descriptionColor = color(theme.colors.text).alpha(0.54).rgb().string();

    const expandedInternal = expandedProp !== undefined ? expandedProp : expanded;

    const groupContext = React.useContext(ListAccordionGroupContext);
    if (groupContext !== null && !id) {
        throw new Error(
            'List.Accordion is used inside a List.AccordionGroup without specifying an id prop.'
        );
    }
    const isExpanded = groupContext
        ? groupContext.expandedId === id
        : expandedInternal;
    const handlePress =
        groupContext && id !== undefined
            ? () => groupContext.onAccordionPress(id)
            : handlePressAction;
    return (
        <View>
            <TouchableRipple
                style={[styles.container, style]}
                onPress={handlePress}
                accessibilityTraits="button"
                accessibilityComponentType="button"
                accessibilityRole="button"
                testID={testID}
            >
                <View style={styles.row} pointerEvents="none">
                    <View
                        style={[styles.item, description ? styles.multiline : undefined]}
                    >
                        <MaterialCommunityIcon
                            name={isExpanded ? 'chevron-up' : 'chevron-down'}
                            color={titleColor}
                            size={24}
                            direction={I18nManager.isRTL ? 'rtl' : 'ltr'}
                        />
                    </View>
                    {left
                        ? left({
                            color: isExpanded ? theme.colors.primary : descriptionColor,
                        })
                        : null}
                    <View style={[styles.item, styles.content]}>
                        <Text
                            numberOfLines={titleNumberOfLines}
                            style={[
                                styles.title,
                                {
                                    color: isExpanded ? theme.colors.primary : titleColor,
                                },
                                titleStyle,
                            ]}
                        >
                            {title}
                        </Text>
                        {description && (
                            <Text
                                numberOfLines={descriptionNumberOfLines}
                                style={[
                                    styles.description,
                                    {
                                        color: descriptionColor,
                                    },
                                    descriptionStyle,
                                ]}
                            >
                                {description}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableRipple>
            {isExpanded
                ? React.Children.map(children, (child) => {
                    if (
                        left &&
                        React.isValidElement(child) &&
                        !child.props.left &&
                        !child.props.right
                    ) {
                        return React.cloneElement(child, {
                            style: [styles.child, child.props.style],
                        });
                    }

                    return child;
                })
                : null}
        </View>
    );
};

Accordion.displayName = 'List.Accordion';

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    multiline: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
    },
    description: {
        fontSize: 14,
    },
    item: {
        margin: 8,
    },
    child: {
        paddingLeft: 64,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default withTheme(Accordion);