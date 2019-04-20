import _ from 'lodash';
import { Button, Container, Content, Footer, Icon, Left, List, ListItem, Right, Row, Text } from 'native-base';
import React, { Component, ReactText } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import SortableList, { RowProps } from 'react-native-sortable-list';

import { NavigationEvents } from 'react-navigation';
import { Header } from '../../components';
import { Deck, Flashcard } from '../../models';
import { NavigationService } from '../../services/navigation';
import { createFlashcard, editFlashcard, saveFlashcardOrder } from '../../store/decks';

interface Props {
    workingDeck?: Deck;

    createFlashcard: typeof createFlashcard;
    editFlashcard: typeof editFlashcard;
    saveFlashcardOrder: typeof saveFlashcardOrder;
}

interface State {
    isEditing: boolean;
    scrollEnabled: boolean;
    currentOrder: ReactText[];
}

export class ManageFlashcards extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            isEditing: false,
            scrollEnabled: true,
            currentOrder: _.orderBy((this.props.workingDeck as Deck).flashcards, 'order').map((f: Flashcard) => {
                return f.id;
            }),
        };
    }

    public render() {
        const workingDeck: Deck = this.props.workingDeck as Deck;
        const flashcards = _.orderBy(workingDeck.flashcards, 'order').reduce((obj: any, item) => {
            obj[item.id] = item;
            return obj;
        }, {});

        const activeFlashcards = workingDeck.flashcards.filter((f: Flashcard) => f.isActive);
        const inactiveFlashcards = workingDeck.flashcards.filter((f: Flashcard) => !f.isActive);

        return (
            <Container style={styles.container}>
                <Header
                    headerLeft={
                        this.state.isEditing ? (
                            <Button
                                hasText
                                transparent
                                onPress={() => this.setState({ isEditing: !this.state.isEditing })}
                            >
                                <Text>Cancel</Text>
                            </Button>
                        ) : (
                            undefined
                        )
                    }
                    headerRight={
                        <Button hasText transparent onPress={this.save}>
                            <Text>{this.state.isEditing ? 'Save' : 'Edit'}</Text>
                        </Button>
                    }
                >
                    {workingDeck.name}
                </Header>

                <NavigationEvents onDidBlur={() => this.setState({ isEditing: false })} />

                <Content scrollEnabled={this.state.scrollEnabled}>
                    {this.state.isEditing ? (
                        <List>
                            <SortableList
                                contentContainerStyle={{ flex: 1 }}
                                data={flashcards}
                                scrollEnabled={false}
                                order={this.state.currentOrder}
                                onActivateRow={() => this.setState({ scrollEnabled: false })}
                                onReleaseRow={() => this.setState({ scrollEnabled: true })}
                                onChangeOrder={(nextOrder) => this.setState({ currentOrder: nextOrder })}
                                renderRow={(row: RowProps) => (
                                    <Row
                                        key={row.key}
                                        style={{
                                            padding: 10,
                                            marginLeft: 7,
                                            flex: 1,
                                            borderBottomWidth: 0.5,
                                            borderColor: '#c9c9c9',
                                        }}
                                    >
                                        <Left>
                                            <Text>{row.data.name}</Text>
                                        </Left>
                                        <Right>
                                            <Icon name="reorder" />
                                        </Right>
                                    </Row>
                                )}
                            />
                        </List>
                    ) : (
                        <List>
                            {activeFlashcards.length > 0 && (
                                <ListItem itemDivider>
                                    <Text>Active</Text>
                                </ListItem>
                            )}
                            {activeFlashcards.map((f: Flashcard) => (
                                <ListItem key={f.id} onPress={() => this.props.editFlashcard(f)}>
                                    <Left>
                                        <Text>{f.name}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            ))}
                            {inactiveFlashcards.length > 0 && (
                                <ListItem itemDivider>
                                    <Text>Inactive</Text>
                                </ListItem>
                            )}
                            {inactiveFlashcards.map((f: Flashcard) => (
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
                    )}
                </Content>
                <Footer>
                    <Left>
                        <Button hasText transparent onPress={() => NavigationService.navigateTo('EditDeck')}>
                            <Text>Edit</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button hasText transparent onPress={this.props.createFlashcard}>
                            <Text>Add Flashcard</Text>
                        </Button>
                    </Right>
                </Footer>
            </Container>
        );
    }

    private save = () => {
        if (this.state.isEditing) {
            this.props.saveFlashcardOrder(this.state.currentOrder);
        }
        this.setState({ isEditing: !this.state.isEditing });
    };
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
