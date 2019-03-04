import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { AppState, FlashcardSet } from '../../models';
import { Home } from '../../screens';
import { loadFlashcardSets } from '../../store/sets';

interface Props {
    sets: FlashcardSet[];

    loadFlashcardSets: typeof loadFlashcardSets;
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
            sets: state.sets.sets,
        };
    },
    (dispatch: Dispatch<Action<AppState>>) =>
        bindActionCreators(
            {
                loadFlashcardSets,
            },
            dispatch,
        ),
)(HomeContainer);
