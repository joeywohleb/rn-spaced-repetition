import { Button, Container, Content, Form, Input, Item, Text, Textarea } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import { Header } from '../../components';
import { Deck, Flashcard } from '../../models';
import { saveFlashcard, setWorkingFlashcard } from '../../store/decks';

interface Props {
    workingDeck?: Deck;
    workingFlashcard?: Flashcard;

    saveFlashcard: typeof saveFlashcard;
    setWorkingFlashcard: typeof setWorkingFlashcard;
}

export class CreateFlashcard extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        const workingFlashcard: Flashcard = this.props.workingFlashcard as Flashcard;
        return (
            <Container>
                <Header
                    headerRight={
                        <Button hasText transparent onPress={this.props.saveFlashcard}>
                            <Text>Save</Text>
                        </Button>
                    }
                >
                    Create Card
                </Header>
                <Content style={styles.content}>
                    <Form style={styles.formGroup}>
                        <Item regular>
                            <Input
                                placeholder="Name"
                                onChangeText={(name: string) =>
                                    this.props.setWorkingFlashcard({ ...workingFlashcard, name })
                                }
                                value={workingFlashcard.name}
                            />
                        </Item>
                    </Form>
                    <Form style={styles.formGroup}>
                        <Item regular>
                            <Input
                                placeholder="Front"
                                onChangeText={(front: string) =>
                                    this.props.setWorkingFlashcard({ ...workingFlashcard, front })
                                }
                                value={workingFlashcard.front}
                                style={styles.formGroup}
                            />
                        </Item>
                    </Form>
                    <Form style={styles.formGroup}>
                        <Textarea
                            placeholder="Back"
                            rowSpan={5}
                            bordered
                            onChangeText={(back: string) =>
                                this.props.setWorkingFlashcard({ ...workingFlashcard, back })
                            }
                            value={workingFlashcard.back}
                        />
                    </Form>
                </Content>
            </Container>
        );
    }
}

interface Styles {
    content: ViewStyle;
    formGroup: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    content: {
        padding: 10,
    },
    formGroup: {
        paddingBottom: 10,
    },
});
