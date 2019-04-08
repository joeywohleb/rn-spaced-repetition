import { Root } from 'native-base';
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
import {
    AccountSignupContainer,
    CreateDeckContainer,
    CreateFlashcardContainer,
    FlashcardViewContainer,
    HomeContainer,
    LoginContainer,
    ManageDecksContainer,
    ManageFlashcardsContainer,
} from './screens';
import { NavigationService } from './services';

const store = configureStore();

const AppNavigator: NavigationContainer = createStackNavigator(
    {
        Home: HomeContainer,
        CreateDeck: CreateDeckContainer,
        CreateFlashcard: CreateFlashcardContainer,
        FlashcardView: FlashcardViewContainer,
        AccountSignup: AccountSignupContainer,
        Login: LoginContainer,
        ManageDecks: ManageDecksContainer,
        ManageFlashcards: ManageFlashcardsContainer,
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false,
        },
    },
);

export type NavigationRoutes =
    | 'Home'
    | 'CreateDeck'
    | 'CreateFlashcard'
    | 'FlashcardView'
    | 'AccountSignup'
    | 'Login'
    | 'ManageDecks'
    | 'ManageFlashcards';

const AppContainer: NavigationContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <Root>
                    <AppContainer
                        ref={(navigatorRef: NavigationContainerComponent) => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </Root>
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => App);
