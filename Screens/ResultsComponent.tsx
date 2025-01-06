import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import RetryModal from '../Components/RetryModal';

const ResultsComponent: React.FC<{searchQuery: string}> = ({searchQuery}) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const ITEMS_PER_PAGE = 10;

  const fetchUsers = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery} in:login&page=${page}&per_page=${ITEMS_PER_PAGE}`,
      );
      const newItems = response.data.items;
      setData(prev => [...prev, ...newItems]);

      if (newItems.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      setPage(prev => prev + 1);
    } catch (error) {
      setErrorMessage('Failed to load users. Please check your connection.');

      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    if (searchQuery) {
      fetchUsers();
    }
  }, [searchQuery]);

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.avatar_url}} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.login}</Text>
        <Text style={styles.text}>{item.type}</Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#fff" />
    );
  };

  const renderEmptyComponent = () =>
    !loading && (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No results found.</Text>
      </View>
    );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReached={fetchUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={
          data.length === 0 ? styles.emptyContent : undefined
        }
      />
    </View>
  );
};

export default ResultsComponent;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    backgroundColor: '#1e1e1e',
    marginVertical: 4,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
    color: 'white',
  },
  loader: {
    marginVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: 'white',
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
