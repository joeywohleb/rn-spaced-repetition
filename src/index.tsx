import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';

import { name as appName } from '../app.json';
import HomeContainer from './containers/home-container';

const store = configureStore();

export default class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <HomeContainer />
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => App);
