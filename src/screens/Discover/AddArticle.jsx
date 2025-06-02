import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addArticle } from '../../services/api'; // API service
import { useNavigation } from '@react-navigation/native';

const AddArticle = ({ route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!title || !description || !imageUrl) {
      Alert.alert('Peringatan', 'Semua field wajib diisi!');
      return;
    }

    try {
      const newArticle = {
        title,
        description,
        image: imageUrl,
        isFavorite: false,
        createdAt: new Date().toISOString(), // Tambahkan createdAt
      };
      await addArticle(newArticle); // Kirim data ke API
      Alert.alert('Sukses', 'Artikel berhasil ditambahkan!');
      
      // Menyegarkan artikel di DiscoverScreen setelah ditambahkan
      if (route.params?.refreshArticles) {
        route.params.refreshArticles(); // Panggil refreshArticles untuk menyegarkan daftar
      }

      navigation.goBack(); // Navigasi kembali ke DiscoverScreen
    } catch (error) {
      console.error('Gagal menyimpan artikel:', error);
      Alert.alert('Error', 'Gagal menyimpan artikel');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Masukkan judul"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Masukkan deskripsi"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Masukkan URL gambar"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Button title="Tambah Artikel" onPress={handleSubmit} color="#FF6F00" />
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

export default AddArticle;
