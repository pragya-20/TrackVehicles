import React, {useContext, useEffect} from 'react';
import MapView from 'react-native-maps';
import {Text, View} from 'react-native';
import {Marker} from 'react-native-maps';
import {GlobalLocationContext} from '../context/LocationContext';
import VehicleMarker from '../components/VehicleMarker';
import database from '@react-native-firebase/database';

const GlobalMap = () => {
  //   const markerLongitude = route.params.vehicleParams.longitude;
  //   const markerLatitude = route.params.vehicleParams.latitude;

  //   console.log('Inside MapView', route.params.vehicleParams);
  //   const thisRegion = {
  //     latitude: markerLatitude,
  //     longitude: markerLongitude,
  //     latitudeDelta: 35,
  //     longitudeDelta: 10,
  //   };
  const {val1, allVehicles, setAllVehicles} = useContext(GlobalLocationContext);

  useEffect(() => {
    allVehicles.map(vehicle => {
      database()
        .ref(`${vehicle.id}-${vehicle.registrationNumber}/location`)
        .on('value', snapshot => {
          const updatedObject = {
            ...vehicle,
            ...snapshot.val(),
          };
          console.log('updated ', snapshot.val()?.latitude, vehicle.id);
          setAllVehicles(prevState =>
            prevState.map(item => {
              if (item.id === vehicle.id) {
                return updatedObject;
              } else {
                return item;
              }
            }),
          );
        });
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: 13,
          longitude: 77.5,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}>
        {allVehicles.map(vehicle => {
          //   console.log(vehicle.id, vehicle.latitude, vehicle.longitude);
          if (vehicle.latitude && vehicle.longitude) {
            return <VehicleMarker vehicle={vehicle} />;
          } else {
            return null;
          }
        })}
      </MapView>
    </View>
  );
};
export default GlobalMap;
