import { Body, Container, Content, Header, List, ListItem, Title } from 'native-base';
import React, { Component } from 'react';
import { Text } from 'react-native';

import { Deck } from '../../models';
import { loadDecks } from '../../store/decks';

interface Props {
    decks: Deck[];

    loadDecks: typeof loadDecks;
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
                <Header>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        {this.props.decks.map((s: Deck) => (
                            <ListItem key={s.name}>
                                <Text>{s.name}</Text>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container>
        );
    }
}
