import { Button, Container, Content, Footer, Icon, Left, List, ListItem, Right, Text } from 'native-base';
import React, { Component } from 'react';

import { Header } from '../../components';
import { Deck } from '../../models';
import { NavigationService } from '../../services';
import { createDeck, loadDecks, selectDeck } from '../../store/decks';

interface Props {
    decks: Deck[];

    loadDecks: typeof loadDecks;
    selectDeck: typeof selectDeck;
    createDeck: typeof createDeck;
}

export class Home extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public componentDidMount() {
        this.props.loadDecks();
    }

    public render() {
        return (
            <Container>
                <Header
                    headerLeft={null}
                    headerRight={
                        <Button hasText transparent onPress={() => NavigationService.navigateTo('Login')}>
                            <Text>Login</Text>
                        </Button>
                    }
                >
                    Home
                </Header>
                <Content>
                    <List>
                        {this.props.decks.map((d: Deck) => (
                            <ListItem key={d.name} onPress={() => this.props.selectDeck(d)}>
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
