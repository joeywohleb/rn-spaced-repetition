import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, Deck } from '../../models';
import { createDeck, loadDecks, selectWorkingDeck } from '../../store/decks';
import { ManageDecks } from './manage-decks';

interface Props {
    decks: Deck[];

    createDeck: typeof createDeck;
    loadDecks: typeof loadDecks;
    selectWorkingDeck: typeof selectWorkingDeck;
}

class ManageDecksScreen extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <ManageDecks {...this.props} />;
    }
}

export const ManageDecksContainer = connect(
    (state: AppState) => {
        return {
            decks: state.decks.decks,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) =>
        bindActionCreators(
            {
                createDeck,
                loadDecks,
                selectWorkingDeck,
            },
            dispatch,
        ),
)(ManageDecksScreen);
