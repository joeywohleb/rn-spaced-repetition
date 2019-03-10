import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';

import {
    createAppContainer,
    createStackNavigator,
    NavigationContainer,
    NavigationContainerComponent,
} from 'react-navigation';
import { name as appName } from '../app.json';
import FlashcardViewContainer from './containers/flashcard-view-container';
import HomeContainer from './containers/home-container';
import { NavigationService } from './services';

const store = configureStore();

const AppNavigator: NavigationContainer = createStackNavigator(
    {
        Home: HomeContainer,
        FlashcardView: FlashcardViewContainer,
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    },
);

export type NavigationRoutes = 'Home' | 'FlashcardView';

const AppContainer: NavigationContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <AppContainer
                    ref={(navigatorRef: NavigationContainerComponent) => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => App);
