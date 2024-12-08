import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'; 

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false); 

  const handleButtonPress = (screen) => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
      navigation.navigate(screen); 
    }, 1000); 
  };

  const handleExitPress = () => {
    BackHandler.exitApp(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>En Kısa Yolu Bulma Oyunu</Text>
      
      {/* Nasıl Oynanır Butonu */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleButtonPress('HowToPlay')}
      >
        <Text style={styles.buttonText}>Nasıl Oynanır</Text>
      </TouchableOpacity>

      {/* Oyun Sayfası Butonu */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleButtonPress('Game1')}
      >
        <Text style={styles.buttonText}>Oyuna Başla</Text>
      </TouchableOpacity>

      {/* Haritalar Sayfası Butonu */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleButtonPress('MapsScreen')}
      >
        <Text style={styles.buttonText}>Haritalar</Text>
      </TouchableOpacity>

      {/* Çıkış Butonu */}
      <TouchableOpacity 
        style={[styles.button, styles.exitButton]} 
        onPress={handleExitPress}
      >
        <Text style={styles.buttonText}>Çıkış</Text>
      </TouchableOpacity>

      {/* Biz Kimiz Yazısı */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('AboutUs')} 
      >
        <Text style={styles.aboutText}>Biz Kimiz?</Text>
      </TouchableOpacity>

      {/* Loader */}
      <Spinner visible={loading} textContent={'Yükleniyor...'} textStyle={styles.spinnerTextStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff', 
  },
  button: {
    backgroundColor: '#388E3C', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  exitButton: {
    backgroundColor: '#D32F2F', 
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', 
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;