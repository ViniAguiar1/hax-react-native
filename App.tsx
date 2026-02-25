import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importado para o Root Stack
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeStackScreen from './navigation/HomeStack';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import SchedulingScreen from './screens/SchedulingScreen'; // Importado SchedulingScreen
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator(); // Criado Root Stack Navigator

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#673AB7',
    accent: '#9C27B0',
  },
};

// Componente para o Tab Navigator
const MainTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'HomeStack') {
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
        <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="Mapa" component={MapScreen} /> 
        <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
);

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* Configurando o RootStack para gerenciar a navegação principal e modal */}
          <RootStack.Navigator>
            <RootStack.Screen 
                name="Main" 
                component={MainTabNavigator} 
                options={{ headerShown: false }} 
            />
            {/* FIX: SchedulingScreen como tela modal para ocultar a Tab Navigation */}
            <RootStack.Screen 
                name="Scheduling" 
                component={SchedulingScreen} 
                options={{ headerShown: false, presentation: 'modal' }} 
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
