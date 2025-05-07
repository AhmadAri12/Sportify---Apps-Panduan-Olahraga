import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  Alert,
} from 'react-native';
import { colors, fontType } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddArticle = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    if (!title || !description || !imageUrl) {
      Alert.alert('Peringatan', 'Semua field wajib diisi!');
      return;
    }

    try {
      const savedArticles = await AsyncStorage.getItem('articles');
      const existingArticles = savedArticles ? JSON.parse(savedArticles) : [];

      const newId = existingArticles.length > 0
        ? Math.max(...existingArticles.map(a => a.id)) + 1
        : 1;

      const newArticle = {
        id: newId,
        title,
        description,
        image: imageUrl,
        isFavorite: false,
      };

      const updatedArticles = [...existingArticles, newArticle];
      await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles));

      // Bersihkan form
      setTitle('');
      setDescription('');
      setImageUrl('');

      Alert.alert('Sukses', 'Artikel berhasil ditambahkan!');
      navigation.goBack();
    } catch (error) {
      console.error('Gagal menyimpan artikel:', error);
      Alert.alert('Error', 'Gagal menyimpan artikel');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul Artikel</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Masukkan judul"
        style={styles.input}
        placeholderTextColor={colors.gray}
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Masukkan deskripsi"
        style={styles.input}
        placeholderTextColor={colors.gray}
      />

      <Text style={styles.label}>URL Gambar</Text>
      <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="https://..."
        style={styles.input}
        placeholderTextColor={colors.gray}
      />

      {imageUrl !== '' && (
        <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
      )}

      <Button title="Tambah Artikel" onPress={handleSubmit} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 16,
  },
  label: {
    color: colors.white,
    marginTop: 10,
    fontFamily: fontType['Montserrat-Regular'],
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    marginTop: 5,
    borderRadius: 8,
    color: colors.white,
  },
  imagePreview: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default AddArticle;
