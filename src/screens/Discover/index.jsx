import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { getArticles } from '../../services/api';
import ArticleCard from '../../components/ArticleCard';
import { useNavigation } from '@react-navigation/native';
import { Add } from 'iconsax-react-native';

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchArticles = async () => {
    try {
      const res = await getArticles();
      setArticles(res.data);
    } catch (error) {
      console.error('Gagal mengambil artikel:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    article.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Articles & Tips</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari artikel..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
      </View>

      <FlatList
        data={filteredArticles}
        renderItem={({ item }) => (
          <ArticleCard
            title={item.title}
            description={item.description}
            image={item.image}
            createdAt={item.createdAt}
            onPress={() => navigation.navigate('ArticleDetail', { article: item, refreshArticles: fetchArticles })}
            onEditPress={() => navigation.navigate('EditArticle', { articleId: item.id, refreshArticles: fetchArticles })}
            onDeletePress={() => navigation.navigate('ArticleDetail', { article: item, refreshArticles: fetchArticles })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.articleList}
      />
    <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddArticle', { refreshArticles: fetchArticles })}
      >
        <Add size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
  },
  headerWrapper: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  header: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#2c2c2c',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#FF6F00',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  articleList: {
    marginTop: 10,
  },
});

export default DiscoverScreen;
