import React, {useContext} from 'react';
import MapView from 'react-native-maps';
import {Text, Image, View} from 'react-native';
import {Marker} from 'react-native-maps';
import {GlobalLocationContext} from '../context/LocationContext';

const ViewMap = ({route}) => {
  const markerLongitude = route.params.vehicleParams.longitude;
  const markerLatitude = route.params.vehicleParams.latitude;
  const vehicleRegistrationNumber = route.params.vehicleRegistrationNumber;
  // console.log('Inside MapView', route.params);
  const thisRegion = {
    latitude: markerLatitude,
    longitude: markerLongitude,
    latitudeDelta: 35,
    longitudeDelta: 10,
  };
  const {val1, allVehicles} = useContext(GlobalLocationContext);

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
