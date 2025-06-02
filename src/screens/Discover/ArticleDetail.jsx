import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteArticle } from '../../services/api'; // API service

const ArticleDetail = ({ route }) => {
  const { article, refreshArticles } = route.params; // Dapatkan artikel dan fungsi refresh dari params
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      await deleteArticle(article.id); // Hapus artikel
      Alert.alert('Artikel Dihapus', `Artikel "${article.title}" berhasil dihapus.`, [
        {
          text: 'OK',
          onPress: () => {
            refreshArticles(); // Panggil refreshArticles untuk menyegarkan data
            navigation.navigate('Discover');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Gagal menghapus artikel');
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditArticle', { articleId: article.id, refreshArticles });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.description}>{article.description}</Text>
      <Text style={styles.createdAt}>Created on: {new Date(article.createdAt).toLocaleDateString()}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF3B30' }]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#1e1e1e',
    justifyContent: 'flex-start',
    paddingTop: 40,  // Memberikan jarak atas
    paddingBottom: 20,  // Memberikan ruang bawah untuk tombol
  },
  image: {
    width: '100%',
    height: 250,  // Ukuran gambar yang cukup besar untuk menonjolkan produk
    marginBottom: 15,  // Jarak gambar dengan judul
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,  // Mengurangi jarak antara judul dan deskripsi
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,  // Jarak antara deskripsi dan tanggal
  },
  createdAt: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,  // Memberikan jarak antara createdAt dan tombol
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,  // Mengurangi jarak antara tombol Edit dan Hapus
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: '#FF6F00',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ArticleDetail;
  