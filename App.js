import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabMenu from './screens/TabMenu';
import Login from './screens/Login';
import Vehicles from './screens/Vehicles';

const Stack = createNativeStackNavigator();

const App = () => {
  // console.log('In aPP');
  const [token, setToken] = useState(undefined);
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      // console.log('ReievedToken', value);

      if (value === null || value === undefined) {
        setToken(null);
      } else {
        setToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  if (token === undefined) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <>
            <Stack.Screen
              name="TabMenu"
              component={TabMenu}
              initialParams={{token}}
            />
            <Stack.Screen
              name="Vehicles"
              component={Vehicles}
              initialParams={{token}}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
