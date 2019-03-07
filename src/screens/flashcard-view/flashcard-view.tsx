import { Body, Card, CardItem, Container, Content, Header, Left, Title } from 'native-base';
import React, { Component } from 'react';
import { Text } from 'react-native';

import { Deck } from '../../models';

interface Props {
    selectedDeck?: Deck;
}

export class FlashcardView extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        if (!this.props.selectedDeck) {
            return null;
        }
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Flashcards</Title>
                    </Body>
                </Header>
                <Content>
                    <Card style={{ elevation: 3 }}>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text>{this.props.selectedDeck.cards[0].front}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
