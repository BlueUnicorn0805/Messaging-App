import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, Keyboard, CheckBox } from 'react-native';
import db, { provider, auth } from '../firebase';
import firebase from 'firebase/app';
import { useStateValue } from '../stateprovider';
import { MaterialIcons } from '@expo/vector-icons';
import ChatForm from '../components/chatform';
import UserCard from '../components/usercard';
import ChatCard from '../components/chatcard';


function ChatList({ navigation }) {

    const [{ userDoc }, dispatch] = useStateValue(); 
    const [searchResults, setSearchResults] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chats, setChats] = useState([]);
    
    var current_email = userDoc.email;

    function resetUserDoc() {
        db.collection("users").doc(email).get().then(doc => {
            dispatch({
                type: "set_doc",
                userDoc: doc.data(),
            })
        })
    }

    //Trying to get the search feature to work so we can create a chat. 
    const findUsers = ({ email }) => {

        setSearchResults([]);
        
        var userRef = db.collection("users");
        var query = userRef.where("search_keys", "array-contains", email).limit(25);
        query.onSnapshot((snapshot) =>
            setSearchResults(snapshot.docs.map((doc) => doc.data()))
        );
    }

    const createChat = (receiver) => {

        if(userDoc.chatsWith.includes(receiver.email) == false && userDoc.email != receiver.email) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let docID = ''
            for (let i = 0; i < 20; i++) {
                docID += chars.charAt(Math.floor(Math.random() * chars.length))
            }

            //creates new chat            
            db.collection('chats').doc(docID).set({ //new chat document in firestore
                chatId: docID,
                userId1: userDoc.id,
                userEmail1: userDoc.email,
                userName1: userDoc.name,
                userId2: receiver.id,
                userEmail2: receiver.email,
                userName2: receiver.name,
                created_at: Date.now(),
                message_last_sent: Date.now(),
                users: [userDoc.email, receiver.email],
                messages: {
                    from: userDoc.id,
                    sent_at: Date.now(),
                    message: "Hey!",
                },
            }).then(() => { //adds new document to the user's firestore pages
            
                db.collection('users').doc(userDoc.email).update({
                    chats: firebase.firestore.FieldValue.arrayUnion(docID),
                    chatsWith: firebase.firestore.FieldValue.arrayUnion(receiver.email),
                }).then(() => resetUserDoc());

                db.collection('users').doc(receiver.email).update({
                    chats: firebase.firestore.FieldValue.arrayUnion(docID),
                    chatsWith: firebase.firestore.FieldValue.arrayUnion(userDoc.email),
                })  

                setModalIsOpen(false);
                setSearchResults([]);
            })
        } else {
            setModalIsOpen(false);
            setSearchResults([]);
        }
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setSearchResults([]);
    }

    useEffect(() => {
        db.collection("chats").where("users", "array-contains", current_email).onSnapshot((snapshot) => {
			setChats(snapshot.docs.map((doc) => doc.data()));
		});
    }, [chats]);

    const openChat = (chosen_chat_doc) => {
        navigation.navigate("Chat", {
            chat: chosen_chat_doc,
            cool: "Je;;pdpekfpe",
        });
    }

    return(
        <View>
            
            <Modal visible={modalIsOpen} animationType="slide">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons style={{...styles.modalToggle, ...styles.modalClose}} name="close" size={30} onPress={closeModal} />
                        <ChatForm findUsers={findUsers} />

                        {searchResults.map((user) => (
                            <View>
                                <TouchableOpacity onPress={() => createChat(user)}>
                                    <UserCard user={user} /> 
                                </TouchableOpacity>
                            </View>
                        ))}

                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons style={styles.modalToggle} name='add' size={30} onPress={() => setModalIsOpen(true)}/>

            <Text>{ userDoc.name } </Text> 

            {chats.map((chat) => (
                <View>
                    <TouchableOpacity onPress={() => openChat(chat)}>
                        <ChatCard chat={chat} />
                    </TouchableOpacity>
                </View>
            ))}

        </View>
    );
}

export default ChatList;

const styles = StyleSheet.create({
    modalContent: {
      padding: 20,
      flex: 1,
    },
    modalToggle: {
      marginBottom: 10,
      alignSelf: 'center'
    },
    modalClose: {
      marginTop: 30,
      marginBottom: 0,
    }
  })