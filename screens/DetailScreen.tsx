import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme, Title, Paragraph, Chip, Divider, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockPlaces } from '../data/mock';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const STATIC_IMAGE_URL = 'https://imgmd.net/images/v1/guia/1684034/ilhabela-229-c.jpg'; // Placeholder for immersive image

const DetailScreen = ({ route, navigation }) => {
  const { placeId } = route.params;
  const theme = useTheme();
  const place = mockPlaces[placeId];

  const handleReserve = () => {
    // Navigate to the new Scheduling screen as requested
    navigation.navigate('Scheduling');
  };

  if (!place) {
    return (
      <SafeAreaView style={styles.container}>
        <Title>Local não encontrado!</Title>
        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.notFoundButton}>
            Voltar
        </Button>
      </SafeAreaView>
    );
  }

  // Airbnb-style remodeling: Immersive header, clear hierarchy, and minimalist design

  return (
    <View style={styles.flexContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView style={styles.scrollViewContent}>
        {/* Immersive Image Header */}
        <View style={styles.imageContainer}>
            <Image source={{ uri: STATIC_IMAGE_URL }} style={styles.immersiveImage} />
            <SafeAreaView style={styles.headerOverlay}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                {/* Additional actions like share/favorite could go here */}
            </SafeAreaView>
        </View>

        {/* Content Section - Clear Hierarchy */}
        <View style={[styles.contentContainer, { backgroundColor: theme.colors.background }]}>
            
            {/* Title, Rating, Location */}
            <Title style={styles.title}>{place.title}</Title>
            
            <View style={styles.ratingLocation}>
                <Chip icon="star" selectedColor={theme.colors.primary} style={styles.ratingChip} textStyle={styles.ratingText}>
                    {place.rating}
                </Chip>
                <Paragraph style={styles.locationText}>{place.location} - {place.address}</Paragraph>
            </View>

            <Divider style={styles.divider} />

            {/* Description Section */}
            <Title style={styles.sectionTitle}>Descrição</Title>
            <Paragraph style={styles.description}>{place.description}</Paragraph>

            <Divider style={styles.divider} />

            {/* Host Section (Remodeled minimalist) */}
            <Title style={styles.sectionTitle}>Anfitrião</Title>
            {/* ... rest of content */}
             <View style={{ height: 100 }} /> {/* Padding for floating button */}
        </View>
      </ScrollView>
       {/* Floating Bottom Reservation Bar (Airbnb UX) */}
       <View style={[styles.bottomBar, { backgroundColor: theme.colors.background }]}>
            <View>
                <Title style={styles.priceText}>R${place.price} / noite</Title>
                <Paragraph>Data indisponível</Paragraph>
            </View>
            <Button mode="contained" onPress={handleReserve} style={styles.reserveButton}>
                Reservar
            </Button>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: height * 0.4, // Immersive image height
    position: 'relative',
  },
  immersiveImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'rgba(0,0,0,0.3)', // Optional overlay
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  ratingLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingChip: {
    marginRight: 8,
  },
  ratingText: {
    fontWeight: '600',
  },
  locationText: {
    color: '#888',
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  // Floating Bottom Bar (New style)
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  reserveButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  }
});

export default DetailScreen;
