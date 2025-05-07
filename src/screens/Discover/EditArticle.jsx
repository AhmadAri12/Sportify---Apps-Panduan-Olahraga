import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fontType } from '../../theme';

const EditArticle = ({ route, navigation }) => {
  const { articleId } = route.params;

  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const savedArticles = await AsyncStorage.getItem('articles');
      const articles = savedArticles ? JSON.parse(savedArticles) : [];
      const found = articles.find((a) => a.id === articleId);
      if (found) {
        setArticle(found);
        setTitle(found.title);
        setDescription(found.description);
        setImage(found.image);
      } else {
        Alert.alert('Artikel tidak ditemukan');
        navigation.goBack();
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleSaveChanges = async () => {
    if (title && description) {
      const updatedArticle = {
        id: article.id,
        title,
        description,
        image,
        isFavorite: article.isFavorite,
      };

      const savedArticles = await AsyncStorage.getItem('articles');
      const existingArticles = savedArticles ? JSON.parse(savedArticles) : [];

      const updatedArticles = existingArticles.map((a) =>
        a.id === article.id ? updatedArticle : a
      );

      await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles));
      Alert.alert('Berhasil', `Artikel "${title}" berhasil diperbarui.`);
      navigation.navigate('Discover');
    } else {
      Alert.alert('Formulir Tidak Lengkap', 'Pastikan Anda mengisi semua kolom.');
    }
  };

  const handleDeleteArticle = async () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Yakin ingin menghapus artikel ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            const savedArticles = await AsyncStorage.getItem('articles');
            const existingArticles = savedArticles ? JSON.parse(savedArticles) : [];

            const updatedArticles = existingArticles.filter((a) => a.id !== article.id);

            await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles));
            Alert.alert('Dihapus', `Artikel "${article.title}" berhasil dihapus.`);
            navigation.navigate('Discover');
          },
        },
      ]
    );
  };

  if (!article) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Artikel</Text>

      <TextInput
        style={styles.input}
        placeholder="Judul Artikel"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Deskripsi Artikel"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="URL Gambar (opsional)"
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteArticle}>
        <Text style={styles.deleteButtonText}>Hapus Artikel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 18,
    fontFamily: fontType['Montserrat-Bold'],
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.white,
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fontType['Montserrat-Bold'],
  },
  deleteButton: {
    backgroundColor: colors.red || '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fontType['Montserrat-Bold'],
  },
});

export default EditArticle;
