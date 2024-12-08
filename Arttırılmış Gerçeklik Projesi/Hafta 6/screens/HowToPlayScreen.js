import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'; 

const HowToPlayScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false); 


  const handleStartButtonPress = () => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
      navigation.navigate('Game1'); 
    }, 1500); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oyunun Kuralları</Text>
      <Text style={styles.description}>
        Bu oyunda amacınız rastgele iki nokta arasındaki en kısa yolu bulmaktır. 
        Haritadaki noktaları ve yolları dikkatlice inceleyin.
      </Text>
      <Text style={styles.description}>
        Haritadaki noktaların arasındaki sayıları toplayın ve en kısa olan yolu bulun.
        Cevabı başlangıç noktasında başlayarak büyük harflerle yazın.
      </Text>
      <Text style={styles.description}>
        Örnek: A,B,C
      </Text>
      <TouchableOpacity 
        style={styles.startButton} 
        onPress={handleStartButtonPress} 
      >
        <Text style={styles.buttonText}>Başla</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HowToPlayScreen;