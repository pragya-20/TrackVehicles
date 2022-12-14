import React, {useState, useEffect, useContext} from 'react';
import MapView, {AnimatedRegion, Animated} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {Text, View, Image} from 'react-native';
import {GlobalLocationContext} from '../context/LocationContext';
// import {Icon} from 'react-native-vector-icons/Icon';

export default function VehicleMarker({vehicle}) {
  const [marker, setMarker] = useState(null);
  const [coordinate, setCoordinate] = useState({
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <Marker
      ref={marker => {
        setMarker(marker);
      }}
      coordinate={coordinate}>
      <View>
        <Text style={{color: '#000000', fontSize: 10}} numberOfLines={1}>
          {vehicle.registrationNumber}
        </Text>
        <Image
          style={{height: 20, width: 20}}
          source={require('../assets/sports-car.png')}
        />
      </View>
    </Marker>
  );
}
