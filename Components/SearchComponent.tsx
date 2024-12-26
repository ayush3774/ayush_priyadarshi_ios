import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';

interface SearchComponentProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent: React.FC<SearchComponentProps> = ({setSearchQuery}) => {
  const [login, setLogin] = useState<string>('');

  const handleSubmit = () => {
    setSearchQuery(login.trim());
    Keyboard.dismiss();
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
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#3D3D3D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default SearchComponent;
