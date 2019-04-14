import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, Deck } from '../../models';
import { saveDeck, setWorkingDeck } from '../../store/decks';
import { EditDeck } from './edit-deck';

interface Props {
    workingDeck?: Deck;

    saveDeck: typeof saveDeck;
    setWorkingDeck: typeof setWorkingDeck;
}

class EditDeckScreen extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <EditDeck {...this.props} />;
    }
}

export const EditDeckContainer = connect(
    (state: AppState) => {
        return {
            workingDeck: state.decks.workingDeck,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) =>
        bindActionCreators(
            {
                saveDeck,
                setWorkingDeck,
            },
            dispatch,
        ),
)(EditDeckScreen);
