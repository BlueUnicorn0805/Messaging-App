//Use switch navigtion to move between landing page (authentication) and chat page 

import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import AuthenticatedDrawer from './drawer';
import LandingScreen from '../pages/landing';
import LoadingScreen from '../pages/loadingscreen';

const switcher = createSwitchNavigator(
    {
        LoadingScreen: LoadingScreen,
        LandingStack: LandingScreen,
        AuthenticatedDrawer: AuthenticatedDrawer,
    },
    {
        initialRouteName: 'LoadingScreen'
    }

)

const Navigator = createAppContainer(switcher);

export default Navigator;