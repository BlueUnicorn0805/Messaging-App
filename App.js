import React from 'react';
import { View } from 'react-native';

import Navigator from './routes/switch'; //gets app countainer
import { NavigationContainer } from '@react-navigation/native';
import { StateProvider } from "./stateprovider";

function App() {
    return (
        <StateProvider>
          <NavigationContainer>
            < Navigator />
          </NavigationContainer>
        </StateProvider>
    );
}

export default App;