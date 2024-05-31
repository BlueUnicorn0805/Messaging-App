import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) { //pass in props, which are all components nested under <Card></Card>
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {/* Displays all of the components nested under <Card></Card> */}
        { props.children }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  }
});