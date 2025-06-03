import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { colors, fontType } from '../../theme';

export function ProfileScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mengambil data pengguna dari Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', 'users_01'); // Pastikan 'users_01' sesuai dengan ID pengguna di Firestore
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          console.log('User data:', snapshot.data());  // Debugging log
          setUserData(snapshot.data());
        } else {
          console.log("No data found for this user");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Menampilkan loading indicator jika data belum ada
  if (loading || !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Profil Saya</Text>

      <View style={styles.profileContainer}>
        {/* Gambar Profil */}
        {userData.image && (
          <Image source={{ uri: userData.image }} style={styles.profileImage} />
        )}

        {/* Informasi Pengguna */}
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Nama: {userData.nama}</Text>
          <Text style={styles.userInfoText}>Telepon: {userData.phone}</Text>
          <Text style={styles.userInfoText}>Jenis Pengguna: {userData.userType}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 20,
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userInfo: {
    alignSelf: 'flex-start',
    marginTop: 20, // Menambahkan jarak antara gambar dan informasi
  },
  userInfoText: {
    fontSize: 16,
    marginVertical: 4,
    color: colors.white,
    fontFamily: fontType['Montserrat-Regular'],
  },
  editButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: colors.black,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
