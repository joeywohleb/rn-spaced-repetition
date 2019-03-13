import moment from 'moment';
import { Container, Content, DeckSwiper } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import FlipCard from 'react-native-flip-card';

import { Flashcard as FlashcardComponent, Header } from '../../components';
import { Deck, Flashcard } from '../../models';
import { findNextViewDate, saveResponse } from '../../store/decks';

interface Props {
    selectedDeck?: Deck;
    inProgressFlashcards: Flashcard[];

    saveResponse: typeof saveResponse;
}

export class FlashcardView extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <Container style={styles.container}>
                <Header>Flashcards</Header>
                <Content style={styles.content}>
                    <DeckSwiper
                        looping={false}
                        dataSource={this.props.inProgressFlashcards}
                        onSwipeLeft={(card: Flashcard) => this.props.saveResponse(card.id, false)}
                        onSwipeRight={(card: Flashcard) => this.props.saveResponse(card.id, true)}
                        renderItem={(card: Flashcard) => (
                            <FlipCard style={styles.flashcard}>
                                <FlashcardComponent>{card.front}</FlashcardComponent>
                                <FlashcardComponent>{card.back}</FlashcardComponent>
                            </FlipCard>
                        )}
                        renderEmpty={() => (
                            <Text style={styles.emptyMessage}>
                                All done! Next group ready {moment().to(findNextViewDate(this.props.selectedDeck))}.
                            </Text>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}

interface Styles {
    card: ViewStyle;
    container: ViewStyle;
    content: ViewStyle;
    emptyMessage: TextStyle;
    flashcard: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    card: {
        minHeight: 200,
    },
    container: {
        flex: 1,
    },
    content: {
        padding: 10,
    },
    emptyMessage: {
        padding: 10,
        textAlign: 'center',
    },
    flashcard: {
        borderWidth: 0,
        elevation: 3,
        flex: 1,
    },
});
