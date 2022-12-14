import React, {useEffect, useState, useContext} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import VehicleCard from '../components/VehicleCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GlobalLocationContext} from '../context/LocationContext';

const Vehicles = ({route, navigation}) => {
  const token = route.params.token;

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
    setVal1(val1 + 1);
  }, []);
  return (
    <>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>TrackNerd</Text>
          {/* <Icon name="chevron-back"></Icon> */}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#000000"
          onChangeText={val => {
            setSearchTerm(val);
          }}
        />
        <Text>{val1}</Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    width: 187,
    color: 'gray',
    backgroundColor: '#EFEEEE',
    marginLeft: 16,
    marginVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    alignSelf: 'center',
  },
  titleStyle: {paddingHorizontal: 20, color: '#ffffff', fontSize: 25},
  headerStyle: {
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#008ECC',
  },
  scrollStyle: {
    flex: 1,
  },
  contentStyle: {justifyContent: 'center', alignItems: 'center'},
});
export default Vehicles;
