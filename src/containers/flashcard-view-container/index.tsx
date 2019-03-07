import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState, Deck } from '../../models';
import { FlashcardView } from '../../screens';

interface Props {
    selectedDeck?: Deck;
}

class FlashcardViewContainer extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <FlashcardView {...this.props} />;
    }
}

export default connect(
    (state: AppState) => {
        return {
            selectedDeck: state.decks.selectedDeck,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) => bindActionCreators({}, dispatch),
)(FlashcardViewContainer);
