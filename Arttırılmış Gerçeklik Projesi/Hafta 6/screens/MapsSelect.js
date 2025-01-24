import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MapSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Harita Seçin</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game1')}>
        <Text style={styles.buttonText}>Harita 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game2')}>
        <Text style={styles.buttonText}>Harita 2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',  // Arka plan rengini belirledik
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',  // Başlık rengini beyaz yaptık
    marginBottom: 40,  // Başlık ile butonlar arasında boşluk
  },
  button: {
    backgroundColor: '#388E3C',  // Buton için yeşil tonları
    padding: 15,
    borderRadius: 30,  // Yuvarlak köşeler
    marginTop: 20,
    width: 250,  // Buton genişliğini ayarladık
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',  // Gölgeleme ekledik
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,  // Android için gölge etkisi
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,  // Buton metnini büyüttük
    fontWeight: 'bold',
  },
});

export default MapSelectionScreen;