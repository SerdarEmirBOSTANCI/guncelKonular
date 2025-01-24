import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const ResultScreen = ({ route, navigation }) => {
  const { result, path } = route.params;
  const [sound, setSound] = React.useState();

  // Ses dosyasını çalma işlevi
  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(
      soundFile
    );
    setSound(sound);
    await sound.playAsync();
  };

  // Component mount olduğunda ses çal
  useEffect(() => {
    if (result === 'correct') {
      playSound(require('./pass.mp3')); // doğru cevap sesi
    } else {
      playSound(require('./fail.mp3')); // yanlış cevap sesi
    }

    return () => {
      if (sound) {
        sound.unloadAsync(); // bileşen unmount olduğunda ses kaynağını serbest bırak
      }
    };
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {result === 'correct' ? 'Tebrikler! Doğru yolu buldunuz.' : 'Yanlış! Lütfen tekrar deneyin.'}
      </Text>
      {result === 'correct' ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Game2')}>
          <Text style={styles.buttonText}>Sonraki Bölüm</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 20,
  },
  resultText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;