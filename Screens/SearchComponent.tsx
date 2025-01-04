import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Keyboard} from 'react-native';
import Button from '../Components/Button';

interface SearchComponentProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent: React.FC<SearchComponentProps> = ({setSearchQuery}) => {
  const [login, setLogin] = useState<string>('');

  const handleSubmit = () => {
    if (login.trim()) {
      setSearchQuery(login.trim());
      Keyboard.dismiss();
    } else {
      console.warn('Search query cannot be empty.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter login"
        placeholderTextColor="#888"
        value={login}
        onChangeText={setLogin}
      />
      <Button text="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
});

export default SearchComponent;
