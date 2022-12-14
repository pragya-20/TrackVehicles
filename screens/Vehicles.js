import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import VehicleCard from '../Components/VehicleCard';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Vehicles = ({route}) => {
  const token = route.params.token;
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
      //   console.log('response code', response.status);
      if (response.status === 200) {
        const dataResponse = await response.json();
        const localData = dataResponse.data;
        let vArray = [];
        setData(dataResponse.data);

        for (let i = 0; i < localData.length; i++) {
          let v = localData[i].vehicles;
          //   console.log('No of Vehicles in data' + i + ' ', v.length);
          vArray = [...vArray, ...v];
        }
        setVehiclesArray(vArray);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>TrackNerd</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#000000"
          onChangeText={val => {
            setSearchTerm(val);
          }}
        />
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
            return <VehicleCard key={i} x={item} />; //Passing navigation prop of screen to it's child
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
    // fontFamily: 'SF-Pro-Rounded-Semibold',
    marginLeft: 16,
    marginVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    alignSelf: 'center',
  },
  titleStyle: {paddingHorizontal: 20, color: '#ffffff', fontSize: 25},
  headerStyle: {
    height: 60,
    borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#008ECC',
  },
  scrollStyle: {borderWidth: 1, flex: 1},
  contentStyle: {justifyContent: 'center', alignItems: 'center'},
});
export default Vehicles;
