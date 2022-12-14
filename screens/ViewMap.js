import React from 'react';
import MapView from 'react-native-maps';
import {Text, View} from 'react-native';

const ViewMap = () => {
  // console.log('Inside MapView');
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'red'}}>Hello</Text>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};
export default ViewMap;
