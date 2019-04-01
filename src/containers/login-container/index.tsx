import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

import { AppState } from '../../models';
import { Login } from '../../screens';

interface Props {}

class LoginContainer extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return <Login {...this.props} />;
    }
}

export default connect(
    () => {
        return {};
    },
    (dispatch: Dispatch<Action<AppState>>) => bindActionCreators({}, dispatch),
)(LoginContainer);
