import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, Deck } from '../../models';
import { Home } from '../../screens';
import { loadDecks, selectDeck } from '../../store/decks';

interface Props {
    decks: Deck[];

    loadDecks: typeof loadDecks;
    selectDeck: typeof selectDeck;
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
            decks: state.decks.decks,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) =>
        bindActionCreators(
            {
                loadDecks,
                selectDeck,
            },
            dispatch,
        ),
)(HomeContainer);
