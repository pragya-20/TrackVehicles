import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Stylesheet} from 'react-native';
import Vehicles from './Vehicles';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './Login';

const Tab = createBottomTabNavigator();

const TabMenu = ({route}) => {
  console.log('route', route);
  const token = route.params.token;
  console.log(route);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Vehicles') {
            iconName = focused ? home : home - outline;
          }
          return (
            <>
              <View style={{borderWidth: 1}}>
                <Icon name={iconName} size={25} />
              </View>
            </>
          );
        },
        headerShown: false,
        // tabBarLabel: () => {
        //   return null;
        // },
      }}>
      <Tab.Screen
        name="Vehicles"
        component={Vehicles}
        initialParams={{token}}
      />
    </Tab.Navigator>
  );
};

export default TabMenu;
