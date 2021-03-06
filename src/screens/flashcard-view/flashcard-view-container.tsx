import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, Deck, Flashcard } from '../../models';
import { saveResponse, toggleFlip } from '../../store/decks';
import { FlashcardView } from './flashcard-view';

interface Props {
    selectedDeck?: Deck;
    inProgressFlashcards: Flashcard[];
    flip: boolean;

    saveResponse: typeof saveResponse;
    toggleFlip: typeof toggleFlip;
}

class FlashcardViewScreen extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <FlashcardView {...this.props} />;
    }
}

export const FlashcardViewContainer = connect(
    (state: AppState) => {
        return {
            selectedDeck: state.decks.selectedDeck,
            inProgressFlashcards: state.decks.inProgressFlashcards,
            flip: state.decks.flip,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) =>
        bindActionCreators(
            {
                saveResponse,
                toggleFlip,
            },
            dispatch,
        ),
)(FlashcardViewScreen);
