import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, FlatList } from 'react-native';
import { Appbar, useTheme, Title, Paragraph, Card, Chip, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockPlaces } from '../data/mock';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const STATIC_IMAGE_URL = 'https://imgmd.net/images/v1/guia/1684034/ilhabela-229-c.jpg';

const DetailScreen = ({ route, navigation }) => {
  const { placeId } = route.params;
  const theme = useTheme();
  const place = mockPlaces[placeId];

  if (!place) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Detalhes" />
        </Appbar.Header>
        <View style={styles.container}>
          <Text>Local não encontrado!</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderGalleryItem = ({ item }) => (
    // Updated to use static URL
    <Image source={{ uri: STATIC_IMAGE_URL }} style={styles.galleryImage} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={place.title} />
      </Appbar.Header>
      <ScrollView>
        {/* Galeria de Fotos */}
        <FlatList
            data={place.gallery}
            renderItem={renderGalleryItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={styles.gallery}
        />

        <View style={styles.container}>
            {/* Título, Nota e Preço */}
            <View style={styles.headerSection}>
                <Title>{place.title}</Title>
                <View style={styles.ratingPrice}>
                    <Chip icon="star" selectedColor={theme.colors.primary} style={styles.ratingChip}>
                        {place.rating}
                    </Chip>
                    <Text style={[styles.price, { color: theme.colors.primary }]}>R$ {place.price.toFixed(2)}</Text>
                </View>
            </View>
            
            {/* Localização e Endereço */}
            <Paragraph style={styles.location}>
                <MaterialCommunityIcons name="map-marker" size={16} color="gray" /> {place.location} - {place.address}
            </Paragraph>

            <Divider style={styles.divider} />

            {/* Descrição */}
            <Title style={styles.sectionTitle}>Descrição</Title>
            <Paragraph>{place.description}</Paragraph>

            <Divider style={styles.divider} />

            {/* Seção do Anunciante */}
            <Title style={styles.sectionTitle}>Anunciante</Title>
            <Card style={styles.announcerCard}>
                <Card.Content>
                    <Title>{place.announcer.name}</Title>
                    <Paragraph>{place.announcer.bio}</Paragraph>
                </Card.Content>
            </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  gallery: {
    width: width,
    height: width * 0.6,
  },
  galleryImage: {
    width: width,
    height: width * 0.6,
    resizeMode: 'cover',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingChip: {
    marginRight: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  location: {
    marginTop: 5,
    color: 'gray',
  },
  divider: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  announcerCard: {
    marginVertical: 10,
  },
});

export default DetailScreen;
