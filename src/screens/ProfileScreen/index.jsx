import React from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProfileCard from '../../components/ProfileCard';
import WorkoutCard from '../../components/WorkoutCard';
import { colors, fontType } from '../../theme';

export function ProfileScreen() {
  const navigation = useNavigation();

  const workouts = [
    {
      id: 1,
      title: 'Full Body Workout',
      image: 'https://mealfit.id/hubfs/Jenis-jenis-Program-Full-Body-Workout-dan-Tips-Rahasianya---001.webp',
      calories: '980 Kcal',
      progress: 70
    },
    {
      id: 2,
      title: 'Upper Body Workout',
      image: 'https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2020/12/Skinny-Guy-With-A-Beard-Performing-A-Workoug-For-Skinny-People.jpg?w=1109&quality=86&strip=all',
      calories: '980 Kcal',
      progress: 45
    },
    {
      id: 3,
      title: 'Cardio Routine',
      image: 'https://cdn.muscleandstrength.com/sites/default/files/field/feature-image/workout/4-killer-treadmill-routines-feature.jpg',
      calories: '980 Kcal',
      progress: 80
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Profil Saya</Text>
      <ProfileCard />

      <Pressable
        style={styles.achievementCard}
        onPress={() => navigation.navigate('AchievementScreen')}
      >
        <Icon name="trophy" size={20} color={colors.white} />
        <Text style={styles.achievementText}>Achievement</Text>
      </Pressable>

      <Text style={styles.subHeader}>Latihan yang Sedang Dijalani</Text>
      <View style={styles.listContainer}>
        {workouts.map(workout => (
          <WorkoutCard
            key={workout.id}
            title={workout.title}
            calories={workout.calories}
            image={workout.image}
            progress={workout.progress}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fontType['Montserrat-SemiBold'],
    marginBottom: 16,
  },
  listContainer: {
    gap: 16,
    marginBottom: 30,
  },
  achievementCard: {
    backgroundColor: colors.grey || '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#444',
  },
  achievementText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontType['Montserrat-SemiBold'],
  },
});
