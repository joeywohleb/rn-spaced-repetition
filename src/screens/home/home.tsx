import { Button, Container, Content, Footer, Icon, Left, List, ListItem, Right, Text } from 'native-base';
import React, { Component } from 'react';

import { Header } from '../../components';
import { Deck } from '../../models';
import { NavigationService } from '../../services';
import { createDeck, loadDecks, selectAll, selectDeck } from '../../store/decks';

interface Props {
    decks: Deck[];

    loadDecks: typeof loadDecks;
    selectDeck: typeof selectDeck;
    createDeck: typeof createDeck;
    selectAll: typeof selectAll;
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
                        <ListItem onPress={() => this.props.selectAll()}>
                            <Left>
                                <Text>All</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        {this.props.decks.map((d: Deck) => (
                            <ListItem key={d.id} onPress={() => this.props.selectDeck(d)}>
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
                    <Button hasText transparent onPress={() => NavigationService.navigateTo('ManageDecks')}>
                        <Text>Manage Decks</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}
