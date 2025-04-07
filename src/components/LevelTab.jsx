  // src/components/LevelTab.jsx
  import React from 'react';
  import { TouchableOpacity, Text, StyleSheet } from 'react-native';
  import { colors, fontType } from '../theme';

  const LevelTab = ({ level, isActive, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tab, isActive && styles.tabActive]}
    >
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
        {level}
      </Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
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
    }
  });

  export default LevelTab;
