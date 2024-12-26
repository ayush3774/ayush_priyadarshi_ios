import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './Service/store';
import {View, StyleSheet} from 'react-native';
import SearchComponent from './Components/SearchComponent';
import ResultsComponent from './Components/ResultsComponent';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SearchComponent setSearchQuery={setSearchQuery} />
        {searchQuery && <ResultsComponent searchQuery={searchQuery} />}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    padding: 16,
  },
});

export default App;
