import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { colors, fontType } from './src/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {
  const [selectedLevel, setSelectedLevel] = useState('Beginner');

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const workouts = [
    {
      title: 'Morning Energizer',
      duration: '30 Minutes',
      calories: '450 Kcal',
      exercises: '5 exercises',
      image: 'https://i.ytimg.com/vi/uiwoG5-Doiw/maxresdefault.jpg',
      highlight: true
    },
    {
      title: 'Stretch & Relax',
      duration: '15 Minutes',
      calories: '250 Kcal',
      image: 'https://i.pinimg.com/736x/74/a1/57/74a1577a40d3d8b6e0c013b93a03b4aa.jpg',
    },
    {
      title: 'Cardio Quick Burn',
      duration: '30 Minutes',
      calories: '980 Kcal',
      image: 'https://i.pinimg.com/736x/fd/37/45/fd3745073afa8eaaed291282712a5cc5.jpg',
    },
    {
      title: 'Upper Body Strength',
      duration: '15 Minutes',
      calories: '500 Cal',
      image: 'https://i.pinimg.com/736x/de/29/70/de297031cc0da0496d4683bd56f04e09.jpg',
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Sportify</Text>

      <View style={styles.tabContainer}>
        {levels.map(level => (
          <TouchableOpacity
            key={level}
            onPress={() => setSelectedLevel(level)}
            style={[
              styles.tab,
              selectedLevel === level && styles.tabActive
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedLevel === level && styles.tabTextActive
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Featured Workout */}
      <View style={styles.featuredCard}>
        <Image
          source={{ uri: workouts[0].image }}
          style={styles.featuredImage}
        />
        <View style={styles.featuredOverlay}>
          <Text style={styles.featuredBadge}>Latihan Hari Ini</Text>
          <Text style={styles.featuredTitle}>{workouts[0].title}</Text>
          <Text style={styles.featuredDetails}>
            {workouts[0].duration} | {workouts[0].calories} | {workouts[0].exercises}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Latihan {selectedLevel}</Text>

      {/* Workout List */}
      {workouts.slice(1).map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSub}>
              {item.duration} | {item.calories}
            </Text>
          </View>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingTop: 40
  },
  header: {
    color: colors.white,
    fontSize: 24,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 20
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.darkGray,
    marginRight: 10
  },
  tabActive: {
    backgroundColor: colors.primary
  },
  tabText: {
    color: colors.white,
    fontFamily: fontType['Montserrat-Regular']
  },
  tabTextActive: {
    fontFamily: fontType['Montserrat-Bold']
  },
  featuredCard: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30
  },
  featuredImage: {
    width: '100%',
    height: 200
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  featuredBadge: {
    backgroundColor: colors.primary,
    color: colors.black,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    borderRadius: 12,
    fontSize: 12,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 6
  },
  featuredTitle: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fontType['Montserrat-Bold']
  },
  featuredDetails: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fontType['Montserrat-Regular']
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fontType['Montserrat-SemiBold'],
    marginBottom: 16
  },
  card: {
    backgroundColor: colors.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardText: {
    flex: 1,
    paddingRight: 10
  },
  cardTitle: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 6
  },
  cardSub: {
    color: colors.gray,
    fontSize: 13,
    fontFamily: fontType['Montserrat-Regular']
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12
  }
});

export default App;
