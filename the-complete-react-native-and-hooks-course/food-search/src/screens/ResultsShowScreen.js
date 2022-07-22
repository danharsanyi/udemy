import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

import { useRoute } from '@react-navigation/core';

import yelp from '../api/yelp';

const ResultsShowScreen = () => {
  const [result, setResult] = useState(null);
  const {params} = useRoute();
  const {item} = params;

  useEffect(() => {
    getResult(item.id)
  }, [item.id])

  const getResult = async (id) => {
    try {
      const response = await yelp.get(`/businesses/${id}`);
      setResult(response.data);
    } catch(err) {
      console.error(err);
    }
  }

  if (!result) return null;

  return (
    <View>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({item}) => {
          return (
            <Image style={styles.image} source={{ uri: item }} />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
    marginBottom: 16,
  }
});

export default ResultsShowScreen;