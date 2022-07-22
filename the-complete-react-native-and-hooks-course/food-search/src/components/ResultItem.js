import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const ResultItem = ({
  item,
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: item.image_url}} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.rating} Stars, {item.review_count} Reviews</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
  },
  image: {
    height: 120,
    width: 220,
    borderRadius: 4,
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
  }
});

export default ResultItem;