import { Button, Container, Content, Form, Input, Item, Label, Text } from 'native-base';
import React, { Component } from 'react';

import { Header } from '../../components';
import { Deck } from '../../models';
import { saveDeck, setWorkingDeck } from '../../store/decks';

interface Props {
    workingDeck?: Deck;

    saveDeck: typeof saveDeck;
    setWorkingDeck: typeof setWorkingDeck;
}

export class EditDeck extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        const workingDeck: Deck = this.props.workingDeck as Deck;
        return (
            <Container>
                <Header
                    headerRight={
                        <Button hasText transparent onPress={this.props.saveDeck}>
                            <Text>Save</Text>
                        </Button>
                    }
                >
                    Edit Deck
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel last>
                            <Label>Deck Name</Label>
                            <Input
                                onChangeText={(name: string) => this.props.setWorkingDeck({ ...workingDeck, name })}
                                value={workingDeck.name}
                            />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}
