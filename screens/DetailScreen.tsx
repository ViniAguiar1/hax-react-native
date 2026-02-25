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
      <ScrollView style={styles.flexContainer}>
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
            <View style={styles.hostContainer}>
                <MaterialCommunityIcons name="account-circle" size={40} color={theme.colors.placeholder} />
                <View style={styles.hostInfo}>
                    <Paragraph style={styles.hostName}>Anunciante: {place.address.split(',')[0]}</Paragraph>
                    <Paragraph style={styles.hostStatus}>Superhost</Paragraph>
                </View>
            </View>
        </View>
      </ScrollView>
      
      {/* Sticky Footer for Booking/Price (Airbnb UX) */}
      <View style={[styles.stickyFooter, { borderTopColor: theme.colors.disabled }]}>
            <View>
                <Paragraph style={styles.footerPrice}>R$ {place.price.toFixed(2)} / noite</Paragraph>
                <Paragraph style={styles.footerInfo}>Data e convidados</Paragraph>
            </View>
            <Button mode="contained" onPress={() => {}} style={styles.bookingButton} labelStyle={styles.bookingButtonLabel}>
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
    container: {
        flex: 1,
        padding: 16,
    },
    imageContainer: {
        width: width,
        height: height * 0.45, // Immersive image height
        backgroundColor: '#f0f0f0',
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
    },
    backButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
    },
    contentContainer: {
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20, // Pull content over image for seamless transition
        position: 'relative',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    ratingLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingChip: {
        marginRight: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    ratingText: {
        fontWeight: 'bold',
        color: '#000',
    },
    locationText: {
        color: 'gray',
    },
    divider: {
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        lineHeight: 22,
    },
    hostContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    hostInfo: {
        marginLeft: 12,
    },
    hostName: {
        fontWeight: '600',
    },
    hostStatus: {
        color: 'gray',
        fontSize: 12,
    },
    stickyFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        backgroundColor: '#fff',
    },
    footerPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerInfo: {
        fontSize: 12,
        color: 'gray',
    },
    bookingButton: {
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    bookingButtonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    notFoundButton: {
        marginTop: 16,
    }
});

export default DetailScreen;