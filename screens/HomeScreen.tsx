import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Praia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=150&auto=format&fit=crop' },
  { id: '2', name: 'Floresta', image: 'https://images.unsplash.com/photo-153227440291-421b85f20815?q=80&w=150&auto=format&fit=crop' }, // Placeholder updated
  { id: '3', name: 'Casa', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3bafb?q=80&w=150&auto=format&fit=crop' },
  { id: '4', name: 'Castelo', image: 'https://images.unsplash.com/photo-1533105079-dab52097982f?q=80&w=150&auto=format&fit=crop' }, // Placeholder updated
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
    image: 'https://images.unsplash.com/photo-1533105079-dab52097982f?q=80&w=400&auto=format&fit=crop', // Placeholder updated
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
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categorias</Text>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoryItem}>
                            <Image source={{ uri: item.image }} style={styles.categoryImage} />
                            <Text style={styles.categoryName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                />
            </View>

            {/* Lugares Populares */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Lugares Populares</Text>
                <FlatList
                    data={places}
                    renderItem={renderPlaceCard}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.placeList}
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
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  dashboardContainer: {
    padding: 16,
    paddingTop: 40,
  },
  searchBar: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  searchBarInput: {
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  categoryList: {
    paddingVertical: 8,
  },
  categoryItem: {
    marginRight: 12,
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
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
  placeList: {
    paddingVertical: 8,
  },
  placeCard: {
    width: width * 0.75,
    marginRight: 16,
    borderRadius: 8,
    elevation: 3,
  },
  placeImage: {
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  placeLocation: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  placePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#673AB7', // Alterado de #4CAF50 (verde) para roxo (#673AB7)
    marginTop: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 4,
    borderRadius: 4,
  }
});

export default HomeScreen;
