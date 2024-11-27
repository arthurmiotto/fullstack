import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';

const Home = ({ navigation }) => {
  const musicList = [
    { id: 1, title: 'Sertanejo Mix', image: require('../../assets/images/1.png'), screen: 'sertanejo' },
    { id: 2, title: 'Funk Hits', image: require('../../assets/images/2.png'), screen: 'funk' },
    { id: 3, title: 'Top Brasil', image: require('../../assets/images/3.png'), screen: 'top' },
    { id: 4, title: 'Eletrônica', image: require('../../assets/images/4.png'), screen: 'eletronica' },
  ];

  const listenAgain = [
    { id: 1, title: 'Lençol dobrado', artist: 'João Gustavo e Murilo', image: require('../../assets/images/lençol.png') },
    { id: 2, title: 'Ronca Demais!', artist: 'Joaozinho VT', image: require('../../assets/images/coração.jpeg') },
    { id: 3, title: 'Barulho do Foguete', artist: 'Guilherme & Benuto', image: require('../../assets/images/declaração.jpg') },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleModal = (song) => {
    setCurrentSong(song);
    setModalVisible(!isModalVisible);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = listenAgain.findIndex((song) => song.id === currentSong.id);
    const nextSong = listenAgain[(currentIndex + 1) % listenAgain.length];
    setCurrentSong(nextSong);
  };

  const handlePrevious = () => {
    const currentIndex = listenAgain.findIndex((song) => song.id === currentSong.id);
    const prevSong = listenAgain[(currentIndex - 1 + listenAgain.length) % listenAgain.length];
    setCurrentSong(prevSong);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('telaconfig')}
      >
        <Image
          source={require('../../assets/images/neymar.jpeg')} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('telaconfig')}
      >
        <Image
          source={require('../../assets/images/ENGRENAGEM.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>

      <ScrollView>
        <Text style={styles.sectionTitle}>Feito para você</Text>
        <View style={styles.musicContainer}>
          {musicList.map((music) => (
            <TouchableOpacity
              key={music.id}
              style={styles.musicCard}
              onPress={() => navigation.navigate(music.screen)}
            >
              <Image source={music.image} style={styles.musicImage} />
              <Text style={styles.musicTitle}>{music.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle1}>Ouvir novamente</Text>
        <View style={styles.listenAgainContainer}>
          {listenAgain.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => toggleModal(item)}>
              <View style={styles.listenAgainCard}>
                <Image source={item.image} style={styles.listenAgainImage} />
                <Text style={styles.listenAgainTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={currentSong ? currentSong.image : require('../../assets/images/lençol.png')} style={styles.modalImage} />
            <Text style={styles.modalSongTitle}>{currentSong ? currentSong.title : ''}</Text>

            {currentSong && (
              <Text style={styles.modalArtist}>{currentSong.artist}</Text>
            )}

            <View style={styles.playerControls}>
              <TouchableOpacity onPress={handlePrevious}>
                <Image source={require('../../assets/images/tras.png')} style={styles.controlIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePlayPause}>
                <Image source={isPlaying ? require('../../assets/images/pause.png') : require('../../assets/images/play.png')} style={styles.controlIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNext}>
                <Image source={require('../../assets/images/frente1.png')} style={styles.controlIcon} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  profileButton: {
    position: 'absolute',
    top: 20, 
    left: 10, 
  },
  profileImage: {
    width: 25, 
    height: 25, 
    borderRadius: 50, 
    marginTop: -7,
  },
  settingsButton: {
    position: 'absolute',
    top: 20, 
    right: 10,
    zIndex: 10
  },
  settingsIcon: {
    width: 30,
    height: 30,
    marginTop: -9,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginLeft: 85,
  },
  sectionTitle1: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 75,
  },
  musicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  musicCard: {
    width: '45%',
    marginBottom: 20,
  },
  musicImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  musicTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  listenAgainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listenAgainCard: {
    width: '100%',
  },
  listenAgainImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  listenAgainTitle: {
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#789D63',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  modalSongTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalArtist: {
    color: '#FFFFFF',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  controlIcon: {
    width: 30,
    height: 30,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Home;
