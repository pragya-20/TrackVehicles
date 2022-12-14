import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

const VehicleCard = props => {
  const vehicleId = props.x.id;
  const vehicleRegistrationNumber = props.x.registrationNumber;
  const [vehicleParams, setvehicleParams] = useState(undefined);
  useEffect(() => {
    database()
      .ref(`${vehicleId}-${vehicleRegistrationNumber}/location`)
      .on('value', snapshot => {
        setvehicleParams(snapshot.val());
        console.log(
          'vehicle data->',
          vehicleRegistrationNumber,
          snapshot.val(),
        );
      });
  }, []);

  return (
    <View style={styles.cardContainer}>
      <Text>{vehicleRegistrationNumber}</Text>
      <Text>{vehicleParams?.latitude}</Text>
      <Text>{vehicleParams?.longitude}</Text>
      <Text>{vehicleParams?.timestamp}</Text>
      <Text>{vehicleParams?.bearing}</Text>
      <Text>{vehicleParams?.distance}</Text>
      <Text>{vehicleParams?.speed}</Text>
    </View>
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
