import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; // Import icons from Expo vector icons

import HomeScreen from './screens/HomeScreen';
import SavedScreen from './screens/SavedScreen';
import SettingsScreen from './screens/SettingsScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'rgb(56, 201, 172)',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
