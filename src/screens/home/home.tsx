import { Body, Container, Content, Header, Left, List, ListItem, Right, Title } from 'native-base';
import React, { Component } from 'react';
import { Text } from 'react-native';

import { FlashcardSet } from '../../models';
import { loadFlashcardSets } from '../../store/sets';

interface Props {
    sets: FlashcardSet[];

    loadFlashcardSets: typeof loadFlashcardSets;
}

export class Home extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public componentDidMount() {
        this.props.loadFlashcardSets();
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
                        {this.props.sets.map((s: FlashcardSet) => (
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
