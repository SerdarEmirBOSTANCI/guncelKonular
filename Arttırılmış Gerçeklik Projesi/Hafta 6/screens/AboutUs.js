import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biz Kimiz?</Text>
      <Text style={styles.description}>
        Fırat Üniversitesi Yazılım Mühendisliği öğrencileriyiz. Amacımız, çocukların hem zekalarını geliştirebileceği hem de eğlenceli bir şekilde bilgi edinebileceği oyunlar tasarlamak. Özellikle, bu oyunumuz Dijkstra algoritmasıyla en kısa yolu bulmayı öğretmeyi hedefliyor. Bu oyun, çocukların mantık ve problem çözme becerilerini geliştirirken, aynı zamanda eğlenceli bir öğrenme deneyimi sunuyor.
{'\n\n'}
Ebeveynler için, çocuklarının oyun oynarken matematiksel düşünme becerilerini nasıl geliştirebileceklerini görmek çok değerli bir deneyimdir. Oyunlarımız, çocukları hem teknik konularda hem de analitik düşünme becerilerinde geliştirmeyi hedefliyor. Ayrıca, uçak içi eğlence hizmetleri üzerine de çalışmalar yaparak, teknolojinin farklı alanlarında da çözüm üretmeye devam ediyoruz. Oyunlarımızı tasarlarken, her yaş grubuna hitap edebilecek seviyede zorluklar sunarak, çocukların hızla ilerlemesini sağlıyoruz. Çocuklarınızın bu eğlenceli ve öğretici yolculuğa katılmasını sağlamak, onların gelişimine katkı sağlamak için en iyi yöntemlerden biri olacaktır.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50', // Yeşil arka plan
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Beyaz yazı
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default AboutUsScreen;
