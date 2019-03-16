import moment from 'moment';
import { Button, Container, Content, DeckSwiper, Icon, View } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import FlipCard from 'react-native-flip-card';

import { Flashcard as FlashcardComponent, Header } from '../../components';
import { Deck, Flashcard } from '../../models';
import { findNextViewDate, saveResponse, toggleFlip } from '../../store/decks';

interface Props {
    selectedDeck?: Deck;
    inProgressFlashcards: Flashcard[];
    flip: boolean;

    saveResponse: typeof saveResponse;
    toggleFlip: typeof toggleFlip;
}

export class FlashcardView extends Component<Props> {
    private deckSwiper: any;

    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <Container style={styles.container}>
                <Header>Flashcards</Header>
                <Content style={styles.content}>
                    <DeckSwiper
                        ref={(d) => (this.deckSwiper = d)}
                        looping={false}
                        dataSource={this.props.inProgressFlashcards}
                        onSwipeLeft={(card: Flashcard) => this.props.saveResponse(card.id, false)}
                        onSwipeRight={(card: Flashcard) => this.props.saveResponse(card.id, true)}
                        renderItem={(card: Flashcard) => (
                            <FlipCard style={styles.flashcard} flip={this.props.flip}>
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
                {(this.deckSwiper && this.deckSwiper._root.state.lastCard) ||
                this.props.inProgressFlashcards.length === 0 ? null : (
                    <Content>
                        <View style={styles.buttonGroup}>
                            <Button
                                iconLeft
                                onPress={() => {
                                    this.props.saveResponse(this.deckSwiper._root.state.selectedItem.id, false);
                                    this.deckSwiper._root.swipeLeft();
                                }}
                                style={{ paddingRight: 10 }}
                            >
                                <Icon name="arrow-back" />
                                <Text style={styles.buttonText}>Incorrect</Text>
                            </Button>
                            <Button onPress={this.props.toggleFlip} style={{ paddingHorizontal: 10 }}>
                                <Text style={styles.buttonText}>Flip card</Text>
                            </Button>
                            <Button
                                iconRight
                                onPress={() => {
                                    this.props.saveResponse(this.deckSwiper._root.state.selectedItem.id, true);
                                    this.deckSwiper._root.swipeRight();
                                }}
                                style={{ paddingLeft: 10 }}
                            >
                                <Text style={styles.buttonText}>Correct</Text>
                                <Icon name="arrow-forward" />
                            </Button>
                        </View>
                    </Content>
                )}
            </Container>
        );
    }
}

interface Styles {
    buttonGroup: ViewStyle;
    buttonText: TextStyle;
    container: ViewStyle;
    content: ViewStyle;
    emptyMessage: TextStyle;
    flashcard: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    buttonText: {
        color: '#fff',
        padding: 5,
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
