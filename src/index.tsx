import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';

import { createAppContainer, createStackNavigator, NavigationContainer } from 'react-navigation';
import { name as appName } from '../app.json';
import HomeContainer from './containers/home-container';

const store = configureStore();

// tslint:disable-next-line: variable-name
const AppNavigator: NavigationContainer = createStackNavigator(
    {
        Home: HomeContainer,
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    },
);

// tslint:disable-next-line: variable-name
const AppContainer: NavigationContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => App);
