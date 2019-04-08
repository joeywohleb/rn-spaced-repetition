import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, Deck } from '../../models';
import { saveDeck, setWorkingDeck } from '../../store/decks';
import { CreateDeck } from './create-deck';

interface Props {
    workingDeck?: Deck;

    saveDeck: typeof saveDeck;
    setWorkingDeck: typeof setWorkingDeck;
}

class CreateDeckScreen extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <CreateDeck {...this.props} />;
    }
}

export const CreateDeckContainer = connect(
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
)(CreateDeckScreen);
