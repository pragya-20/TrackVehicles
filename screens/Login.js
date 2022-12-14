import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('ganesh@arvee.co.in');
  const [password, setPassword] = useState('tracknerd@123');
  const [responseFlag, setresponseFlag] = useState(false);

  const logIn = async () => {
    const loginAuth = {username: email, password};

    try {
      setLoading(true);
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
      setLoading(false);
      const r = response.status;
      if (response.status === 200) {
        const loginResponse = await response.json();
        await AsyncStorage.setItem('@token', loginResponse.token);
        navigation.navigate('Vehicles', {token: loginResponse.token});
        setresponseFlag(true);
      } else if (r === 400 || r === 401) {
        Alert.alert('Please check your email and password!');
      } else if (response.status === 502) {
        Alert.alert('API is temporary down!');
      } else if (r === 404) {
        Alert.alert('User is not registered');
      } else {
        Alert.alert(`Statuscode: ${r}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              color: '#008ECC',
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            TrackNerd
          </Text>
        </View>

        <View>
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
            {loading && <ActivityIndicator size="large" color="#00ff00" />}
          </Pressable>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  loginContainer: {},
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
  },
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
    // borderWidth: 1,
    borderRadius: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffff',
    backgroundColor: '#008ECC',
  },
  loginBtnStyle: {
    marginTop: 25,
    alignItems: 'center',
  },
});
export default Login;
