// src/screens/Home/index.jsx
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
import { colors, fontType } from '../../theme';
import { LevelTab, WorkoutCard } from '../../components';

const Home = () => {
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Sportify</Text>

        {/* Horizontal Scroll for LevelTab */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {levels.map(level => (
            <LevelTab
              key={level}
              level={level}
              isActive={selectedLevel === level}
              onPress={() => setSelectedLevel(level)}
            />
          ))}
        </ScrollView>

        {/* Featured Workout */}
        <TouchableOpacity onPress={() => console.log('Klik Featured Workout')}>
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
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Latihan {selectedLevel}</Text>

        {/* Workout List */}
        {workouts.slice(1).map((item, i) => (
          <WorkoutCard
            key={i}
            title={item.title}
            duration={item.duration}
            calories={item.calories}
            exercises={item.exercises}
            image={item.image}
            progress={75}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 30
  },
  header: {
    color: colors.white,
    fontSize: 24,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 20
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
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
  }
});

export default Home;
