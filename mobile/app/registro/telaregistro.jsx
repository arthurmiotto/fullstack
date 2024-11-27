import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const telaregistro = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState(''); 

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !birthDate || !password || !confirmPassword) {
      setRegisterMessage('Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setRegisterMessage('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/registro/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: firstName,
          sobrenome: lastName,
          email: email,
          dataNascimento: birthDate,
          senha: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      await AsyncStorage.setItem('userName', firstName);
      await AsyncStorage.setItem('userEmail', email);

      setRegisterMessage('Parabéns, você está registrado!');
      setTimeout(() => {
        navigation.navigate('telalogin');
      }, 2000); 
    } catch (error) {
      console.error('Erro:', error);
      setRegisterMessage('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/images/musica.png')} style={styles.logo} />
      <Text style={styles.title}>SPOTFAKE</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        placeholderTextColor="#888"
        value={birthDate}
        onChangeText={setBirthDate}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      {registerMessage ? <Text style={styles.registerMessage}>{registerMessage}</Text> : null}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.registerText}>Voltar para Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
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
  registerMessage: {
    fontSize: 16,
    color: 'green',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: 'green',
    marginTop: 20,
  },
});

export default telaregistro;
