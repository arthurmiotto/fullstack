import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const Sertanejo = ({ navigation }) => {
  const songs = [
    { id: 1, title: 'Barbie', artist: 'Mc Tuto', image: require('../../assets/images/barbie.jpg') },
    { id: 2, title: 'Malvadinho', artist: 'Mc Luuky', image: require('../../assets/images/malvadinho.jpg') },
    { id: 3, title: 'Última noite', artist: 'Léo Foguete', image: require('../../assets/images/ultima.jpg') },
  ];

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/partido.jpg')} style={styles.bannerImage} />
      
      <ScrollView>
        {songs.map((song) => (
          <View key={song.id} style={styles.songCard}>
            <Image source={song.image} style={styles.songImage} />
            <View>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} 
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  bannerImage: { width: '100%', height: 200 },
  songCard: { flexDirection: 'row', alignItems: 'center', margin: 10, backgroundColor: '#1e1e1e', padding: 10, borderRadius: 8 },
  songImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  songTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  songArtist: { color: '#BBBBBB', fontSize: 12 },


  backButton: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center', 
    marginBottom: 20, 
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Sertanejo;
