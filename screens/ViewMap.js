import React, {useContext} from 'react';
import MapView from 'react-native-maps';
import {Text, View} from 'react-native';
import {Marker} from 'react-native-maps';
import {GlobalLocationContext} from '../context/LocationContext';

const ViewMap = ({route}) => {
  const markerLongitude = route.params.vehicleParams.longitude;
  const markerLatitude = route.params.vehicleParams.latitude;

  // console.log('Inside MapView', route.params.vehicleParams);
  const thisRegion = {
    latitude: markerLatitude,
    longitude: markerLongitude,
    latitudeDelta: 35,
    longitudeDelta: 10,
  };
  const {val1, allVehicles} = useContext(GlobalLocationContext);
  // console.log(val1);
  // console.log('Global VehicleArray: ', allVehicles);
  return (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} initialRegion={thisRegion}>
        <Marker coordinate={thisRegion} />
      </MapView>
    </View>
  );
};
export default ViewMap;
