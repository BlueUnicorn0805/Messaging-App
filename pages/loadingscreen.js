import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';
import db from '../firebase';
import { useStateValue } from '../stateprovider';


function LoadingScreen({ navigation })  { 

    const [{ userDoc }, dispatch] = useStateValue();

    function getDocument(email) {
		return new Promise((resolve, reject) => {
			var userDocument;
			db.collection("users").doc(email).get().then(documentSnapshot => {
				if(documentSnapshot.exists) {
					userDocument = documentSnapshot.data(); 
					resolve(userDocument);
				} 
			});
		})
	}

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                getDocument(user.email)
                    .then((doc) => { //gets new user's document
                        dispatch({
                            type: "set_pic",
                            userPic: user.photoURL,
                            userStatus: true,
                        });
                        dispatch({
                            type: "set_doc",
                            userDoc: doc,
                        });
                    })
                    .then(() => {
                        navigation.navigate("AuthenticatedDrawer");
                    })
            } else {
                navigation.navigate("LandingStack");
            }   
        });
    })

    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text>Loading App</Text> 
        </View>
    )
}

export default LoadingScreen;
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});