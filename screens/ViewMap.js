import React, {useContext} from 'react';
import MapView from 'react-native-maps';
import {Text, Image, View, Alert} from 'react-native';
import {Marker} from 'react-native-maps';

const ViewMap = ({route, navigation}) => {
  const markerLongitude = route.params.vehicleParams.longitude;
  const markerLatitude = route.params.vehicleParams.latitude;
  const vehicleRegistrationNumber = route.params.vehicleRegistrationNumber;
  const thisRegion = {
    latitude: markerLatitude,
    longitude: markerLongitude,
    latitudeDelta: 35,
    longitudeDelta: 10,
  };

  return (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} initialRegion={thisRegion}>
        <Marker coordinate={thisRegion}>
          <Text style={{color: '#000000'}}>{vehicleRegistrationNumber}</Text>
          <Image
            style={{height: 20, width: 20}}
            source={require('../assets/sports-car.png')}
          />
        </Marker>
      </MapView>
    </View>
  );
};
export default ViewMap;
