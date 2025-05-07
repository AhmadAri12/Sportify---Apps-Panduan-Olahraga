import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fontType } from '../theme';

const ProfileCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Aharfi</Text>
      <Text style={styles.email}>Aharfi@gmail.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.gray || '#2C2C2E',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#444',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fontType['Montserrat-Bold'],
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: fontType['Montserrat-Regular'],
  },
});

export default ProfileCard;
