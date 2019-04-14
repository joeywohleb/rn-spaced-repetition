import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, Deck, Flashcard } from '../../models';
import { saveFlashcard, setWorkingFlashcard } from '../../store/decks';
import { EditFlashcard } from './edit-flashcard';

interface Props {
    workingDeck?: Deck;
    workingFlashcard?: Flashcard;

    saveFlashcard: typeof saveFlashcard;
    setWorkingFlashcard: typeof setWorkingFlashcard;
}

class EditFlashcardScreen extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <EditFlashcard {...this.props} />;
    }
}

export const EditFlashcardContainer = connect(
    (state: AppState) => {
        return {
            workingDeck: state.decks.workingDeck,
            workingFlashcard: state.decks.workingFlashcard,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) =>
        bindActionCreators(
            {
                saveFlashcard,
                setWorkingFlashcard,
            },
            dispatch,
        ),
)(EditFlashcardScreen);
