import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const Sertanejo = ({ navigation }) => {
  const songs = [
    { id: 1, title: 'Menina', artist: 'Mc Tuto', image: require('../../assets/images/tuto.jpeg') },
    { id: 2, title: 'Vida de Artista', artist: 'Joãozinho VT', image: require('../../assets/images/vida (1).jpeg') },
    { id: 3, title: 'Paga Mil', artist: 'Mc Fabrin', image: require('../../assets/images/paga.jpeg') },
  ];

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/coração.jpeg')} style={styles.bannerImage} />
      
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
