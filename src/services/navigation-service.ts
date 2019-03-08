import { NavigationActions, NavigationContainerComponent, NavigationParams } from 'react-navigation';
import { NavigationRoutes } from '..';

let navigator: NavigationContainerComponent;

const setTopLevelNavigator = (navigatorRef: NavigationContainerComponent) => {
    navigator = navigatorRef;
};

const navigateTo = (routeName: NavigationRoutes, params?: NavigationParams) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
};

const goBack = () => {
    navigator.dispatch(NavigationActions.back());
};

// tslint:disable-next-line: variable-name
export const NavigationService = {
    goBack,
    navigateTo,
    setTopLevelNavigator,
};
