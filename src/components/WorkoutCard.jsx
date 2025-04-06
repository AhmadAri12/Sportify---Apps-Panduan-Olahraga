// src/components/WorkoutCard.jsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fontType } from '../theme';

const WorkoutCard = ({ 
  title, 
  duration, 
  calories, 
  exercises, 
  image, 
  highlight = false 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <TouchableOpacity onPress={() => setShowDetails(prev => !prev)}>
      <View style={[styles.card, highlight && styles.highlightCard]}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSub}>{duration} | {calories}</Text>
          {showDetails && exercises && (
            <Text style={styles.cardDetails}>{exercises}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  highlightCard: {
    borderWidth: 2,
    borderColor: colors.primary
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10
  },
  cardText: {
    flex: 1
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
  cardDetails: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fontType['Montserrat-Regular'],
    marginTop: 4
  }
});

export default WorkoutCard;
