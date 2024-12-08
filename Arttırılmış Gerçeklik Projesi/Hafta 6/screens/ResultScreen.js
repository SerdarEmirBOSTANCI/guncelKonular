import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { result, path } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {result === 'correct' ? 'Tebrikler! Doğru yolu buldunuz.' : 'Yanlış! Lütfen tekrar deneyin.'}
      </Text>
      {result === 'correct' ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Game1')}>
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