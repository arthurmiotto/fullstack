import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const telasucesso = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('telahome');
    }, 1200); 

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/musica.png')} style={styles.logo} />
      <Text style={styles.successText}>Sucesso!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 125,
    height: 125,
    marginBottom: 30,
  },
  successText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default telasucesso;
