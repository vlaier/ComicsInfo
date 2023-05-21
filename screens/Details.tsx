import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RootParamList } from '../App';

const Details = ({ route }: StackScreenProps<RootParamList, 'Details'>) => {
  const comic = route.params;
  const date = new Date(
    parseInt(comic.year),
    parseInt(comic.month),
    parseInt(comic.day)
  );
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
      <View style={styles.infoBox}>
        <Text style={styles.title}>{comic.title}</Text>
        <Text style={styles.date}>{date.toDateString()}</Text>
        <Text>{comic.alt}</Text>
      </View>
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  infoBox: {
    paddingHorizontal: 10,
  },
});
export default Details;
