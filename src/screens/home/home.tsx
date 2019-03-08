import { Container, Content, Icon, Left, List, ListItem, Right } from 'native-base';
import React, { Component } from 'react';
import { Text } from 'react-native';

import { Header } from '../../components';
import { Deck } from '../../models';
import { loadDecks, selectDeck } from '../../store/decks';

interface Props {
    decks: Deck[];

    loadDecks: typeof loadDecks;
    selectDeck: typeof selectDeck;
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
                <Header>Home</Header>
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
            </Container>
        );
    }
}
