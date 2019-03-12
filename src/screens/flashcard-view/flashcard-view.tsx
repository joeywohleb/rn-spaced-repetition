import { Body, Card, CardItem, Container, Content, DeckSwiper, Left } from 'native-base';
import React, { Component } from 'react';
import { Text } from 'react-native';
import FlipCard from 'react-native-flip-card';

import { Header } from '../../components';
import { Deck, Flashcard } from '../../models';
import { saveResponse } from '../../store/decks';

interface Props {
    selectedDeck?: Deck;

    saveResponse: typeof saveResponse;
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
                <Content style={{ padding: 10 }}>
                    <DeckSwiper
                        dataSource={this.props.selectedDeck.flashcards}
                        onSwipeLeft={(card: Flashcard) => this.props.saveResponse(card.id, false)}
                        onSwipeRight={(card: Flashcard) => this.props.saveResponse(card.id, true)}
                        renderItem={(card: Flashcard) => (
                            <FlipCard style={{ borderWidth: 0, elevation: 3, flex: 1 }}>
                                <Card style={{ minHeight: 200 }}>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                                <Text>{card.front}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                </Card>
                                <Card style={{ minHeight: 200 }}>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                                <Text>{card.back}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                </Card>
                            </FlipCard>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}
