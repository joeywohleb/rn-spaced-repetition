import { Container, Content, Header, List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, FlashcardSet } from '../../models';
import { loadFlashcardSets } from '../../store/sets';

const instructions = Platform.select({
    android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
    ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
});

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
        console.log(this.props.sets);
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

interface Style {
    container: ViewStyle;
    instructions: TextStyle;
    welcome: TextStyle;
}

const styles = StyleSheet.create<Style>({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    instructions: {
        color: '#333333',
        marginBottom: 5,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
});

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
