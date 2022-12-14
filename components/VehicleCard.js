import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {GlobalLocationContext} from '../context/LocationContext';

const VehicleCard = props => {
  const {val1, setVal1, allVehicles} = useContext(GlobalLocationContext);
  const navigation = useNavigation();
  const vehicleId = props.x.id;
  const vehicleRegistrationNumber = props.x.registrationNumber;
  const [vehicleParams, setvehicleParams] = useState(undefined);
  useEffect(() => {
    database()
      .ref(`${vehicleId}-${vehicleRegistrationNumber}/location`)
      .on('value', snapshot => {
        setvehicleParams(snapshot.val());
      });
  }, []);
  const navigateMapView = () => {
    setVal1(val1 + 1);
    navigation.navigate('ViewMap', {
      vehicleParams: vehicleParams,
      vehicleRegistrationNumber: vehicleRegistrationNumber,
    });
  };
  return (
    <Pressable
      onPress={() => {
        navigateMapView();
      }}
      style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={styles.vehicleSpecsStyle}>Vehicle Number:</Text>
          <Text style={styles.vehicleSpecsStyle}>
            {vehicleRegistrationNumber}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={styles.vehicleSpecsStyle}>Current Latitude:</Text>
          <Text style={styles.vehicleSpecsStyle}>
            {vehicleParams?.latitude}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={styles.vehicleSpecsStyle}>Current Longitude:</Text>
          <Text style={styles.vehicleSpecsStyle}>
            {vehicleParams?.longitude}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={styles.vehicleSpecsStyle}>Current Timestamp: </Text>
          <Text style={styles.vehicleSpecsStyle}>
            {vehicleParams?.timestamp}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-around',
            alignItems: 'flex-start',
            borderWidth: 1,
            width: '100%',
          }}>
          <Text style={styles.vehicleSpecsStyle}>Current Speed: </Text>
          <Text style={styles.vehicleSpecsStyle}>{vehicleParams?.speed}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%'},
  cardContainer: {
    height: 150,
    // width: 300,
    backgroundColor: '#ADD8E6',

    // borderWidth: 1,
    marginVertical: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleSpecsStyle: {
    borderWidth: 1,
    marginHorizontal: 30,
    color: '#000000',
    textAlign: 'center',
  },
});

export default VehicleCard;
