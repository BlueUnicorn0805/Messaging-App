import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Account from '../pages/account';

import Header from '../components/header';

const screens = {
    Account: {
        screen: Account,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="Account" drawer="true"/>
            }
        }
    },
}

const AccountStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#f4f4f4',
        headerStyle: { backgroundColor: '#eee', height: 100, }
    }
});

export default AccountStack;