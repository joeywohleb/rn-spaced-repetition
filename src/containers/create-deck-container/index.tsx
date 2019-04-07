import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, Deck } from '../../models';
import { CreateDeck } from '../../screens';
import { saveDeck, setWorkingDeck } from '../../store/decks';

interface Props {
    workingDeck?: Deck;

    saveDeck: typeof saveDeck;
    setWorkingDeck: typeof setWorkingDeck;
}

class CreateDeckContainer extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <CreateDeck {...this.props} />;
    }
}

export default connect(
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
)(CreateDeckContainer);
