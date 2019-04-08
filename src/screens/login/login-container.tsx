import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState } from '../../models';
import { Login } from './login';

interface Props {}

class LoginScreen extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <Login {...this.props} />;
    }
}

export const LoginContainer = connect(
    () => {
        return {};
    },
    (dispatch: Dispatch<Action<AppState>>) => bindActionCreators({}, dispatch),
)(LoginScreen);
