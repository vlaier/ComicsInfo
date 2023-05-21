import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { useInfiniteQuery } from 'react-query';
import { getFetcher } from '../api';
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
        <Image
          style={styles.comicImageBox}
          resizeMode="cover"
          source={{ uri: comic.img }}
          alt={comic.alt}
        />
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
  const route = useRoute();
  const [comicSource, setComicSource] = useState('xkcd');
  let fetcher = getFetcher(comicSource);
  useCallback(() => {
    fetcher = getFetcher(comicSource);
  }, [comicSource]);

  const { isLoading, data, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery(
      comicSource,
      ({ pageParam = null }) => fetcher.getComic(pageParam),
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

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Choose Source</Text>
        <Picker
          style={styles.select}
          selectedValue={comicSource}
          onValueChange={(itemValue) => setComicSource(itemValue)}
        >
          <Picker.Item label="XKCD" value="xkcd" />
          <Picker.Item label="Placeholder for other comics api" value="other" />
        </Picker>
      </View>

      {!isLoading && !error && data && (
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
      )}
      {isLoading && <Text>Loading...</Text>}
      {!!error && <Text>Something went wrong</Text>}
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
    gap: 50,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 10,
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
    width: 75,
    height: 75,

    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 500,
  },
  select: {
    backgroundColor: '#f2f2f2',
  },
  box: {
    marginTop: 10,
    marginBottom: 20,
  },
});
export default Home;
