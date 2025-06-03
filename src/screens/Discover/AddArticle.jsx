import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addArticle } from '../../services/api'; // API service
import notifee, { AndroidImportance } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';

const AddArticle = ({ route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadOption, setUploadOption] = useState({ id: 1, name: 'Immediate' });
  const navigation = useNavigation();

  // Upload options
  const dataUploadOption = [
    { id: 1, name: 'Immediate' },
    { id: 2, name: 'After 10 Seconds' },
    { id: 3, name: 'After 20 Seconds' },
  ];

  useEffect(() => {
    requestPermission();
  }, []);

  // Request permission for notifications
  const requestPermission = async () => {
    const permission = await notifee.requestPermission();
    if (permission !== 1) {
      notifee.openNotificationSettings();
    }
  };

  // Create notification channel for Android
  const createNotificationChannel = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Notification Channel',
      importance: AndroidImportance.HIGH,
    });
    return channelId;
  };

  // Function to handle delayed article upload
  const handleDelayedPost = async (delayInSeconds) => {
    const channelId = await createNotificationChannel();
    
    // Display notification that the upload is scheduled
    await notifee.displayNotification({
      title: 'Artikel Dijadwalkan',
      body: `Artikel akan diupload dalam ${delayInSeconds} detik.`,
      android: { channelId },
    });

    // Delay for the upload
    await new Promise(resolve => setTimeout(resolve, delayInSeconds * 1000));

    const newArticle = {
      title,
      description,
      image: imageUrl,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };

    try {
      await addArticle(newArticle); // Add the article
      Alert.alert('Sukses', 'Artikel berhasil ditambahkan!');
      
      // Display notification that the article has been uploaded
      await notifee.displayNotification({
        title: 'Artikel DiUpload',
        body: `Artikel "${title}" berhasil diupload!`,
        android: { channelId },
      });

      // Go back to the Discover screen after successful upload
      navigation.goBack();
      
      // Refresh the articles in Discover screen
      if (route.params?.refreshArticles) {
        route.params.refreshArticles(); // Call the refresh function passed from Discover screen
      }

    } catch (error) {
      console.error('Gagal menyimpan artikel:', error);
      Alert.alert('Error', 'Gagal menyimpan artikel');
    }
  };

  // Handle the submit action when the user presses "Tambah Artikel"
  const handleSubmit = async () => {
    if (!title || !description || !imageUrl) {
      Alert.alert('Peringatan', 'Semua field wajib diisi!');
      return;
    }

    if (uploadOption.id === 1) {
      const newArticle = { title, description, image: imageUrl, isFavorite: false, createdAt: new Date().toISOString() };
      await addArticle(newArticle);
      Alert.alert('Sukses', 'Artikel berhasil ditambahkan!');
      navigation.goBack();
    } else if (uploadOption.id === 2) {
      handleDelayedPost(10); // Delay of 10 seconds
    } else if (uploadOption.id === 3) {
      handleDelayedPost(20); // Delay of 20 seconds
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

      {/* Button to select upload option */}
      {dataUploadOption.map((item) => (
        <Button key={item.id} title={item.name} onPress={() => setUploadOption({ id: item.id, name: item.name })} />
      ))}

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
