import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Searchbar, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const { width } = Dimensions.get('window');
const STATIC_IMAGE_URL = 'https://imgmd.net/images/v1/guia/1684034/ilhabela-229-c.jpg';

const categories = [
  { id: '1', name: 'Praia', image: STATIC_IMAGE_URL },
  { id: '2', name: 'Floresta', image: STATIC_IMAGE_URL },
  { id: '3', name: 'Casa', image: STATIC_IMAGE_URL },
  { id: '4', name: 'Castelo', image: STATIC_IMAGE_URL },
  { id: '5', name: 'Hotéis', image: STATIC_IMAGE_URL },
  { id: '6', name: 'Montanha', image: STATIC_IMAGE_URL },
];

const places = [
  {
    id: '1',
    title: 'Hotel na Praia',
    location: 'Praia',
    price: 570,
    nights: 5,
    rating: 4.3,
    image: STATIC_IMAGE_URL,
  },
  {
    id: '2',
    title: 'Castelo na Pennsylvania',
    location: 'Pennsylvania',
    price: 2800,
    nights: 5,
    rating: 3.7,
    image: STATIC_IMAGE_URL,
  },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Hook para navegação

  const renderPlaceCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { placeId: item.id })}>
        <Card style={styles.placeCard}>
        {/* Updated to use static URL */}
        <Image source={{ uri: STATIC_IMAGE_URL }} style={styles.placeImage} />
        <Card.Content>
            <View style={styles.placeHeader}>
                <Title style={styles.placeTitle}>{item.title}</Title>
                <View style={styles.rating}>
                    <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                    <Text>{item.rating}</Text>
                </View>
            </View>
            <Paragraph style={styles.placeLocation}>{item.location}</Paragraph>
            <Text style={styles.placePrice}>R$ {item.price.toFixed(2)} p/ {item.nights} noites</Text>
        </Card.Content>
        </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.dashboardContainer}>
            {/* Barra de Pesquisa */}
            <Searchbar
                placeholder="Buscar destinos"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
            />

            {/* Categorias */}
            <Text style={styles.sectionTitle}>Categorias</Text>
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.categoryItem}>
                        {/* Updated to use static URL */}
                        <Image source={{ uri: STATIC_IMAGE_URL }} style={styles.categoryImage} />
                        <Text style={styles.categoryName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesList}
            />

            {/* Lugares em Destaque */}
            <Text style={styles.sectionTitle}>Lugares em Destaque</Text>
            <FlatList
                data={places}
                renderItem={renderPlaceCard}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.placesList}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 10,
  },
  dashboardContainer: {
    paddingTop: 10,
  },
  searchBar: {
    margin: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 15,
    color: '#333',
  },
  categoriesList: {
    paddingLeft: 10,
  },
  categoryItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 3,
  },
  categoryName: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  placesList: {
    paddingLeft: 10,
    marginBottom: 20,
  },
  placeCard: {
    width: width * 0.75,
    marginRight: 15,
    borderRadius: 10,
    elevation: 4,
  },
  placeImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeLocation: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  placePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    elevation: 2,
  }
});

export default HomeScreen;
