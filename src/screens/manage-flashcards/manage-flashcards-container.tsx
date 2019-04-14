import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, Deck } from '../../models';
import { createFlashcard, editFlashcard, saveFlashcardOrder } from '../../store/decks';
import { ManageFlashcards } from './manage-flashcards';

interface Props {
    workingDeck?: Deck;

    createFlashcard: typeof createFlashcard;
    editFlashcard: typeof editFlashcard;
    saveFlashcardOrder: typeof saveFlashcardOrder;
}

class ManageFlashcardsScreen extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <ManageFlashcards {...this.props} />;
    }
}

export const ManageFlashcardsContainer = connect(
    (state: AppState) => {
        return {
            workingDeck: state.decks.workingDeck,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) =>
        bindActionCreators(
            {
                createFlashcard,
                editFlashcard,
                saveFlashcardOrder,
            },
            dispatch,
        ),
)(ManageFlashcardsScreen);
