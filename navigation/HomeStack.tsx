import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SchedulingScreen from '../screens/SchedulingScreen'; // Import new screen

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
      {/* <HomeStack.Screen name="Scheduling" component={SchedulingScreen} options={{ headerShown: false }} /> */}
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
