import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

const maps = [
  { id: '1', name: 'Harita 1', description: 'Dijkstra için basit bir harita.', price: '₺50', purchased: false },
  { id: '2', name: 'Harita 2', description: 'Orta zorluk seviyesinde bir harita.', price: '₺100', purchased: false },
  { id: '3', name: 'Harita 3', description: 'Zor bir harita.', price: '₺200', purchased: false },
];

const arContent = { id: 'arMode', name: 'AR Modu', description: 'Tüm haritalar için AR deneyimi.', price: '₺500', purchased: false };

const MapsScreen = () => {
  const [mapData, setMapData] = useState(maps);
  const [arData, setArData] = useState(arContent);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleFakePurchase = () => {
    if (!cardNumber || !cardHolder || !expirationDate || !cvv) {
      Alert.alert('Hata', 'Kart bilgileri hatalı veya eksik.');
      return;
    }

    if (selectedItem.id === 'arMode') {
      setArData({ ...arData, purchased: true });
    } else {
      setMapData((prevData) =>
        prevData.map((item) => (item.id === selectedItem.id ? { ...item, purchased: true } : item))
      );
    }

    setModalVisible(false);
    Alert.alert('Başarılı', `${selectedItem.name} başarıyla satın alındı!`);
    resetForm();
  };

  const resetForm = () => {
    setCardNumber('');
    setCardHolder('');
    setExpirationDate('');
    setCvv('');
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Haritalar</Text>
      <FlatList
        data={mapData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.mapName}>{item.name}</Text>
            <Text style={styles.mapDescription}>{item.description}</Text>
            <Text style={styles.mapPrice}>{item.price}</Text>
            <TouchableOpacity
              style={[styles.button, item.purchased && styles.disabledButton]}
              onPress={() => item.purchased ? null : openModal(item)}
              disabled={item.purchased}
            >
              <Text style={styles.buttonText}>
                {item.purchased ? 'Satın Alındı' : 'Satın Al'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.title}>AR Modu</Text>
      <View style={styles.card}>
        <Text style={styles.mapName}>{arData.name}</Text>
        <Text style={styles.mapDescription}>{arData.description}</Text>
        <Text style={styles.mapPrice}>{arData.price}</Text>
        <TouchableOpacity
          style={[styles.button, arData.purchased && styles.disabledButton]}
          onPress={() => arData.purchased ? null : openModal(arData)}
          disabled={arData.purchased}
        >
          <Text style={styles.buttonText}>
            {arData.purchased ? 'Satın Alındı' : 'Satın Al'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Kart Bilgilerini Girin</Text>
          <TextInput
            style={styles.input}
            placeholder="Kart Numarası"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Kart Sahibinin Adı"
            value={cardHolder}
            onChangeText={setCardHolder}
          />
          <TextInput
            style={styles.input}
            placeholder="Son Kullanma Tarihi (MM/YY)"
            value={expirationDate}
            onChangeText={setExpirationDate}
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            keyboardType="numeric"
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
          />
          <TouchableOpacity style={styles.confirmButton} onPress={handleFakePurchase}>
            <Text style={styles.confirmButtonText}>Satın Al</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#4CAF50',  
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',  
  },
  card: {
    padding: 20,
    borderRadius: 15,  
    marginBottom: 20,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3,  
    shadowRadius: 10,  
    elevation: 6, 
    backgroundColor: 'rgba(165, 214, 167, 0.9)',  
  },
  mapName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',  
  },
  mapDescription: {
    fontSize: 14,
    color: '#757575',  
    marginVertical: 5,
  },
  mapPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',  
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#388E3C',  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',  
  },
  buttonText: {
    color: '#fff',  
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#388E3C', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',  
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    backgroundColor: '#FAFAFA', 
  },
  confirmButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',  
    fontWeight: 'bold',
  },
});

export default MapsScreen;
