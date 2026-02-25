import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Praia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=150&auto=format&fit=crop' },
  { id: '2', name: 'Floresta', image: 'https://images.unsplash.com/photo-1542353133-c151c893693f?q=80&w=150&auto=format&fit=crop' },
  { id: '3', name: 'Casa', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3bafb?q=80&w=150&auto=format&fit=crop' },
  { id: '4', name: 'Castelo', image: 'https://images.unsplash.com/photo-1574313883730-a81ae8131342?q=80&w=150&auto=format&fit=crop' },
  { id: '5', name: 'Hotéis', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099557?q=80&w=150&auto=format&fit=crop' },
  { id: '6', name: 'Montanha', image: 'https://images.unsplash.com/photo-1506905925346-c43366021820?q=80&w=150&auto=format&fit=crop' },
];

const places = [
  {
    id: '1',
    title: 'Hotel na Praia',
    location: 'Praia',
    price: 570,
    nights: 5,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099557?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Castelo na Pennsylvania',
    location: 'Pennsylvania',
    price: 2800,
    nights: 5,
    rating: 3.7,
    image: 'https://images.unsplash.com/photo-1574313883730-a81ae8131342?q=80&w=400&auto=format&fit=crop',
  },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderPlaceCard = ({ item }) => (
    <Card style={styles.placeCard}>
      <Image source={{ uri: item.image }} style={styles.placeImage} />
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.dashboardContainer}>
            {/* Barra de Pesquisa */}
            <Searchbar
                placeholder="Buscar espaços..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
                inputStyle={styles.searchBarInput}
            />

            {/* Carrossel de Categorias */}
            <View style={styles.categoryContainer}>
                <Text style={styles.sectionTitle}>Categorias</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScrollView}
                >
                    {categories.map((category) => (
                    <TouchableOpacity key={category.id} style={styles.categoryItem}>
                        <Image source={{ uri: category.image }} style={styles.circularImage} />
                        <Text style={styles.categoryName}>{category.name}</Text>
                    </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Feed de Lugares (AirBNB style) */}
            <View style={styles.feedContainer}>
                <Text style={styles.sectionTitle}>Destaques</Text>
                <FlatList
                    data={places}
                    renderItem={renderPlaceCard}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false} // Desabilita o scroll interno para usar o scroll principal
                />
            </View>
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
    flex: 1,
  },
  dashboardContainer: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 15,
    elevation: 2,
  },
  searchBarInput: {
    padding: 0,
  },
  categoryContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  categoryScrollView: {
    paddingVertical: 5,
  },
  categoryItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  circularImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  categoryName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  feedContainer: {
    marginTop: 10,
  },
  placeCard: {
    marginBottom: 15,
    elevation: 4,
    borderRadius: 10,
  },
  placeImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeLocation: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  placePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
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