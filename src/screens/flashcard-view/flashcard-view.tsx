import { Body, Card, CardItem, Container, Content, Left } from 'native-base';
import React, { Component } from 'react';
import { Text } from 'react-native';
import FlipCard from 'react-native-flip-card';

import { Header } from '../../components';
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
            <Container style={{ flex: 1 }}>
                <Header>Flashcards</Header>
                <Content style={{ flex: 1 }}>
                    <FlipCard style={{ borderWidth: 0, elevation: 3, flex: 1 }}>
                        <Card style={{ minHeight: 100 }}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text>{this.props.selectedDeck.cards[0].front}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={{ minHeight: 100 }}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text>{this.props.selectedDeck.cards[0].back}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                    </FlipCard>
                </Content>
            </Container>
        );
    }
}
