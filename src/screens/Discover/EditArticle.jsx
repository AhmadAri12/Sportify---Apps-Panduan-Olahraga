import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getArticleById, updateArticle } from '../../services/api'; // API service
import { useRoute, useNavigation } from '@react-navigation/native';

const EditArticle = () => {
  const { articleId, refreshArticles } = useRoute().params; // Dapatkan ID artikel dan fungsi refresh dari params
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getArticleById(articleId);
        setArticle(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImage(res.data.image);
      } catch (error) {
        console.error('Gagal mengambil artikel:', error);
        Alert.alert('Error', 'Gagal mengambil artikel');
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleSaveChanges = async () => {
    if (title && description) {
      const updatedArticle = {
        ...article,
        title,
        description,
        image,
        createdAt: article.createdAt, // Tetap pertahankan tanggal dibuat
      };

      try {
        await updateArticle(articleId, updatedArticle);
        Alert.alert('Sukses', `Artikel "${title}" berhasil diperbarui.`);
        refreshArticles(); // Panggil refreshArticles untuk menyegarkan data
        navigation.goBack();
      } catch (error) {
        console.error('Gagal memperbarui artikel:', error);
        Alert.alert('Error', 'Gagal memperbarui artikel');
      }
    } else {
      Alert.alert('Formulir Tidak Lengkap', 'Pastikan Anda mengisi semua kolom.');
    }
  };

  if (!article) return null;

  return (
    <View style={styles.container}>
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
      <Button title="Simpan Perubahan" onPress={handleSaveChanges} color="#FF6F00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
    paddingTop: 40,
  },
  input: {
    backgroundColor: '#2c2c2c',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    color: '#fff',
  },
});

export default EditArticle;
