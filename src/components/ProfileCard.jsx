import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Ahmad Ari Firmansyah</Text>
      <Text style={styles.email}>Aharfi@gmail.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 3,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#777',
    fontSize: 15,
  },
});

export default ProfileCard;
