import { Body, Card, CardItem, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

interface Props {
    children: string;
}

export class Flashcard extends Component<Props> {
    public static defaultProps: Props;

    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <Body style={styles.body}>
                        <Text>{this.props.children}</Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
Flashcard.defaultProps = {
    children: '',
};

interface Styles {
    body: ViewStyle;
    card: ViewStyle;
    cardItem: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    body: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        minHeight: 250,
    },
    cardItem: {
        flex: 1,
    },
});
