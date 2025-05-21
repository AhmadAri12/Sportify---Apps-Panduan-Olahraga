import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Animated,
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

  // 🔸 Animated values
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 120); // 120 = tinggi header
  const headerTranslateY = diffClampY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -120],
    extrapolate: 'clamp',
  });
  const fabTranslateY = diffClampY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

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

  const AnimatedArticleCard = ({ article, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <ArticleCard
          title={article.title}
          description={article.description}
          image={article.image}
          isFavorite={article.isFavorite}
          onPress={() => navigation.navigate('ArticleDetail', { article })}
          onFavoritePress={() => toggleFavorite(article.id)}
          onEditPress={() => navigation.navigate('EditArticle', { articleId: article.id })}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔸 Header dan SearchBar digabung & dianimasikan */}
      <Animated.View style={[styles.headerWrapper, { transform: [{ translateY: headerTranslateY }] }]}>
        <Text style={styles.header}>Articles & Tips</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari artikel..."
          placeholderTextColor="#ccc"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
      </Animated.View>

      {/* 🔸 ScrollView dengan paddingTop diperbesar */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 160, paddingBottom: 130 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {filteredArticles.map((article, index) => (
          <AnimatedArticleCard key={article.id} article={article} index={index} />
        ))}
      </Animated.ScrollView>

      {/* 🔸 FAB */}
      <Animated.View style={[styles.fab, { transform: [{ translateY: fabTranslateY }] }]}>
        <TouchableOpacity onPress={() => navigation.navigate('AddArticle')}>
          <Icon name="add" size={28} color={colors.white} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 16,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.black,
    paddingTop: 40,
    paddingBottom: 20,
    zIndex: 1000,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 18,
    fontFamily: fontType['Montserrat-Bold'],
    color: colors.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: colors.grey || '#2C2C2E',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
