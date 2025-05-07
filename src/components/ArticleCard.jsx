import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fontType } from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const ArticleCard = ({ 
  title, 
  description, 
  image, 
  isFavorite = false, 
  onPress, 
  onFavoritePress,
  onDeletePress,
  onEditPress
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onEditPress}>
            <Icon name="edit" size={18} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress} style={{ marginLeft: 16 }}>
            <Icon name="trash" size={18} color={colors.red} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity 
          style={styles.favoriteIcon}
          onPress={onFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon 
            name="star" 
            size={16} 
            color={isFavorite ? colors.primary : colors.gray} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.darkGray,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 6,
  },
  description: {
    color: colors.gray,
    fontSize: 13,
    fontFamily: fontType['Montserrat-Regular'],
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.darkGray,
    padding: 4,
    borderRadius: 999,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
  }
});

export default ArticleCard;
