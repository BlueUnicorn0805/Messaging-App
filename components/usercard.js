import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Card from './card';

function UserCard({ user }) {

  let imageURL = user.profilePicture;
  let Image_Http_URL = {uri: imageURL}

  return (
    <View>
      <Card>
        <View style={UserCardStyles.container}>
          <View>
            <Image source={Image_Http_URL} style={UserCardStyles.image} />
          </View>
          <View style={UserCardStyles.textArea}>
            <Text> {user.name} </Text>
            <Text> {user.email} </Text> 
          </View>
        </View>
      </Card>
    </View>
  );
}

export default UserCard;

const UserCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  textArea: {
    paddingTop: 12,
    paddingBottom: 12,
  }
})