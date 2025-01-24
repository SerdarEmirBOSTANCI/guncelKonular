import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native'; 
import Spinner from 'react-native-loading-spinner-overlay'; 

const { width, height } = Dimensions.get('window'); 

const GameScreen2 = () => {
  const navigation = useNavigation();
  
  const [shortestPath, setShortestPath] = useState('');
  const [connections, setConnections] = useState([]);
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [loading, setLoading] = useState(false); 

  
  const nodes = [
    { id: 'A', x: width * 0.5, y: height * 0.2 },
    { id: 'B', x: width * 0.9, y: height * 0.3 },
    { id: 'C', x: width * 0.1, y: height * 0.3 },
    { id: 'D', x: width * 0.5, y: height * 0.7 },
    { id: 'E', x: width * 0.1, y: height * 0.5 },
    { id: 'F', x: width * 0.9, y: height * 0.5 },
  ];

 
  useEffect(() => {
    const initialConnections = [
      { start: 'A', end: 'B', weight: Math.floor(Math.random() * 10 + 1) },
      { start: 'A', end: 'C', weight: Math.floor(Math.random() * 10 + 1) },
      { start: 'B', end: 'F', weight: Math.floor(Math.random() * 10 + 1) },
      { start: 'C', end: 'E', weight: Math.floor(Math.random() * 10 + 1) },
      { start: 'D', end: 'E', weight: Math.floor(Math.random() * 10 + 1) },
      { start: 'D', end: 'F', weight: Math.floor(Math.random() * 10 + 1) },
      { start: 'E', end: 'A', weight: Math.floor(Math.random() * 10 + 1) },
      { start: 'A', end: 'F', weight: Math.floor(Math.random() * 10 + 1) },
      { start: 'E', end: 'F', weight: Math.floor(Math.random() * 10 + 1) },
    ];
    setConnections(initialConnections);

   
    const randomStart = nodes[Math.floor(Math.random() * nodes.length)];
    let randomEnd = nodes[Math.floor(Math.random() * nodes.length)];

    
    while (randomStart.id === randomEnd.id) {
      randomEnd = nodes[Math.floor(Math.random() * nodes.length)];
    }

    setStartNode(randomStart.id);
    setEndNode(randomEnd.id);
  }, []);

  
  const graph = {};
  connections.forEach(({ start, end, weight }) => {
    if (!graph[start]) graph[start] = [];
    if (!graph[end]) graph[end] = [];
    graph[start].push({ node: end, weight });
    graph[end].push({ node: start, weight });
  });

 
  const dijkstra = (start, end) => {
    const distances = {};
    const previous = {};
    const queue = [];

    Object.keys(graph).forEach((node) => {
      distances[node] = Infinity;
      previous[node] = null;
      queue.push(node);
    });
    distances[start] = 0;

    while (queue.length) {
      queue.sort((a, b) => distances[a] - distances[b]);
      const current = queue.shift();

      if (current === end) break;

      graph[current].forEach(({ node, weight }) => {
        const alt = distances[current] + weight;
        if (alt < distances[node]) {
          distances[node] = alt;
          previous[node] = current;
        }
      });
    }

    const path = [];
    let currentNode = end;
    while (currentNode) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }
    return path;
  };

  
  const handleSubmit = () => {
    setLoading(true); 
    const correctPath = dijkstra(startNode, endNode).join(','); 
    if (shortestPath.trim() === correctPath) {
      setTimeout(() => {
        setLoading(false); 
        navigation.navigate('ResultScreen2', { result: 'correct', path: correctPath });
      }, 1500); // 1.5 saniye
    } else {
      setTimeout(() => {
        setLoading(false); 
        navigation.navigate('ResultScreen2', { result: 'incorrect', path: correctPath });
      }, 1500); 
    }
  };

  
  const goToHome = () => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
      navigation.navigate('Home'); 
    }, 1500); 
  };

  return (
    <View style={styles.container}>
      {/* SVG Çizgiler */}
      <Svg style={styles.svg}>
        {connections.map((connection, index) => {
          const startNodeData = nodes.find((node) => node.id === connection.start);
          const endNodeData = nodes.find((node) => node.id === connection.end);

          if (!startNodeData || !endNodeData) return null;

          return (
            <Line
              key={index}
              x1={startNodeData.x}
              y1={startNodeData.y}
              x2={endNodeData.x}
              y2={endNodeData.y}
              stroke="black"
              strokeWidth="2"
            />
          );
        })}
      </Svg>

      {/* Noktalar (Nodes) */}
      {nodes.map((node, index) => (
        <View
          key={index}
          style={[styles.node, { left: node.x - 25, top: node.y - 25 }]} >
          <Text style={styles.nodeText}>{node.id}</Text>
        </View>
      ))}

      {/* Çizgi Ortasındaki Ağırlıklar */}
      {connections.map((connection, index) => {
        const startNodeData = nodes.find((node) => node.id === connection.start);
        const endNodeData = nodes.find((node) => node.id === connection.end);

        if (!startNodeData || !endNodeData) return null;

        const midX = (startNodeData.x + endNodeData.x) / 2;
        const midY = (startNodeData.y + endNodeData.y) / 2;

        return (
          <View key={`weight-${index}`} style={[styles.weight, { left: midX - 15, top: midY - 15 }]} >
            <Text style={styles.weightText}>{connection.weight}</Text>
          </View>
        );
      })}

      {/* Input ve Soruyu Gösteren Kısım */}
      <View style={styles.inputContainer}>
        <Text style={styles.questionText}>
          {startNode} ve {endNode} noktaları arasındaki en kısa yol nedir?
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Noktaların arasına virgül koy"
            placeholderTextColor="#888"
            value={shortestPath}
            onChangeText={setShortestPath}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Tamam</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ana Sayfaya Yönlendiren Buton Sol Üst Köşede */}
      <TouchableOpacity style={styles.homeButton} onPress={goToHome}>
        <Text style={styles.homeButtonText}>Menü</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  node: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  nodeText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weight: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  weightText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '70%',
    padding: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameScreen2;