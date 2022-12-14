import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';

const Login = ({navigation}) => {
  // console.log(navigation);
  const [email, setEmail] = useState('ganesh@arvee.co.in');
  const [password, setPassword] = useState('tracknerd@123');
  const [responseFlag, setresponseFlag] = useState(false);

  const logIn = async () => {
    const loginAuth = {username: email, password};
    // console.log('LoginAuth', loginAuth);
    try {
      const response = await fetch(
        'https://staging-api.tracknerd.io/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginAuth),
        },
      );

      if (response.status == 200) {
        const loginResponse = await response.json();
        await AsyncStorage.setItem('@token', loginResponse.token);
        navigation.navigate('Vehicles', {token: loginResponse.token});
        setresponseFlag(true);
        console.log(
          'response from api: ',
          loginResponse.token,
          response.status,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getVehicles = async () => {
    const response = fetch(
      'https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles',
      {
        method: 'GET',
        headers: {},
      },
    );
  };
  if (responseFlag) {
  }
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <TextInput
          placeholder="Enter email"
          onChangeText={setEmail}
          value={email}
          style={styles.inputEmailStyle}
        />
        <TextInput
          placeholder="Enter password"
          onChangeText={setPassword}
          secureTextEntry={true}
          value={password}
          style={styles.inputPasswordStyle}
        />
        <Pressable style={styles.loginBtnStyle} onPress={logIn}>
          <Text style={styles.loginTextStyle}>Login</Text>
        </Pressable>
      </View>
      {responseFlag ? <Text>data</Text> : <Text>Nothing here</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1},
  inputEmailStyle: {
    borderWidth: 1,
    borderRadius: 8,
    width: 250,
    height: 60,
    color: '#000000',
    paddingHorizontal: 20,
  },
  inputPasswordStyle: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 8,
    width: 250,
    height: 60,
    color: '#000000',
    paddingHorizontal: 20,
  },
  loginTextStyle: {
    width: 135,
    height: 45,
    borderWidth: 1,
    borderRadius: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
  },
  loginBtnStyle: {
    marginTop: 25,
    // borderWidth: 1,
    alignItems: 'center',
  },
});
export default Login;
