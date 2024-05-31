import React from 'react';
import { Text, View, Button } from 'react-native';
import db, { provider, auth } from '../firebase';


function Account() {
    return(
        <View>
            <Text> This is the Account </Text>
            <Button title="Sign out" onPress={() => auth.signOut()} /> 
        </View>
    );
}

export default Account;
