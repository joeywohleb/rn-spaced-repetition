import { Body, Card, CardItem, Container, Content, Header, Left, Title } from 'native-base';
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Deck } from '../../models';
import { FlipFlashcardAction } from '../../store/decks';

interface Props {
    selectedDeck?: Deck;
    displayAnswer: boolean;

    flipFlashcard: () => FlipFlashcardAction;
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
                    <TouchableOpacity onPress={this.props.flipFlashcard}>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text>
                                            {this.props.displayAnswer
                                                ? this.props.selectedDeck.cards[0].back
                                                : this.props.selectedDeck.cards[0].front}
                                        </Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}
