import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeStackScreen from './navigation/HomeStack'; // Importando o Stack Navigator
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#673AB7',
    accent: '#9C27B0',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'HomeStack') { // Alterado para HomeStack
                  iconName = 'home';
                } else if (route.name === 'Perfil') {
                  iconName = 'account';
                } else if (route.name === 'Mapa') {
                    iconName = 'map';
                }

                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#673AB7',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            {/* Usando HomeStackScreen como componente para a aba Home */}
            <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="Mapa" component={MapScreen} /> 
            <Tab.Screen name="Perfil" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
