import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import VehicleCard from '../components/VehicleCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GlobalLocationContext} from '../context/LocationContext';

const Vehicles = ({route, navigation}) => {
  const token = route.params.token;
  const nav = useNavigation();
  const {val1, setVal1, allVehicles, setAllVehicles} = useContext(
    GlobalLocationContext,
  );

  const [data, setData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehiclesArray, setVehiclesArray] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        'https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        const dataResponse = await response.json();
        const localData = dataResponse.data;
        let vArray = [];
        setData(dataResponse.data);

        for (let i = 0; i < localData.length; i++) {
          let v = localData[i].vehicles;
          vArray = [...vArray, ...v];
        }
        setVehiclesArray(vArray);
        setAllVehicles(vArray);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const goToMap = () => {
    nav.navigate('GlobalMap');
  };

  const removeItemValue = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      return true;
    } catch (e) {
      return e;
      console.log(e);
    }
  };
  const logOut = () => {
    AsyncStorage.removeItem('@token');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff', borderBottomRadius: 10}}>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>TrackNerd</Text>
          <Pressable>
            <Image
              style={styles.mapImageStyle}
              source={require('../assets/map.png')}
            />
          </Pressable>
          <Pressable onPress={logOut}>
            <Image
              style={styles.mapImageStyle}
              source={require('../assets/logout.png')}
            />
          </Pressable>
        </View>
        <View style={{marginHorizontal: 20}}>
          <TextInput
            style={styles.searchInputStyle}
            placeholder="Search"
            placeholderTextColor="#000000"
            onChangeText={val => {
              setSearchTerm(val);
            }}
          />
        </View>
      </View>
      <KeyboardAwareScrollView
        style={styles.scrollStyle}
        contentContainerStyle={styles.contentStyle}>
        {vehiclesArray
          .filter(val => {
            if (
              val.registrationNumber
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((item, i) => {
            return <VehicleCard key={i} x={item} nav={navigation} />; //Passing navigation prop of screen to it's child
          })}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputStyle: {
    borderRadius: 10,
    // borderWidth: 1,
    width: '100%',
    color: 'gray',
    backgroundColor: '#EFEEEE',
    marginHorizontal: 80,
    marginVertical: 20,
    paddingHorizontal: 20,
    // borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    height: 40,
  },
  titleStyle: {
    marginTop: 15,
    paddingHorizontal: 30,
    color: '#ffffff',
    fontSize: 25,
  },
  headerStyle: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#008ECC',
  },
  mapImageStyle: {height: 40, width: 40, marginRight: 20, marginTop: 10},
  scrollStyle: {
    flex: 1,
    // borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 15,
  },
  contentStyle: {justifyContent: 'center', alignItems: 'center'},
});
export default Vehicles;
