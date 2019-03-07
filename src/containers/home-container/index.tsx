import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { AppState, Deck } from '../../models';
import { Home } from '../../screens';
import { loadDecks } from '../../store/decks';

interface Props {
    decks: Deck[];

    loadDecks: typeof loadDecks;
}

class HomeContainer extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <Home {...this.props} />;
    }
}

export default connect(
    (state: AppState) => {
        return {
            sets: state.decks.decks,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) =>
        bindActionCreators(
            {
                loadDecks,
            },
            dispatch,
        ),
)(HomeContainer);
