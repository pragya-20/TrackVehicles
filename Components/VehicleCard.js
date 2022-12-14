import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const VehicleCard = props => {
  const itemid = props.x.id;
  const vehicleRegistrationNumber = props.x.registrationNumber;

  return (
    <View style={styles.cardContainer}>
      <Text>{vehicleRegistrationNumber}</Text>
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
