import { Button, Container, Content, Footer, Icon, Left, List, ListItem, Right, Text } from 'native-base';
import React, { Component } from 'react';

import { Header } from '../../components';
import { Deck } from '../../models';
import { createDeck, loadDecks, selectWorkingDeck } from '../../store/decks';

interface Props {
    decks: Deck[];

    loadDecks: typeof loadDecks;
    selectWorkingDeck: typeof selectWorkingDeck;
    createDeck: typeof createDeck;
}

export class ManageDecks extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public componentDidMount() {
        this.props.loadDecks();
    }

    public render() {
        return (
            <Container>
                <Header>Decks</Header>
                <Content>
                    <List>
                        {this.props.decks.map((d: Deck) => (
                            <ListItem key={d.id} onPress={() => this.props.selectWorkingDeck(d)}>
                                <Left>
                                    <Text>{d.name}</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Content>
                <Footer>
                    <Button hasText transparent onPress={this.props.createDeck}>
                        <Text>Create Deck</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}
