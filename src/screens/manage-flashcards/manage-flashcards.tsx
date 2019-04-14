import { Button, Container, Content, Footer, Icon, Left, List, ListItem, Right, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { Header } from '../../components';
import { Deck, Flashcard } from '../../models';
import { NavigationService } from '../../services/navigation';
import { createFlashcard, editFlashcard } from '../../store/decks';

interface Props {
    workingDeck?: Deck;

    createFlashcard: typeof createFlashcard;
    editFlashcard: typeof editFlashcard;
}

export class ManageFlashcards extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        const workingDeck: Deck = this.props.workingDeck as Deck;
        return (
            <Container style={styles.container}>
                <Header>{workingDeck.name}</Header>

                <Content>
                    <List>
                        {workingDeck.flashcards.map((f: Flashcard) => (
                            <ListItem key={f.id} onPress={() => this.props.editFlashcard(f)}>
                                <Left>
                                    <Text>{f.name}</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Content>
                <Footer>
                    <Left>
                        <Button hasText transparent onPress={() => NavigationService.navigateTo('EditDeck')}>
                            <Text>Edit Name</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button hasText transparent onPress={this.props.createFlashcard}>
                            <Text>Create Flashcard</Text>
                        </Button>
                    </Right>
                </Footer>
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
