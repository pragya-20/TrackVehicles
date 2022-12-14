import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Stylesheet} from 'react-native';
import Vehicles from './Vehicles';
import {Icon} from 'react-native-vector-icons/Icon';
import Login from './Login';

const Tab = createBottomTabNavigator();

const TabMenu = ({route}) => {
  // console.log('Props->', props);
  console.log('route', route);
  const token = route.params.token;

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Vehicles"
        component={Vehicles}
        initialParams={{token}}
      />
    </Tab.Navigator>
  );
};

export default TabMenu;
