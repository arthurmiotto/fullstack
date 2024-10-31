import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const telalogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if(!email || !password) {
      alert('preencha todos os campos')
      return
    }
    try{
      const response = await fetch('http://localhost:8000/login/',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        senha: password
      })
      })
      console.log(response)
      if ( response.status === 404) {
        alert('email não encontrado')
        return
      }
      if ( response.status === 403) {
        alert('senha incorreta')
        return
      }
    } catch(erro) {
      console.log(erro)
    } 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/musica.png')} style={styles.logo} />
      <Text style={styles.title}>SPOTFAKE</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('telaregistro')}>
        <Text style={styles.registerText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 125, 
    height: 125, 
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#fff',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'green',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerText: {
    fontSize: 16,
    color: 'green',
    marginTop: 20,
  },
});

export default telalogin;
