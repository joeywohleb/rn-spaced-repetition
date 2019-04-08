import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState } from '../../models';
import { AccountSignup } from './account-signup';

interface Props {}

class AccountSignupScreen extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <AccountSignup {...this.props} />;
    }
}

export const AccountSignupContainer = connect(
    () => {
        return {};
    },
    (dispatch: Dispatch<Action<AppState>>) => bindActionCreators({}, dispatch),
)(AccountSignupScreen);
