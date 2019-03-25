import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState } from '../../models';
import { AccountSignup } from '../../screens';

interface Props {}

class AccountSignupContainer extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <AccountSignup {...this.props} />;
    }
}

export default connect(
    (state: AppState) => {
        return {};
    },
    (dispatch: Dispatch<Action<AppState>>) => bindActionCreators({}, dispatch),
)(AccountSignupContainer);
