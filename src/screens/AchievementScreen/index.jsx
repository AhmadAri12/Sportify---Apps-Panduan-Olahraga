import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { colors, fontType } from '../../theme';

export function AchievementScreen() {
  const achievements = [
    {
      id: 1,
      title: '7 Hari Berturut-turut',
      description: 'Kamu berhasil berolahraga selama seminggu penuh!',
      icon: 'https://st.depositphotos.com/1016545/4532/i/450/depositphotos_45320179-stock-photo-fonts-numbers-and-symbols-in.jpg'
    },
    {
      id: 2,
      title: '1000 Kalori Terbakar',
      description: 'Kamu sudah membakar 1000 kalori!',
      icon: 'https://i.pinimg.com/736x/15/29/44/152944fc039b6b713326c65ce6fcb887.jpg'
    },
    {
      id: 3,
      title: 'Level Intermediate',
      description: 'Kamu telah mencapai level Intermediate!',
      icon: 'https://cdn-icons-png.flaticon.com/512/3784/3784184.png'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Pencapaian Saya</Text>

      {achievements.map(item => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.icon }} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 30
  },
  header: {
    fontSize: 24,
    color: colors.white,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 20
  },
  card: {
    backgroundColor: colors.gray,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'flex-start',
    gap: 12
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    resizeMode: 'cover'
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fontType['Montserrat-SemiBold'],
    marginBottom: 4
  },
  desc: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fontType['Montserrat-Regular'],
    flexWrap: 'wrap'
  }
});
