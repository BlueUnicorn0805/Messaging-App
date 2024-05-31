import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import ChatStack from './chatstack';
import AccountStack from './accountstack';

const RootDrawerNavigation = createDrawerNavigator({
    ChatStack: {
        screen: ChatStack,
    },
    AccountStack: {
        screen: AccountStack,
    }
})

export default createAppContainer(RootDrawerNavigation);
