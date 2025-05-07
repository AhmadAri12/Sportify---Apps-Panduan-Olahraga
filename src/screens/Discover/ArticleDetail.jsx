import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fontType } from '../../theme';

const ArticleDetail = ({ route, navigation }) => {
  const { article } = route.params;

  const handleDelete = async () => {
    try {
      const savedArticles = await AsyncStorage.getItem('articles');
      const articles = savedArticles ? JSON.parse(savedArticles) : [];

      const filteredArticles = articles.filter((a) => a.id !== article.id);
      await AsyncStorage.setItem('articles', JSON.stringify(filteredArticles));

      Alert.alert('Artikel Dihapus', `Artikel "${article.title}" berhasil dihapus.`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Discover'),
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Terjadi Kesalahan', 'Gagal menghapus artikel.');
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditArticle', { articleId: article.id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image source={{ uri: article.image }} style={styles.image} />
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.description}>{article.description}</Text>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 350,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    color: colors.primary,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontType['Montserrat-Regular'],
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },
  editButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.red || '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontType['Montserrat-Bold'],
  },
});

export default ArticleDetail;
