import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RootParamList } from '../App';

const Details = ({ route }: StackScreenProps<RootParamList, 'Details'>) => {
  const comic = route.params;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.imageBox}>
        <Image
          style={{ flex: 1 }}
          source={{ uri: comic.img }}
          alt={comic.alt}
          resizeMode="contain"
        />
      </View>
      <View style={styles.imageBox}>
        <Image
          style={{ flex: 1 }}
          source={{ uri: comic.img }}
          alt={comic.alt}
          resizeMode="contain"
        />
      </View>
      <View style={styles.imageBox}>
        <Image
          style={{ flex: 1 }}
          source={{ uri: comic.img }}
          alt={comic.alt}
          resizeMode="contain"
        />
      </View>
      <Text>{comic.title}</Text>
      <Text>{JSON.stringify(route.params)}</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  imageBox: {
    alignContent: 'stretch',
    height: 300,
    paddingVertical: 20,
  },
});
export default Details;
