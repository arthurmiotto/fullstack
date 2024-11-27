import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaSobre = ({ navigation }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('isDarkTheme');
      if (storedTheme !== null) {
        setIsDarkTheme(storedTheme === 'true');
      }
    };
    fetchTheme();
  }, []);

  const themeStyles = isDarkTheme
    ? {
        backgroundColor: 'black',
        textColor: 'white',
      }
    : {
        backgroundColor: '#f5f5f5',
        textColor: 'black',
      };

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={[styles.buttonText, { color: themeStyles.textColor }]}>Voltar</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: themeStyles.textColor }]}>Sobre</Text>
      <Text style={[styles.description, { color: themeStyles.textColor }]}>
        Este aplicativo foi desenvolvido por Arthur Kipper Miotto, Turma 3B.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaSobre;
