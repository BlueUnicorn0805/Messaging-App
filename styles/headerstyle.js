import { StyleSheet } from 'react-native';

export const HeaderStyles = StyleSheet.create({
    HeaderContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 16,
    }
});