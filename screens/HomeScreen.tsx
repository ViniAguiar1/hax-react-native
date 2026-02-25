import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Praia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=150&auto=format&fit=crop' },
  { id: '2', name: 'Floresta', image: 'https://images.unsplash.com/photo-1542353133-c151c893693f?q=80&w=150&auto=format&fit=crop' },
  { id: '3', name: 'Casa', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3bafb?q=80&w=150&auto=format&fit=crop' },
  { id: '4', name: 'Castelo', image: 'https://images.unsplash.com/photo-1574313883730-a81ae8131342?q=80&w=150&auto=format&fit=crop' },
  { id: '5', name: 'Hotéis', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099557?q=80&w=150&auto=format&fit=crop' },
  { id: '6', name: 'Montanha', image: 'https://images.unsplash.com/photo-1506905925346-c43366021820?q=80&w=150&auto=format&fit=crop' },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
});

export default HomeScreen;