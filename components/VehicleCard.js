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
      }}>
      <View style={styles.cardContainer}>
        <Text>{vehicleRegistrationNumber}</Text>
        <Text>{vehicleParams?.latitude}</Text>
        <Text>{vehicleParams?.longitude}</Text>
        <Text>{vehicleParams?.timestamp}</Text>
        <Text>{vehicleParams?.bearing}</Text>
        <Text>{vehicleParams?.distance}</Text>
        <Text>{vehicleParams?.speed}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    width: 300,
    backgroundColor: 'pink',
    color: '#ffffff',
    borderWidth: 1,
    marginVertical: 20,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VehicleCard;
