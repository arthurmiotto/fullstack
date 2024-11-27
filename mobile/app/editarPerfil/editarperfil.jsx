import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarPerfil = ({ navigation }) => {
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('isDarkTheme');
        if (storedTheme !== null) setIsDarkTheme(storedTheme === 'true');
      } catch (error) {
        console.error('Erro ao carregar tema', error);
      }
    };
    fetchTheme();
  }, []);

  const handleSaveChanges = async () => {
    if (!newEmail || !oldPassword || !newPassword) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/alterar-senha', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newEmail,
          senhaAtual: oldPassword,
          novaSenha: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        navigation.goBack(); 
      } else {
        Alert.alert('Erro', data.error || 'Não foi possível alterar a senha.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  const themeStyles = isDarkTheme
    ? {
        backgroundColor: 'black',
        textColor: 'white',
        inputBackgroundColor: '#333',
        buttonColor: 'green',
      }
    : {
        backgroundColor: 'white',
        textColor: 'black',
        inputBackgroundColor: '#fff',
        buttonColor: 'green',
      };

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <Text style={[styles.title, { color: themeStyles.textColor }]}>Editar Senha</Text>

      <Text style={[styles.label, { color: themeStyles.textColor }]}>Novo E-mail</Text>
      <TextInput
        style={[styles.input, { backgroundColor: themeStyles.inputBackgroundColor }]}
        value={newEmail}
        onChangeText={setNewEmail}
        placeholder="Digite seu novo e-mail"
        placeholderTextColor={isDarkTheme ? '#ccc' : '#666'}
      />

      <Text style={[styles.label, { color: themeStyles.textColor }]}>Senha Atual</Text>
      <TextInput
        style={[styles.input, { backgroundColor: themeStyles.inputBackgroundColor }]}
        value={oldPassword}
        onChangeText={setOldPassword}
        placeholder="Digite sua senha atual"
        placeholderTextColor={isDarkTheme ? '#ccc' : '#666'}
        secureTextEntry
      />

      <Text style={[styles.label, { color: themeStyles.textColor }]}>Nova Senha</Text>
      <TextInput
        style={[styles.input, { backgroundColor: themeStyles.inputBackgroundColor }]}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Digite sua nova senha"
        placeholderTextColor={isDarkTheme ? '#ccc' : '#666'}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeStyles.buttonColor }]}
        onPress={handleSaveChanges}
      >
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('telaconfig')}>
        <Text style={[styles.link, { color: themeStyles.textColor }]}>
          Voltar para Configurações
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 15,
    borderRadius: 8,
    paddingLeft: 10,
  },
  button: {
    width: '70%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  link: {
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',  // Adiciona o sublinhado
  },
});

export default EditarPerfil;
