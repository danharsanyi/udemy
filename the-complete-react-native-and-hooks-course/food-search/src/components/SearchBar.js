import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function SearchBar({ searchTerm, handleChange, handleSubmit }) {
  return (
    <View style={styles.element}>
      <Feather style={styles.icon} name="search"/>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchTerm}
        onChangeText={handleChange}
        onEndEditing={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  element: {
    backgroundColor: 'lightgray',
    height: 48,
    borderRadius: 6,
    marginHorizontal: 24,
    flexDirection: 'row',
    marginVertical: 8,
  },
  icon: {
    alignSelf: 'center',
    fontSize: 24,
    marginHorizontal: 8
  },
  input: {
    fontSize: 16,
    flex: 1
  }
});