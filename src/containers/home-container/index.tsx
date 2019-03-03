import { Container, Content, Header, List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, FlashcardSet } from '../../models';
import { loadFlashcardSets } from '../../store/sets';

interface Props {
    sets: FlashcardSet[];

    loadFlashcardSets: typeof loadFlashcardSets;
}

class HomeContainer extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public componentDidMount() {
        this.props.loadFlashcardSets();
    }

    public render() {
        return (
            <Container>
                <Header />
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

export default connect(
    (state: AppState) => {
        return {
            sets: state.sets.sets,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) =>
        bindActionCreators(
            {
                loadFlashcardSets,
            },
            dispatch,
        ),
)(HomeContainer);
