import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Telaconfig = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isUploading, setIsUploading] = useState(false); 

  const fixedProfileImage = require('../../assets/images/neymar.jpeg');
  const editIcon = require('../../assets/images/lapis.png'); 

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const storedTheme = await AsyncStorage.getItem('isDarkTheme');
      const storedImage = await AsyncStorage.getItem('profileImage');

      if (storedTheme !== null) setIsDarkTheme(storedTheme === 'true');
      if (storedImage) setSelectedImage(storedImage); 
    } catch (error) {
      alert('Erro ao carregar dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri); 
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('profileImage'); 
      navigation.navigate('telalogin');
    } catch (error) {
      alert('Erro ao fazer logout');
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    await AsyncStorage.setItem('isDarkTheme', newTheme.toString());
  };

  const themeStyles = isDarkTheme
    ? {
        backgroundColor: 'black',
        textColor: 'white',
        buttonColor: 'rgba(255, 255, 255, 0.3)',
      }
    : {
        backgroundColor: 'white',
        textColor: 'black',
        buttonColor: 'rgba(0, 128, 0, 0.5)',
      };

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
        
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={[styles.buttonText, { color: themeStyles.textColor }]}>Voltar</Text>
          </TouchableOpacity>

   
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={selectedImage ? { uri: selectedImage } : fixedProfileImage} 
              style={styles.icon}
            />
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Image source={editIcon} style={styles.editIconImage} />
            </TouchableOpacity>
          </TouchableOpacity>

          <Text style={[styles.userName, { color: themeStyles.textColor }]}>Lucas</Text>
          <Text style={[styles.userEmail, { color: themeStyles.textColor }]}>lucas@gmail.com</Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeStyles.buttonColor }]}
            onPress={() => navigation.navigate('editarperfil')}
          >
            <Text style={styles.buttonText}>Editar senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeStyles.buttonColor }]}
            onPress={toggleTheme}
          >
            <Text style={styles.buttonText}>
              {isDarkTheme ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
            </Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeStyles.buttonColor }]}
            onPress={() => navigation.navigate('telasobre')} 
          >
            <Text style={styles.buttonText}>Sobre</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeStyles.buttonColor }]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Deslogar</Text>
          </TouchableOpacity>

          {isUploading && (
            <ActivityIndicator size="large" color="blue" style={styles.uploadingIndicator} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'ffff', 
    borderRadius: 20,
    padding: 5,
  },
  editIconImage: {
    width: 30,
    height: 30,
    tintColor: 'white', // Torna o ícone branco
  },
  userName: {
    fontSize: 24,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '70%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
  uploadingIndicator: {
    marginTop: 20,
  },
});

export default Telaconfig;
