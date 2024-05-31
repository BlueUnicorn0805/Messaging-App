import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderStyles } from '../styles/headerstyle';

function Header({ navigation, title, drawer }) {
    
    const openMenu = () => { 
        navigation.openDrawer();
    }
    
    if(drawer=="true") {
        return(
            <View style={HeaderStyles.HeaderContainer}>
                <MaterialIcons name='menu' size={28} onPress={openMenu} style={HeaderStyles.icon} />
                <View>
                    <Text style={HeaderStyles.HeaderText}> { title } </Text>
                </View>
            </View>
        );
    } else {
        return(
            <View style={HeaderStyles.HeaderContainer}>
                <View>
                    <Text style={HeaderStyles.HeaderText}> { title } </Text>
                </View>
            </View>
        );
    }
}

export default Header;