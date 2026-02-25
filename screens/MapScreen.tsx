import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Solicita permissão de localização ao montar o componente
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        Alert.alert('Permissão Necessária', 'Por favor, conceda permissão de localização para usar o mapa.');
        return;
      }

      // Opcional: obter a localização atual
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const initialRegion = {
    latitude: location ? location.coords.latitude : -23.550520,
    longitude: location ? location.coords.longitude : -46.633309,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
