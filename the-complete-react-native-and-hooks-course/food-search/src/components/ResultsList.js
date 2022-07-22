import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ResultItem from './ResultItem';

import { useNavigation } from '@react-navigation/core';

const ResultsList = ({
  title,
  results,
}) => {
  if (!results.length) {
    return null;
  }

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', { item })}>
              <ResultItem item={item} />
            </TouchableOpacity>
          )
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 24,
    marginBottom: 8,
  }
});

export default ResultsList;