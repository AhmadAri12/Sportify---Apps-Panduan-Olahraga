import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ArticleCard from '../../components/ArticleCard';
import { colors, fontType } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DiscoverScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const [articles, setArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const getArticles = async () => {
    try {
      const savedArticles = await AsyncStorage.getItem('articles');
      if (savedArticles) {
        setArticles(JSON.parse(savedArticles));
      } else {
        setArticles(defaultArticles);
        await AsyncStorage.setItem('articles', JSON.stringify(defaultArticles));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, [isFocused]);

  useEffect(() => {
    const handleUpdatedArticle = async () => {
      if (!route.params?.updatedArticle) return;

      try {
        const savedArticles = await AsyncStorage.getItem('articles');
        const existingArticles = savedArticles ? JSON.parse(savedArticles) : [];

        const updatedArticle = route.params.updatedArticle;
        const updatedArticles = existingArticles.map(article =>
          article.id === updatedArticle.id ? updatedArticle : article
        );

        await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles));
        setArticles(updatedArticles);
        Alert.alert('Artikel Diperbarui', `Artikel "${updatedArticle.title}" berhasil diperbarui.`);
        navigation.setParams({ updatedArticle: null });
      } catch (error) {
        console.error('Gagal memperbarui artikel:', error);
      }
    };

    handleUpdatedArticle();
  }, [route.params, isFocused]);

  const toggleFavorite = async (id) => {
    const updatedArticles = articles.map((article) =>
      article.id === id ? { ...article, isFavorite: !article.isFavorite } : article
    );
    setArticles(updatedArticles);
    await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    article.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Articles & Tips</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Cari artikel..."
        placeholderTextColor="#ccc"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            image={article.image}
            isFavorite={article.isFavorite}
            onPress={() => navigation.navigate('ArticleDetail', { article })}
            onFavoritePress={() => toggleFavorite(article.id)}
            onEditPress={() => navigation.navigate('EditArticle', { articleId: article.id })}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddArticle')}>
        <Icon name="add" size={28} color={colors.white} />
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
  searchInput: {
    backgroundColor: colors.grey || '#2C2C2E',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
    fontFamily: fontType['Montserrat-Regular'],
    color: colors.white,
    borderWidth: 1,
    borderColor: '#444',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default DiscoverScreen;
