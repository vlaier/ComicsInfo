import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { xkcdApi } from '../api';
import { ComicDataI } from '../api/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../App';

const ComicBox = ({
  comic,
  onPress,
}: {
  comic: ComicDataI;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.comicBox}>
        <View style={styles.comicImageBox}>
          <Image
            style={{ flex: 1 }}
            resizeMode="contain"
            source={{ uri: comic.img }}
            alt={comic.alt}
          />
        </View>
        <View style={styles.comicTextBox}>
          <Text style={styles.title}>{comic.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Home = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootParamList, 'Home'>;
}) => {
  const { isLoading, data, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery(
      'comic',
      ({ pageParam = null }) => xkcdApi.getComic(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.nextPage) {
            return lastPage.nextPage;
          }
          return lastPage;
        },
      }
    );
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  if (isLoading) return <Text>Loading...</Text>;
  if (error || !data) return <Text>Something went wrong</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.pages.map((page) => page.results).flat()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ComicBox
            comic={item}
            onPress={() => navigation.navigate('Details', item)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ display: 'flex', gap: 15 }}
        ListHeaderComponent={<Text style={styles.title}>Comic Books</Text>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  comicBox: {
    paddingHorizontal: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  comicTextBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  comicImageBox: {
    width: 100,
    height: 100,
  },
});
export default Home;
